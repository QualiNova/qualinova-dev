import { render, screen, fireEvent } from "@testing-library/react";
import FilterControls from "./filterControls";

const mockOptions = [
  { value: "all", label: "All Items" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

describe("FilterControls", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnRefresh.mockClear();
  });

  it("renders all filter options", () => {
    render(<FilterControls options={mockOptions} />);

    expect(screen.getByText("All Items")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("calls onFilterChange when filter is changed", () => {
    render(
      <FilterControls
        options={mockOptions}
        onFilterChange={mockOnFilterChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "active" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("active");
  });

  it("calls onRefresh when refresh button is clicked", () => {
    render(<FilterControls options={mockOptions} onRefresh={mockOnRefresh} />);

    // Find the refresh button by its container
    const refreshButton =
      screen.getByRole("combobox").parentElement?.parentElement
        ?.nextElementSibling;
    expect(refreshButton).toBeInTheDocument();

    if (refreshButton) {
      fireEvent.click(refreshButton);
      expect(mockOnRefresh).toHaveBeenCalled();
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <FilterControls options={mockOptions} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders filter and refresh icons", () => {
    render(<FilterControls options={mockOptions} />);

    // Check if the filter and refresh icons are present
    const icons = screen
      .getByRole("combobox")
      .parentElement?.parentElement?.querySelectorAll("svg");
    expect(icons).toHaveLength(2); // Filter icon and refresh icon
  });
});
