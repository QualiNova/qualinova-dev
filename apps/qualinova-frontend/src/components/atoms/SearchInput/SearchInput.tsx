'use client';

import type React from 'react';
import { Search } from 'lucide-react';
import Input from '../Input/input';

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search for help...',
    value = '',
    onChange,
    className = '',
}) => {
    return (
        <div className={`relative w-full max-w-md mx-auto ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            {/* <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      /> */}
            <Input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="pl-10"
            />
        </div>
    );
};
