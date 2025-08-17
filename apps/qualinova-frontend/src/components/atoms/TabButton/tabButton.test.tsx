import { render, screen, fireEvent } from '@testing-library/react';
import TabButton from './tabButton';

describe('TabButton', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders button with correct label', () => {
        render(<TabButton id="test" label="Test Tab" isActive={false} onClick={mockOnClick} />);

        expect(screen.getByText('Test Tab')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        render(<TabButton id="test" label="Test Tab" isActive={false} onClick={mockOnClick} />);

        fireEvent.click(screen.getByText('Test Tab'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies active styles when isActive is true', () => {
        render(
            <TabButton
                id="test"
                label="Test Tab"
                isActive={true}
                onClick={mockOnClick}
                variant="desktop"
            />,
        );

        const button = screen.getByText('Test Tab');
        expect(button).toHaveClass('bg-[#020817]', 'text-white');
    });

    it('applies mobile variant styles correctly', () => {
        render(
            <TabButton
                id="test"
                label="Test Tab"
                isActive={false}
                onClick={mockOnClick}
                variant="mobile"
            />,
        );

        const button = screen.getByText('Test Tab');
        expect(button).toHaveClass('block', 'w-full', 'text-left');
    });
});
