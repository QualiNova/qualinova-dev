import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { HelpHeader } from './HelpHeader';

describe('HelpHeader', () => {
    const defaultProps = {
        title: 'Test Help Center',
        subtitle: 'Test subtitle description',
        placeholderText: 'Buscar en la ayuda...',
    };

    it('renders title and subtitle correctly', () => {
        render(<HelpHeader {...defaultProps} />);

        expect(screen.getByText('Test Help Center')).toBeInTheDocument();
        expect(screen.getByText('Test subtitle description')).toBeInTheDocument();
    });

    it('renders search input', () => {
        render(<HelpHeader {...defaultProps} />);
        expect(screen.getByPlaceholderText('Buscar en la ayuda...')).toBeInTheDocument();
    });

    it('passes search props to SearchInput', () => {
        const mockOnSearchChange = jest.fn();
        render(
            <HelpHeader
                {...defaultProps}
                searchValue="test search"
                onSearchChange={mockOnSearchChange}
            />,
        );

        expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
    });
});
