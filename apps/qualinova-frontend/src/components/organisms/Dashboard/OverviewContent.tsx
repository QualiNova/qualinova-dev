import React from "react";
import { RefreshCcw, Search, FilePlus } from "lucide-react";
import MetricsGrid from "../../molecules/MetricsGrid";
import ChartContainer from "../../molecules/ChartContainer";
import CertificateList from "../../molecules/CertificateList";
import QuickActionsGrid from "../../molecules/QuickActionsGrid";

type CertificateStatus = "Verified" | "Pending" | "Expired";

interface Certificate {
  name: string;
  company: string;
  date: string;
  status: CertificateStatus;
}

interface MetricsData {
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

interface ChartDataPoint {
  name: string;
  value: number;
}

interface DashboardData {
  metrics: MetricsData;
  chartData: ChartDataPoint[];
  recentCertificates: Certificate[];
}

// Sample data
const dummyData: DashboardData = {
  metrics: {
    total: {
      count: 142,
      percentChange: "+22% from last month",
    },
    active: {
      count: 124,
      percentText: "87% of total certificates",
    },
    pending: {
      count: 8,
      statusText: "Awaiting blockchain confirmation",
    },
    expired: {
      count: 10,
      percentText: "7% of total certificates",
    },
  },
  chartData: [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 19 },
    { name: "Mar", value: 23 },
    { name: "Apr", value: 27 },
    { name: "May", value: 36 },
    { name: "Jun", value: 32 },
    { name: "Jul", value: 38 },
    { name: "Aug", value: 43 },
    { name: "Sep", value: 55 },
  ],
  recentCertificates: [
    {
      name: "ISO 9001 Compliance",
      company: "Acme Corporation",
      date: "10/12/2023",
      status: "Verified",
    },
    {
      name: "Food Safety Certification",
      company: "Fresh Foods Inc.",
      date: "8/17/2023",
      status: "Verified",
    },
    {
      name: "Environmental Management",
      company: "Green Solutions Ltd.",
      date: "7/05/2023",
      status: "Pending",
    },
    {
      name: "Quality Assurance",
      company: "Tech Innovations",
      date: "3/21/2023",
      status: "Expired",
    },
    {
      name: "Health & Safety Standard",
      company: "Construction Co.",
      date: "1/6/2023",
      status: "Verified",
    },
  ],
};

export default function OverviewContent() {
  const handleViewAllCertificates = () => {
    // TODO: Implement view all certificates functionality
    console.log("View all certificates clicked");
  };

  const handleCreateCertificate = () => {
    // TODO: Implement create certificate functionality
    console.log("Create certificate clicked");
  };

  const handleVerifyCertificate = () => {
    // TODO: Implement verify certificate functionality
    console.log("Verify certificate clicked");
  };

  const handleRenewCertificate = () => {
    // TODO: Implement renew certificate functionality
    console.log("Renew certificate clicked");
  };

  const quickActions = [
    {
      title: "Create Certificate",
      description: "Generate a new certificate",
      icon: <FilePlus size={16} />,
      onClick: handleCreateCertificate,
      variant: "primary" as const,
    },
    {
      title: "Verify Certificate",
      description: "Check certificate validity",
      icon: <Search size={16} />,
      onClick: handleVerifyCertificate,
      variant: "secondary" as const,
    },
    {
      title: "Renew Certificate",
      description: "Extend certificate validity",
      icon: <RefreshCcw size={16} />,
      onClick: handleRenewCertificate,
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="min-h-screen text-white p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Metrics Section */}
        <MetricsGrid metrics={dummyData.metrics} />

        {/* Main Content Grid */}
        <div className="rounded-lg border border-[#1E293B] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Certificate Activity Chart */}
            <div className="lg:col-span-7">
              <ChartContainer
                data={dummyData.chartData}
                title="Certificate Activity"
              />
            </div>

            {/* Recent Certificates */}
            <div className="lg:col-span-5">
              <CertificateList
                certificates={dummyData.recentCertificates}
                title="Recent Certificates"
                description="Recently created or updated certificates"
                onViewAll={handleViewAllCertificates}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActionsGrid actions={quickActions} className="mt-4 sm:mt-6" />
      </div>
    </div>
  );
}
