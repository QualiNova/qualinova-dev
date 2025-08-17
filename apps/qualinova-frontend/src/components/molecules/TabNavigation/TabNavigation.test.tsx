import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { TabNavigation } from './TabNavigation';

describe('TabNavigation', () => {
    const mockTabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' },
    ];

    it('renders all tabs', () => {
        render(<TabNavigation tabs={mockTabs} activeTab="tab1" onTabChange={jest.fn()} />);

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('highlights active tab', () => {
        render(<TabNavigation tabs={mockTabs} activeTab="tab2" onTabChange={jest.fn()} />);

        expect(screen.getByText('Tab 2')).toHaveClass('bg-[#020817]', 'text-white');
    });

    it('calls onTabChange when tab is clicked', () => {
        const mockOnTabChange = jest.fn();
        render(<TabNavigation tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />);

        fireEvent.click(screen.getByText('Tab 3'));
        expect(mockOnTabChange).toHaveBeenCalledWith('tab3');
    });

    it('applies custom className', () => {
        const { container } = render(
            <TabNavigation
                tabs={mockTabs}
                activeTab="tab1"
                onTabChange={jest.fn()}
                className="custom-class"
            />,
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
