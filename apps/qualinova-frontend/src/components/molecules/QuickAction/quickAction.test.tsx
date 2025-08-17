import { render, screen } from '@testing-library/react';
import QuickAction from './quickAction';
import { FilePlus } from 'lucide-react';

describe('QuickAction', () => {
    it('renders action title and description', () => {
        render(
            <QuickAction
                icon={
                    <>
                        <FilePlus data-testid="icon" size={16} className="text-[#0F172A]" />
                    </>
                }
                title="Create Certificate"
                desc="Generate a new certificate"
                bg="bg-[#2563EB]"
                text="text-[#0F172A]"
            />,
        );
        expect(screen.getByText('Create Certificate')).toBeInTheDocument();
        expect(screen.getByText('Generate a new certificate')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
});
