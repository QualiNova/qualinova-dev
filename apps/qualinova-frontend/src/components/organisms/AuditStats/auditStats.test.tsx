import { render, screen } from "@testing-library/react";
import AuditStats from "./auditStats";

// Mock the StatsCard component
jest.mock("../../molecules/StatsCard/statsCard", () => {
  return function MockStatsCard({
    title,
    count,
    subtitle,
  }: {
    title: string;
    count: number;
    subtitle: string;
  }) {
    return (
      <div data-testid="stats-card">
        <span>{title}</span>
        <span>{count}</span>
        <span>{subtitle}</span>
      </div>
    );
  };
});

describe("AuditStats", () => {
  const defaultProps = {
    totalAudits: 50,
    pendingAudits: 15,
    inProcessAudits: 20,
    completedAudits: 10,
  };

  it("renders all stats cards with correct data", () => {
    render(<AuditStats {...defaultProps} />);

    // Check if all stats cards are rendered
    expect(screen.getByText("Total Audits")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Registered audits")).toBeInTheDocument();

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();

    expect(screen.getByText("In Process")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Finished")).toBeInTheDocument();
  });

  it("applies correct grid layout classes", () => {
    const { container } = render(<AuditStats {...defaultProps} />);

    expect(container.firstChild).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-4",
      "gap-4"
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <AuditStats {...defaultProps} className="custom-stats" />
    );

    expect(container.firstChild).toHaveClass("custom-stats");
  });

  it("renders exactly 4 stats cards", () => {
    render(<AuditStats {...defaultProps} />);

    // Check for the presence of all 4 card titles
    const cardTitles = ["Total Audits", "Pending", "In Process", "Completed"];
    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("displays different count values correctly", () => {
    const customProps = {
      totalAudits: 100,
      pendingAudits: 25,
      inProcessAudits: 35,
      completedAudits: 40,
    };

    render(<AuditStats {...customProps} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });

  it("handles zero values correctly", () => {
    const zeroProps = {
      totalAudits: 0,
      pendingAudits: 0,
      inProcessAudits: 0,
      completedAudits: 0,
    };

    render(<AuditStats {...zeroProps} />);

    // Should render 4 zeros
    const zeroElements = screen.getAllByText("0");
    expect(zeroElements).toHaveLength(4);
  });
});
