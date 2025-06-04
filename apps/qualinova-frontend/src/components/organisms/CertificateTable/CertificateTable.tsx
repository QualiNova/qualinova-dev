import CertificateRow from "@/components/molecules/CertificateRow/CertificateRow";

const CertificateTable = ({ certificates }: { certificates: any[] }) => (
  <div className="border-2 border-[#20293c] flex justify-center rounded-lg p-4 w-full">
    <table className="table-auto w-3/4 border-collapse">
      <thead>
        <tr className="space-x-3 border-[#20293c] *:py-5 text-left">
          <th>ID</th>
          <th className="w-1/4">Name</th>
          <th>Recipient</th>
          <th>Issue Date</th>
          <th>Expiry Date</th>
          <th>Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert, index) => (
          <CertificateRow key={index} cert={cert} />
        ))}
      </tbody>
    </table>
  </div>
);

export default CertificateTable;