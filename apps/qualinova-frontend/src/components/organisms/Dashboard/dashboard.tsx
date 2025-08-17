import { useState } from 'react';
import DashboardTabs from '@/components/molecules/DashboardTabs/DashboardTabs';
import AnalyticsContent from '@/components/organisms/AnalyticsContent/AnalyticsContent';
import OverviewContent from '@/components/organisms/OverviewContent/OverviewContent';
import ReportsContent from '@/components/organisms/ReportsContent/ReportsContent';
import { RefreshCcw, PlusCircle, Menu } from 'lucide-react';
import { TabType } from '@/types/dashboard';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<TabType>('analytics');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewContent />;
            case 'analytics':
                return <AnalyticsContent />;
            case 'reports':
                return <ReportsContent />;
            default:
                return <OverviewContent />;
        }
    };

    return (
        <div className="min-h-screen text-white">
            <main className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                    <div className="flex justify-between items-center w-full sm:w-auto">
                        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

                        <button
                            className="sm:hidden p-1 rounded-md border border-[#1E293B] hover:bg-[#1E293B]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <div
                        className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto`}
                    >
                        <button className="flex items-center justify-center px-3 py-1.5 bg-[#0F172A] rounded-md border border-[#1E293B] text-gray-300 hover:text-white">
                            <RefreshCcw size={16} className="mr-1.5" />
                            <span className="text-sm">Refresh</span>
                        </button>

                        <button className="px-3 py-1.5 flex items-center justify-center bg-[#1D4ED8] text-white rounded-md text-sm hover:bg-[#1E40AF] transition-colors">
                            <PlusCircle size={16} className="mr-1.5" />
                            <span>New Certificate</span>
                        </button>
                    </div>
                </div>
                <DashboardTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:block`}
                />
                <div className="">
                    <div className="min-w-full">{renderContent()}</div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
