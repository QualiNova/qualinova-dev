import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection';

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

describe('HeroSection', () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  describe('Content Rendering', () => {
    it('renders the blockchain-powered certification badge', () => {
      expect(screen.getByText('Blockchain-Powered Certification')).toBeInTheDocument();
    });

    it('renders the main heading', () => {
      expect(
        screen.getByText('Secure, Verifiable Certifications on the Blockchain')
      ).toBeInTheDocument();
    });

    it('renders the description text', () => {
      expect(
        screen.getByText(/QualiNova provides tamper-proof certification management/i)
      ).toBeInTheDocument();
    });

    it('renders both CTA buttons', () => {
      expect(screen.getByText('Try for Free')).toBeInTheDocument();
      expect(screen.getByText('See How it Works')).toBeInTheDocument();
    });

    it('renders the certificate placeholder with SVG icon', () => {
      const svgElement = screen.getByRole('img', { hidden: true });
      expect(svgElement).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('has proper background styling', () => {
      const mainContainer = screen.getByRole('main');
      expect(mainContainer.parentElement).toHaveClass('bg-gray-900', 'text-white', 'font-sans');
    });

    it('applies responsive container classes', () => {
      const mainContainer = screen.getByRole('main');
      expect(mainContainer).toHaveClass('container', 'mx-auto', 'max-w-[75%]', 'pt-[8%]');
    });

    it('has responsive flex layout', () => {
      const contentWrapper = screen.getByRole('main').firstChild;
      expect(contentWrapper).toHaveClass(
        'flex',
        'flex-col',
        'md:flex-row',
        'items-center',
        'justify-between'
      );
    });

    it('applies proper button styling for primary CTA', () => {
      const primaryButton = screen.getByText('Try for Free');
      expect(primaryButton).toHaveClass(
        'bg-blue-600',
        'hover:bg-blue-700',
        'text-white',
        'py-2',
        'px-6',
        'rounded-md'
      );
    });

    it('applies proper button styling for secondary CTA', () => {
      const secondaryButton = screen.getByText('See How it Works');
      expect(secondaryButton).toHaveClass(
        'border',
        'border-gray-600',
        'hover:border-gray-400',
        'text-white',
        'py-2',
        'px-6',
        'rounded-md'
      );
    });
  });

  describe('Mobile Responsiveness', () => {
    it('has responsive text sizing for main heading', () => {
      const heading = screen.getByText('Secure, Verifiable Certifications on the Blockchain');
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl');
    });

    it('has responsive image container sizing', () => {
      const imageContainer = screen.getByRole('img', { hidden: true }).closest('div');
      expect(imageContainer).toHaveClass('md:h-[600px]', 'h-[400px]');
    });

    it('has responsive button layout', () => {
      const buttonContainer = screen.getByText('Try for Free').parentElement;
      expect(buttonContainer).toHaveClass('flex', 'flex-wrap', 'gap-4');
    });

    it('has responsive spacing and padding', () => {
      const leftSection = screen.getByText('Try for Free').closest('div[class*="w-full md:w-1/2"]');
      expect(leftSection).toHaveClass('w-full', 'md:w-1/2');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Secure, Verifiable Certifications on the Blockchain');
    });

    it('buttons are accessible', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });
  });

  describe('Component Structure', () => {
    it('maintains proper component composition', () => {
      // Check that main sections are present
      const leftContent = screen.getByText('Try for Free').closest('div[class*="space-y-6"]');
      const rightContent = screen.getByRole('img', { hidden: true }).closest('div[class*="w-full md:w-1/2"]');

      expect(leftContent).toBeInTheDocument();
      expect(rightContent).toBeInTheDocument();
    });

    it('has proper spacing classes applied', () => {
      const leftSection = screen.getByText('Try for Free').closest('div[class*="space-y-6"]');
      expect(leftSection).toHaveClass('space-y-6');
    });
  });
});

// Responsive testing helpers
describe('HeroSection Responsive Behavior', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('adapts layout for mobile screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<HeroSection />);

    // Mobile-specific assertions
    const heading = screen.getByText('Secure, Verifiable Certifications on the Blockchain');
    expect(heading).toHaveClass('text-3xl');
  });

  it('adapts layout for tablet screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<HeroSection />);

    // Tablet-specific assertions
    const heading = screen.getByText('Secure, Verifiable Certifications on the Blockchain');
    expect(heading).toHaveClass('md:text-4xl');
  });

  it('adapts layout for desktop screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<HeroSection />);

    // Desktop-specific assertions
    const heading = screen.getByText('Secure, Verifiable Certifications on the Blockchain');
    expect(heading).toHaveClass('lg:text-5xl');
  });
});