import { useState } from "react";
import CertifierTabs, {
  CertifierTabType,
} from "@/components/molecules/CertifierTabs/certifierTabs";
import AuditsContent from "./auditsContent";

const CertifierPanel = () => {
  const [activeTab, setActiveTab] = useState<CertifierTabType>("audits");

  const handleTabChange = (tab: CertifierTabType) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "audits":
        return <AuditsContent />;
      default:
        return <AuditsContent />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <CertifierTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default CertifierPanel;
