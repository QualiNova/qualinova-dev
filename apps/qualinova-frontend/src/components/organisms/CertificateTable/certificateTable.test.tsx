import { render, screen } from '@testing-library/react';
import CertificateTable from './certificateTable';

// Mock the child components
jest.mock('../../molecules/CertificateRow/certificateRow.tsx', () => {
    return function MockCertificateRow({ cert }: { cert: any }) {
        return (
            <tr data-testid={`certificate-row-${cert.id}`}>
                <td>{cert.id}</td>
                <td>{cert.name}</td>
                <td>{cert.recipient}</td>
                <td>{cert.issue_date}</td>
                <td>{cert.expiry_date}</td>
                <td>{cert.status}</td>
                <td>Mock Actions</td>
            </tr>
        );
    };
});

jest.mock('lucide-react', () => ({
    ArrowUpDown: () => <span data-testid="arrow-up-down" />,
}));

describe('CertificateTable', () => {
    const mockCertificates = [
        {
            id: '001',
            name: 'JavaScript Certification',
            recipient: 'John Doe',
            issue_date: '2024-01-15',
            expiry_date: '2025-01-15',
            status: 'Verified',
            actions: 'View',
        },
        {
            id: '002',
            name: 'React Certification',
            recipient: 'Jane Smith',
            issue_date: '2024-02-20',
            expiry_date: '2025-02-20',
            status: 'Pending',
            actions: 'Edit',
        },
    ];

    it('renders the table with correct headers', () => {
        render(<CertificateTable certificates={mockCertificates} />);

        expect(screen.getByTestId('id-header')).toBeInTheDocument();
        expect(screen.getByTestId('name-header')).toBeInTheDocument();
        expect(screen.getByTestId('recipient-header')).toBeInTheDocument();
        expect(screen.getByTestId('issue-date-header')).toBeInTheDocument();
        expect(screen.getByTestId('expiry-date-header')).toBeInTheDocument();
        expect(screen.getByTestId('status-header')).toBeInTheDocument();
        expect(screen.getByTestId('actions-header')).toBeInTheDocument();
    });

    it('renders the sorting icon in the Name header', () => {
        render(<CertificateTable certificates={mockCertificates} />);

        const sortingIcon = screen.getByTestId('sorting-icon');
        expect(sortingIcon).toBeInTheDocument();
    });

    it('renders correct number of certificate rows', () => {
        render(<CertificateTable certificates={mockCertificates} />);

        expect(screen.getByTestId('certificate-row-001')).toBeInTheDocument();
        expect(screen.getByTestId('certificate-row-002')).toBeInTheDocument();
    });

    // Check that certificate data is rendered in rows
    it('passes certificate data to each row component', () => {
        render(<CertificateTable certificates={mockCertificates} />);

        expect(screen.getByText('JavaScript Certification')).toBeInTheDocument();
        expect(screen.getByText('React Certification')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders empty table when no certificates provided', () => {
        render(<CertificateTable certificates={[]} />);

        // Headers should still be present
        expect(screen.getByTestId('id-header')).toBeInTheDocument();
        expect(screen.getByTestId('name-header')).toBeInTheDocument();

        // No certificate rows should be present
        expect(screen.queryByTestId(/certificate-row-/)).not.toBeInTheDocument();
    });

    it('handles single certificate correctly', () => {
        const singleCertificate = [mockCertificates[0]];
        render(<CertificateTable certificates={singleCertificate} />);

        expect(screen.getByTestId('certificate-row-001')).toBeInTheDocument();
        expect(screen.queryByTestId('certificate-row-002')).not.toBeInTheDocument();
    });

    it('applies correct CSS classes for styling', () => {
        const { container } = render(<CertificateTable certificates={mockCertificates} />);

        const tableContainer = container.firstChild;
        expect(tableContainer).toHaveClass(
            'border-2',
            'border-dark-blue-border',
            'flex',
            'justify-center',
            'rounded-lg',
            'p-4',
            'w-full',
        );

        const table = container.querySelector('table');
        expect(table).toHaveClass('table-auto', 'w-3/4', 'border-collapse');
    });
});
