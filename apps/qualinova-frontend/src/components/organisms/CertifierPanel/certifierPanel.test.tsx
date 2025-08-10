import { render, screen, fireEvent } from "@testing-library/react";
import CertifierPanel from "./certifierPanel";

// Mock the child components
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
        <button onClick={() => onTabChange("audits")}>{activeTab}</button>
      </div>
    );
  };
});

jest.mock("./auditsContent", () => {
  return function MockAuditsContent() {
    return <div data-testid="audits-content">Audits Content</div>;
  };
});

describe("CertifierPanel", () => {
  it("renders the certifier panel with tabs and content", () => {
    render(<CertifierPanel />);

    expect(screen.getByTestId("certifier-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
  });

  it("displays audits content by default", () => {
    render(<CertifierPanel />);

    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
    expect(screen.getByText("Audits Content")).toBeInTheDocument();
  });

  it("handles tab changes correctly", () => {
    render(<CertifierPanel />);

    const tabButton = screen.getByRole("button");
    fireEvent.click(tabButton);

    // Should still show audits content as it's the only tab
    expect(screen.getByTestId("audits-content")).toBeInTheDocument();
  });
});
