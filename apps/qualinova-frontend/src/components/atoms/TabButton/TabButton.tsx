import React from "react";

interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
        isActive
          ? "bg-[#020817] text-white my-auto mx-auto rounded h-8"
          : "text-gray-400 hover:text-gray-300"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
