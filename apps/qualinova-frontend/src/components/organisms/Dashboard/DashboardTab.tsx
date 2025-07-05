import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import TabButton from "@/components/atoms/TabButton/TabButton";

// Define the tab types
type TabType = "overview" | "analytics" | "reports";

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

const DashboardTabs = ({
  activeTab,
  onTabChange,
  className,
}: DashboardTabsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
  ];

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`bg-[#1E293B] rounded w-full max-w-[278px] ${className || ""}`}
    >
      {/* Mobile view */}
      {isMobile ? (
        <div>
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium text-gray-200">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </span>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-2 py-1 bg-[#1E293B] rounded-md shadow-lg">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="block w-full text-left"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Desktop view - styled to match the design */
        <nav className="flex flex-wrap">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </nav>
      )}
    </div>
  );
};

export default DashboardTabs;
