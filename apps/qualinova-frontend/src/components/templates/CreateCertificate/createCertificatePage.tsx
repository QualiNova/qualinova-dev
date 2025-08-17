'use client';

import CertificateForm from '@/components/organisms/CertificateForm/certificateForm';
import { Button } from '@/components/atoms/Button/button';
import { ArrowLeft } from 'lucide-react';
import CreateCertificationSecondStep from '@/components/organisms/CreateCertificationSecondStep/createCertificationSecondStep';
import ThirdStepForm from '@/components/organisms/CertificateCreation/thirdStepForm';
import { useCreateCertificate } from '@/contexts/createCertificateContext';

export default function CreateCertificatePage() {
    const { step, setStep } = useCreateCertificate();
    return (
        <div className="min-h-screen bg-background">
            <main className="container py-8 max-w-xl lg:max-w-3xl mx-auto px-8 lg:px-0">
                {step !== 1 && (
                    <Button
                        variant="plain"
                        className="mb-6 flex items-center gap-4 ml-17"
                        onClick={() => setStep?.((step) => step - 1)}
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                )}

                <div className="max-w-xl lg:max-w-3xl mx-auto">
                    <h1 className="text-lg lg:text-3xl font-bold mb-2">Create New Certificate</h1>
                    <p className="text-gray-text-400 mb-6 text-xs lg:text-base">
                        Fill out the form below to create a new blockchain-verified certificate
                    </p>

                    {step === 1 && <CertificateForm />}
                    {step === 2 && <CreateCertificationSecondStep />}
                    {step === 3 && <ThirdStepForm />}
                </div>
            </main>
        </div>
    );
}
