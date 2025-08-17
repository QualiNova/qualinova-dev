import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from './textarea';
import React from 'react';

// Mock cn utility
jest.mock('../../../lib/utils.ts', () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('Textarea', () => {
    it('renders without crashing', () => {
        render(<Textarea />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('accepts and displays placeholder text', () => {
        const placeholderText = 'Enter your message here';
        render(<Textarea placeholder={placeholderText} />);
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    it('displays error message when error prop is provided', () => {
        const errorMessage = 'This field is required';
        render(<Textarea error={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
    });

    it('does not display error message when error prop is not provided', () => {
        render(<Textarea />);
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Textarea className="custom-class" />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveClass('custom-class');
    });

    it('passes through HTML textarea attributes', () => {
        render(
            <Textarea
                name="test-textarea"
                rows={5}
                cols={30}
                defaultValue="Default text"
                disabled
            />,
        );
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('name', 'test-textarea');
        expect(textarea).toHaveAttribute('rows', '5');
        expect(textarea).toHaveAttribute('cols', '30');
        expect(textarea).toHaveAttribute('disabled');
        expect(textarea).toHaveValue('Default text');
    });

    it('handles onChange events', () => {
        const mockOnChange = jest.fn();
        render(<Textarea onChange={mockOnChange} />);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'New text' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('handles focus and blur events', () => {
        const mockOnFocus = jest.fn();
        const mockOnBlur = jest.fn();
        render(<Textarea onFocus={mockOnFocus} onBlur={mockOnBlur} />);
        const textarea = screen.getByRole('textbox');

        fireEvent.focus(textarea);
        expect(mockOnFocus).toHaveBeenCalled();

        fireEvent.blur(textarea);
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('applies default styling classes', () => {
        render(<Textarea />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveClass('flex', 'min-h-[80px]', 'w-full', 'rounded-md');
    });

    it('has proper accessibility attributes', () => {
        render(<Textarea aria-label="Message input" />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('aria-label', 'Message input');
    });

    it('supports controlled component pattern', () => {
        const TestComponent = () => {
            const [value, setValue] = React.useState('Initial value');
            return (
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    data-testid="controlled-textarea"
                />
            );
        };

        render(<TestComponent />);
        const textarea = screen.getByTestId('controlled-textarea');
        expect(textarea).toHaveValue('Initial value');

        fireEvent.change(textarea, { target: { value: 'Updated value' } });
        expect(textarea).toHaveValue('Updated value');
    });

    it('renders with responsive design classes', () => {
        render(<Textarea />);
        const wrapper = screen.getByRole('textbox').parentElement;
        expect(wrapper).toHaveClass('w-full');
    });

    it('handles maxLength attribute', () => {
        render(<Textarea maxLength={100} />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('maxLength', '100');
    });

    it('supports required attribute', () => {
        render(<Textarea required />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('required');
    });
});
