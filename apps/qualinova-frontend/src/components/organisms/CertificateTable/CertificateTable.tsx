import CertificateRow from '@/components/molecules/CertificateRow/CertificateRow';
import { ArrowUpDown } from 'lucide-react';

const CertificateTable = ({ certificates }: { certificates: any[] }) => (
  <div className="border-2 border-dark-blue-border flex justify-center rounded-lg p-4 w-full">
    <table className="table-auto w-3/4 border-collapse">
      <thead className="text-dark-blue-text text-sm">
        <tr className="space-x-3 border-dark-blue-border *:py-5 text-left">
          <th>ID</th>
          <th className="w-1/4 flex items-center gap-2">
            Name
            <span>
              <ArrowUpDown className="h-4 w-4 text-dark-blue-text" />
            </span>
          </th>
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
