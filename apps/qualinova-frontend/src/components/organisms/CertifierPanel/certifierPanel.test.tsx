import { render, screen, fireEvent } from '@testing-library/react';
import CertifierDashboard from './certifierPanel';
import { initialAssignedCertificates } from './mockAssignedCertificates';

describe('CertifierDashboard', () => {
    it('renders the tabs including Help tab', () => {
        render(<CertifierDashboard />);
        expect(screen.getByRole('button', { name: /Assigned Certificates/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Certificate Templates/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Help/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Assigned Certificates' })).toBeInTheDocument();
    });

    it('renders the assigned certificates table with mock data and responsive headers', () => {
        render(<CertifierDashboard />);
        expect(screen.getByText('Certificate ID')).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Certificate Type/ })).toBeInTheDocument();
        expect(screen.getByText('Receiving Company')).toBeInTheDocument();
        expect(screen.getByText('Assignment Date')).toBeInTheDocument();
        expect(screen.getByText('Expiration Date')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText(initialAssignedCertificates[0].id)).toBeInTheDocument();
        // Use getAllByText for certificateType (truncated, responsive)
        const certTypeCells = screen.getAllByText(
            (content, node) =>
                node !== null &&
                node.textContent === initialAssignedCertificates[0].certificateType,
        );
        expect(certTypeCells.length).toBeGreaterThan(0);
        expect(
            screen.getByText(initialAssignedCertificates[0].receivingCompany),
        ).toBeInTheDocument();
        // TODO: Add test for empty state and mobile responsiveness
    });

    it('shows and selects from the custom status dropdown', () => {
        render(<CertifierDashboard />);
        const dropdownButton = screen.getByRole('button', { name: /all statuses/i });
        fireEvent.click(dropdownButton);

        // Find dropdown options specifically by their role as buttons within the dropdown
        const verifiedOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Verified' &&
                    button.className.includes('w-full text-left'),
            );
        const pendingOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Pending' &&
                    button.className.includes('w-full text-left'),
            );
        const expiredOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Expired' &&
                    button.className.includes('w-full text-left'),
            );

        expect(verifiedOption).toBeInTheDocument();
        expect(pendingOption).toBeInTheDocument();
        expect(expiredOption).toBeInTheDocument();

        // Click the Pending option
        fireEvent.click(pendingOption!);

        // After selecting Pending, the dropdown should close and the button text should update
        expect(dropdownButton).toHaveTextContent('Pending');

        // The dropdown options should no longer be visible (dropdown is closed)
        const closedVerifiedOption = screen
            .queryAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Verified' &&
                    button.className.includes('w-full text-left'),
            );
        expect(closedVerifiedOption).toBeUndefined();
    });

    it('switches to Help tab and displays help content', () => {
        render(<CertifierDashboard />);
        
        // Click the Help tab
        const helpTabButton = screen.getByRole('button', { name: /Help/i });
        fireEvent.click(helpTabButton);
        
        // Verify Help content is displayed
        expect(screen.getByText('Help Center')).toBeInTheDocument();
        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('switches between all tabs correctly', () => {
        render(<CertifierDashboard />);
        
        // Start on Assigned Certificates tab
        expect(screen.getByRole('heading', { name: 'Assigned Certificates' })).toBeInTheDocument();
        
        // Switch to Templates tab
        fireEvent.click(screen.getByRole('button', { name: /Certificate Templates/i }));
        expect(screen.getByRole('heading', { name: 'Certificate Templates' })).toBeInTheDocument();
        
        // Switch to Help tab
        fireEvent.click(screen.getByRole('button', { name: /Help/i }));
        expect(screen.getByText('Help Center')).toBeInTheDocument();
        
        // Switch back to Assigned Certificates
        fireEvent.click(screen.getByRole('button', { name: /Assigned Certificates/i }));
        expect(screen.getByRole('heading', { name: 'Assigned Certificates' })).toBeInTheDocument();
    });
});
