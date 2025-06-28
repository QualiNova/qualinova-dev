"use client";

import CertificateForm from "@/components/organisms/CertificateForm/CertificateForm";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowLeft } from "lucide-react";
import CreateCertificationSecondStep from "@/components/organisms/CreateCertificationSecondStep/CreateCertificationSecondStep";
import ThirdStepForm from "@/components/organisms/CertificateCreation/ThirdStepForm";
import { useCreateCertificate } from "@/contexts/CreateCertificateContext";

export default function CreateCertificatePage() {
  const { step, setStep } = useCreateCertificate();
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 max-w-4xl mx-auto">
        {step !== 1 && (
          <Button
            variant="outline"
            className="mb-6 flex items-center gap-2 ml-17"
            onClick={() => setStep?.((step) => step - 1)}
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        )}

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Create New Certificate</h1>
          <p className="text-muted-foreground mb-6">
            Fill out the form below to create a new blockchain-verified
            certificate
          </p>

          {step === 1 && <CertificateForm />}
          {step === 2 && <CreateCertificationSecondStep />}
          {step === 3 && <ThirdStepForm />}
        </div>
      </main>
    </div>
  );
}
