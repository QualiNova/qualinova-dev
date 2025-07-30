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

    // Main wrapper
    const mainWrapper = container.querySelector("div");
    expect(mainWrapper).toHaveClass("w-full");

    // Desktop table container
    const desktopContainer = container.querySelector("div.hidden.md\\:flex");
    expect(desktopContainer).toHaveClass(
      "hidden",
      "md:flex",
      "border-2",
      "border-dark-blue-border",
      "justify-center",
      "rounded-lg",
      "p-4"
    );

    // Table
    const table = container.querySelector("table");
    expect(table).toHaveClass("table-auto", "w-3/4", "border-collapse");

    // Mobile container
    const mobileContainer = container.querySelector("div.md\\:hidden");
    expect(mobileContainer).toHaveClass("md:hidden", "space-y-4");
  });

  it("renders table head with correct styling", () => {
    const { container } = render(<AuditsTable audits={mockAudits} />);
    const thead = container.querySelector("thead");
    expect(thead).toHaveClass("text-dark-blue-text", "text-sm");
  });
});
