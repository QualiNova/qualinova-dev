import { ReactNode } from 'react';

interface MetricCardProps {
    title: string;
    count: number;
    subtext: string;
    icon: ReactNode;
    iconBg: string;
    iconColor: string;
}

const MetricCard = ({ title, count, subtext, icon, iconBg, iconColor }: MetricCardProps) => (
    <div className="rounded-lg p-3 sm:p-4 border border-[#1E293B] flex-1">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[#F8FAFC] text-base sm:text-lg md:text-xl mb-1">{title}</p>
                <h3 className="text-[#F8FAFC] text-xl sm:text-2xl font-semibold">{count}</h3>
                <p className="text-[#94A3B8] text-xs">{subtext}</p>
            </div>
            <div className={iconColor}>
                <span className={`flex items-center justify-center h-8 w-8 rounded-full ${iconBg}`}>
                    {icon}
                </span>
            </div>
        </div>
    </div>
);

export default MetricCard;
