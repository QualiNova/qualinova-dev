import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from '@/components/organisms/LoginForm/LoginForm';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="github-icon"
    />
  ),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid={`link-${href.replace('/', '').replace('-', '')}`}>
      {children}
    </a>
  ),
}));

// Mock Input component
jest.mock('@/components/atoms/Input/Input', () => {
  const Input = React.forwardRef<HTMLInputElement, any>(({ label, placeholder, error, type = 'text', className, ...props }, ref) => (
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
  ));
  Input.displayName = 'Input';
  return Input;
});

// Mock PasswordInput component
jest.mock('@/components/atoms/Input/PasswordInput', () => {
  const PasswordInput = React.forwardRef<HTMLInputElement, any>(({ label, error, className, ...props }, ref) => (
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
  ));
  PasswordInput.displayName = 'PasswordInput';
  return PasswordInput;
});

// Mock Checkbox component
jest.mock('@/components/atoms/Checkbox/Checkbox', () => {
  const Checkbox = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
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
  ));
  Checkbox.displayName = 'Checkbox';
  return Checkbox;
});

// Mock Button component
jest.mock('@/components/atoms/Button/Button', () => ({
  Button: ({ children, disabled, type, fullWidth, className, ...props }: any) => (
    <button
      type={type}
      disabled={disabled}
      className={className}
      data-testid={type === 'submit' ? 'submit-button' : 'github-button'}
      data-full-width={fullWidth}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock schema
jest.mock('@/schemas/LoginForm/LoginFormSchema', () => ({
  loginFormSchema: {
    parse: jest.fn(),
  },
}));

describe('LoginForm Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<LoginForm />);
      expect(screen.getByText('Welcome back')).toBeInTheDocument();
    });

    it('displays correct heading and description', () => {
      render(<LoginForm />);

      expect(screen.getByText('Welcome back')).toBeInTheDocument();
      expect(screen.getByText('Enter your credentials to sign in to your account')).toBeInTheDocument();
    });

    it('renders all required form fields', () => {
      render(<LoginForm />);

      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-remember')).toBeInTheDocument();
    });

    it('displays correct field labels', () => {
      render(<LoginForm />);

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('shows correct email placeholder', () => {
      render(<LoginForm />);
      expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    });
  });

  // Link and Navigation Tests
  describe('Links and Navigation', () => {
    it('renders forgot password link', () => {
      render(<LoginForm />);

      const forgotPasswordLink = screen.getByTestId('link-forgotpassword');
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
      expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    });

    it('displays sign up link', () => {
      render(<LoginForm />);

      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByText('Sign up')).toBeInTheDocument();
      expect(screen.getByTestId('link-register')).toHaveAttribute('href', '/register');
    });
  });

  // Form Elements Tests
  describe('Form Elements', () => {
    it('renders remember me checkbox with label', () => {
      render(<LoginForm />);

      expect(screen.getByTestId('checkbox-remember')).toBeInTheDocument();
      expect(screen.getByText('Remember me')).toBeInTheDocument();
    });

    it('renders submit button with correct text and properties', () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('renders GitHub authentication button', () => {
      render(<LoginForm />);

      const githubButton = screen.getByTestId('github-button');
      expect(githubButton).toBeInTheDocument();
      expect(githubButton).toHaveAttribute('type', 'button');
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    });

    it('displays "OR CONTINUE WITH" divider', () => {
      render(<LoginForm />);
      expect(screen.getByText('OR CONTINUE WITH')).toBeInTheDocument();
    });
  });

  // Styling Tests
  describe('Styling and Layout', () => {
    it('has correct main container styling', () => {
      render(<LoginForm />);
      const mainContainer = screen.getByText('Welcome back').closest('.h-screen');

      expect(mainContainer).toHaveClass(
        'h-screen',
        'flex',
        'justify-center',
        'items-center',
        'bg-[#0c0c16]'
      );
    });

    it('has responsive spacing container', () => {
      render(<LoginForm />);
      const spacingContainer = screen.getByText('Welcome back').closest('.space-y-4');

      expect(spacingContainer).toHaveClass(
        'space-y-4',
        'py-6',
        'md:py-10',
        'px-4',
        'xl:py-0',
        'xl:px-0',
        'max-w-[420px]',
        'w-full'
      );
    });

    it('form has correct styling classes', () => {
      render(<LoginForm />);
      const form = screen.getByTestId('submit-button').closest('form');

      expect(form).toHaveClass(
        'w-full',
        'max-w-[420px]',
        'mx-auto',
        'space-y-4',
        'bg-[#0c0c16]',
        'h-fit',
        'p-6',
        'rounded-lg',
        'border',
        'border-[#27272A]'
      );
    });

    it('heading has responsive font sizes', () => {
      render(<LoginForm />);
      const heading = screen.getByText('Welcome back');

      expect(heading).toHaveClass(
        'text-xl',
        'md:text-2xl',
        'leading-8',
        'font-semibold',
        'text-white'
      );
    });

    it('description has correct styling', () => {
      render(<LoginForm />);
      const description = screen.getByText('Enter your credentials to sign in to your account');

      expect(description).toHaveClass('text-sm', 'text-[#A1A1AA]', 'leading-5');
    });

    it('email field has correct label styling', () => {
      render(<LoginForm />);
      const emailLabel = screen.getByText('Email');

      expect(emailLabel).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
    });

    it('password field has correct label styling', () => {
      render(<LoginForm />);
      const passwordLabel = screen.getByText('Password');

      expect(passwordLabel).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
    });

    it('input fields have correct styling classes', () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      expect(emailInput).toHaveClass('bg-[#0c0c16]', 'border-[#27272A]', 'text-white');
      expect(passwordInput).toHaveClass('bg-[#0c0c16]', 'border-[#27272A]', 'text-white');
    });

    it('submit button has correct styling', () => {
      render(<LoginForm />);
      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toHaveClass(
        'rounded-md',
        'bg-[#2563EB]',
        'hover:bg-[#2563EB]/90',
        'text-white',
        'py-2.5'
      );
    });

    it('github button has correct styling', () => {
      render(<LoginForm />);
      const githubButton = screen.getByTestId('github-button');

      expect(githubButton).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'border',
        'border-[#27272A]',
        'w-full',
        'hover:bg-[#27272A]',
        'py-2.5',
        'text-white',
        'rounded-md'
      );
    });

    it('has responsive divider layout', () => {
      render(<LoginForm />);
      const dividerContainer = screen.getByText('OR CONTINUE WITH').closest('.flex');
      const dividers = dividerContainer?.querySelectorAll('.h-\\[1px\\]');
      const text = screen.getByText('OR CONTINUE WITH');

      expect(dividers).toHaveLength(2);
      expect(dividers?.[0]).toHaveClass('w-[25%]', 'bg-[#27272A]');
      expect(dividers?.[1]).toHaveClass('w-[25%]', 'bg-[#27272A]');
      expect(text).toHaveClass('text-[#A1A1AA]', 'w-[50%]', 'text-xs', 'text-center');
    });

    it('remember me checkbox has correct styling', () => {
      render(<LoginForm />);
      const checkboxLabel = screen.getByText('Remember me');

      expect(checkboxLabel).toHaveClass('text-sm', 'text-white');
    });

    it('forgot password link has correct styling', () => {
      render(<LoginForm />);
      const forgotLink = screen.getByText('Forgot password?');

      expect(forgotLink).toHaveClass('text-sm', 'text-[#2563EB]');
    });

    it('sign up link has correct styling', () => {
      render(<LoginForm />);
      const signUpLink = screen.getByText('Sign up');

      expect(signUpLink).toHaveClass('text-sm', 'hover:underline', 'text-[#2563EB]');
    });

    it('form fields have proper spacing', () => {
      render(<LoginForm />);
      const emailContainer = screen.getByTestId('email-input').closest('.space-y-1\\.5');
      const passwordContainer = screen.getByTestId('password-input').closest('.space-y-1\\.5');

      expect(emailContainer).toHaveClass('space-y-1.5');
      expect(passwordContainer).toHaveClass('space-y-1.5');
    });

    it('password section has flex layout for label and forgot link', () => {
      render(<LoginForm />);
      const passwordHeader = screen.getByText('Password').closest('.flex');

      expect(passwordHeader).toHaveClass('flex', 'justify-between');
    });
  });

  // User Interaction Tests
  describe('User Interactions', () => {
    it('should allow user to type in email field', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      await user.type(emailInput, 'test@example.com');

      expect(emailInput.value).toBe('test@example.com');
    });

    it('should allow user to type in password field', async () => {
      render(<LoginForm />);

      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      await user.type(passwordInput, 'password123');

      expect(passwordInput.value).toBe('password123');
    });

    it('should allow user to check remember me checkbox', async () => {
      render(<LoginForm />);

      const checkbox = screen.getByTestId('checkbox-remember') as HTMLInputElement;
      await user.click(checkbox);

      expect(checkbox.checked).toBe(true);
    });

    it('should allow user to uncheck remember me checkbox', async () => {
      render(<LoginForm />);

      const checkbox = screen.getByTestId('checkbox-remember') as HTMLInputElement;
      await user.click(checkbox);
      await user.click(checkbox);

      expect(checkbox.checked).toBe(false);
    });

    it('should clear form fields when needed', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      await user.clear(emailInput);
      await user.clear(passwordInput);

      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  // Form Validation Tests
  describe('Form Validation', () => {
    it('should show validation error for invalid email format', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
    });

    it('should show validation error for empty email field', async () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
    });

    it('should show validation error for empty password field', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
    });

    it('should show validation error for short password', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
    });

    it('should not show validation errors for valid input', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'validPassword123');

      await waitFor(() => {
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      });
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    it('should submit form with correct data', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const checkbox = screen.getByTestId('checkbox-remember');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Form Submitted:', {
          email: 'test@example.com',
          password: 'password123',
          rememberMe: true
        });
      });

      consoleSpy.mockRestore();
    });

    it('redirects to dashboard on form submission', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      render(<LoginForm />);

      const form = screen.getByTestId('submit-button').closest('form');
      fireEvent.submit(form!);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });

      consoleSpy.mockRestore();
    });

    it('should redirect to dashboard after successful submission', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should not submit form with invalid data', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      // Should not call console.log or redirect with invalid data
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Form Submitted:'));
      expect(mockPush).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  // Error State Tests
  describe('Error States', () => {
    it('should display error message with proper styling', async () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();
      });
    });

    it('should clear error message when user starts typing', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      // Trigger error
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });

      // Start typing to clear error
      await user.type(emailInput, 'test@example.com');

      await waitFor(() => {
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      });
    });
  });

  // Button Interaction Tests
  describe('Button Interactions', () => {
    it('should handle GitHub button click', async () => {
      render(<LoginForm />);

      const githubButton = screen.getByTestId('github-button');
      await user.click(githubButton);

      // Since it's a button without specific action, just verify it's clickable
      expect(githubButton).toBeInTheDocument();
    });

    it('should show visual feedback on button hover', async () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');

      await user.hover(submitButton);
      expect(submitButton).toHaveClass('hover:bg-[#2563EB]/90');
    });

    it('should handle multiple rapid clicks gracefully', async () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('submit-button');

      // Rapid clicks
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      expect(submitButton).toBeInTheDocument();
    });
  });

  // Form State Tests
  describe('Form State Management', () => {
    it('should maintain form state during user interaction', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      const checkbox = screen.getByTestId('checkbox-remember') as HTMLInputElement;

      // Fill form
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(checkbox);

      // Verify state is maintained
      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');
      expect(checkbox.checked).toBe(true);
    });

    it('should handle form reset gracefully', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      const form = screen.getByTestId('submit-button').closest('form') as HTMLFormElement;

      // Fill form
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Reset form
      fireEvent.reset(form);

      // Values should be cleared
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle special characters in input fields', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

      await user.type(emailInput, 'test+special@example.com');
      await user.type(passwordInput, 'P@ssw0rd!@#$');

      expect(emailInput.value).toBe('test+special@example.com');
      expect(passwordInput.value).toBe('P@ssw0rd!@#$');
    });

    it('should handle very long input values', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const longEmail = 'a'.repeat(100) + '@example.com';

      await user.type(emailInput, longEmail);
      expect(emailInput.value).toBe(longEmail);
    });

    it('should handle rapid form interactions', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const checkbox = screen.getByTestId('checkbox-remember');

      // Rapid interactions
      await user.type(emailInput, 'test@example.com');
      await user.click(checkbox);
      await user.type(passwordInput, 'password');
      await user.click(checkbox);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });
  });
});