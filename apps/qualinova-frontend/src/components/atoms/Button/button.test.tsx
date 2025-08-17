import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Button from './button';

import Image from 'next/image';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Button', () => {
    it('renders without crashing', () => {
        mockUsePathname.mockReturnValue('/certificate');
        render(
            <Button variant="secondary">
                <Image src="/newCert.svg" alt="+" width={20} height={20} />
                <span>New Certificate</span>
            </Button>,
        );
        expect(screen.getByText('New Certificate')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        mockUsePathname.mockReturnValue('/');
        render(<Button>Sign In</Button>);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('renders with primary variant by default', () => {
        render(<Button>Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-gray-text-50');
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-secondary-button-bg');
    });

    it('renders with outline variant', () => {
        render(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole('button')).toHaveClass('border');
        expect(screen.getByRole('button')).toHaveClass('text-white');
    });

    it('renders with plain variant', () => {
        render(<Button variant="plain">Plain</Button>);
        expect(screen.getByRole('button')).toHaveClass('!p-0');
    });

    it('applies fullWidth class', () => {
        render(<Button fullWidth>Full Width</Button>);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('shows loading spinner when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument();
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    it('disables button when disabled is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('opacity-50');
        expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
    });

    it('disables button when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('opacity-50');
        expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });
});
