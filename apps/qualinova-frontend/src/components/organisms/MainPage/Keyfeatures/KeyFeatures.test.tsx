import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KeyFeatures from "./KeyFeatures";

// Mock the FeatureCard component
jest.mock("@/components/atoms/Card/FeaturesCard", () => {
  return function MockFeatureCard({
    title,
    description,
    icon,
    iconBgColor,
    iconTextColor,
  }: any) {
    return (
      <div
        data-testid="feature-card"
        className={`${iconBgColor} ${iconTextColor}`}
      >
        <div data-testid="feature-icon">{icon}</div>
        <h3 data-testid="feature-title">{title}</h3>
        <p data-testid="feature-description">{description}</p>
      </div>
    );
  };
});

// Mock Next.js router if needed
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
    };
  },
}));

describe("KeyFeatures", () => {
  describe("Default Rendering", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("renders the default title", () => {
      expect(screen.getByText("Key Features")).toBeInTheDocument();
    });

    it("renders the default subtitle", () => {
      expect(
        screen.getByText(
          "Our platform offers a comprehensive suite of tools for certification management",
        ),
      ).toBeInTheDocument();
    });

    it("renders all three default feature cards", () => {
      expect(screen.getAllByTestId("feature-card")).toHaveLength(3);
    });

    it("renders default feature titles", () => {
      expect(screen.getByText("Secure Certification")).toBeInTheDocument();
      expect(screen.getByText("Instant Verification")).toBeInTheDocument();
      expect(screen.getByText("Comprehensive Management")).toBeInTheDocument();
    });

    it("renders default feature descriptions", () => {
      expect(
        screen.getByText(
          "Create tamper-proof certificates backed by blockchain technology",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Verify certificates instantly using ID or QR code scanning",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Manage all your certifications in one centralized dashboard",
        ),
      ).toBeInTheDocument();
    });

    it("renders SVG icons for each feature", () => {
      const icons = screen.getAllByTestId("feature-icon");
      expect(icons).toHaveLength(3);

      icons.forEach((icon) => {
        expect(icon.querySelector("svg")).toBeInTheDocument();
      });
    });
  });

  describe("Custom Props Rendering", () => {
    const customTitle = "Custom Features Title";
    const customSubtitle = "Custom subtitle for testing";
    const customFeatures = [
      {
        title: "Custom Feature 1",
        description: "Custom description 1",
        icon: <div data-testid="custom-icon-1">Custom Icon 1</div>,
        iconBgColor: "bg-red-500",
        iconTextColor: "text-red-100",
      },
      {
        title: "Custom Feature 2",
        description: "Custom description 2",
        icon: <div data-testid="custom-icon-2">Custom Icon 2</div>,
        iconBgColor: "bg-green-500",
        iconTextColor: "text-green-100",
      },
    ];

    beforeEach(() => {
      render(
        <KeyFeatures
          title={customTitle}
          subtitle={customSubtitle}
          features={customFeatures}
        />,
      );
    });

    it("renders custom title", () => {
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it("renders custom subtitle", () => {
      expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    });

    it("renders custom features", () => {
      expect(screen.getByText("Custom Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Custom Feature 2")).toBeInTheDocument();
      expect(screen.getByText("Custom description 1")).toBeInTheDocument();
      expect(screen.getByText("Custom description 2")).toBeInTheDocument();
    });

    it("renders custom feature count", () => {
      expect(screen.getAllByTestId("feature-card")).toHaveLength(2);
    });

    it("renders custom icons", () => {
      expect(screen.getByTestId("custom-icon-1")).toBeInTheDocument();
      expect(screen.getByTestId("custom-icon-2")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("has proper section background and spacing", () => {
      const section = screen.getByText("Key Features").closest("section");
      expect(section).toHaveClass("bg-gray-900", "pt-[12%]", "px-4");
    });

    it("has responsive container styling", () => {
      const container = screen
        .getByText("Key Features")
        .closest('div[class*="max-w-6xl"]');
      expect(container).toHaveClass("max-w-6xl", "mx-auto", "max-w-[75%]");
    });

    it("has proper header text styling", () => {
      const title = screen.getByText("Key Features");
      const subtitle = screen.getByText(
        "Our platform offers a comprehensive suite of tools for certification management",
      );

      expect(title).toHaveClass(
        "text-3xl",
        "md:text-4xl",
        "font-bold",
        "text-white",
        "mb-4",
      );
      expect(subtitle).toHaveClass(
        "max-w-2xl",
        "text-xl",
        "leading-7",
        "font-normal",
        "text-[#9CA3AF]",
        "mx-auto",
      );
    });

    it("has responsive grid layout", () => {
      const grid = screen.getAllByTestId("feature-card")[0].parentElement;
      expect(grid).toHaveClass(
        "grid",
        "grid-cols-1",
        "md:grid-cols-3",
        "gap-6",
      );
    });

    it("has proper text alignment", () => {
      const headerContainer = screen.getByText("Key Features").parentElement;
      expect(headerContainer).toHaveClass("text-center", "mb-12");
    });
  });

  describe("Default Features Data", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("passes correct props to FeatureCard components", () => {
      const featureCards = screen.getAllByTestId("feature-card");

      // Check first feature card
      expect(featureCards[0]).toHaveClass("bg-blue-900/50", "text-blue-400");

      // Check second feature card
      expect(featureCards[1]).toHaveClass("bg-green-900/50", "text-green-400");

      // Check third feature card
      expect(featureCards[2]).toHaveClass("bg-teal-900/50", "text-teal-400");
    });

    it("has correct SVG structure for security icon", () => {
      const securityIcon = screen
        .getByText("Secure Certification")
        .closest('[data-testid="feature-card"]')
        ?.querySelector('[data-testid="feature-icon"] svg');

      expect(securityIcon).toHaveClass("w-6", "h-6");
      expect(securityIcon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct SVG structure for verification icon", () => {
      const verificationIcon = screen
        .getByText("Instant Verification")
        .closest('[data-testid="feature-card"]')
        ?.querySelector('[data-testid="feature-icon"] svg');

      expect(verificationIcon).toHaveClass("w-6", "h-6");
      expect(verificationIcon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct SVG structure for management icon", () => {
      const managementIcon = screen
        .getByText("Comprehensive Management")
        .closest('[data-testid="feature-card"]')
        ?.querySelector('[data-testid="feature-icon"] svg');

      expect(managementIcon).toHaveClass("w-6", "h-6");
      expect(managementIcon).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  describe("Component Props Interface", () => {
    it("accepts optional title prop", () => {
      const { rerender } = render(<KeyFeatures />);
      expect(screen.getByText("Key Features")).toBeInTheDocument();

      rerender(<KeyFeatures title="New Title" />);
      expect(screen.getByText("New Title")).toBeInTheDocument();
      expect(screen.queryByText("Key Features")).not.toBeInTheDocument();
    });

    it("accepts optional subtitle prop", () => {
      const { rerender } = render(<KeyFeatures />);
      expect(
        screen.getByText(
          "Our platform offers a comprehensive suite of tools for certification management",
        ),
      ).toBeInTheDocument();

      rerender(<KeyFeatures subtitle="New subtitle" />);
      expect(screen.getByText("New subtitle")).toBeInTheDocument();
    });

    it("accepts optional features array prop", () => {
      const customFeature = [
        {
          title: "Test Feature",
          description: "Test Description",
          icon: <div>Test Icon</div>,
          iconBgColor: "bg-test",
          iconTextColor: "text-test",
        },
      ];

      render(<KeyFeatures features={customFeature} />);
      expect(screen.getByText("Test Feature")).toBeInTheDocument();
      expect(screen.getAllByTestId("feature-card")).toHaveLength(1);
    });

    it("handles empty features array", () => {
      render(<KeyFeatures features={[]} />);
      expect(screen.getAllByTestId("feature-card")).toHaveLength(0);
    });

    it("handles undefined features prop gracefully", () => {
      render(<KeyFeatures features={undefined} />);
      expect(screen.getAllByTestId("feature-card")).toHaveLength(3); // Falls back to default
    });
  });

  describe("Feature Data Structure", () => {
    it("validates feature object structure", () => {
      const validFeature = {
        title: "Valid Title",
        description: "Valid Description",
        icon: <div>Valid Icon</div>,
        iconBgColor: "bg-valid",
        iconTextColor: "text-valid",
      };

      render(<KeyFeatures features={[validFeature]} />);
      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("passes icon as ReactNode correctly", () => {
      const customIcon = (
        <span data-testid="custom-react-node">Custom React Node</span>
      );
      const featureWithCustomIcon = {
        title: "Feature with Custom Icon",
        description: "Description",
        icon: customIcon,
        iconBgColor: "bg-custom",
        iconTextColor: "text-custom",
      };

      render(<KeyFeatures features={[featureWithCustomIcon]} />);
      expect(screen.getByTestId("custom-react-node")).toBeInTheDocument();
    });
  });

  describe("Default Features Content", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("contains blockchain-related terminology", () => {
      expect(screen.getByText(/blockchain technology/i)).toBeInTheDocument();
      expect(screen.getByText(/tamper-proof/i)).toBeInTheDocument();
    });

    it("mentions verification capabilities", () => {
      expect(
        screen.getByText(/verify certificates instantly/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/QR code scanning/i)).toBeInTheDocument();
    });

    it("describes management features", () => {
      expect(screen.getByText(/centralized dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(/manage all your certifications/i),
      ).toBeInTheDocument();
    });
  });

  describe("SVG Icon Structure", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("all SVG icons have consistent structure", () => {
      const svgIcons = document.querySelectorAll(
        '[data-testid="feature-icon"] svg',
      );

      svgIcons.forEach((svg) => {
        expect(svg).toHaveClass("w-6", "h-6");
        expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
        expect(svg).toHaveAttribute("fill", "none");
        expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
      });
    });

    it("SVG paths have proper stroke attributes", () => {
      const svgPaths = document.querySelectorAll(
        '[data-testid="feature-icon"] svg path',
      );

      svgPaths.forEach((path) => {
        expect(path).toHaveAttribute("stroke", "currentColor");
        expect(path).toHaveAttribute("strokeWidth", "2");
        expect(path).toHaveAttribute("strokeLinecap", "round");
        expect(path).toHaveAttribute("strokeLinejoin", "round");
      });
    });
  });

  describe("Layout and Spacing", () => {
    beforeEach(() => {
      render(<KeyFeatures />);
    });

    it("maintains proper section structure", () => {
      const section = screen.getByText("Key Features").closest("section");
      const container = section?.querySelector('div[class*="max-w-6xl"]');
      const headerDiv = container?.querySelector('div[class*="text-center"]');
      const gridDiv = container?.querySelector('div[class*="grid"]');

      expect(section).toBeInTheDocument();
      expect(container).toBeInTheDocument();
      expect(headerDiv).toBeInTheDocument();
      expect(gridDiv).toBeInTheDocument();
    });

    it("has proper spacing between elements", () => {
      const headerContainer = screen.getByText("Key Features").parentElement;
      const title = screen.getByText("Key Features");

      expect(headerContainer).toHaveClass("mb-12");
      expect(title).toHaveClass("mb-4");
    });

    it("subtitle has proper max-width constraint", () => {
      const subtitle = screen.getByText(
        "Our platform offers a comprehensive suite of tools for certification management",
      );
      expect(subtitle).toHaveClass("max-w-2xl", "mx-auto");
    });
  });
});

// Integration and Performance Tests
describe("KeyFeatures Integration", () => {
  it("renders without crashing with minimal props", () => {
    expect(() => render(<KeyFeatures />)).not.toThrow();
  });

  it("renders without crashing with all props", () => {
    const props = {
      title: "Test Title",
      subtitle: "Test Subtitle",
      features: [
        {
          title: "Test Feature",
          description: "Test Description",
          icon: <div>Test Icon</div>,
          iconBgColor: "bg-test",
          iconTextColor: "text-test",
        },
      ],
    };

    expect(() => render(<KeyFeatures {...props} />)).not.toThrow();
  });

  it("maintains component state across re-renders", () => {
    const { rerender } = render(<KeyFeatures />);
    expect(screen.getByText("Key Features")).toBeInTheDocument();

    rerender(<KeyFeatures title="Updated Title" />);
    expect(screen.getByText("Updated Title")).toBeInTheDocument();
    expect(screen.getAllByTestId("feature-card")).toHaveLength(3);
  });

  it("properly passes all props to FeatureCard components", () => {
    render(<KeyFeatures />);

    const featureCards = screen.getAllByTestId("feature-card");
    expect(featureCards[0]).toHaveTextContent("Secure Certification");
    expect(featureCards[1]).toHaveTextContent("Instant Verification");
    expect(featureCards[2]).toHaveTextContent("Comprehensive Management");
  });
});
