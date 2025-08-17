import { Menu } from 'lucide-react';

interface MenuToggleProps {
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

const MenuToggle = ({ isOpen, onToggle, className = '' }: MenuToggleProps) => {
    return (
        <button
            onClick={onToggle}
            className={`p-2 text-gray-400 hover:text-white focus:outline-none ${className}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
        >
            <Menu size={18} />
        </button>
    );
};

export default MenuToggle;
