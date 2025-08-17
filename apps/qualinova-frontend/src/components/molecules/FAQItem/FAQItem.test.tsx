'use client';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { FAQItem } from './FAQItem';

describe('FAQItem', () => {
    const defaultProps = {
        question: 'Test question?',
        answer: 'Test answer content',
    };

    it('renders question correctly', () => {
        render(<FAQItem {...defaultProps} />);
        expect(screen.getByText('Test question?')).toBeInTheDocument();
    });

    it('does not show answer when closed', () => {
        render(<FAQItem {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Test answer content')).not.toBeInTheDocument();
    });

    it('shows answer when open', () => {
        render(<FAQItem {...defaultProps} isOpen={true} />);
        expect(screen.getByText('Test answer content')).toBeInTheDocument();
    });

    it('calls onToggle when clicked', () => {
        const mockOnToggle = jest.fn();
        render(<FAQItem {...defaultProps} onToggle={mockOnToggle} />);

        fireEvent.click(screen.getByText('Test question?'));
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('shows correct chevron icon based on open state', () => {
        const { rerender } = render(<FAQItem {...defaultProps} isOpen={false} />);
        expect(document.querySelector('[data-icon="ChevronDown"]')).toBeInTheDocument();

        rerender(<FAQItem {...defaultProps} isOpen={true} />);
        expect(document.querySelector('[data-icon="ChevronUp"]')).toBeInTheDocument();
    });
});
