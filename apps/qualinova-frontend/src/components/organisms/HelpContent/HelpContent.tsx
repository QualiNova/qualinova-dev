'use client';

import { TabNavigation } from '@/components/molecules/TabNavigation/TabNavigation';
import type React from 'react';
import { useState } from 'react';
import { FAQSection } from '../FAQSection/FAQSection';
import { IconType } from '@/schemas/types';

interface Tab {
    id: string;
    label: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface Category {
    id: string;
    label: string;
    icon: IconType;
}

interface HelpContentProps {
    tabs: Tab[];
    faqs: FAQ[];
    categories: Category[];
    className?: string;
}

export const HelpContent: React.FC<HelpContentProps> = ({
    tabs,
    faqs,
    categories,
    className = '',
}) => {
    const [activeTab, setActiveTab] = useState('faq');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'faq':
                return <FAQSection faqs={faqs} categories={categories} />;
            case 'guides':
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4">Guides</h2>
                        <p className="text-muted-foreground">Guide content coming soon...</p>
                    </div>
                );
            case 'videos':
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
                        <p className="text-muted-foreground">Video tutorials coming soon...</p>
                    </div>
                );
            case 'resources':
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4">Resources</h2>
                        <p className="text-muted-foreground">Additional resources coming soon...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`space-y-8 ${className}`}>
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="w-full overflow-x-auto"
            />

            <div className="min-h-[400px]">{renderTabContent()}</div>
        </div>
    );
};
