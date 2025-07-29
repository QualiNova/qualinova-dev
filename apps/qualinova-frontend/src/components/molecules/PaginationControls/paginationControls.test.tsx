import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "./paginationControls";

describe("PaginationControls", () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    mockOnPrevious.mockClear();
    mockOnNext.mockClear();
  });

  it("renders count information with default item name", () => {
    render(<PaginationControls currentCount={10} totalCount={50} />);

    expect(screen.getByText("Showing 10 out of 50 items")).toBeInTheDocument();
  });

  it("renders count information with custom item name", () => {
    render(
      <PaginationControls currentCount={5} totalCount={25} itemName="audits" />
    );

    expect(screen.getByText("Showing 5 out of 25 audits")).toBeInTheDocument();
  });

  it("renders Previous and Next buttons", () => {
    render(<PaginationControls currentCount={10} totalCount={50} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPrevious when Previous button is clicked", () => {
    render(
      <PaginationControls
        currentCount={10}
        totalCount={50}
        onPrevious={mockOnPrevious}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it("calls onNext when Next button is clicked", () => {
    render(
      <PaginationControls
        currentCount={10}
        totalCount={50}
        onNext={mockOnNext}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PaginationControls
        currentCount={10}
        totalCount={50}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("buttons have correct styling classes", () => {
    render(<PaginationControls currentCount={10} totalCount={50} />);

    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    expect(previousButton).toHaveClass("w-full", "sm:w-auto");
    expect(nextButton).toHaveClass("w-full", "sm:w-auto");
  });
});
