import { render, screen, fireEvent } from "@testing-library/react";
import CertifierTabs from "./certifierTabs";

describe("CertifierTabs", () => {
  const mockOnTabChange = jest.fn();

  const defaultProps = {
    activeTab: "audits" as const,
    onTabChange: mockOnTabChange,
  };

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it("renders the audits tab", () => {
    render(<CertifierTabs {...defaultProps} />);
    expect(screen.getByText("Audits")).toBeInTheDocument();
  });

  it("calls onTabChange when a tab is clicked", () => {
    render(<CertifierTabs {...defaultProps} />);

    const auditsTab = screen.getByText("Audits");
    fireEvent.click(auditsTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("audits");
  });

  it("applies custom className when provided", () => {
    render(<CertifierTabs {...defaultProps} className="custom-class" />);

    const container = screen.getByText("Audits").closest("div");
    expect(container).toHaveClass("custom-class");
  });

  it("shows active tab styling", () => {
    render(<CertifierTabs {...defaultProps} />);

    const auditsTab = screen.getByText("Audits");
    expect(auditsTab).toHaveClass("bg-[#020817]", "text-white");
  });
});
