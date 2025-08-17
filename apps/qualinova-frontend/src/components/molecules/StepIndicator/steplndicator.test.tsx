import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepIndicator from './stepIndicator';

describe('StepIndicator', () => {
    it('renders with correct step information', () => {
        render(<StepIndicator currentStep={2} totalSteps={5} />);

        expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    });

    it('renders with single step', () => {
        render(<StepIndicator currentStep={1} totalSteps={1} />);

        expect(screen.getByText('Step 1 of 1')).toBeInTheDocument();
    });

    it('renders with large step numbers', () => {
        render(<StepIndicator currentStep={15} totalSteps={100} />);

        expect(screen.getByText('Step 15 of 100')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<StepIndicator currentStep={1} totalSteps={3} />);
        const stepElement = container.firstChild as HTMLElement;

        expect(stepElement).toHaveClass('text-xs', 'lg:text-sm', 'text-gray-text-400');
    });

    it('is accessible and has proper text content', () => {
        render(<StepIndicator currentStep={3} totalSteps={7} />);

        const stepText = screen.getByText('Step 3 of 7');
        expect(stepText).toBeInTheDocument();
        expect(stepText.tagName).toBe('DIV');
    });
});
