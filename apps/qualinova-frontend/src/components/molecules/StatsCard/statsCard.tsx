import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  count: number;
  subtitle: string;
  iconColor: string;
  Icon: LucideIcon;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  count,
  subtitle,
  iconColor,
  Icon,
  className = "",
}) => (
  <div className={`rounded-lg p-4 border border-[#1E293B] ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[#94A3B8] text-sm">{title}</p>
        <h3 className="text-white text-2xl font-semibold">{count}</h3>
        <p className="text-[#94A3B8] text-xs">{subtitle}</p>
      </div>
      <div className={iconColor}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

export default StatsCard;
