'use client';

import { fullCreateCertificateSchema } from '@/schemas/CreateCertificate/createCertificateSchemas';
import { useContext, createContext, useState, Dispatch, SetStateAction } from 'react';
import { z } from 'zod';

type CreateCertificateData = z.infer<typeof fullCreateCertificateSchema>;

interface CreateCertificateContextProps {
    data: Partial<CreateCertificateData>;
    updateData: (values: Partial<CreateCertificateData>) => void;
    step?: number;
    setStep?: Dispatch<SetStateAction<number>>;
}

export const CreateCertificateContext = createContext<CreateCertificateContextProps | null>(null);

function CreateCertificateProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<Partial<CreateCertificateData>>({});
    const [step, setStep] = useState(1);

    const updateData = (values: Partial<CreateCertificateData>) => {
        setData((prev) => ({ ...prev, ...values }));
    };

    return (
        <CreateCertificateContext.Provider value={{ data, updateData, step, setStep }}>
            {children}
        </CreateCertificateContext.Provider>
    );
}

function useCreateCertificate() {
    const context = useContext(CreateCertificateContext);
    if (!context) {
        throw new Error('useCreateCertificate must be used within a CreateCertificateProvider');
    }
    return context;
}

export { CreateCertificateProvider, useCreateCertificate };
