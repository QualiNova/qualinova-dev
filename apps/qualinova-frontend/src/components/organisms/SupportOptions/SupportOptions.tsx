import { SupportCard } from '@/components/molecules/SupportCard/SupportCard';
import type React from 'react';

interface SupportOption {
    type: 'chat' | 'email' | 'phone';
    title: string;
    description: string;
    buttonText: string;
    onAction?: () => void;
}

interface SupportOptionsProps {
    options: SupportOption[];
    className?: string;
}

export const SupportOptions = ({ options, className = '' }: SupportOptionsProps) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
            {options.map((option, index) => (
                <SupportCard
                    key={index}
                    type={option.type}
                    title={option.title}
                    description={option.description}
                    buttonText={option.buttonText}
                    onAction={option.onAction}
                />
            ))}
        </div>
    );
};
