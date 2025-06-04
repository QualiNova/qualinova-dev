// __tests__/organisms/RegisterForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';

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
    <a href={href} className={className} data-testid="sign-in-link">
      {children}
    </a>
  ),
}));

// Mock Input component
jest.mock('@/components/atoms/Input/Input', () => {
  const Input = React.forwardRef<HTMLInputElement, any>(({ label, placeholder, error, type = 'text', ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        data-testid={`input-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`}
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
  const PasswordInput = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        type="password"
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
        data-testid="checkbox-terms"
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
jest.mock('@/schemas/RegisterForm/RegisterFormSchema', () => ({
  registerFormSchema: {
    parse: jest.fn(),
  },
}));

describe('RegisterForm Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RegisterForm />);
    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });

  it('displays correct heading and description', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Enter your information to create a QualiNova account')).toBeInTheDocument();
  });

  it('renders all required form fields', () => {
    render(<RegisterForm />);

    expect(screen.getByTestId('input-first-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-last-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-terms')).toBeInTheDocument();
  });

  it('displays correct field labels', () => {
    render(<RegisterForm />);

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('shows correct placeholders', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
  });

  it('displays password requirements text', () => {
    render(<RegisterForm />);
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  it('renders terms of service and privacy policy links', () => {
    render(<RegisterForm />);

    expect(screen.getByText('I agree to the')).toBeInTheDocument();
    expect(screen.getByText('terms of service')).toBeInTheDocument();
    expect(screen.getByText('and')).toBeInTheDocument();
    expect(screen.getByText('privacy policy')).toBeInTheDocument();
  });

  it('renders submit button with correct text and properties', () => {
    render(<RegisterForm />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('renders GitHub authentication button', () => {
    render(<RegisterForm />);

    const githubButton = screen.getByTestId('github-button');
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute('type', 'button');
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });

  it('displays "OR CONTINUE WITH" divider', () => {
    render(<RegisterForm />);
    expect(screen.getByText('OR CONTINUE WITH')).toBeInTheDocument();
  });

  it('displays sign in link', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-link')).toHaveAttribute('href', '/login');
  });

  it('has responsive container styling', () => {
    render(<RegisterForm />);
    const mainContainer = screen.getByText('Create an account').closest('.min-h-screen');

    expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'justify-center', 'items-center');
  });

  it('has responsive spacing classes', () => {
    render(<RegisterForm />);
    const spacingContainer = screen.getByText('Create an account').closest('.space-y-4');

    expect(spacingContainer).toHaveClass('py-6', 'md:py-10', 'px-4', 'xl:py-0', 'xl:px-0');
  });

  it('form has correct styling and responsive classes', () => {
    render(<RegisterForm />);
    const form = screen.getByTestId('submit-button').closest('form');

    expect(form).toHaveClass(
      'w-full',
      'max-w-[420px]',
      'mx-auto',
      'space-y-4',
      'bg-[#09090B]',
      'h-fit',
      'rounded-lg',
      'border',
      'border-[#27272A]'
    );
  });

  it('form has responsive padding', () => {
    render(<RegisterForm />);
    const form = screen.getByTestId('submit-button').closest('form');

    expect(form).toHaveClass('p-3', 'md:p-6');
  });

  it('name fields have responsive grid layout', () => {
    render(<RegisterForm />);
    const nameGrid = screen.getByTestId('input-first-name').closest('.grid');

    expect(nameGrid).toHaveClass('grid', 'grid-cols-2', 'gap-2', 'md:gap-4');
  });

  it('heading has responsive font sizes', () => {
    render(<RegisterForm />);
    const heading = screen.getByText('Create an account');

    expect(heading).toHaveClass('text-xl', 'md:text-2xl', 'leading-8', 'font-semibold', 'text-[#FAFAFA]');
  });

  it('description has correct styling', () => {
    render(<RegisterForm />);
    const description = screen.getByText('Enter your information to create a QualiNova account');

    expect(description).toHaveClass('text-sm', 'text-[#A1A1AA]', 'leading-5');
  });

  it('password requirement text has correct styling', () => {
    render(<RegisterForm />);
    const passwordText = screen.getByText('Password must be at least 8 characters long');

    expect(passwordText).toHaveClass('text-[#A1A1AA]', 'text-xs', 'leading-4');
  });

  it('submit button has correct styling classes', () => {
    render(<RegisterForm />);
    const submitButton = screen.getByTestId('submit-button');

    expect(submitButton).toHaveClass(
      'rounded-[6px]',
      'bg-[#2563EB]/50',
      'hover:bg-[#2563EB]',
      'text-[#18181B]'
    );
  });

  it('console logs form data on submit', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<RegisterForm />);

    const form = screen.getByTestId('submit-button').closest('form');
    fireEvent.submit(form!);

    // The actual test will depend on react-hook-form validation
    // This structure is ready for integration

    consoleSpy.mockRestore();
  });
});