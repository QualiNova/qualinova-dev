import React from "react";
import { FilePlus, Search, RefreshCcw } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  title?: string;
  className?: string;
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  actions,
  title = "Quick Actions",
  className = "",
}) => {
  return (
    <div
      className={`border border-[#1E293B] rounded-lg p-3 sm:p-4 ${className}`}
    >
      <h2 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={action.onClick}
            className={`rounded-lg p-3 sm:p-4 text-left flex items-center hover:transition-colors w-full cursor-pointer ${
              action.variant === "primary"
                ? "bg-[#2563EB] hover:bg-blue-700"
                : "border border-[#1E293B] hover:bg-gray-800"
            }`}
          >
            <div
              className={`rounded-full p-2 mr-2 ${
                action.variant === "primary" ? "text-[#0F172A]" : "text-white"
              }`}
            >
              {action.icon}
            </div>
            <div>
              <h3
                className={`font-medium text-sm sm:text-base ${
                  action.variant === "primary" ? "text-[#0F172A]" : "text-white"
                }`}
              >
                {action.title}
              </h3>
              <p
                className={`text-xs ${
                  action.variant === "primary"
                    ? "text-[#BFDBFE]"
                    : "text-[#94A3B8]"
                }`}
              >
                {action.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
