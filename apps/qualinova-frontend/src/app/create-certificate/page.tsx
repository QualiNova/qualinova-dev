import CreateCertificatePage from '@/components/templates/CreateCertificate/createCertificatePage';
import { CreateCertificateProvider } from '@/contexts/createCertificateContext';

export default function CreateCertificate() {
    return (
        <CreateCertificateProvider>
            <CreateCertificatePage />
        </CreateCertificateProvider>
    );
}
