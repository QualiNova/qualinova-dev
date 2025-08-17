import CertificateRow from '@/components/molecules/CertificateRow/certificateRow';
import { ArrowUpDown } from 'lucide-react';

const CertificateTable = ({ certificates }: { certificates: any[] }) => (
    <div className="border-2 border-dark-blue-border flex justify-center rounded-lg p-4 w-full">
        <table className="table-auto w-3/4 border-collapse">
            <thead className="text-dark-blue-text text-sm">
                <tr className="space-x-3 border-dark-blue-border *:py-5 text-left">
                    <th data-testid="id-header">ID</th>
                    <th data-testid="name-header" className="w-1/4 flex items-center gap-2">
                        Name
                        <span data-testid="sorting-icon">
                            <ArrowUpDown className="h-4 w-4 text-dark-blue-text" />
                        </span>
                    </th>
                    <th data-testid="recipient-header">Recipient</th>
                    <th data-testid="issue-date-header">Issue Date</th>
                    <th data-testid="expiry-date-header">Expiry Date</th>
                    <th data-testid="status-header">Status</th>
                    <th data-testid="actions-header" className="text-center">
                        Actions
                    </th>
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
