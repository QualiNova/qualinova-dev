
import { render, screen, fireEvent } from "@testing-library/react";
import CertifierPanel from "./certifierPanel";

// Mock the child components
jest.mock("@/components/molecules/CertifierTabs/certifierTabs", () => {
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
=======
import { render, screen, fireEvent } from '@testing-library/react';
import CertifierDashboard from './certifierPanel';
import { initialAssignedCertificates } from './mockAssignedCertificates';

describe('CertifierDashboard', () => {
  it('renders the tabs', () => {
    render(<CertifierDashboard />);
    expect(screen.getByRole('button', { name: 'Assigned Certificates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Certificate Templates' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Assigned Certificates' })).toBeInTheDocument();
  });

  it('renders the assigned certificates table with mock data and responsive headers', () => {
    render(<CertifierDashboard />);
    expect(screen.getByText('Certificate ID')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Certificate Type/ })).toBeInTheDocument();
    expect(screen.getByText('Receiving Company')).toBeInTheDocument();
    expect(screen.getByText('Assignment Date')).toBeInTheDocument();
    expect(screen.getByText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText(initialAssignedCertificates[0].id)).toBeInTheDocument();
    // Use getAllByText for certificateType (truncated, responsive)
    const certTypeCells = screen.getAllByText((content, node) =>
      node !== null && node.textContent === initialAssignedCertificates[0].certificateType
    );
    expect(certTypeCells.length).toBeGreaterThan(0);
    expect(screen.getByText(initialAssignedCertificates[0].receivingCompany)).toBeInTheDocument();
    // TODO: Add test for empty state and mobile responsiveness
  });

  it('shows and selects from the custom status dropdown', () => {
    render(<CertifierDashboard />);
    const dropdownButton = screen.getByRole('button', { name: /all statuses/i });
    fireEvent.click(dropdownButton);
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Expired')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Pending'));
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
    expect(dropdownButton).toHaveTextContent('Pending');
  });
});

