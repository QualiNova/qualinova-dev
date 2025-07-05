import React, { ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
  size?: "sm" | "md" | "lg";
}

const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  bgColor,
  iconColor,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <span
      className={`flex items-center justify-center rounded-full ${bgColor} ${sizeClasses[size]}`}
    >
      <div className={iconColor}>{icon}</div>
    </span>
  );
};

export default IconBadge;
