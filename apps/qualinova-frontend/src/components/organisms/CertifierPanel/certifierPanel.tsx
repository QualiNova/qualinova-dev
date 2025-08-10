import { useState, useEffect, useRef } from "react";
import CertifierTabs, {
  CertifierTabType,
} from "@/components/molecules/CertifierTabs/certifierTabs";
import AuditsContent from "./auditsContent";
import { AssignedCertificate } from "./mockAssignedCertificates";
import { initialAssignedCertificates } from "./mockAssignedCertificates";

const CertifierPanel = () => {
  const [activeTab, setActiveTab] = useState<CertifierTabType>("audits");
  const [tab, setTab] = useState<'assigned' | 'templates'>('assigned');
  const [certs, setCerts] = useState<AssignedCertificate[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Statuses');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: CertifierTabType) => {
    setActiveTab(tab);
  };

  // Initialize certs data
  useEffect(() => {
    setCerts(initialAssignedCertificates);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  // Filtering logic (simple, practical)
  const filtered = certs.filter(cert => {
    const matchesSearch =
      cert.id.toLowerCase().includes(search.toLowerCase()) ||
      cert.certificateType.toLowerCase().includes(search.toLowerCase()) ||
      cert.receivingCompany.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'All Statuses' || cert.status === status;
    return matchesSearch && matchesStatus;
  });

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
