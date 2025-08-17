import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer';

// Mock Next.js font
jest.mock('next/font/google', () => ({
    Inter: jest.fn(() => ({
        className: 'inter-font',
    })),
}));

// Mock lucide-react Shield icon
jest.mock('lucide-react', () => ({
    Shield: jest.fn(({ className, ...props }) => (
        <svg data-testid="shield-icon" className={className} {...props}>
            <path d="mock-shield-path" />
        </svg>
    )),
}));

// Mock Next.js router if needed
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '/',
            query: '',
            asPath: '',
        };
    },
}));

describe('Footer', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    describe('Content Rendering', () => {
        it('renders the QualiNova brand name', () => {
            expect(screen.getByText('QualiNova')).toBeInTheDocument();
        });

        it('renders the Shield icon with correct styling', () => {
            const shieldIcon = screen.getByTestId('shield-icon');
            expect(shieldIcon).toBeInTheDocument();
            expect(shieldIcon).toHaveClass('text-[#2563EB]');
        });

        it('renders all navigation links', () => {
            expect(screen.getByText('Terms')).toBeInTheDocument();
            expect(screen.getByText('Privacy')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('renders the copyright text', () => {
            expect(screen.getByText('© 2025 QualiNova. All rights reserved.')).toBeInTheDocument();
        });

        it('renders navigation links as anchor elements', () => {
            const termsLink = screen.getByText('Terms');
            const privacyLink = screen.getByText('Privacy');
            const contactLink = screen.getByText('Contact');

            expect(termsLink.tagName).toBe('A');
            expect(privacyLink.tagName).toBe('A');
            expect(contactLink.tagName).toBe('A');
        });
    });

    describe('Styling and Layout', () => {
        it('applies correct footer styling', () => {
            const footer = screen.getByRole('contentinfo');
            expect(footer).toHaveClass('inter-font', 'bg-[#030712]', 'text-gray-400', 'py-4');
        });

        it('has proper container styling', () => {
            const container = screen.getByTestId('footer-container');
            expect(container).toHaveClass(
                'container',
                'mx-auto',
                'flex',
                'flex-col',
                'md:flex-row',
                'justify-around',
                'items-center',
                'px-4',
            );
        });

        it('applies correct brand section styling', () => {
            const brandSection = screen.getByText('QualiNova').parentElement;
            expect(brandSection).toHaveClass('flex', 'space-x-2');
        });

        it('applies correct brand name styling', () => {
            const brandName = screen.getByText('QualiNova');
            expect(brandName).toHaveClass('text-[#FAFAFA]', 'font-semibold', 'text-xl');
        });

        it('applies correct navigation styling', () => {
            const nav = screen.getByRole('navigation');
            expect(nav).toHaveClass('flex', 'space-x-6', 'text-sm', 'text-[#9CA3AF]');
        });

        it('applies correct link hover styling', () => {
            const termsLink = screen.getByText('Terms');
            expect(termsLink).toHaveClass('hover:text-white');
        });

        it('applies correct copyright styling', () => {
            const copyright = screen.getByText('© 2025 QualiNova. All rights reserved.');
            expect(copyright).toHaveClass('text-sm', 'text-[#9CA3AF]');
        });
    });

    describe('Navigation Links', () => {
        it('all navigation links have href attributes', () => {
            const links = screen.getAllByRole('link');
            links.forEach((link) => {
                expect(link).toHaveAttribute('href');
            });
        });

        it('navigation links have placeholder href values', () => {
            const termsLink = screen.getByText('Terms');
            const privacyLink = screen.getByText('Privacy');
            const contactLink = screen.getByText('Contact');

            expect(termsLink).toHaveAttribute('href', '#');
            expect(privacyLink).toHaveAttribute('href', '#');
            expect(contactLink).toHaveAttribute('href', '#');
        });

        it('navigation links are clickable', () => {
            const termsLink = screen.getByText('Terms');
            expect(termsLink).toBeVisible();
            expect(termsLink).not.toHaveAttribute('disabled');
        });

        it('handles link clicks without errors', () => {
            const termsLink = screen.getByText('Terms');
            expect(() => fireEvent.click(termsLink)).not.toThrow();
        });
    });

    describe('Brand Section', () => {
        it('renders brand logo and name together', () => {
            const brandSection = screen.getByText('QualiNova').parentElement;
            const shieldIcon = screen.getByTestId('shield-icon');
            const brandName = screen.getByText('QualiNova');

            expect(brandSection).toContainElement(shieldIcon);
            expect(brandSection).toContainElement(brandName);
        });

        it('maintains proper spacing between icon and text', () => {
            const brandSection = screen.getByText('QualiNova').parentElement;
            expect(brandSection).toHaveClass('space-x-2');
        });

        it('shield icon has correct color', () => {
            const shieldIcon = screen.getByTestId('shield-icon');
            expect(shieldIcon).toHaveClass('text-[#2563EB]');
        });
    });

    describe('Typography', () => {
        it('applies Inter font family', () => {
            const footer = screen.getByRole('contentinfo');
            expect(footer).toHaveClass('inter-font');
        });

        it('uses appropriate font sizes', () => {
            const brandName = screen.getByText('QualiNova');
            const navLinks = screen.getAllByRole('link');
            const copyright = screen.getByText('© 2025 QualiNova. All rights reserved.');

            expect(brandName).toHaveClass('text-xl');
            navLinks.forEach((link) => {
                expect(link).toHaveClass('hover:text-white');
            });
            expect(copyright).toHaveClass('text-sm');
        });

        it('applies correct font weights', () => {
            const brandName = screen.getByText('QualiNova');
            expect(brandName).toHaveClass('font-semibold');
        });
    });

    describe('Layout Structure', () => {
        it('maintains proper component hierarchy', () => {
            const footer = screen.getByRole('contentinfo');
            const container = footer.firstChild;

            expect(container).toHaveClass('container');
            expect((container as Element)?.children).toHaveLength(3);
        });

        it('has three main sections', () => {
            const brandSection = screen.getByText('QualiNova').parentElement;
            const navigation = screen.getByRole('navigation');
            const copyright = screen.getByText('© 2025 QualiNova. All rights reserved.');

            expect(brandSection).toBeInTheDocument();
            expect(navigation).toBeInTheDocument();
            expect(copyright).toBeInTheDocument();
        });

        it('sections are arranged in correct order', () => {
            const container = screen.getByRole('contentinfo').firstChild;
            const children = Array.from((container as Element)?.children || []);

            // Brand section should be first
            expect(children[0]).toContainElement(screen.getByText('QualiNova'));
            // Navigation should be second
            expect(children[1]).toBe(screen.getByRole('navigation'));
            // Copyright should be third
            expect(children[2]).toContainElement(
                screen.getByText('© 2025 QualiNova. All rights reserved.'),
            );
        });
    });
});

// Integration and Component Interaction Tests
describe('Footer Integration', () => {
    it('renders without crashing', () => {
        expect(() => render(<Footer />)).not.toThrow();
    });

    it('maintains consistent styling across re-renders', () => {
        const { rerender } = render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        const initialClasses = footer.className;

        rerender(<Footer />);
        expect(footer.className).toBe(initialClasses);
    });

    it('preserves component state and structure', () => {
        render(<Footer />);

        expect(screen.getByText('QualiNova')).toBeInTheDocument();
        expect(screen.getByTestId('shield-icon')).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(3);
        expect(screen.getByText('© 2025 QualiNova. All rights reserved.')).toBeInTheDocument();
    });
});

// Mock Validation Tests
describe('Footer Dependencies', () => {
    it('uses mocked Inter font correctly', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('inter-font');
    });

    it('uses mocked Shield icon correctly', () => {
        render(<Footer />);
        const shieldIcon = screen.getByTestId('shield-icon');
        expect(shieldIcon).toBeInTheDocument();
        expect(shieldIcon.tagName).toBe('svg');
    });
});
