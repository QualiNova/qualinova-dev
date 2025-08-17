import RecentCertificate from '@/components/molecules/RecentCertificate/recentCertificate';
import { Certificate } from '@/data/dashboardData';

const CertificateList = ({ certificates }: { certificates: Certificate[] }) => (
    <div className="space-y-2">
        {certificates.map((cert, i) => (
            <RecentCertificate key={i} cert={cert} />
        ))}
    </div>
);

export default CertificateList;
