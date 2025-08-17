import QuickAction from '@/components/molecules/QuickAction/quickAction';
import { ReactNode } from 'react';

export interface QuickActionItem {
    icon: ReactNode;
    title: string;
    desc: string;
    bg: string;
    text: string;
}

const QuickActions = ({ actions }: { actions: QuickActionItem[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, i) => (
            <QuickAction key={i} {...action} />
        ))}
    </div>
);

export default QuickActions;
