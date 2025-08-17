'use client';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
    it('renders with default placeholder', () => {
        render(<SearchInput placeholder="Buscar en la ayuda..." />);
        expect(screen.getByPlaceholderText('Buscar en la ayuda...')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
        render(<SearchInput placeholder="Custom placeholder" />);
        expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const mockOnChange = jest.fn();
        render(<SearchInput onChange={mockOnChange} placeholder="Buscar en la ayuda..." />);

        const input = screen.getByPlaceholderText('Buscar en la ayuda...');
        fireEvent.change(input, { target: { value: 'test search' } });

        expect(mockOnChange).toHaveBeenCalledWith('test search');
    });

    it('displays the correct value', () => {
        render(<SearchInput value="test value" />);
        expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    it('has search icon', () => {
        render(<SearchInput />);
        expect(document.querySelector('[data-icon="Search"]')).toBeInTheDocument();
    });
});
