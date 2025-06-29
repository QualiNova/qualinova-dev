import CreateCertificatePage from "@/components/templates/CreateCertificate/CreateCertificatePage";
import { CreateCertificateProvider } from "@/contexts/CreateCertificateContext";

export default function CreateCertificate() {
  return (
    <CreateCertificateProvider>
      <CreateCertificatePage />
    </CreateCertificateProvider>
  );
}
