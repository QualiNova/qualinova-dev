import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import StatusBadge from './statusBadge';

jest.mock('lucide-react', () => ({
    CircleCheckBig: () => <span data-testid="icon-check" />,
    CircleX: () => <span data-testid="icon-x" />,
    Clock4: () => <span data-testid="icon-clock" />,
}));

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Status badge', () => {
    it('renders without crashing', () => {
        mockUsePathname.mockReturnValue('/certificate');
        render(<StatusBadge status="Verified"></StatusBadge>);
        expect(screen.getByText('Verified')).toBeInTheDocument();
    });

    it('renders verified with correct class', () => {
        mockUsePathname.mockReturnValue('/certificate');
        render(<StatusBadge status="Verified"></StatusBadge>);
        const verified = screen.getByText('Verified');
        expect(verified).toHaveClass('text-success-dark bg-success-light');
    });

    it('renders pending with correct class', () => {
        mockUsePathname.mockReturnValue('/certificate');
        render(<StatusBadge status="Pending"></StatusBadge>);
        const pending = screen.getByText('Pending');
        expect(pending).toHaveClass('text-error-dark bg-error-light');
    });

    it('renders expired with correct class', () => {
        mockUsePathname.mockReturnValue('/certificate');
        render(<StatusBadge status="Expired"></StatusBadge>);
        const expired = screen.getByText('Expired');
        expect(expired).toHaveClass('text-white bg-error-dark');
    });
});
