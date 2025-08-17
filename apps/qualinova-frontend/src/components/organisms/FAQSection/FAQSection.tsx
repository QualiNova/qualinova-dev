'use client';

import { CategoryFilter } from '@/components/molecules/CategoryFilter/CategoryFilter';
import { FAQItem } from '@/components/molecules/FAQItem/FAQItem';
import { IconType } from '@/schemas/types';
import type React from 'react';
import { useState } from 'react';

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

interface FAQSectionProps {
    faqs: FAQ[];
    categories: Category[];
    className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, categories, className = '' }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const filteredFAQs =
        activeCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === activeCategory);

    const handleFAQToggle = (faqId: string) => {
        setOpenFAQ(openFAQ === faqId ? null : faqId);
    };

    return (
        <div
            className={`space-y-6 rounded-lg border bg-[#020817] border-[#1E293B] p-3 md:p-6 ${className}`}
        >
            <div>
                <h2 className="text-lg md:text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-6">
                    Find quick answers to the most common questions about QualiNova
                </p>
            </div>

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <div className="space-y-0">
                {filteredFAQs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openFAQ === faq.id}
                        onToggle={() => handleFAQToggle(faq.id)}
                    />
                ))}
            </div>
        </div>
    );
};
