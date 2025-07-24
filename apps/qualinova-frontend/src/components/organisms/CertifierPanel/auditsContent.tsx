import React, { useState } from "react";
import { Search, Funnel, RefreshCw } from "lucide-react";
import Button from "@/components/atoms/Button/button";
import Select from "@/components/atoms/Select/select";
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

type SortOption =
  | "All Audits"
  | "Sort by Date"
  | "Sort by Status"
  | "Sort by Company";

const AuditsContent = () => {
  const [audits, setAudits] = useState(initialAudits);
  const [total, setTotal] = useState(initialAudits.length);
  const [max, setMax] = useState(initialAudits.length);

  const sort: Record<SortOption, (msg: string) => void> = {
    "All Audits": (msg: string) => console.log(msg),
    "Sort by Date": (msg: string) => console.log(msg),
    "Sort by Status": (msg: string) => console.log(msg),
    "Sort by Company": (msg: string) => console.log(msg),
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
          <div className="h-10 px-2 w-full flex border border-dark-blue-border gap-2 rounded-lg items-center">
            <Search className="text-dark-blue-text text-xs h-5 w-5" />
            <input
              type="search"
              placeholder="Search by ID, company, certificate, or auditor..."
              className="bg-inherit w-full focus:outline-none placeholder:text-sm"
            />
          </div>

          <div className="flex h-10 items-center gap-2 w-full sm:w-auto">
            <div className="flex border h-10 border-dark-blue-border rounded-lg items-center px-3 gap-2 w-full sm:w-auto">
              <Funnel className="text-xs h-5 w-5" />
              <Select
                onChange={(e) => {
                  const key = e.target.value as SortOption;
                  sort[key](key + " from sort function");
                }}
                className="w-full sm:w-40 appearance-none border-none focus-visible:ring-0 focus:outline-none bg-inherit hover:cursor-pointer"
              >
                {Object.keys(sort).map((key) => (
                  <option key={key} value={key} className="text-black text-xs">
                    {key}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex border h-10 border-dark-blue-border rounded-lg items-center px-3 gap-2 w-full sm:w-auto">
              <Funnel className="text-xs h-5 w-5" />
              <Select
                onChange={(e) => {
                  const key = e.target.value as SortOption;
                  sort[key](key + " from sort function");
                }}
                className="w-full sm:w-40 appearance-none border-none focus-visible:ring-0 focus:outline-none bg-inherit hover:cursor-pointer"
              >
                {Object.keys(sort).map((key) => (
                  <option key={key} value={key} className="text-black text-xs">
                    {key}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AuditsTable audits={audits} />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-dark-blue-text text-sm">
            Showing {total} out of {max} audits
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditsContent;
