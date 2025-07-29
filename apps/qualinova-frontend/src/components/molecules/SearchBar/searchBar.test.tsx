import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./searchBar";

describe("SearchBar", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with default placeholder", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchBar placeholder="Search audits..." />);
    expect(screen.getByPlaceholderText("Search audits...")).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<SearchBar value="test search" />);
    expect(screen.getByDisplayValue("test search")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(<SearchBar onChange={mockOnChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "new search" } });

    expect(mockOnChange).toHaveBeenCalledWith("new search");
  });

  it("applies custom className", () => {
    render(<SearchBar className="custom-class" />);

    const container = screen.getByRole("searchbox").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("renders search icon", () => {
    render(<SearchBar />);

    // Check if the search icon is present by looking for the Lucide search icon
    const searchIcon = screen
      .getByRole("searchbox")
      .parentElement?.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });
});
