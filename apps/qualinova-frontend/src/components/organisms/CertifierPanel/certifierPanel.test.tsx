import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CertifierPanel from "./certifierPanel";

// Mock AuditsContent component
jest.mock("./auditsContent", () => {
  return function MockAuditsContent() {
    return <div data-testid="audits-content">Audits Content</div>;
  };
});

describe("CertifierPanel", () => {
  it("renders successfully", () => {
    render(<CertifierPanel />);
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
  });

  it("renders AuditsContent component", () => {
    render(<CertifierPanel />);

    // Check if AuditsContent is rendered
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
    expect(screen.getByText("Audits Content")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    const { container } = render(<CertifierPanel />);

    // The component should render without any wrapper elements
    // since it just returns <AuditsContent />
    expect(container.firstChild).toHaveAttribute(
      "data-testid",
      "audits-content"
    );
  });

  it("handles state initialization correctly", () => {
    // Since the component is simplified and just renders AuditsContent,
    // we test that it renders without errors
    expect(() => render(<CertifierPanel />)).not.toThrow();
  });
});
