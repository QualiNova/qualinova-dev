import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CertificateRow from './certificateRow';

// Mock the StatusBadge component
jest.mock('../../atoms/StatusBadge/StatusBadge.tsx', () => ({
    __esModule: true,
    default: ({ status }: { status: string }) => <div data-testid="status-badge">{status}</div>,
}));

// Mock the lucide-react FileText icon
jest.mock('lucide-react', () => ({
    FileText: () => <div data-testid="file-text-icon" />,
}));

describe('CertificateRow', () => {
    const mockCertificate = {
        id: 'CERT-2023-001',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '14/12/2023',
        expiry_date: '9/12/2024',
        status: 'Verified',
        actions: '...',
    };

    const renderWithTable = (children: React.ReactNode) => {
        return render(
            <table>
                <tbody>{children}</tbody>
            </table>,
        );
    };

    it('renders all certificate information correctly', () => {
        renderWithTable(<CertificateRow cert={mockCertificate} />);

        // Check if all certificate data is rendered
        expect(screen.getByText(mockCertificate.id)).toBeInTheDocument();
        expect(screen.getByText(mockCertificate.name)).toBeInTheDocument();
        expect(screen.getByText(mockCertificate.recipient)).toBeInTheDocument();
        expect(screen.getByText(mockCertificate.issue_date)).toBeInTheDocument();
        expect(screen.getByText(mockCertificate.expiry_date)).toBeInTheDocument();
        expect(screen.getByText(mockCertificate.actions)).toBeInTheDocument();
    });

    it('renders the FileText icon', () => {
        renderWithTable(<CertificateRow cert={mockCertificate} />);
        expect(screen.getByTestId('file-text-icon')).toBeInTheDocument();
    });

    it('renders the StatusBadge component with correct status', () => {
        renderWithTable(<CertificateRow cert={mockCertificate} />);
        expect(screen.getByTestId('status-badge')).toHaveTextContent(mockCertificate.status);
    });

    it('handles missing certificate data gracefully', () => {
        const incompleteCert = {
            id: 'CERT-2023-002',
            name: 'Incomplete Certificate',
            status: 'Pending',
        };

        renderWithTable(<CertificateRow cert={incompleteCert} />);

        // Check if required fields are present
        expect(screen.getByText(incompleteCert.id)).toBeInTheDocument();
        expect(screen.getByText(incompleteCert.name)).toBeInTheDocument();
        expect(screen.getByTestId('status-badge')).toHaveTextContent(incompleteCert.status);

        // Check if optional fields are handled gracefully
        const cells = screen.getAllByRole('cell');
        expect(cells[2]).toBeEmptyDOMElement(); // recipient
        expect(cells[3]).toBeEmptyDOMElement(); // issue_date
        expect(cells[4]).toBeEmptyDOMElement(); // expiry_date
        expect(cells[6]).toBeEmptyDOMElement(); // actions
    });

    it('applies correct styling classes', () => {
        renderWithTable(<CertificateRow cert={mockCertificate} />);

        const row = screen.getByRole('row');
        expect(row).toHaveClass('space-x-3', 'border-dark-blue-border', 'border-t');

        const statusCell = screen.getByTestId('status-badge').parentElement;
        expect(statusCell).toHaveClass('text-center');
    });
});
