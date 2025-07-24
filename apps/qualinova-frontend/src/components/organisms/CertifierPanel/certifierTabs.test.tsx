import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CertifierTabs from "./certifierTabs";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Menu: () => <span data-testid="menu-icon">☰</span>,
}));

// Mock window.addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, "addEventListener", {
  writable: true,
  value: mockAddEventListener,
});

Object.defineProperty(window, "removeEventListener", {
  writable: true,
  value: mockRemoveEventListener,
});

describe("CertifierTabs", () => {
  const mockOnTabChange = jest.fn();
  const defaultProps = {
    activeTab: "audits" as const,
    onTabChange: mockOnTabChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth for desktop view
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("renders the audits tab", () => {
    render(<CertifierTabs {...defaultProps} />);
    expect(screen.getByText("Audits")).toBeInTheDocument();
  });

  it("highlights the active tab", () => {
    render(<CertifierTabs {...defaultProps} />);
    const auditsTab = screen.getByText("Audits");
    expect(auditsTab).toHaveClass("bg-[#020817]", "text-white");
  });

  it("calls onTabChange when a tab is clicked", () => {
    render(<CertifierTabs {...defaultProps} />);
    const auditsTab = screen.getByText("Audits");
    fireEvent.click(auditsTab);
    expect(mockOnTabChange).toHaveBeenCalledWith("audits");
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <CertifierTabs {...defaultProps} className="custom-class" />
    );
    const tabContainer = container.firstChild;
    expect(tabContainer).toHaveClass("custom-class");
  });

  it("renders desktop navigation by default", () => {
    render(<CertifierTabs {...defaultProps} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-icon")).not.toBeInTheDocument();
  });

  it("applies correct base styling classes", () => {
    const { container } = render(<CertifierTabs {...defaultProps} />);
    const tabContainer = container.firstChild;
    expect(tabContainer).toHaveClass(
      "bg-[#1E293B]",
      "rounded",
      "w-full",
      "max-w-[278px]"
    );
  });

  describe("mobile behavior", () => {
    beforeEach(() => {
      // Mock mobile screen width
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 640,
      });
    });

    it("shows mobile menu when in mobile view", () => {
      render(<CertifierTabs {...defaultProps} />);
      // Trigger resize event to activate mobile view
      fireEvent.resize(window);
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });

    it("displays active tab label in mobile view", () => {
      render(<CertifierTabs {...defaultProps} />);
      // The component should show the active tab name
      expect(screen.getByText("Audits")).toBeInTheDocument();
    });
  });

  it("sets up and cleans up resize event listener", () => {
    const { unmount } = render(<CertifierTabs {...defaultProps} />);

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
