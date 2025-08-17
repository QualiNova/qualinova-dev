import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelpContent } from './HelpContent';

describe('HelpContent', () => {
    const mockTabs = [
        { id: 'faq', label: 'FAQ' },
        { id: 'guides', label: 'Guides' },
    ];

    const mockFAQs = [
        {
            id: '1',
            question: 'Test question?',
            answer: 'Test answer',
            category: 'test',
        },
    ];

    const mockCategories = [
        { id: 'all', label: 'All', icon: () => <div>All icon</div> },
        { id: 'test', label: 'Test', icon: () => <div>Test icon</div> },
    ];

    it('renders tab navigation', () => {
        render(<HelpContent tabs={mockTabs} faqs={mockFAQs} categories={mockCategories} />);

        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Guides')).toBeInTheDocument();
    });

    it('shows FAQ content by default', () => {
        render(<HelpContent tabs={mockTabs} faqs={mockFAQs} categories={mockCategories} />);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.getByText('Test question?')).toBeInTheDocument();
    });

    it('switches to guides content when guides tab is clicked', () => {
        render(<HelpContent tabs={mockTabs} faqs={mockFAQs} categories={mockCategories} />);

        fireEvent.click(screen.getByText('Guides'));
        expect(screen.getByText('Guide content coming soon...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <HelpContent
                tabs={mockTabs}
                faqs={mockFAQs}
                categories={mockCategories}
                className="custom-class"
            />,
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
