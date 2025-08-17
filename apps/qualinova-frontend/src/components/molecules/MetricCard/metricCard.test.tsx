import { render, screen } from '@testing-library/react';
import MetricCard from './metricCard';
import { Award } from 'lucide-react';

describe('MetricCard', () => {
    it('renders metric card with props', () => {
        render(
            <MetricCard
                title="Total Certificates"
                count={100}
                subtext="+10%"
                icon={
                    <>
                        <Award data-testid="icon" size={18} />
                    </>
                }
                iconBg="bg-blue-500/10"
                iconColor="text-[#2563EB]"
            />,
        );
        expect(screen.getByText('Total Certificates')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('+10%')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
});
