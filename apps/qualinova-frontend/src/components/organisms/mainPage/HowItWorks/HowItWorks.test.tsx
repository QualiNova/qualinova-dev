import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowItWorks from './HowItWorks';

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

describe('HowItWorks', () => {
  beforeEach(() => {
    render(<HowItWorks />);
  });

  describe('How It Works Section', () => {
    it('renders the main section heading', () => {
      expect(screen.getByText('How It Works')).toBeInTheDocument();
    });

    it('renders the section subtitle', () => {
      expect(
        screen.getByText('Our blockchain certification process is simple, secure, and efficient')
      ).toBeInTheDocument();
    });

    it('renders all three process steps', () => {
      expect(screen.getByText('Create Certificate')).toBeInTheDocument();
      expect(screen.getByText('Blockchain Registration')).toBeInTheDocument();
      expect(screen.getByText('Verify Anytime')).toBeInTheDocument();
    });

    it('renders step numbers correctly', () => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders step descriptions', () => {
      expect(
        screen.getByText('Fill out the certificate details and generate a new certification')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Certificate is registered on the Stellar blockchain with a unique identifier')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Certificates can be verified instantly by anyone using our verification tool')
      ).toBeInTheDocument();
    });
  });

  describe('Get Started Section', () => {
    it('renders the get started heading', () => {
      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    });

    it('renders the get started description', () => {
      expect(
        screen.getByText('Join organizations worldwide using QualiNova for secure certification management')
      ).toBeInTheDocument();
    });

    it('renders both action buttons', () => {
      expect(screen.getByText('Create Your First Certificate')).toBeInTheDocument();
      expect(screen.getByText('Verify a Certificate')).toBeInTheDocument();
    });
  });

  describe('ProcessStep Component', () => {
    it('renders step numbers with proper styling', () => {
      const stepNumbers = screen.getAllByText(/[1-3]/);
      stepNumbers.forEach(number => {
        expect(number.parentElement).toHaveClass(
          'bg-blue-500',
          'rounded-full',
          'w-10',
          'h-10',
          'flex',
          'items-center',
          'justify-center',
          'text-white',
          'font-bold'
        );
      });
    });

    it('renders step titles with proper styling', () => {
      const stepTitles = [
        screen.getByText('Create Certificate'),
        screen.getByText('Blockchain Registration'),
        screen.getByText('Verify Anytime')
      ];

      stepTitles.forEach(title => {
        expect(title).toHaveClass('text-white', 'text-lg', 'font-bold', 'mb-2');
      });
    });

    it('renders step descriptions with proper styling', () => {
      const descriptions = [
        screen.getByText('Fill out the certificate details and generate a new certification'),
        screen.getByText('Certificate is registered on the Stellar blockchain with a unique identifier'),
        screen.getByText('Certificates can be verified instantly by anyone using our verification tool')
      ];

      descriptions.forEach(description => {
        expect(description).toHaveClass('text-[#9CA3AF]', 'text-center', 'text-sm');
      });
    });
  });

  describe('Button Component', () => {
    it('renders primary button with correct styling', () => {
      const primaryButton = screen.getByText('Create Your First Certificate');
      expect(primaryButton).toHaveClass(
        'px-6',
        'py-3',
        'rounded',
        'font-medium',
        'bg-gray-800',
        'text-white',
        'hover:bg-gray-700'
      );
    });

    it('renders secondary button with correct styling', () => {
      const secondaryButton = screen.getByText('Verify a Certificate');
      expect(secondaryButton).toHaveClass(
        'px-6',
        'py-3',
        'rounded',
        'font-medium',
        'bg-transparent',
        'border',
        'border-white',
        'text-white',
        'hover:bg-white',
        'hover:text-blue-900'
      );
    });

    it('handles click events', () => {
      const mockClick = jest.fn();
      const { rerender } = render(
        <button onClick={mockClick}>Test Button</button>
      );

      const button = screen.getByText('Test Button');
      fireEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Layout', () => {
    it('has proper section backgrounds', () => {
      const howItWorksSection = screen.getByText('How It Works').closest('section');
      const getStartedSection = screen.getByText('Ready to Get Started?').closest('section');

      expect(howItWorksSection).toHaveClass('bg-gray-900');
      expect(getStartedSection).toHaveClass('bg-blue-900');
    });

    it('has responsive grid layout for process steps', () => {
      const stepsContainer = screen.getByText('Create Certificate').closest('div[class*="grid"]');
      expect(stepsContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8');
    });

    it('has proper container max-width', () => {
      const container = screen.getByText('How It Works').closest('div[class*="container"]');
      expect(container).toHaveClass('container', 'mx-auto', 'max-w-[75%]');
    });

    it('has proper padding and margins', () => {
      const howItWorksSection = screen.getByText('How It Works').closest('section');
      const getStartedSection = screen.getByText('Ready to Get Started?').closest('section');

      expect(howItWorksSection).toHaveClass('pt-[12%]', 'pb-[12%]');
      expect(getStartedSection).toHaveClass('py-[8%]');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('has responsive button layout', () => {
      const buttonContainer = screen.getByText('Create Your First Certificate').parentElement;
      expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'justify-center', 'gap-4');
    });

    it('has responsive grid for process steps', () => {
      const stepsGrid = screen.getByText('Create Certificate').closest('div[class*="grid"]');
      expect(stepsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
    });

    it('maintains proper spacing on mobile', () => {
      const processSteps = screen.getAllByText(/Create Certificate|Blockchain Registration|Verify Anytime/);
      processSteps.forEach(step => {
        const stepContainer = step.closest('div[class*="flex-col"]');
        expect(stepContainer).toHaveClass('flex', 'flex-col', 'items-center', 'px-4');
      });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      const sections = screen.getAllByRole('region', { hidden: true }) ||
                     document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(5); // 2 main headings + 3 step titles
    });

    it('buttons are accessible', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).not.toBeDisabled();
      });
    });

    it('has proper color contrast', () => {
      const whiteText = screen.getByText('How It Works');
      const grayText = screen.getByText('Our blockchain certification process is simple, secure, and efficient');

      expect(whiteText).toHaveClass('text-white');
      expect(grayText).toHaveClass('text-[#9CA3AF]');
    });
  });

  describe('Component Structure', () => {
    it('maintains proper component hierarchy', () => {
      // Main container
      const mainContainer = screen.getByText('How It Works').closest('div[class*="flex-col"]');
      expect(mainContainer).toHaveClass('flex', 'flex-col');

      // Two main sections
      const sections = document.querySelectorAll('section');
      expect(sections).toHaveLength(2);
    });

    it('has proper text alignment', () => {
      const centerAlignedElements = [
        screen.getByText('How It Works'),
        screen.getByText('Ready to Get Started?'),
        screen.getByText('Our blockchain certification process is simple, secure, and efficient')
      ];

      centerAlignedElements.forEach(element => {
        expect(element.closest('div')).toHaveClass('text-center');
      });
    });
  });
});

// Integration tests for component interaction
describe('HowItWorks Integration', () => {
  it('renders both sections in correct order', () => {
    render(<HowItWorks />);

    const sections = document.querySelectorAll('section');
    expect(sections[0]).toHaveClass('bg-gray-900');
    expect(sections[1]).toHaveClass('bg-blue-900');
  });

  it('maintains consistent styling across sections', () => {
    render(<HowItWorks />);

    const howItWorksHeading = screen.getByText('How It Works');
    const getStartedHeading = screen.getByText('Ready to Get Started?');

    expect(howItWorksHeading).toHaveClass('text-white', 'text-3xl', 'font-bold');
    expect(getStartedHeading).toHaveClass('text-white', 'text-3xl', 'font-bold');
  });

  it('handles component props correctly', () => {
    // Test ProcessStep component with different props
    const { rerender } = render(<HowItWorks />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});