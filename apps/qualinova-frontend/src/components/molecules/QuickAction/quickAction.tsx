import React from 'react';

interface QuickActionProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    bg: string;
    text: string;
}

const QuickAction = ({ icon, title, desc, bg, text }: QuickActionProps) => (
    <div className={`${bg} rounded-lg p-4 flex items-center hover:bg-opacity-80 cursor-pointer`}>
        <div className="rounded-full p-2 mr-2">{icon}</div>
        <div>
            <h3 className={`${text} font-medium text-sm`}>{title}</h3>
            <p className="text-xs text-[#94A3B8]">{desc}</p>
        </div>
    </div>
);

export default QuickAction;
