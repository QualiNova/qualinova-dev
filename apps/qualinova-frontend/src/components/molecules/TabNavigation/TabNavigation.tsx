'use client';

import { TabButton } from '@/components/atoms/Button/TabButton';
import type React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs,
    activeTab,
    onTabChange,
    className = '',
}) => {
    return (
        <div className={`flex space-x-1 justify-evenly bg-[#1E293B] p-1 rounded-lg ${className} `}>
            {tabs.map((tab) => (
                <TabButton
                    key={tab.id}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </TabButton>
            ))}
        </div>
    );
};
