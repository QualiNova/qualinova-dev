import { render, screen } from '@testing-library/react';
import CertificateList from './certificateList';
import { Certificate } from '@/data/dashboardData';
jest.mock('@/components/molecules/RecentCertificate/recentCertificate', () => ({
  __esModule: true,
  default: ({ cert }: any) => <div>{cert.name}{cert.company}</div>,
}));
const certificates: Certificate[] = [
  { name: 'Cert 1', company: 'Company A', date: '2023-01-01', status: 'Verified' },
  { name: 'Cert 2', company: 'Company B', date: '2023-02-01', status: 'Pending' },
];

describe('CertificateList', () => {
  it('renders all certificates', () => {
    render(<CertificateList certificates={certificates} />);
    expect(screen.getByText('Cert 1')).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Cert 2')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
  });
});
