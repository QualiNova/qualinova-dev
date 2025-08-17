import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { SupportOptions } from './SupportOptions';

describe('SupportOptions', () => {
    const mockOptions = [
        {
            type: 'chat' as const,
            title: 'Live Chat',
            description: 'Talk to support',
            buttonText: 'Start Chat',
            onAction: jest.fn(),
        },
        {
            type: 'email' as const,
            title: 'Send Ticket',
            description: 'Create ticket',
            buttonText: 'Create Ticket',
            onAction: jest.fn(),
        },
    ];

    it('renders all support options', () => {
        render(<SupportOptions options={mockOptions} />);

        expect(screen.getByText('Live Chat')).toBeInTheDocument();
        expect(screen.getByText('Send Ticket')).toBeInTheDocument();
        expect(screen.getByText('Talk to support')).toBeInTheDocument();
        expect(screen.getByText('Create ticket')).toBeInTheDocument();
    });

    it('renders support card buttons', () => {
        render(<SupportOptions options={mockOptions} />);
        expect(screen.getByText('Start Chat')).toBeInTheDocument();
        expect(screen.getByText('Create Ticket')).toBeInTheDocument();
    });

    it('applies grid layout classes', () => {
        const { container } = render(<SupportOptions options={mockOptions} />);
        expect(container.firstChild).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3');
    });

    it('applies custom className', () => {
        const { container } = render(
            <SupportOptions options={mockOptions} className="custom-class" />,
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
