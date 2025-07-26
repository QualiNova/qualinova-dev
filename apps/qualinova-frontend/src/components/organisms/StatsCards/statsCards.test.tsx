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
  const mockProps = {
    title: "Total Audits",
    count: 6,
    subtitle: "Registered audits",
    iconColor: "text-[#2563EB]",
    Icon: Users,
  };

  it("renders the metric card correctly", () => {
    render(<StatsCards {...mockProps} />);

    // Check if the metric title is rendered
    expect(screen.getByText("Total Audits")).toBeInTheDocument();
  });

  it("displays correct count", () => {
    render(<StatsCards {...mockProps} />);

    // Check if the count is displayed
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("displays correct subtitle", () => {
    render(<StatsCards {...mockProps} />);

    // Check if the subtitle is rendered
    expect(screen.getByText("Registered audits")).toBeInTheDocument();
  });

  it("renders icon correctly", () => {
    render(<StatsCards {...mockProps} />);

    // Check if the icon is rendered
    expect(screen.getByTestId("users-icon")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<StatsCards {...mockProps} />);

    // Check if the card container has correct classes
    const cardContainer = container.querySelector("div");
    expect(cardContainer).toHaveClass(
      "rounded-lg",
      "p-4",
      "border",
      "border-[#1E293B]"
    );
  });

  it("applies correct icon color", () => {
    const { container } = render(<StatsCards {...mockProps} />);

    // Check if icon container has correct color class
    const iconContainer = container.querySelector("div[class*='text-[#']");
    expect(iconContainer).toHaveClass("text-[#2563EB]");
  });

  it("renders with correct component structure", () => {
    const { container } = render(<StatsCards {...mockProps} />);

    // Check if the card has the correct structure
    const card = container.querySelector("div");
    expect(card).toHaveClass("rounded-lg", "p-4", "border", "border-[#1E293B]");

    // Check for flex container - it's the direct child div inside the card
    const flexContainer = card?.querySelector("div");
    expect(flexContainer).toHaveClass("flex", "justify-between", "items-start");
  });

  it("handles different icon types correctly", () => {
    const clockProps = {
      ...mockProps,
      title: "Pending",
      count: 2,
      subtitle: "Not started",
      iconColor: "text-[#F59E0B]",
      Icon: Clock,
    };

    render(<StatsCards {...clockProps} />);

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
  });

  it("handles different count values", () => {
    const zeroCountProps = {
      ...mockProps,
      count: 0,
    };

    render(<StatsCards {...zeroCountProps} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("applies correct text styling classes", () => {
    const { container } = render(<StatsCards {...mockProps} />);

    // Check title styling
    const title = screen.getByText("Total Audits");
    expect(title).toHaveClass("text-[#94A3B8]", "text-sm");

    // Check count styling
    const count = screen.getByText("6");
    expect(count).toHaveClass("text-white", "text-2xl", "font-semibold");

    // Check subtitle styling
    const subtitle = screen.getByText("Registered audits");
    expect(subtitle).toHaveClass("text-[#94A3B8]", "text-xs");
  });
});
