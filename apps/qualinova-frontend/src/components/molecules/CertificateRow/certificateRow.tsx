import StatusBadge from '@/components/atoms/StatusBadge/statusBadge';
import { FileText } from 'lucide-react';

const CertificateRow = ({ cert }: { cert: any }) => (
    <tr className="space-x-3 border-dark-blue-border *: *:py-5 border-t">
        <td>{cert.id}</td>
        <td className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-dark-blue-text" />
            {cert.name}
        </td>
        <td>{cert.recipient}</td>
        <td>{cert.issue_date}</td>
        <td>{cert.expiry_date}</td>
        <td className="text-center">
            <StatusBadge status={cert.status} />
        </td>
        <td className="text-center">{cert.actions}</td>
    </tr>
);

export default CertificateRow;
