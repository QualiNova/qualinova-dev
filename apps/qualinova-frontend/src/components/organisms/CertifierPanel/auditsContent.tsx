import React, { useState } from "react";

import Button from "@/components/atoms/Button/button";
import SearchBar from "@/components/molecules/SearchBar/searchBar";
import FilterControls from "@/components/molecules/FilterControls/filterControls";
import PaginationControls from "@/components/molecules/PaginationControls/paginationControls";
import AuditsTable from "@/components/organisms/AuditsTable/auditsTable";

enum AuditStatus {
  Completed = "Completed",
  InProcess = "In Process",
  Pending = "Pending",
  WithObservations = "With Observations",
}

interface Audit {
  id: string;
  auditedCompany: string;
  relatedCertificate: string;
  assignedAuditor: string;
  auditDate: string;
  status: AuditStatus;
}

// Mock data based on the Figma design
const initialAudits: Audit[] = [
  {
    id: "AUD-2024-001",
    auditedCompany: "Acme Corporation",
    relatedCertificate: "ISO 9001 Quality Management",
    assignedAuditor: "María González",
    auditDate: "14/2/2024",
    status: AuditStatus.Completed,
  },
  {
    id: "AUD-2024-002",
    auditedCompany: "Tech Solutions Ltd.",
    relatedCertificate: "ISO 14001 Environmental Management",
    assignedAuditor: "Carlos Rodríguez",
    auditDate: "19/2/2024",
    status: AuditStatus.InProcess,
  },
  {
    id: "AUD-2024-003",
    auditedCompany: "Green Energy Corp.",
    relatedCertificate: "ISO 45001 Occupational Health & Safety",
    assignedAuditor: "Ana Martínez",
    auditDate: "24/2/2024",
    status: AuditStatus.Pending,
  },
  {
    id: "AUD-2024-004",
    auditedCompany: "Construction Plus Inc.",
    relatedCertificate: "Food Safety Management System",
    assignedAuditor: "Luis Fernández",
    auditDate: "9/2/2024",
    status: AuditStatus.WithObservations,
  },
  {
    id: "AUD-2024-005",
    auditedCompany: "Food Masters SA",
    relatedCertificate: "ISO 9001 Quality Management",
    assignedAuditor: "Patricia López",
    auditDate: "27/2/2024",
    status: AuditStatus.Pending,
  },
  {
    id: "AUD-2024-006",
    auditedCompany: "Digital Innovations",
    relatedCertificate: "Cybersecurity Framework Compliance",
    assignedAuditor: "Roberto Silva",
    auditDate: "4/2/2024",
    status: AuditStatus.Completed,
  },
];

const filterOptions = [
  { value: "All Audits", label: "All Audits" },
  { value: "Sort by Date", label: "Sort by Date" },
  { value: "Sort by Status", label: "Sort by Status" },
  { value: "Sort by Company", label: "Sort by Company" },
];

const AuditsContent = () => {
  const [audits, setAudits] = useState(initialAudits);
  const [searchTerm, setSearchTerm] = useState("");
  const [total] = useState(initialAudits.length);
  const [max] = useState(initialAudits.length);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // TODO: Implement actual search logic
    console.log("Searching for:", value);
  };

  const handleFilterChange = (value: string) => {
    // TODO: Implement actual filter logic
    console.log("Filter changed to:", value);
  };

  const handleRefresh = () => {
    // TODO: Implement actual refresh logic
    console.log("Refreshing data...");
    setAudits(initialAudits);
  };

  const handlePrevious = () => {
    // TODO: Implement pagination logic
    console.log("Previous page");
  };

  const handleNext = () => {
    // TODO: Implement pagination logic
    console.log("Next page");
  };

  return (
    <div className="p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div className="text-xl font-bold">Audits</div>
        <Button variant="secondary">
          <span className="mr-2 text-lg font-bold">+</span>
          <span>Assign New Audit</span>
        </Button>
      </div>

      {/* Management Panel */}
      <div className="border border-dark-blue-border p-4 space-y-5 rounded-lg">
        <div>
          <div>Audit Overview</div>
          <div className="text-[#717c91] text-xs">
            Complete list of all audits registered in the system
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <SearchBar
            placeholder="Search by ID, company, certificate, or auditor..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FilterControls
            options={filterOptions}
            onFilterChange={handleFilterChange}
            onRefresh={handleRefresh}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AuditsTable audits={audits} />
        </div>

        {/* Footer */}
        <PaginationControls
          currentCount={total}
          totalCount={max}
          onPrevious={handlePrevious}
          onNext={handleNext}
          itemName="audits"
        />
      </div>
    </div>
  );
};

export default AuditsContent;
