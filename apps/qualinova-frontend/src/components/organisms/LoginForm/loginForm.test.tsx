import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from '@/components/organisms/LoginForm/loginForm';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, className }: any) => (
        <a
            href={href}
            className={className}
            data-testid={`link-${href.replace('/', '').replace('-', '')}`}
        >
            {children}
        </a>
    ),
}));

// Create a wrapper component with necessary providers
const renderWithProviders = (ui: React.ReactElement) => {
    return render(ui);
};

// Mock Input component
jest.mock('../../atoms/Input/input.tsx', () => {
    const Input = React.forwardRef<HTMLInputElement, any>(
        ({ label, placeholder, error, type = 'text', className, ...props }, ref) => (
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
    Input.displayName = 'Input';
    return Input;
});

// Mock PasswordInput component
jest.mock('../../atoms/Input/passwordInput.tsx', () => {
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
    PasswordInput.displayName = 'PasswordInput';
    return PasswordInput;
});

// Mock Checkbox component
jest.mock('../../atoms/Checkbox/checkbox.tsx', () => {
    const Checkbox = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
        <div>
            <input ref={ref} type="checkbox" data-testid="checkbox-remember" {...props} />
            {label && <span data-testid="checkbox-label">{label}</span>}
            {error && <span data-testid="error-message">{error}</span>}
        </div>
    ));
    Checkbox.displayName = 'Checkbox';
    return Checkbox;
});

// Mock Button component
jest.mock('../../atoms/Button/button.tsx', () => ({
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
jest.mock('../../../schemas/LoginForm/loginFormSchema.ts', () => ({
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
    describe('Rendering', () => {
        it('renders form with all required elements', () => {
            renderWithProviders(<LoginForm />);

            expect(screen.getByText('Welcome back')).toBeInTheDocument();
            expect(
                screen.getByText('Enter your credentials to sign in to your account'),
            ).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.getByTestId('checkbox-remember')).toBeInTheDocument();
            expect(screen.getByTestId('submit-button')).toBeInTheDocument();
            expect(screen.getByTestId('github-button')).toBeInTheDocument();
        });

        it('renders navigation links correctly', () => {
            renderWithProviders(<LoginForm />);

            expect(screen.getByTestId('forgot-password')).toBeInTheDocument();
            expect(screen.getByTestId('register')).toBeInTheDocument();
        });
    });

    describe('Form Validation', () => {
        it('shows validation errors for empty form submission', async () => {
            const { useForm } = await import('react-hook-form');
            const mockForm = (useForm as jest.Mock)();
            mockForm.__setErrors({
                email: { message: 'Email is required' },
                password: { message: 'Password is required' },
            });

            renderWithProviders(<LoginForm />);

            await user.click(screen.getByTestId('submit-button'));

            // Wait for error messages to appear
            await waitFor(() => {
                // Find all error messages
                const errorMessages = screen.getAllByText(/is required/i);
                expect(errorMessages).toHaveLength(2); // Should have both email and password errors

                // Check specific error messages
                expect(screen.getByText('Email is required')).toBeInTheDocument();
                expect(screen.getByText('Password is required')).toBeInTheDocument();
            });
        });

        it('shows error when only email field is empty', async () => {
            // Set up mock to only show email error
            const { useForm } = await import('react-hook-form');
            const mockForm = (useForm as jest.Mock)();
            mockForm.__setErrors({
                email: { message: 'Email is required' },
            });

            renderWithProviders(<LoginForm />);

            await user.click(screen.getByTestId('submit-button'));

            await waitFor(() => {
                expect(screen.getByTestId('error-message')).toHaveTextContent('Email is required');
                // Verify only one error is shown
                expect(screen.queryAllByTestId('error-message')).toHaveLength(1);
            });
        });

        it('shows error when only password field is empty', async () => {
            // Set up mock to only show password error
            const { useForm } = await import('react-hook-form');
            const mockForm = (useForm as jest.Mock)();
            mockForm.__setErrors({
                email: { message: 'Password is required' },
            });

            renderWithProviders(<LoginForm />);

            await user.click(screen.getByTestId('submit-button'));

            await waitFor(() => {
                expect(screen.getByTestId('error-message')).toHaveTextContent(
                    'Password is required',
                );
                // Verify only one error is shown
                expect(screen.queryAllByTestId('error-message')).toHaveLength(1);
            });
        });

        it('allows submission with valid data', async () => {
            const { useForm } = await import('react-hook-form');
            const mockForm = (useForm as jest.Mock)();
            mockForm.__setErrors({
                email: { message: '' },
                password: { message: '' },
            });
            mockForm.__setFormData({
                email: 'test@example.com',
                password: 'validPassword123',
                rememberMe: false,
            });

            renderWithProviders(<LoginForm />);

            await user.type(screen.getByTestId('email-input'), 'test@example.com');
            await user.type(screen.getByTestId('password-input'), 'validPassword123');
            await user.click(screen.getByTestId('submit-button'));

            await waitFor(() => {
                expect(screen.queryAllByTestId('error-message')).toHaveLength(0);
                expect(mockPush).toHaveBeenCalledWith('/dashboard');
            });
        });
    });

    describe('User Interactions', () => {
        it('handles form input changes', async () => {
            renderWithProviders(<LoginForm />);

            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const checkbox = screen.getByTestId('checkbox-remember');

            await user.type(emailInput, 'test@example.com');
            await user.type(passwordInput, 'password123');
            await user.click(checkbox);

            expect(emailInput).toHaveValue('test@example.com');
            expect(passwordInput).toHaveValue('password123');
            expect(checkbox).toBeChecked();
        });
    });
});
