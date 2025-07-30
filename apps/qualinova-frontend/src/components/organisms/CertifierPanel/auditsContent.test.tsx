import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuditsContent from "./auditsContent";

// Mock child components
jest.mock("../../atoms/Button/button", () => {
  return function MockButton({
    children,
    variant,
    type,
    className,
    ...props
  }: React.ComponentProps<"button"> & { variant?: string }) {
    return (
      <button
        data-testid="button"
        data-variant={variant}
        data-type={type}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  };
});

jest.mock("../../atoms/Select/select", () => {
  return function MockSelect({
    children,
    onChange,
    className,
    ...props
  }: React.ComponentProps<"select">) {
    return (
      <select
        data-testid="select"
        onChange={onChange}
        className={className}
        {...props}
      >
        {children}
      </select>
    );
  };
});

jest.mock("../AuditsTable/auditsTable", () => {
  return function MockAuditsTable({ audits }: { audits: Array<unknown> }) {
    return (
      <div data-testid="audits-table">
        Audits Table - {audits.length} audits
      </div>
    );
  };
});

jest.mock("../AuditStats/auditStats", () => {
  return function MockAuditStats({
    totalAudits,
    pendingAudits,
    inProcessAudits,
    completedAudits,
  }: {
    totalAudits: number;
    pendingAudits: number;
    inProcessAudits: number;
    completedAudits: number;
  }) {
    return (
      <div data-testid="audit-stats">
        <div>Total Audits: {totalAudits}</div>
        <div>Pending: {pendingAudits}</div>
        <div>In Process: {inProcessAudits}</div>
        <div>Completed: {completedAudits}</div>
      </div>
    );
  };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Search: () => <span data-testid="search-icon">🔍</span>,
  Funnel: () => <span data-testid="funnel-icon">🔽</span>,
  RefreshCw: () => <span data-testid="refresh-icon">🔄</span>,
  FileText: () => <span data-testid="file-text-icon">📄</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  Building2: () => <span data-testid="building-icon">🏢</span>,
}));

describe("AuditsContent", () => {
  it("renders the main header correctly", () => {
    render(<AuditsContent />);

    expect(screen.getByText("Audits")).toBeInTheDocument();
    expect(screen.getByText("Assign New Audit")).toBeInTheDocument();
  });

  it("renders audit statistics", () => {
    render(<AuditsContent />);

    // Check that the audit statistics are rendered with the mocked format
    expect(screen.getByText("Total Audits: 6")).toBeInTheDocument();
    expect(screen.getByText("Pending: 2")).toBeInTheDocument();
    expect(screen.getByText("In Process: 1")).toBeInTheDocument();
    expect(screen.getByText("Completed: 2")).toBeInTheDocument();

    // Check that the audit stats component is rendered
    expect(screen.getByTestId("audit-stats")).toBeInTheDocument();
  });

  it("renders the management panel section", () => {
    render(<AuditsContent />);

    expect(screen.getByText("Audit Overview")).toBeInTheDocument();
    expect(
      screen.getByText("Complete list of all audits registered in the system")
    ).toBeInTheDocument();
  });

  it("renders search input with correct placeholder", () => {
    render(<AuditsContent />);

    const searchInput = screen.getByPlaceholderText(
      "Search by ID, company, certificate, or auditor..."
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "search");
  });

  it("renders search icon", () => {
    render(<AuditsContent />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders filter select dropdown", () => {
    render(<AuditsContent />);

    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();

    // Check if all filter options are present
    expect(screen.getByText("All Audits")).toBeInTheDocument();
    expect(screen.getByText("Sort by Date")).toBeInTheDocument();
    expect(screen.getByText("Sort by Status")).toBeInTheDocument();
    expect(screen.getByText("Sort by Company")).toBeInTheDocument();
  });

  it("renders funnel and refresh icons", () => {
    render(<AuditsContent />);

    expect(screen.getByTestId("funnel-icon")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
  });

  it("renders audits table with correct data", () => {
    render(<AuditsContent />);

    const auditsTable = screen.getByTestId("audits-table");
    expect(auditsTable).toBeInTheDocument();
    expect(auditsTable).toHaveTextContent("Audits Table - 6 audits");
  });

  it("renders footer with pagination info", () => {
    render(<AuditsContent />);

    expect(screen.getByText("Showing 6 out of 6 audits")).toBeInTheDocument();

    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("renders all action buttons correctly", () => {
    render(<AuditsContent />);

    const buttons = screen.getAllByTestId("button");

    // Should have: Assign New Audit, Previous, Next buttons
    expect(buttons).toHaveLength(3);

    // Check button variants
    const assignButton = buttons.find((btn) =>
      btn.textContent?.includes("Assign New Audit")
    );
    const prevButton = buttons.find((btn) => btn.textContent === "Previous");
    const nextButton = buttons.find((btn) => btn.textContent === "Next");

    expect(assignButton).toHaveAttribute("data-variant", "secondary");
    expect(prevButton).toHaveAttribute("data-variant", "outline");
    expect(nextButton).toHaveAttribute("data-variant", "outline");
  });

  it("handles filter select change", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<AuditsContent />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "Sort by Date" } });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Filter changed to:",
      "Sort by Date"
    );

    consoleSpy.mockRestore();
  });

  it("applies correct responsive classes", () => {
    const { container } = render(<AuditsContent />);

    // Check main container classes
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass("p-4", "sm:p-5", "space-y-4");
  });

  it("renders with correct component structure", () => {
    const { container } = render(<AuditsContent />);

    // Check if main sections are present
    expect(
      container.querySelector('[class*="flex"][class*="justify-between"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        '[class*="border"][class*="border-dark-blue-border"]'
      )
    ).toBeInTheDocument();
    expect(
      container.querySelector('[class*="overflow-x-auto"]')
    ).toBeInTheDocument();
  });

  it("handles search input correctly", () => {
    render(<AuditsContent />);

    const searchInput = screen.getByPlaceholderText(
      "Search by ID, company, certificate, or auditor..."
    );

    // Test that input accepts text
    fireEvent.change(searchInput, { target: { value: "AUD-2024" } });
    expect(searchInput).toHaveValue("AUD-2024");
  });

  it("renders mobile responsive elements", () => {
    const { container } = render(<AuditsContent />);

    // Check for responsive classes
    const headerContainer = container.querySelector(
      '[class*="flex-col"][class*="sm:flex-row"]'
    );
    expect(headerContainer).toBeInTheDocument();

    const searchContainer = container.querySelector(
      '[class*="flex-col"][class*="sm:flex-row"]'
    );
    expect(searchContainer).toBeInTheDocument();
  });
});
