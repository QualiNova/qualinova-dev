import MobileTabView from '@/components/molecules/MobileTabView/mobileTabView';
import DesktopTabView from '@/components/molecules/DesktopTabView/desktopTabView';
import useMobile from '@/hooks/useMobile';
import { TabType, DEFAULT_TABS } from '@/types/dashboard';
interface DashboardTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    className?: string;
}

const DashboardTabs = ({ activeTab, onTabChange, className = '' }: DashboardTabsProps) => {
    const isMobile = useMobile();

    return (
        <div className={`bg-[#1E293B] rounded w-full max-w-[278px] ${className}`}>
            {isMobile ? (
                <MobileTabView
                    tabs={DEFAULT_TABS}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                />
            ) : (
                <DesktopTabView
                    tabs={DEFAULT_TABS}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                />
            )}
        </div>
    );
};

export default DashboardTabs;
