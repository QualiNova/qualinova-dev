import StatusBadge from "@/components/atoms/StatusBadge/statusBadge";
import { Eye } from "lucide-react";

interface Audit {
  id: string;
  auditedCompany: string;
  relatedCertificate: string;
  assignedAuditor: string;
  auditDate: string;
  status: string;
}

interface AuditRowProps {
  audit: Audit;
}

const AuditRow = ({ audit }: AuditRowProps) => (
  <tr className="space-x-3 border-dark-blue-border *:py-5 border-t">
    <td>{audit.id}</td>
    <td>{audit.auditedCompany}</td>
    <td>{audit.relatedCertificate}</td>
    <td>{audit.assignedAuditor}</td>
    <td>{audit.auditDate}</td>
    <td className="text-center pr-4">
      <StatusBadge status={audit.status} />
    </td>
    <td className="text-center pl-4">
      <button
        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1E293B] hover:bg-[#334155] rounded-xl transition-colors border border-[#334155] text-[#F8FAFC] text-sm"
        aria-label="View Details"
      >
        <Eye size={16} />
        <span>View Details</span>
      </button>
    </td>
  </tr>
);

export default AuditRow;
