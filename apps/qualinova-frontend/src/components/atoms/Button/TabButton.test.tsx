'use client';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { TabButton } from './TabButton';

describe('TabButton', () => {
    it('renders children correctly', () => {
        render(<TabButton>Test Tab</TabButton>);
        expect(screen.getByText('Test Tab')).toBeInTheDocument();
    });

    it('applies active styles when isActive is true', () => {
        render(<TabButton isActive={true}>Active Tab</TabButton>);
        const button = screen.getByText('Active Tab');
        expect(button).toHaveClass('bg-[#020817]', 'text-white');
    });

    it('applies inactive styles when isActive is false', () => {
        render(<TabButton isActive={false}>Inactive Tab</TabButton>);
        const button = screen.getByText('Inactive Tab');
        expect(button).toHaveClass('text-gray-400');
    });

    it('calls onClick when clicked', () => {
        const mockOnClick = jest.fn();
        render(<TabButton onClick={mockOnClick}>Clickable Tab</TabButton>);

        fireEvent.click(screen.getByText('Clickable Tab'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        render(<TabButton className="custom-class">Custom Tab</TabButton>);
        expect(screen.getByText('Custom Tab')).toHaveClass('custom-class');
    });

    it('applies blue theme styles when theme is blue', () => {
        render(
            <TabButton isActive={true} theme="blue">
                Blue Active Tab
            </TabButton>,
        );
        const button = screen.getByText('Blue Active Tab');
        expect(button).toHaveClass('bg-[#2563EB]', 'text-[#0F172A]');
    });
});
