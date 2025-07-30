
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
=======
import { useState, useRef, useEffect } from 'react';
import { Search, Plus, ArrowUpDown, FileText, CircleCheckBig, CircleX, Clock4 } from 'lucide-react';
import { AssignedCertificate, initialAssignedCertificates } from './mockAssignedCertificates';

// TODO: Move to shared UI lib if reused
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Verified':
      return (
        <div className="px-2 py-1 rounded-xl text-xs flex items-center gap-1 text-green-700 bg-green-100">
          <CircleCheckBig className="h-4 w-4" />
          Verified
        </div>
      );
    case 'Pending':
      return (
        <div className="px-2 py-1 rounded-xl text-xs flex items-center gap-1 text-orange-700 bg-orange-100">
          <Clock4 className="h-4 w-4" />
          Pending
        </div>
      );
    case 'Expired':
      return (
        <div className="px-2 py-1 rounded-xl text-xs flex items-center gap-1 text-white bg-red-600">
          <CircleX className="h-4 w-4" />
          Expired
        </div>
      );
    default:
      return <div className="px-2 py-1 rounded-xl text-xs">{status}</div>;
  }
};

const AssignedCertificateRow = ({ certificate }: { certificate: AssignedCertificate }) => (
  <tr className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
    <td className="py-4 px-2 text-gray-300 text-xs sm:text-sm truncate max-w-[120px]">{certificate.id}</td>
    <td className="py-4 px-2">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm truncate max-w-[160px]">
        <FileText className="h-4 w-4 text-gray-400" />
        <span className="truncate">{certificate.certificateType}</span>
      </div>
    </td>
    <td className="py-4 px-2 text-gray-300 text-xs sm:text-sm truncate max-w-[140px]">{certificate.receivingCompany}</td>
    <td className="py-4 px-2 text-gray-300 text-xs sm:text-sm">{certificate.assignmentDate}</td>
    <td className="py-4 px-2 text-gray-300 text-xs sm:text-sm">{certificate.expirationDate}</td>
    <td className="py-4 px-2 text-center">
      <StatusBadge status={certificate.status} />
    </td>
  </tr>
);

const CertifierPanel = () => {
  const [tab, setTab] = useState<'assigned' | 'templates'>('assigned');
  const [certs, setCerts] = useState(initialAssignedCertificates);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Statuses');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with real status options if backend provides them
  const statusOptions = ['All Statuses', 'Verified', 'Pending', 'Expired'];

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

  // TODO: Add pagination if list grows large

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-8xl">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg p-1 w-fit">
            <nav className="flex">
              <button
                onClick={() => setTab('assigned')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === 'assigned'
                    ? 'bg-white text-gray-900 shadow'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
              >
                Assigned Certificates
              </button>
              <button
                onClick={() => setTab('templates')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === 'templates'
                    ? 'bg-white text-gray-900 shadow'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
              >
                Certificate Templates
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {tab === 'assigned' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Assigned Certificates</h2>
                <p className="text-gray-400 text-sm mt-1">
                  List of all certificates assigned to companies
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="h-10 px-3 w-full flex border border-gray-600 gap-2 rounded-lg items-center bg-transparent">
                    <Search className="text-gray-400 h-5 w-5" />
                    <input
                      type="search"
                      placeholder="Search certificates or companies..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="bg-inherit w-full focus:outline-none placeholder:text-sm text-white"
                    />
                  </div>
                </div>
                <div className="flex h-10 items-center relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex items-center gap-2 border h-10 border-gray-600 rounded-lg px-3 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setDropdownOpen(open => !open)}
                  >
                    {status}
                    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-gray-800 border-2 rounded-lg border-gray-500 shadow-lg z-10 py-1">
                      {statusOptions.map(option => (
                        <button
                          key={option}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-900 focus:bg-gray-100 ${status === option ? 'font-semibold text-blue-600' : 'text-white'}`}
                          onClick={() => {
                            setStatus(option);
                            setDropdownOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="border border-gray-600 rounded-lg overflow-x-auto">
                <table className="table-auto min-w-[700px] w-full border-collapse">
                  <thead className="bg-gray-800">
                    <tr className="text-left">
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium">Certificate ID</th>
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium">
                        <div className="flex items-center gap-2">
                          Certificate Type
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium">Receiving Company</th>
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium">Assignment Date</th>
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium">Expiration Date</th>
                      <th className="py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900">
                    {filtered.map((certificate, idx) => (
                      <AssignedCertificateRow key={certificate.id + idx} certificate={certificate} />
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>No certificates found matching the applied filters.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Certificate Templates</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Certificate template management
                </p>
              </div>
              <div className="text-center py-16 text-gray-400 border border-gray-600 rounded-lg">
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <p className="text-lg mb-2">Certificate Templates</p>
                <p className="text-sm">Certificate templates will be available soon</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CertifierPanel;

