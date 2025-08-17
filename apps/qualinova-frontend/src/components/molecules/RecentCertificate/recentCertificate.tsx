import { FileCheck, Clock, FileX } from 'lucide-react';
import StatusBadge from '@/components/atoms/StatusBadge/statusBadge';
import { Certificate } from '@/data/dashboardData';

const iconMap = {
    Verified: <FileCheck size={14} className="text-green-500" />,
    Pending: <Clock size={14} className="text-orange-500" />,
    Expired: <FileX size={14} className="text-red-500" />,
};

const RecentCertificate = ({ cert }: { cert: Certificate }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-800">
        <div>
            <div className="flex items-center gap-2">
                {iconMap[cert.status]}
                <h4 className="text-sm font-medium">{cert.name}</h4>
            </div>
            <p className="text-xs text-[#94A3B8]">{cert.company}</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-[#94A3B8] hidden sm:inline">{cert.date}</span>
            <StatusBadge status={cert.status} />
        </div>
    </div>
);

export default RecentCertificate;
