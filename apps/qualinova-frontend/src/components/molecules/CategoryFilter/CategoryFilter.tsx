'use client';

import { TabButton } from '@/components/atoms/Button/TabButton';
import { IconType } from '@/schemas/types';
import type React from 'react';

interface Category {
    id: string;
    label: string;
    icon: IconType;
}

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
    className?: string;
}

export const CategoryFilter = ({
    categories,
    activeCategory,
    onCategoryChange,
    className = '',
}: CategoryFilterProps) => {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {categories.map((category) => (
                <TabButton
                    theme="blue"
                    key={category.id}
                    isActive={activeCategory === category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className="flex items-center space-x-5 border border-[#1E293B] "
                >
                    <category.icon />
                    <span>{category.label}</span>
                </TabButton>
            ))}
        </div>
    );
};
