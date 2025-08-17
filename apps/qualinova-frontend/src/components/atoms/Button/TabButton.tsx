'use client';

import type React from 'react';

interface TabButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
    theme?: 'dark' | 'blue';
}

export const TabButton = ({
    children,
    isActive = false,
    onClick,
    className = '',
    theme = 'dark',
}: TabButtonProps) => {
    const themes = {
        dark: {
            active: 'bg-[#020817] text-white',
            inactive: 'text-gray-400 hover:text-white hover:bg-gray-800',
        },
        blue: {
            active: 'bg-[#2563EB] text-[#0F172A]',
            inactive: 'text-white hover:text-blue-400 hover:bg-blue-600/20',
        },
    };

    const currentTheme = themes[theme];

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive ? currentTheme.active : currentTheme.inactive
            } ${className}`}
        >
            {children}
        </button>
    );
};
