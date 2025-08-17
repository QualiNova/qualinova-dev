import { render, screen, fireEvent } from '@testing-library/react';
import Select from './select';

// Mock lucide-react
jest.mock('lucide-react', () => ({
    ChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
}));

// Mock cn utility
jest.mock('../../../lib/utils.ts', () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('Select', () => {
    it('renders without crashing', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders children options correctly', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </Select>,
        );
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('renders ChevronDown icon', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });

    it('displays error message when error prop is provided', () => {
        const errorMessage = 'This field is required';
        render(
            <Select error={errorMessage}>
                <option value="1">Option 1</option>
            </Select>,
        );
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
    });

    it('does not display error message when error prop is not provided', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(
            <Select className="custom-class">
                <option value="1">Option 1</option>
            </Select>,
        );
        const select = screen.getByRole('combobox');
        expect(select).toHaveClass('custom-class');
    });

    it('passes through HTML select attributes', () => {
        render(
            <Select name="test-select" defaultValue="2" disabled>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </Select>,
        );
        const select = screen.getByRole('combobox');
        expect(select).toHaveAttribute('name', 'test-select');
        expect(select).toHaveAttribute('disabled');
        expect(select).toHaveValue('2');
    });

    it('handles onChange events', () => {
        const mockOnChange = jest.fn();
        render(
            <Select onChange={mockOnChange}>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </Select>,
        );
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '2' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('has proper accessibility attributes', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        const select = screen.getByRole('combobox');
        expect(select).toHaveClass('flex', 'h-10', 'w-full', 'appearance-none', 'rounded-md');
    });

    it('renders with responsive design classes', () => {
        render(
            <Select>
                <option value="1">Option 1</option>
            </Select>,
        );
        const wrapper = screen.getByRole('combobox').parentElement;
        expect(wrapper).toHaveClass('w-full');
    });
});
