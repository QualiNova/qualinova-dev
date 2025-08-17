'use client';

import Input from '@/components/atoms/Input/input';
import { Button } from '@/components/atoms/Button/button';
import { step2Schema } from '@/schemas/CreateCertificate/createCertificateSchemas';
import { useCreateCertificate } from '@/contexts/createCertificateContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StepIndicator from '@/components/molecules/StepIndicator/stepIndicator';
import { ChevronRight } from 'lucide-react';

type Step2FormData = z.infer<typeof step2Schema>;

export default function CreateCertificationSecondStep() {
    const { data, updateData, setStep } = useCreateCertificate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Step2FormData>({
        resolver: zodResolver(step2Schema),
        mode: 'onChange',
        defaultValues: {
            recipientName: data.recipientName ?? '',
            recipientEmail: data.recipientEmail ?? '',
            issueDate: data.issueDate ?? '',
            expiryDate: data.expiryDate ?? '',
            certificateId: data.certificateId ?? '',
        },
    });

    const onSubmit = (data: Step2FormData) => {
        updateData(data);
        setStep?.(3);
    };

    return (
        <form
            role="form"
            className="w-full max-w-[832px] min-w-[320px] rounded-lg flex flex-col items-start p-4 lg:p-6 text-red-500 shadow-sm border border-gray-border-800"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full">
                <div className="w-full flex items-center justify-between gap-5">
                    <h3
                        data-testid="step-title"
                        className="text-gray-text-50 font-semibold text-sm lg:text-2xl"
                    >
                        Certificate Details
                    </h3>
                    <StepIndicator currentStep={2} totalSteps={3} />
                </div>
                <p
                    data-testid="form-title"
                    className="mt-[6px] text-gray-text-400 font-normal text-xs lg:text-sm"
                >
                    Add recipient and validity details
                </p>
            </div>
            <div className="w-full flex flex-col gap-4 mt-7 justify-center items-center">
                <div className="w-full flex flex-col gap-3">
                    <Input
                        placeholder="e.g Acme Corporation"
                        type="text"
                        label="Recipient Name"
                        {...register('recipientName')}
                        error={errors.recipientName?.message}
                    />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Input
                        placeholder="e.g contact@acmecorp.com"
                        type="email"
                        label="Recipient Email"
                        {...register('recipientEmail')}
                        error={errors.recipientEmail?.message}
                    />
                </div>
                <div className="w-full max-w-[782px] flex items-center justify-between gap-4">
                    <label className="w-full flex flex-col gap-3">
                        <Input
                            placeholder="2025-07-30"
                            type="date"
                            label="Issue Date"
                            {...register('issueDate')}
                            error={errors.issueDate?.message}
                        />
                    </label>
                    <label className="w-full flex flex-col gap-3">
                        <Input
                            placeholder="2026-07-30"
                            type="date"
                            label="Expiry Date"
                            {...register('expiryDate')}
                            error={errors.expiryDate?.message}
                        />
                    </label>
                </div>
                <label className="w-full flex flex-col gap-1 lg:gap-3">
                    <Input
                        placeholder="Leave blank to auto-generate"
                        type="text"
                        label="Certificate ID (Optional)"
                        {...register('certificateId')}
                    />
                    <p
                        data-testid="identifier-text"
                        className="text-gray-text-400 font-normal text-[10px] lg:text-xs"
                    >
                        A unique identifier will be automatically generated if left blank
                    </p>
                </label>
            </div>
            <div className="w-full flex items-center justify-between gap-5 p-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep?.((step) => step - 1)}
                >
                    Previous Step
                </Button>
                <Button type="submit" variant="primary" data-testid="next-step-button">
                    Next Step
                    <ChevronRight size={14} className="text-black" />
                </Button>
            </div>
        </form>
    );
}
