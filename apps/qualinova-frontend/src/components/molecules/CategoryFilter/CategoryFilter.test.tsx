import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { CategoryFilter } from "./CategoryFilter";

describe("CategoryFilter", () => {
  const mockCategories = [
    { id: "all", label: "All Categories", icon: "📋" },
    { id: "certs", label: "Certificates", icon: "📜" },
    { id: "verify", label: "Verification", icon: "✅" },
  ];

  it("renders all categories", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={jest.fn()}
      />
    );

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("Verification")).toBeInTheDocument();
  });

  it("renders category icons", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={jest.fn()}
      />
    );

    expect(screen.getByText("📋")).toBeInTheDocument();
    expect(screen.getByText("📜")).toBeInTheDocument();
    expect(screen.getByText("✅")).toBeInTheDocument();
  });

  it("highlights active category", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="certs"
        onCategoryChange={jest.fn()}
      />
    );

    expect(screen.getByText("Certificates").closest("button")).toHaveClass(
      "bg-blue-600"
    );
  });

  it("calls onCategoryChange when category is clicked", () => {
    const mockOnCategoryChange = jest.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    fireEvent.click(screen.getByText("Verification"));
    expect(mockOnCategoryChange).toHaveBeenCalledWith("verify");
  });
});
