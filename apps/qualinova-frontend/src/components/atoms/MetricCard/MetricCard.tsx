import React, { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = "bg-blue-500/10",
  iconColor = "text-[#2563EB]",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg p-3 sm:p-4 border border-[#1E293B] flex-1 ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#F8FAFC] text-base sm:text-lg md:text-xl mb-1">
            {title}
          </p>
          <h3 className="text-[#F8FAFC] text-xl sm:text-2xl font-semibold">
            {value}
          </h3>
          {subtitle && <p className="text-[#94A3B8] text-xs">{subtitle}</p>}
        </div>
        {icon && (
          <div className={iconColor}>
            <span
              className={`flex items-center justify-center h-8 w-8 rounded-full ${iconBgColor}`}
            >
              {icon}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
