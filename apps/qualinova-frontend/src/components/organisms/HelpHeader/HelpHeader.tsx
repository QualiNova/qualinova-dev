'use client';

import { SearchInput } from '@/components/atoms/SearchInput/SearchInput';
import type React from 'react';

interface HelpHeaderProps {
    title: string;
    subtitle: string;
    searchValue?: string;
    placeholderText?: string;
    onSearchChange?: (value: string) => void;
}

export const HelpHeader: React.FC<HelpHeaderProps> = ({
    title,
    subtitle,
    searchValue,
    placeholderText,
    onSearchChange,
}) => {
    return (
        <div className="text-center py-12 space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            </div>
            <SearchInput
                value={searchValue}
                placeholder={placeholderText}
                onChange={onSearchChange}
                className="max-w-lg"
            />
        </div>
    );
};
