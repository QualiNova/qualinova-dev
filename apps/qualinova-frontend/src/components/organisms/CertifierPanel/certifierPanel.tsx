import { useState } from "react";
// import CertifierTabs from "./certifierTabs";
import AuditsContent from "./auditsContent";
// import { RefreshCcw, PlusCircle, Menu } from "lucide-react";

export type CertifierTabType = "audits";

const CertifierPanel = () => {
  const [activeTab, setActiveTab] = useState<CertifierTabType>("audits");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: CertifierTabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "audits":
        return <AuditsContent />;
      default:
        return <AuditsContent />;
    }
  };

  return <AuditsContent />;
};

export default CertifierPanel;
