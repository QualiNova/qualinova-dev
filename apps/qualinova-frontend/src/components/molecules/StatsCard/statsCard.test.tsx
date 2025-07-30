import { render, screen } from "@testing-library/react";
import { FileText } from "lucide-react";
import StatsCard from "./statsCard";

describe("StatsCard", () => {
  const defaultProps = {
    title: "Total Audits",
    count: 25,
    subtitle: "Registered audits",
    iconColor: "text-blue-500",
    Icon: FileText,
  };

  it("renders all content correctly", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Total Audits")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Registered audits")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsCard {...defaultProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies correct icon color class", () => {
    render(<StatsCard {...defaultProps} iconColor="text-red-500" />);

    const iconContainer = screen
      .getByText("25")
      .parentElement?.parentElement?.querySelector(".text-red-500");
    expect(iconContainer).toBeInTheDocument();
  });

  it("renders icon component", () => {
    render(<StatsCard {...defaultProps} />);

    // Check if the icon container is rendered with correct color class
    const iconContainer = document.querySelector(".text-blue-500");
    expect(iconContainer).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    const { container } = render(<StatsCard {...defaultProps} />);

    expect(container.firstChild).toHaveClass(
      "rounded-lg",
      "p-4",
      "border",
      "border-[#1E293B]"
    );
  });

  it("displays count as heading", () => {
    render(<StatsCard {...defaultProps} count={100} />);

    const countElement = screen.getByText("100");
    expect(countElement).toHaveClass("text-2xl", "font-semibold");
  });
});
