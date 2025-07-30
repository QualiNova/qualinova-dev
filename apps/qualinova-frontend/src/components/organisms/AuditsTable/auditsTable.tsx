import AuditRow from "@/components/molecules/AuditRow/auditRow";

interface Audit {
  id: string;
  auditedCompany: string;
  relatedCertificate: string;
  assignedAuditor: string;
  auditDate: string;
  status: string;
}

interface AuditsTableProps {
  audits: Audit[];
}

const AuditsTable = ({ audits }: AuditsTableProps) => (
  <div className="w-full">
    {/* Desktop Table */}
    <div className="hidden md:flex border-2 border-dark-blue-border justify-center rounded-lg p-4">
      <table className="table-auto w-3/4 border-collapse">
        <thead className="text-dark-blue-text text-sm">
          <tr className="space-x-5 border-dark-blue-border *:py-5 text-left">
            <th>Audit ID</th>
            <th>Audited Company</th>
            <th>Related Certificate</th>
            <th>Assigned Auditor</th>
            <th>Audit Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit, index) => (
            <AuditRow key={index} audit={audit} />
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Card View */}
    <div className="md:hidden space-y-4">
      {audits.map((audit, index) => (
        <div
          key={index}
          className="bg-dark-blue border border-dark-blue-border rounded-lg p-4 text-white"
        >
          <p>
            <span className="font-semibold">ID:</span> {audit.id}
          </p>
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {audit.auditedCompany}
          </p>
          <p>
            <span className="font-semibold">Certificate:</span>{" "}
            {audit.relatedCertificate}
          </p>
          <p>
            <span className="font-semibold">Auditor:</span>{" "}
            {audit.assignedAuditor}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {audit.auditDate}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {audit.status}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AuditsTable;
