import { render } from '@testing-library/react';
import CertificateActivityChart from './certificateActivityChart';

describe('CertificateActivityChart', () => {
    it('renders without crashing', () => {
        const data = [
            { name: 'Jan', value: 10 },
            { name: 'Feb', value: 20 },
        ];
        render(<CertificateActivityChart data={data} />);
    });
});
