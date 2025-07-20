import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavMenu from './navMenu';

// Mock the dependencies
jest.mock('../../atoms/NavLink/NavLink.tsx', () => {
  return function MockNavLink({ children, href }: { children: React.ReactNode; href: string }) {
    return (
      <a href={href} data-testid="nav-link">
        {children}
      </a>
    );
  };
});

jest.mock('../../atoms/Button/Button.tsx', () => {
  return function MockButton({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }) {
    return (
      <button data-testid="button" data-variant={variant}>
        {children}
      </button>
    );
  };
});

jest.mock('lucide-react', () => ({
  X: () => <div data-testid="x-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
}));

describe('NavMenu', () => {
  it('renders desktop navigation by default', () => {
    render(<NavMenu />);

    // Check if all navigation links are present
    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks).toHaveLength(5);

    // Check if desktop buttons are present
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Sign In');
    expect(buttons[1]).toHaveTextContent('Sign Up');
  });

  it('shows hamburger menu icon on mobile', () => {
    render(<NavMenu />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<NavMenu />);

    // Get the mobile menu button specifically
    const menuButton = screen.getByTestId('menu-icon').parentElement as HTMLElement;

    // Initially menu is closed
    const mobileMenu = screen.queryByTestId('mobile-menu');
    expect(mobileMenu).not.toBeInTheDocument();

    // Click hamburger menu
    fireEvent.click(menuButton);

    // Menu should be open
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(menuButton);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('renders correct navigation links', () => {
    render(<NavMenu />);

    const expectedLinks = ['/', '/dashboard', '/create-certificate', '/verify', '/certificate'];
    const navLinks = screen.getAllByTestId('nav-link');

    navLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedLinks[index]);
    });
  });

  it('renders sign-in and sign-up buttons with correct variants', () => {
    render(<NavMenu />);

    const buttons = screen.getAllByTestId('button');
    expect(buttons[0]).toHaveAttribute('data-variant', 'outline');
    expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
  });

  it('handles mobile menu state correctly', () => {
    render(<NavMenu />);

    // Get the mobile menu button specifically
    const menuButton = screen.getByTestId('menu-icon').parentElement as HTMLElement;

    // Initially mobile menu is closed
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(menuButton);

    // Check if mobile menu content is visible
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Close mobile menu
    const closeButton = screen.getByTestId('x-icon').parentElement as HTMLElement;
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
  });
});
