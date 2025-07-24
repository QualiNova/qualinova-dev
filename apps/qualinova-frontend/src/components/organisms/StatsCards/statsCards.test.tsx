import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatsCards from "./statsCards";
import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Users: () => <span data-testid="users-icon">👥</span>,
  Clock: () => <span data-testid="clock-icon">🕐</span>,
  AlertTriangle: () => <span data-testid="alert-triangle-icon">⚠️</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">✅</span>,
}));

describe("StatsCards", () => {
  const mockMetrics = [
    {
      title: "Total Audits",
      count: 6,
      subtitle: "Registered audits",
      iconColor: "text-[#2563EB]",
      Icon: Users,
    },
    {
      title: "Pending",
      count: 2,
      subtitle: "Not started",
      iconColor: "text-[#F59E0B]",
      Icon: Clock,
    },
    {
      title: "In Process",
      count: 1,
      subtitle: "In progress",
      iconColor: "text-[#3B82F6]",
      Icon: AlertTriangle,
    },
    {
      title: "Completed",
      count: 2,
      subtitle: "Finished",
      iconColor: "text-[#10B981]",
      Icon: CheckCircle,
    },
  ];

  it("renders all metric cards correctly", () => {
    render(<StatsCards metrics={mockMetrics} />);

    // Check if all metric titles are rendered
    expect(screen.getByText("Total Audits")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("In Process")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("displays correct counts for each metric", () => {
    render(<StatsCards metrics={mockMetrics} />);

    // Check if all counts are displayed
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getAllByText("2")).toHaveLength(2); // Pending and Completed both have count 2
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("displays correct subtitles for each metric", () => {
    render(<StatsCards metrics={mockMetrics} />);

    // Check if all subtitles are rendered
    expect(screen.getByText("Registered audits")).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Finished")).toBeInTheDocument();
  });

  it("renders all icons correctly", () => {
    render(<StatsCards metrics={mockMetrics} />);

    // Check if all icons are rendered
    expect(screen.getByTestId("users-icon")).toBeInTheDocument();
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("alert-triangle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<StatsCards metrics={mockMetrics} />);

    // Check if the grid container has correct classes
    const gridContainer = container.querySelector("div");
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-4",
      "gap-4"
    );
  });

  it("renders correct number of metric cards", () => {
    render(<StatsCards metrics={mockMetrics} />);

    // Count the number of metric cards
    const metricCards = screen.getAllByText(
      /Total Audits|Pending|In Process|Completed/
    );
    expect(metricCards).toHaveLength(4);
  });

  it("handles empty metrics array", () => {
    render(<StatsCards metrics={[]} />);

    // Should render the grid container but no cards
    const { container } = render(<StatsCards metrics={[]} />);
    const gridContainer = container.querySelector("div");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.children).toHaveLength(0);
  });

  it("applies correct icon colors", () => {
    const { container } = render(<StatsCards metrics={mockMetrics} />);

    // Check if icon containers have correct color classes
    const iconContainers = container.querySelectorAll("div[class*='text-[#']");
    expect(iconContainers[0]).toHaveClass("text-[#2563EB]");
    expect(iconContainers[1]).toHaveClass("text-[#F59E0B]");
    expect(iconContainers[2]).toHaveClass("text-[#3B82F6]");
    expect(iconContainers[3]).toHaveClass("text-[#10B981]");
  });

  it("renders metric cards with correct structure", () => {
    const { container } = render(<StatsCards metrics={mockMetrics} />);

    // Check if each card has the correct structure
    const cards = container.querySelectorAll("div[class*='bg-[#1E293B]']");
    expect(cards).toHaveLength(4);

    cards.forEach((card) => {
      expect(card).toHaveClass(
        "bg-[#1E293B]",
        "rounded-lg",
        "p-4",
        "border",
        "border-[#1E293B]"
      );
    });
  });
});
