'use client';

import type React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen = false, onToggle }) => {
    return (
        <div className="border-b border-gray-700 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-4 px-0 text-left flex justify-between items-center hover:text-blue-400 transition-colors"
            >
                <span className="text-white font-medium">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </button>
            {isOpen && (
                <div className="pb-4 px-0">
                    <p className="text-gray-400 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
};
