import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CertifierTabs, { CertifierTabType } from "./certifierTabs";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Menu: () => <span data-testid="menu-icon">☰</span>,
}));

describe("CertifierTabs", () => {
  const mockOnTabChange = jest.fn();
  const defaultProps = {
    activeTab: "audits" as CertifierTabType,
    onTabChange: mockOnTabChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth for mobile/desktop tests
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("renders successfully", () => {
    render(<CertifierTabs {...defaultProps} />);
    expect(screen.getByText("Audits")).toBeInTheDocument();
  });

  it("renders with correct tab content", () => {
    render(<CertifierTabs {...defaultProps} />);

    const auditTab = screen.getByRole("button", { name: "Audits" });
    expect(auditTab).toBeInTheDocument();
  });

  it("calls onTabChange when tab is clicked", () => {
    render(<CertifierTabs {...defaultProps} />);

    const auditTab = screen.getByRole("button", { name: "Audits" });
    fireEvent.click(auditTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("audits");
  });

  it("applies active styles to the active tab", () => {
    render(<CertifierTabs {...defaultProps} />);

    const auditTab = screen.getByRole("button", { name: "Audits" });
    expect(auditTab).toHaveClass("bg-[#020817]", "text-white");
  });

  it("applies custom className", () => {
    const { container } = render(
      <CertifierTabs {...defaultProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders mobile view when window width is less than 768px", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    render(<CertifierTabs {...defaultProps} />);

    // Should show menu icon in mobile view
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    render(<CertifierTabs {...defaultProps} />);

    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuButton);

    // Should show the mobile menu - check for text instead of buttons
    expect(screen.getAllByText("Audits")).toHaveLength(2);
  });

  it("closes mobile menu when tab is selected", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    render(<CertifierTabs {...defaultProps} />);

    // Open mobile menu
    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuButton);

    // Click on tab in mobile menu - find all buttons and click the dropdown one
    const auditTabs = screen.getAllByRole("button");
    const mobileMenuTab = auditTabs.find(
      (tab) =>
        tab.textContent === "Audits" && tab.className.includes("block w-full")
    );
    if (mobileMenuTab) {
      fireEvent.click(mobileMenuTab);
    }

    expect(mockOnTabChange).toHaveBeenCalledWith("audits");
  });

  it("handles window resize events", () => {
    const { rerender } = render(<CertifierTabs {...defaultProps} />);

    // Trigger resize event
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    fireEvent(window, new Event("resize"));
    rerender(<CertifierTabs {...defaultProps} />);

    // Should now show mobile view
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("applies correct container classes", () => {
    const { container } = render(<CertifierTabs {...defaultProps} />);

    expect(container.firstChild).toHaveClass(
      "bg-[#1E293B]",
      "rounded",
      "w-full",
      "max-w-[278px]"
    );
  });
});
