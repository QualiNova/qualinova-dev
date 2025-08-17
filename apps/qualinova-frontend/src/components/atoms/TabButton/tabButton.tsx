interface TabButtonProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
    variant?: 'desktop' | 'mobile';
    className?: string;
}

const TabButton = ({
    label,
    isActive,
    onClick,
    variant = 'desktop',
    className = '',
}: TabButtonProps) => {
    const baseClasses = 'text-sm font-medium transition-colors focus:outline-none';

    const variantClasses = {
        desktop: `px-4 py-2 ${
            isActive
                ? 'bg-[#020817] text-white my-auto mx-auto rounded h-8'
                : 'text-gray-400 hover:text-gray-300'
        }`,
        mobile: `block w-full text-left px-4 py-2 ${
            isActive ? 'bg-[#020817] text-white rounded h-8' : 'text-gray-400'
        }`,
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            aria-pressed={isActive}
        >
            {label}
        </button>
    );
};

export default TabButton;
