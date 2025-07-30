import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuditRow from "./auditRow";

// Mock StatusBadge component
jest.mock("../../atoms/StatusBadge/statusBadge", () => {
  return function MockStatusBadge({ status }: { status: string }) {
    return <span data-testid="status-badge">{status}</span>;
  };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Eye: () => <span data-testid="eye-icon">👁</span>,
}));

describe("AuditRow", () => {
  const mockAudit = {
    id: "AUD-2024-001",
    auditedCompany: "Acme Corporation",
    relatedCertificate: "ISO 9001 Quality Management",
    assignedAuditor: "María González",
    auditDate: "14/2/2024",
    status: "Completed",
  };

  const renderWithTable = (children: React.ReactNode) => {
    return render(
      <table>
        <tbody>{children}</tbody>
      </table>
    );
  };

  it("renders all audit information correctly", () => {
    renderWithTable(<AuditRow audit={mockAudit} />);

    // Check if all audit data is rendered
    expect(screen.getByText(mockAudit.id)).toBeInTheDocument();
    expect(screen.getByText(mockAudit.auditedCompany)).toBeInTheDocument();
    expect(screen.getByText(mockAudit.relatedCertificate)).toBeInTheDocument();
    expect(screen.getByText(mockAudit.assignedAuditor)).toBeInTheDocument();
    expect(screen.getByText(mockAudit.auditDate)).toBeInTheDocument();
  });

  it("renders the View Details button with eye icon", () => {
    renderWithTable(<AuditRow audit={mockAudit} />);

    expect(
      screen.getByRole("button", { name: /view details/i })
    ).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  it("renders the StatusBadge component with correct status", () => {
    renderWithTable(<AuditRow audit={mockAudit} />);
    expect(screen.getByTestId("status-badge")).toHaveTextContent(
      mockAudit.status
    );
  });

  it("applies correct styling classes", () => {
    renderWithTable(<AuditRow audit={mockAudit} />);
    const tableRow = screen.getByRole("row");
    expect(tableRow).toHaveClass(
      "space-x-3",
      "border-dark-blue-border",
      "border-t"
    );
  });

  it("applies correct button styling", () => {
    render(<AuditRow audit={mockAudit} />);

    const button = screen.getByRole("button", { name: /view details/i });

    expect(button).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "gap-2",
      "px-3",
      "py-2",
      "bg-[#1E293B]",
      "hover:bg-[#334155]",
      "rounded-xl",
      "transition-colors",
      "border",
      "border-[#334155]",
      "text-[#F8FAFC]",
      "text-sm"
    );
  });

  it("handles missing audit data gracefully", () => {
    const incompleteAudit = {
      id: "AUD-2024-002",
      auditedCompany: "",
      relatedCertificate: "",
      assignedAuditor: "",
      auditDate: "",
      status: "Pending",
    };

    renderWithTable(<AuditRow audit={incompleteAudit} />);
    expect(screen.getByText("AUD-2024-002")).toBeInTheDocument();
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Pending");
    expect(
      screen.getByRole("button", { name: /view details/i })
    ).toBeInTheDocument();
  });
});
