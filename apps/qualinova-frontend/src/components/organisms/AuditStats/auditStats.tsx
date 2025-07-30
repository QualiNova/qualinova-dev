import React from "react";
import { FileText, Calendar, User, Building2 } from "lucide-react";
import StatsCard from "@/components/molecules/StatsCard/statsCard";

interface AuditStatsProps {
  totalAudits: number;
  pendingAudits: number;
  inProcessAudits: number;
  completedAudits: number;
  className?: string;
}

const AuditStats: React.FC<AuditStatsProps> = ({
  totalAudits,
  pendingAudits,
  inProcessAudits,
  completedAudits,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      <StatsCard
        title="Total Audits"
        count={totalAudits}
        subtitle="Registered audits"
        iconColor="text-[#2563EB]"
        Icon={FileText}
      />
      <StatsCard
        title="Pending"
        count={pendingAudits}
        subtitle="Not started"
        iconColor="text-[#F59E0B]"
        Icon={Calendar}
      />
      <StatsCard
        title="In Process"
        count={inProcessAudits}
        subtitle="In progress"
        iconColor="text-[#3B82F6]"
        Icon={User}
      />
      <StatsCard
        title="Completed"
        count={completedAudits}
        subtitle="Finished"
        iconColor="text-[#10B981]"
        Icon={Building2}
      />
    </div>
  );
};

export default AuditStats;
