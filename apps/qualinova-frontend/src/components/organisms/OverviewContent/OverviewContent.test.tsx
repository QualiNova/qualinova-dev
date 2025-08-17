import { render, screen } from '@testing-library/react';
import OverviewContent from './OverviewContent';

describe('OverviewContent', () => {
    it('renders metrics, chart, certificates, and quick actions', () => {
        render(<OverviewContent />);
        expect(screen.getByText('Total Certificates')).toBeInTheDocument();
        expect(screen.getByText('Certificate Activity')).toBeInTheDocument();
        expect(screen.getByText('Recent Certificates')).toBeInTheDocument();
        expect(screen.getByText('Create Certificate')).toBeInTheDocument();
        expect(screen.getByText('Verify Certificate')).toBeInTheDocument();
        expect(screen.getByText('Renew Certificate')).toBeInTheDocument();
    });
});
