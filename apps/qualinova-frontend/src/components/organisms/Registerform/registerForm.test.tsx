import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterForm from './registerForm';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image as it's a Next.js component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }: any) => {
    const onClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const router = require('next/navigation').useRouter();
      router.push(href);
    };

    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        data-testid={`link-${href.replace("/", "").replace("-", "")}`}
      >
        {children}
      </a>
    );
  },
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => {
    let formData: { [key: string]: string | boolean } = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        terms: false,
    }

    let formErrors = {};

  return {
    useForm: () => ({
      register: (name: string) => ({
        onChange: (e: { target: { value: string; checked?: boolean; type?: string } }) => {
          if (e.target.type === 'checkbox') {
            formData[name] = e.target.checked ? true : false;
          } else {
            formData[name] = e.target.value;
          }
        },
        onBlur: () => {},
        name,
        ref: () => {}
      }),
      handleSubmit: (cb: any) => (e: any) => {
        e?.preventDefault?.();
        cb(formData);
      },
      formState: {
        errors: formErrors,
        isValid: true,
      },
      // Helper function to set errors in tests
      __setErrors: (errors: any) => {
        formErrors = errors;
      }
    }),
  };
});

// Mock Input component
jest.mock("../../atoms/Input/input.tsx", () => {
  const Input = React.forwardRef<HTMLInputElement, any>(
    (
      { label, placeholder, error, type = "text", className, ...props },
      ref,
    ) => (
      <div>
        {label && <label>{label}</label>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={className}
          data-testid="email-input"
          {...props}
        />
        {error && <span data-testid="error-message">{error}</span>}
      </div>
    ),
  );
  Input.displayName = "Input";
  return Input;
});

// Mock PasswordInput component
jest.mock("../../atoms/Input/passwordInput.tsx", () => {
  const PasswordInput = React.forwardRef<HTMLInputElement, any>(
    ({ label, error, className, ...props }, ref) => (
      <div>
        {label && <label>{label}</label>}
        <input
          ref={ref}
          type="password"
          className={className}
          data-testid="password-input"
          {...props}
        />
        {error && <span data-testid="error-message">{error}</span>}
      </div>
    ),
  );
  PasswordInput.displayName = "PasswordInput";
  return PasswordInput;
});

// Mock Checkbox component
jest.mock("../../atoms/Checkbox/checkbox.tsx", () => {
  const Checkbox = React.forwardRef<HTMLInputElement, any>(
    ({ label, error, ...props }, ref) => (
      <div>
        <input
          ref={ref}
          type="checkbox"
          data-testid="checkbox-remember"
          {...props}
        />
        {label && <span data-testid="checkbox-label">{label}</span>}
        {error && <span data-testid="error-message">{error}</span>}
      </div>
    ),
  );
  Checkbox.displayName = "Checkbox";
  return Checkbox;
});

// Mock Button component
jest.mock("../../atoms/Button/button.tsx", () => ({
  Button: ({
    children,
    disabled,
    type,
    fullWidth,
    className,
    ...props
  }: any) => (
    <button
      type={type}
      disabled={disabled}
      className={className}
      data-testid={type === "submit" ? "submit-button" : "github-button"}
      data-full-width={fullWidth}
      {...props}
    >
      {children}
    </button>
  ),
}));



describe('RegisterForm', () => {
  const user = userEvent.setup();

  it('renders form with all required fields', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('password-label')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<RegisterForm />);

    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'Password123!');
    await user.click(screen.getByTestId('checkbox-terms'));
    
    await user.click(screen.getByTestId('create-account-button'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Form Submitted:', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'Password123!',
        terms: true,
      });
    });

    consoleSpy.mockRestore();
  });

  it('validates form fields and shows error messages', async () => {
    const mockUseForm = require('react-hook-form').useForm();
      mockUseForm.__setErrors({
        firstName: { message: "First name must be at least 2 characters" },
        lastName: { message: "Last name must be at least 2 characters" },
        email: { message: "Invalid email format" },
        password: { message: "Password must be at least 8 characters long" },
        terms: { message: "You must accept the terms" }
      });
    render(<RegisterForm />);
    
    // Submit empty form
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/last name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText('name@example.com'), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    render(<RegisterForm />);

    await user.type(screen.getByTestId('password-input'), 'short');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('enables navigation to login page', async () => {
    const mockRouter = { push: mockPush };
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue(mockRouter);
  
    render(<RegisterForm />);

    const loginLink = screen.getByText(/sign in/i);
    expect(loginLink).toHaveAttribute('href', '/login');
    await user.click(loginLink);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});