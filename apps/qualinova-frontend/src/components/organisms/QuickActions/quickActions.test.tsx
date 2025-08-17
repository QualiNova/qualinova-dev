import { render, screen } from '@testing-library/react';
import QuickActions from './quickActions';
import { FilePlus } from 'lucide-react';

describe('QuickActions', () => {
    it('renders all quick actions', () => {
        const actions = [
            {
                icon: (
                    <>
                        <FilePlus data-testid="icon1" size={16} className="text-[#0F172A]" />
                    </>
                ),
                title: 'Create',
                desc: 'Desc1',
                bg: 'bg-[#2563EB]',
                text: 'text-[#0F172A]',
            },
            {
                icon: (
                    <>
                        <FilePlus data-testid="icon2" size={16} className="text-[#0F172A]" />
                    </>
                ),
                title: 'Verify',
                desc: 'Desc2',
                bg: 'bg-[#2563EB]',
                text: 'text-[#0F172A]',
            },
        ];
        render(<QuickActions actions={actions} />);
        expect(screen.getByText('Create')).toBeInTheDocument();
        expect(screen.getByText('Verify')).toBeInTheDocument();
        expect(screen.getByTestId('icon1')).toBeInTheDocument();
        expect(screen.getByTestId('icon2')).toBeInTheDocument();
    });
});
