import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import NavLink from './navLink';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('next/link', () => {
    return function MockLink({ children, href, className }: any) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    };
});

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('NavLink', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        mockUsePathname.mockReturnValue('/home');
        render(<NavLink href="/home">Home</NavLink>);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        mockUsePathname.mockReturnValue('/about');
        render(<NavLink href="/home">Test Link</NavLink>);
        expect(screen.getByText('Test Link')).toBeInTheDocument();
    });

    it('applies active styles when pathname matches href', () => {
        mockUsePathname.mockReturnValue('/home');
        render(<NavLink href="/home">Home</NavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('text-white');
        expect(link).not.toHaveClass('text-[#FAFAFA99]');
    });

    it('applies inactive styles when pathname does not match href', () => {
        mockUsePathname.mockReturnValue('/about');
        render(<NavLink href="/home">Home</NavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('text-[#FAFAFA99]');
        expect(link).not.toHaveClass('text-white');
    });

    it('passes href prop to Link component', () => {
        mockUsePathname.mockReturnValue('/home');
        render(<NavLink href="/test">Test</NavLink>);
        const link = screen.getByText('Test');
        expect(link).toHaveAttribute('href', '/test');
    });

    it('always applies px-2 class', () => {
        mockUsePathname.mockReturnValue('/home');
        render(<NavLink href="/test">Test</NavLink>);
        const link = screen.getByText('Test');
        expect(link).toHaveClass('px-2');
    });

    it('works with complex children nodes', () => {
        mockUsePathname.mockReturnValue('/home');
        render(
            <NavLink href="/home">
                <span>Complex</span> Link
            </NavLink>,
        );
        expect(screen.getByText('Complex')).toBeInTheDocument();
        expect(screen.getByText('Link')).toBeInTheDocument();
    });
});
