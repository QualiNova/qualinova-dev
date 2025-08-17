import TabButton from '../../atoms/TabButton/tabButton';
import { TabType, TabItem } from '../../../types/dashboard';

interface DesktopTabViewProps {
    tabs: TabItem[];
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const DesktopTabView = ({ tabs, activeTab, onTabChange }: DesktopTabViewProps) => {
    return (
        <nav className="flex flex-wrap">
            {tabs.map((tab) => (
                <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChange(tab.id)}
                    variant="desktop"
                />
            ))}
        </nav>
    );
};

export default DesktopTabView;
