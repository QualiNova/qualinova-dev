import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CertifierPanel from "./certifierPanel";

// Mock CertifierTabs component
jest.mock("../../molecules/CertifierTabs/certifierTabs", () => {
  return function MockCertifierTabs({
    activeTab,
    onTabChange,
  }: {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }) {
    return (
      <div data-testid="certifier-tabs">
        <button onClick={() => onTabChange("audits")}>Audits</button>
        <span data-testid="active-tab">{activeTab}</span>
      </div>
    );
  };
});

// Mock AuditsContent component
jest.mock("./auditsContent", () => {
  return function MockAuditsContent() {
    return <div data-testid="audits-content">Audits Content</div>;
  };
});

describe("CertifierPanel", () => {
  it("renders successfully", () => {
    render(<CertifierPanel />);
    expect(screen.getByTestId("certifier-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
  });

  it("renders CertifierTabs component", () => {
    render(<CertifierPanel />);

    expect(screen.getByTestId("certifier-tabs")).toBeInTheDocument();
    expect(screen.getByText("Audits")).toBeInTheDocument();
  });

  it("renders AuditsContent component by default", () => {
    render(<CertifierPanel />);

    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
    expect(screen.getByText("Audits Content")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    const { container } = render(<CertifierPanel />);

    // Should have main container with proper classes
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass("flex", "flex-col", "gap-6", "p-6");
  });

  it("handles tab change correctly", () => {
    render(<CertifierPanel />);

    // Check initial state
    expect(screen.getByTestId("active-tab")).toHaveTextContent("audits");

    // Click tab button
    fireEvent.click(screen.getByText("Audits"));

    // Should still show audits (since it's the only tab)
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
  });

  it("renders content section with correct structure", () => {
    const { container } = render(<CertifierPanel />);

    // Should have content wrapper
    const contentWrapper = container.querySelector(".flex-1");
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toContainElement(
      screen.getByTestId("audits-content")
    );
  });

  it("initializes with audits tab active", () => {
    render(<CertifierPanel />);

    expect(screen.getByTestId("active-tab")).toHaveTextContent("audits");
  });
});
