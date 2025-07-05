import React from "react";
import { FileCheck, Clock, FileX } from "lucide-react";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";

type CertificateStatus = "Verified" | "Pending" | "Expired";

interface Certificate {
  name: string;
  company: string;
  date: string;
  status: CertificateStatus;
}

interface CertificateListProps {
  certificates: Certificate[];
  title: string;
  description?: string;
  onViewAll?: () => void;
}

const CertificateList: React.FC<CertificateListProps> = ({
  certificates,
  title,
  description,
  onViewAll,
}) => {
  const getStatusIcon = (status: CertificateStatus) => {
    switch (status) {
      case "Verified":
        return <FileCheck size={14} className="text-[#16A34A] mr-2" />;
      case "Pending":
        return <Clock size={14} className="text-[#EA580C] mr-2" />;
      case "Expired":
        return <FileX size={14} className="text-[#DC2626] mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-3 sm:p-4">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h2 className="text-[#F8FAFC] text-base sm:text-lg font-medium">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-[#94A3B8] text-xs mb-2 sm:mb-3">{description}</p>
      )}
      <div className="overflow-x-auto">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-800"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                {getStatusIcon(cert.status)}
                <h4 className="text-[#F8FAFC] font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-full">
                  {cert.name}
                </h4>
              </div>
              <p className="text-[#94A3B8] text-xs">{cert.company}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-[#94A3B8] pr-8 text-xs hidden sm:inline">
                {cert.date}
              </span>
              <StatusBadge status={cert.status} />
            </div>
          </div>
        ))}
      </div>
      {onViewAll && (
        <div className="mt-3 sm:mt-4 flex border border-[#1E293B] p-2 sm:p-3 rounded justify-center">
          <button
            onClick={onViewAll}
            className="text-[#F8FAFC] text-xs sm:text-sm hover:text-blue-400 transition-colors font-medium"
          >
            View All Certificates
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateList;
