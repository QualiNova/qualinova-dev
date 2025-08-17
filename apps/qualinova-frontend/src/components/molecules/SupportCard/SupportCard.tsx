'use client';

import Button from '@/components/atoms/Button/button';
import { SupportIcon } from '@/components/atoms/SupportIcon/SupportIcon';
import type React from 'react';

interface SupportCardProps {
    type: 'chat' | 'email' | 'phone';
    title: string;
    description: string;
    buttonText: string;
    onAction?: () => void;
}

export const SupportCard: React.FC<SupportCardProps> = ({
    type,
    title,
    description,
    buttonText,
    onAction,
}) => {
    return (
        <div className="bg-[#020817] rounded-lg p-6 2xl:px-20 text-center space-y-4 border border-[#1E293B] hover:border-gray-600 transition-colors">
            <div className="flex justify-start">
                <SupportIcon type={type} />
            </div>
            <div>
                <h3 className="md:text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-4">{description}</p>
            </div>
            <Button onClick={onAction} className="w-full bg-[#2563EB]">
                {buttonText}
            </Button>
        </div>
    );
};
