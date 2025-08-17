import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SupportCard } from './SupportCard';

describe('SupportCard', () => {
    const defaultProps = {
        type: 'chat' as const,
        title: 'Test Support',
        description: 'Test description',
        buttonText: 'Test Action',
    };

    it('renders all content correctly', () => {
        render(<SupportCard {...defaultProps} />);

        expect(screen.getByText('Test Support')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Test Action')).toBeInTheDocument();
    });

    it('calls onAction when button is clicked', () => {
        const mockOnAction = jest.fn();
        render(<SupportCard {...defaultProps} onAction={mockOnAction} />);

        fireEvent.click(screen.getByText('Test Action'));
        expect(mockOnAction).toHaveBeenCalledTimes(1);
    });

    it('renders correct icon for each type', () => {
        const { rerender } = render(<SupportCard {...defaultProps} type="chat" />);
        expect(document.querySelector('[data-icon="MessageCircle"]')).toBeInTheDocument();

        rerender(<SupportCard {...defaultProps} type="email" />);
        expect(document.querySelector('[data-icon="Mail"]')).toBeInTheDocument();

        rerender(<SupportCard {...defaultProps} type="phone" />);
        expect(document.querySelector('[data-icon="Phone"]')).toBeInTheDocument();
    });
});
