import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from './formField';

describe('FormField', () => {
    it('renders with label and children', () => {
        const mockInput = <input type="text" id="test-input" />;

        render(
            <FormField label="Test Label" htmlFor="test-input">
                {mockInput}
            </FormField>,
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('associates label with form element using htmlFor', () => {
        const mockInput = <input type="text" id="username" />;

        render(
            <FormField label="Username" htmlFor="username">
                {mockInput}
            </FormField>,
        );

        const label = screen.getByText('Username');
        expect(label).toHaveAttribute('for', 'username');
    });

    it('renders with different types of form elements', () => {
        const mockTextarea = <textarea id="description" />;

        render(
            <FormField label="Description" htmlFor="description">
                {mockTextarea}
            </FormField>,
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with select element', () => {
        const mockSelect = (
            <select id="category">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </select>
        );

        render(
            <FormField label="Category" htmlFor="category">
                {mockSelect}
            </FormField>,
        );

        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with multiple children elements', () => {
        const mockChildren = (
            <>
                <input type="text" id="multi-input" />
                <span>Helper text</span>
            </>
        );

        render(
            <FormField label="Multi Field" htmlFor="multi-input">
                {mockChildren}
            </FormField>,
        );

        expect(screen.getByText('Multi Field')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('has correct CSS classes for structure', () => {
        const mockInput = <input type="text" id="styled-input" />;
        const { container } = render(
            <FormField label="Styled Field" htmlFor="styled-input">
                {mockInput}
            </FormField>,
        );

        const formFieldContainer = container.firstChild as HTMLElement;
        expect(formFieldContainer).toHaveClass('space-y-2');

        const label = screen.getByText('Styled Field');
        expect(label).toHaveClass('block', 'text-sm', 'font-medium');
    });

    it('renders with complex form elements like checkbox groups', () => {
        const mockCheckboxGroup = (
            <div>
                <input type="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1">Option 1</label>
                <input type="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2">Option 2</label>
            </div>
        );

        render(
            <FormField label="Preferences" htmlFor="preferences">
                {mockCheckboxGroup}
            </FormField>,
        );

        expect(screen.getByText('Preferences')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('maintains accessibility with proper label association', () => {
        const mockInput = <input type="email" id="email-field" />;

        render(
            <FormField label="Email Address" htmlFor="email-field">
                {mockInput}
            </FormField>,
        );

        const label = screen.getByText('Email Address');
        const input = screen.getByRole('textbox');

        expect(label.tagName).toBe('LABEL');
        expect(label).toHaveAttribute('for', 'email-field');
        expect(input).toHaveAttribute('id', 'email-field');
    });

    it('handles special characters in labels', () => {
        const mockInput = <input type="text" id="special-chars" />;

        render(
            <FormField label="Field with Special Chars: @#$%" htmlFor="special-chars">
                {mockInput}
            </FormField>,
        );

        expect(screen.getByText('Field with Special Chars: @#$%')).toBeInTheDocument();
    });
});
