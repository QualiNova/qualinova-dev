import { useState } from 'react';
import TabButton from '../../atoms/TabButton/tabButton';
import MenuToggle from '../../atoms/MenuToggle/menuToggle';
import { TabType, TabItem } from '../../../types/dashboard';

interface MobileTabViewProps {
    tabs: TabItem[];
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const MobileTabView = ({ tabs, activeTab, onTabChange }: MobileTabViewProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTabClick = (tab: TabType) => {
        onTabChange(tab);
        setIsMenuOpen(false);
    };

    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label;

    return (
        <div>
            <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-200">{activeTabLabel}</span>
                <MenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            {isMenuOpen && (
                <div className="mt-2 py-1 bg-[#1E293B] rounded-md shadow-lg">
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            id={tab.id}
                            label={tab.label}
                            isActive={activeTab === tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            variant="mobile"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileTabView;
