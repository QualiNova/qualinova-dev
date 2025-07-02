import React from "react";

interface ContentHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`mb-8 ml-7 ${className}`}>
      <h2 className="text-xl text-[#F8FAFC] font-semibold mt-3">{title}</h2>
      {description && <p className="text-[#94A3B8] text-sm">{description}</p>}
    </div>
  );
};

export default ContentHeader;
