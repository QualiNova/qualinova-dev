import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelpContent } from './HelpContent';

describe('HelpContent', () => {
    it('renders the help center header', () => {
        render(<HelpContent />);
        expect(screen.getByText('Help Center')).toBeInTheDocument();
        expect(
            screen.getByText('Find answers to common questions and get support')
        ).toBeInTheDocument();
    });

    it('renders quick links section', () => {
        render(<HelpContent />);
        expect(screen.getByText('FAQs')).toBeInTheDocument();
        expect(screen.getByText('Documentation')).toBeInTheDocument();
        expect(screen.getByText('Contact Support')).toBeInTheDocument();
    });

    it('renders FAQ section with all questions', () => {
        render(<HelpContent />);
        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.getByText('How do I create a new certificate?')).toBeInTheDocument();
        expect(screen.getByText('How can I verify a certificate?')).toBeInTheDocument();
        expect(screen.getByText('What types of certificates can I issue?')).toBeInTheDocument();
    });

    it('toggles FAQ answer when clicked', () => {
        render(<HelpContent />);
        const faqQuestion = screen.getByText('How do I create a new certificate?');
        
        // Initially answer should not be visible
        expect(
            screen.queryByText(/navigate to the "Create Certificate" page/)
        ).not.toBeInTheDocument();
        
        // Click to open
        fireEvent.click(faqQuestion);
        expect(
            screen.getByText(/navigate to the "Create Certificate" page/)
        ).toBeInTheDocument();
        
        // Click to close
        fireEvent.click(faqQuestion);
        expect(
            screen.queryByText(/navigate to the "Create Certificate" page/)
        ).not.toBeInTheDocument();
    });

    it('renders support options section', () => {
        render(<HelpContent />);
        expect(screen.getByText('Live Chat')).toBeInTheDocument();
        expect(screen.getByText('Email Support')).toBeInTheDocument();
        expect(screen.getByText('Phone Support')).toBeInTheDocument();
    });

    it('renders support action buttons', () => {
        render(<HelpContent />);
        expect(screen.getByText('Start Chat')).toBeInTheDocument();
        expect(screen.getByText('Send Email')).toBeInTheDocument();
        expect(screen.getByText('Call Now')).toBeInTheDocument();
    });

    it('renders additional help resources section', () => {
        render(<HelpContent />);
        expect(screen.getByText('Need more help?')).toBeInTheDocument();
        expect(screen.getByText('Email Us')).toBeInTheDocument();
        expect(screen.getByText('Call Us')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<HelpContent className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('only opens one FAQ at a time', () => {
        render(<HelpContent />);
        
        // Open first FAQ
        fireEvent.click(screen.getByText('How do I create a new certificate?'));
        expect(
            screen.getByText(/navigate to the "Create Certificate" page/)
        ).toBeInTheDocument();
        
        // Open second FAQ - first should close
        fireEvent.click(screen.getByText('How can I verify a certificate?'));
        expect(
            screen.queryByText(/navigate to the "Create Certificate" page/)
        ).not.toBeInTheDocument();
        expect(
            screen.getByText(/by navigating to the "Verify" page/)
        ).toBeInTheDocument();
    });
});
