import React from "react";
import MetricCard from "@/components/atoms/MetricCard/MetricCard";
import { Award, FileCheck, Clock, FileX } from "lucide-react";

interface MetricData {
  total: {
    count: number;
    percentChange: string;
  };
  active: {
    count: number;
    percentText: string;
  };
  pending: {
    count: number;
    statusText: string;
  };
  expired: {
    count: number;
    percentText: string;
  };
}

interface MetricsGridProps {
  metrics: MetricData;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row w-full gap-3 sm:gap-4 lg:space-x-0">
      <MetricCard
        title="Total Certificates"
        value={metrics.total.count}
        subtitle={metrics.total.percentChange}
        icon={<Award size={18} />}
        iconBgColor="bg-blue-500/10"
        iconColor="text-[#2563EB]"
      />

      <MetricCard
        title="Active Certificates"
        value={metrics.active.count}
        subtitle={metrics.active.percentText}
        icon={<FileCheck size={18} />}
        iconBgColor="bg-green-500/10"
        iconColor="text-[#16A34A]"
        className="lg:ml-0"
      />

      <MetricCard
        title="Pending Certificates"
        value={metrics.pending.count}
        subtitle={metrics.pending.statusText}
        icon={<Clock size={18} />}
        iconBgColor="bg-orange-500/10"
        iconColor="text-[#EA580C]"
        className="lg:ml-0"
      />

      <MetricCard
        title="Expired Certificates"
        value={metrics.expired.count}
        subtitle={metrics.expired.percentText}
        icon={<FileX size={18} />}
        iconBgColor="bg-red-500/10"
        iconColor="text-[#DC2626]"
        className="lg:ml-0"
      />
    </div>
  );
};

export default MetricsGrid;
