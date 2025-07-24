import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuditsTable from "./auditsTable";

// Mock AuditRow component
jest.mock("../../molecules/AuditRow/auditRow", () => {
  return function MockAuditRow({ audit }: { audit: any }) {
    return (
      <tr data-testid="audit-row">
        <td>{audit.id}</td>
        <td>{audit.auditedCompany}</td>
        <td>{audit.status}</td>
      </tr>
    );
  };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowUpDown: () => <span data-testid="arrow-up-down">↕</span>,
}));

describe("AuditsTable", () => {
  const mockAudits = [
    {
      id: "AUD-2024-001",
      auditedCompany: "Acme Corporation",
      relatedCertificate: "ISO 9001 Quality Management",
      assignedAuditor: "María González",
      auditDate: "14/2/2024",
      status: "Completed",
    },
    {
      id: "AUD-2024-002",
      auditedCompany: "Tech Solutions Ltd.",
      relatedCertificate: "ISO 14001 Environmental Management",
      assignedAuditor: "Carlos Rodríguez",
      auditDate: "10/2/2024",
      status: "In Process",
    },
  ];

  it("renders table headers correctly", () => {
    render(<AuditsTable audits={mockAudits} />);

    expect(screen.getByText("Audit ID")).toBeInTheDocument();
    expect(screen.getByText("Audited Company")).toBeInTheDocument();
    expect(screen.getByText("Related Certificate")).toBeInTheDocument();
    expect(screen.getByText("Assigned Auditor")).toBeInTheDocument();
    expect(screen.getByText("Audit Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders correct number of audit rows", () => {
    render(<AuditsTable audits={mockAudits} />);
    const auditRows = screen.getAllByTestId("audit-row");
    expect(auditRows).toHaveLength(mockAudits.length);
  });

  it("renders empty table when no audits provided", () => {
    render(<AuditsTable audits={[]} />);
    const auditRows = screen.queryAllByTestId("audit-row");
    expect(auditRows).toHaveLength(0);
  });

  it("applies correct styling classes", () => {
    const { container } = render(<AuditsTable audits={mockAudits} />);
    const tableContainer = container.querySelector("div");
    const table = container.querySelector("table");

    expect(tableContainer).toHaveClass(
      "border-2",
      "border-dark-blue-border",
      "flex",
      "justify-center",
      "rounded-lg",
      "p-4",
      "w-full"
    );
    expect(table).toHaveClass("table-auto", "w-3/4", "border-collapse");
  });

  it("renders table head with correct styling", () => {
    const { container } = render(<AuditsTable audits={mockAudits} />);
    const thead = container.querySelector("thead");
    expect(thead).toHaveClass("text-dark-blue-text", "text-sm");
  });
});
