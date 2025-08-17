import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/organisms/Header/header';

// Mock NavMenu component
jest.mock('../../molecules/NavMenu/navMenu.tsx', () => {
    return function MockNavMenu() {
        return <div data-testid="nav-menu">Navigation Menu</div>;
    };
});

describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<Header />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('displays the logo with correct attributes', () => {
        render(<Header />);
        const logo = screen.getByTestId('header-logo');

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logo.svg');
        expect(logo).toHaveAttribute('alt', 'logo');
        expect(logo).toHaveClass('!relative');
    });

    it('renders the NavMenu component', () => {
        render(<Header />);
        expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
    });

    it('has correct navigation styling classes', () => {
        render(<Header />);
        const nav = screen.getByRole('navigation');

        expect(nav).toHaveClass(
            'bg-[#030817]',
            'text-[#FAFAFA99]',
            'flex',
            'justify-center',
            'border-b-2',
            'border-[#1c2537]',
            'transition-colors',
        );
    });

    it('has responsive layout structure', () => {
        render(<Header />);
        const nav = screen.getByRole('navigation');
        const container = nav.firstChild;
        const flexContainer = container?.firstChild;

        expect(container).toHaveClass('flex', 'flex-col', 'w-full', 'max-w-[75%]', 'py-4');
        expect(flexContainer).toHaveClass(
            'flex',
            'flex-col',
            'md:flex-row',
            'items-center',
            'w-full',
        );
    });

    it('logo container has correct dimensions', () => {
        render(<Header />);
        const logoContainer = screen.getByTestId('header-logo').parentElement;

        expect(logoContainer).toHaveClass('h-10', 'w-36');
    });

    it('has correct container max-width constraint', () => {
        render(<Header />);
        const nav = screen.getByRole('navigation');
        const mainContainer = nav.firstChild;

        expect(mainContainer).toHaveClass('max-w-[75%]');
    });

    it('has proper vertical padding', () => {
        render(<Header />);
        const nav = screen.getByRole('navigation');
        const container = nav.firstChild;

        expect(container).toHaveClass('py-4');
    });
});
