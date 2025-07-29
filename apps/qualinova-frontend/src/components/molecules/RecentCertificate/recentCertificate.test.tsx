import { render, screen } from '@testing-library/react';
import RecentCertificate from './recentCertificate';
import { Certificate } from '@/data/dashboardData';
jest.mock('lucide-react', () => ({
  FileCheck: () => <span data-testid="icon">icon</span>,
  Clock: () => <span data-testid="icon">icon</span>,
  FileX: () => <span data-testid="icon">icon</span>,
}));
describe('RecentCertificate', () => {
  it('renders certificate details', () => {
    const cert: Certificate = { name: 'Cert 1', company: 'Company A', date: '2023-01-01', status: 'Verified' };
    render(<RecentCertificate cert={cert} />);
    expect(screen.getByText('Cert 1')).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });
});
