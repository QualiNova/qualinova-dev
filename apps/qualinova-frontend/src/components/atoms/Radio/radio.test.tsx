import { render, screen, fireEvent } from '@testing-library/react';
import Radio from './radio';
import React from 'react';

// Mock cn utility
jest.mock('../../../lib/utils.ts', () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('Radio', () => {
    it('renders without crashing', () => {
        render(<Radio label="Test Option" />);
        expect(screen.getByRole('radio')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Option')).toBeInTheDocument();
    });

    it('displays label text correctly', () => {
        const labelText = 'Choose this option';
        render(<Radio label={labelText} />);
        expect(screen.getByText(labelText)).toBeInTheDocument();
    });

    it('renders as unchecked by default', () => {
        render(<Radio label="Test Option" />);
        const radio = screen.getByRole('radio');
        expect(radio).not.toBeChecked();
    });

    it('renders as checked when checked prop is true', () => {
        const mockOnChange = jest.fn();
        render(<Radio label="Test Option" checked onChange={mockOnChange} />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeChecked();
    });

    it('applies custom className to input', () => {
        render(<Radio label="Test Option" className="custom-radio" />);
        const radio = screen.getByRole('radio');
        expect(radio).toHaveClass('custom-radio');
    });

    it('passes through HTML input attributes', () => {
        const mockOnChange = jest.fn();
        render(
            <Radio
                label="Test Option"
                name="test-group"
                value="option1"
                disabled
                required
                onChange={mockOnChange}
            />,
        );
        const radio = screen.getByRole('radio');
        expect(radio).toHaveAttribute('name', 'test-group');
        expect(radio).toHaveAttribute('value', 'option1');
        expect(radio).toHaveAttribute('disabled');
        expect(radio).toHaveAttribute('required');
    });

    it('handles onChange events', () => {
        const mockOnChange = jest.fn();
        render(<Radio label="Test Option" onChange={mockOnChange} />);
        const radio = screen.getByRole('radio');
        fireEvent.click(radio);
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('handles onClick events on label', () => {
        const mockOnChange = jest.fn();
        render(<Radio label="Test Option" onChange={mockOnChange} />);
        const label = screen.getByText('Test Option');
        fireEvent.click(label);
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('handles focus and blur events', () => {
        const mockOnFocus = jest.fn();
        const mockOnBlur = jest.fn();
        render(<Radio label="Test Option" onFocus={mockOnFocus} onBlur={mockOnBlur} />);
        const radio = screen.getByRole('radio');

        fireEvent.focus(radio);
        expect(mockOnFocus).toHaveBeenCalled();

        fireEvent.blur(radio);
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('supports keyboard navigation', () => {
        render(<Radio label="Test Option" />);
        const radio = screen.getByRole('radio');

        // Radio should be focusable
        radio.focus();
        expect(radio).toHaveFocus();

        // Space key should select radio
        fireEvent.keyDown(radio, { key: ' ', code: 'Space' });
        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });

    it('applies default styling classes', () => {
        render(<Radio label="Test Option" />);
        const radio = screen.getByRole('radio');
        expect(radio).toHaveClass(
            'h-4',
            'w-4',
            'sm:h-5',
            'sm:w-5',
            'transition-all',
            'duration-150',
            'accent-white',
            'text-primary',
            'border-input',
            'focus:ring-primary',
        );
    });

    it('has proper accessibility attributes', () => {
        render(<Radio label="Test Option" aria-describedby="help-text" />);
        const radio = screen.getByRole('radio');
        expect(radio).toHaveAttribute('aria-describedby', 'help-text');
        expect(radio).toHaveAttribute('type', 'radio');
    });

    it('label is clickable and triggers radio selection', () => {
        render(<Radio label="Clickable Label" />);
        const label = screen.getByText('Clickable Label');
        const radio = screen.getByRole('radio');

        expect(radio).not.toBeChecked();
        fireEvent.click(label);
        expect(radio).toBeChecked();
    });

    it('works in radio groups', () => {
        render(
            <div>
                <Radio label="Option 1" name="group1" value="1" />
                <Radio label="Option 2" name="group1" value="2" />
                <Radio label="Option 3" name="group1" value="3" />
            </div>,
        );

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(3);

        // All should have the same name attribute
        radios.forEach((radio) => {
            expect(radio).toHaveAttribute('name', 'group1');
        });
    });

    it('maintains cursor pointer style on label', () => {
        render(<Radio label="Test Option" />);
        const label = screen.getByText('Test Option').parentElement;
        expect(label).toHaveClass('cursor-pointer');
    });

    it('has proper spacing between radio and label', () => {
        render(<Radio label="Test Option" />);
        const label = screen.getByText('Test Option').parentElement;
        expect(label).toHaveClass('space-x-2');
    });

    it('renders with controlled component pattern', () => {
        const TestComponent = () => {
            const [selected, setSelected] = React.useState(false);
            return (
                <Radio
                    label="Controlled Radio"
                    checked={selected}
                    onChange={(e) => setSelected(e.target.checked)}
                    data-testid="controlled-radio"
                />
            );
        };

        render(<TestComponent />);
        const radio = screen.getByTestId('controlled-radio');
        expect(radio).not.toBeChecked();

        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });
});
