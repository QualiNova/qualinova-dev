import { render, screen, fireEvent } from '@testing-library/react';
import CertifierDashboard from './certifierPanel';
import { initialAssignedCertificates } from './mockAssignedCertificates';

describe('CertifierDashboard', () => {
  it('renders the tabs', () => {
    render(<CertifierDashboard />);
    expect(screen.getByRole('button', { name: 'Assigned Certificates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Certificate Templates' })).toBeInTheDocument();
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
    const certTypeCells = screen.getAllByText((content, node) =>
      node !== null && node.textContent === initialAssignedCertificates[0].certificateType
    );
    expect(certTypeCells.length).toBeGreaterThan(0);
    expect(screen.getByText(initialAssignedCertificates[0].receivingCompany)).toBeInTheDocument();
    // TODO: Add test for empty state and mobile responsiveness
  });

  it('shows and selects from the custom status dropdown', () => {
    render(<CertifierDashboard />);
    const dropdownButton = screen.getByRole('button', { name: /all statuses/i });
    fireEvent.click(dropdownButton);
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Expired')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Pending'));
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
    expect(dropdownButton).toHaveTextContent('Pending');
  });
});