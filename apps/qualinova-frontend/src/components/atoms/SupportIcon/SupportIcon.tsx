import type React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

interface SupportIconProps {
    type: 'chat' | 'email' | 'phone';
    className?: string;
}

export const SupportIcon: React.FC<SupportIconProps> = ({ type, className = '' }) => {
    const iconMap = {
        chat: MessageCircle,
        email: Mail,
        phone: Phone,
    };

    const colorMap = {
        chat: 'text-blue-400',
        email: 'text-green-400',
        phone: 'text-purple-400',
    };

    const Icon = iconMap[type];

    return (
        <div className={`p-4 rounded-full ${colorMap[type]} ${className}`}>
            <Icon className="h-8 w-8" />
        </div>
    );
};
