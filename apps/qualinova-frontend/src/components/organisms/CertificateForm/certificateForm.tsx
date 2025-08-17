'use client';

import type React from 'react';
import { Button } from '@/components/atoms/Button/button';
import Input from '@/components/atoms/Input/input';
import Textarea from '@/components/atoms/Textarea/textarea';
import Select from '@/components/atoms/Select/select';
import Radio from '@/components/atoms/Radio/radio';
import FormField from '@/components/molecules/FormField/formField';
import StepIndicator from '@/components/molecules/StepIndicator/stepIndicator';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { step1Schema } from '@/schemas/CreateCertificate/createCertificateSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCertificate } from '@/contexts/createCertificateContext';

type Step1FormData = z.infer<typeof step1Schema>;

export default function CertificateForm() {
    const { data, updateData, setStep } = useCreateCertificate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Step1FormData>({
        resolver: zodResolver(step1Schema),
        mode: 'onChange',
        defaultValues: {
            name: data.name ?? '',
            description: data.description ?? '',
            template: data.template ?? 'standard',
            type: data.type ?? '',
        },
    });

    const onSubmit = (data: Step1FormData) => {
        updateData(data);
        setStep?.(2);
    };

    return (
        <div className="bg-secondary rounded-lg p-4 lg:p-6 border border-gray-border-800">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-gray-text-50 font-semibold text-sm lg:text-2xl">
                    Certificate Details
                </h3>
                <StepIndicator currentStep={1} totalSteps={3} />
            </div>
            <p className="font-light text-gray-text-400 text-xs lg:text-sm mb-6">
                Enter the basic certificate information
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField label="Certificate Name" htmlFor="name">
                    <Input
                        id="name"
                        placeholder="e.g. ISO 9001 Quality Management"
                        {...register('name')}
                        error={errors.name?.message}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                        <div id="name-error" className="sr-only">
                            {errors.name?.message}
                        </div>
                    )}
                </FormField>

                <FormField label="Certificate Type" htmlFor="type">
                    <Select
                        id="type"
                        className="bg-transparent *:bg-[#030817] border border-gray-border-800"
                        {...register('type')}
                        error={errors.type?.message}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.type}
                        aria-describedby={errors.type ? 'type-error' : undefined}
                    >
                        <option value="" disabled className="bg-transparent">
                            Select certificate type
                        </option>
                        <option value="quality" className="bg-transparent">
                            Quality
                        </option>
                        <option value="compliance" className="bg-transparent">
                            Compliance
                        </option>
                        <option value="achievement" className="bg-transparent">
                            Achievement
                        </option>
                    </Select>
                    {errors.type && (
                        <div id="type-error" className="sr-only">
                            {errors.type?.message}
                        </div>
                    )}
                </FormField>

                <FormField label="Description" htmlFor="description">
                    <Textarea
                        id="description"
                        placeholder="Describe what this certificate represents..."
                        className="bg-transparent border border-gray-border-800 resize-none"
                        {...register('description')}
                        rows={4}
                        error={errors.description?.message}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                    />
                    {errors.description && (
                        <div id="description-error" className="sr-only">
                            {errors.description?.message}
                        </div>
                    )}
                </FormField>

                <div className="space-y-2">
                    <label className="block text-sm lg:text-base font-medium">
                        Certificate Template
                    </label>
                    <div className="space-y-2">
                        <Radio
                            value="standard"
                            label="Standard Template"
                            {...register('template')}
                            disabled={isSubmitting}
                            defaultChecked
                            className=""
                        />
                        <Radio
                            value="premium"
                            label="Premium Template"
                            {...register('template')}
                            disabled={isSubmitting}
                        />
                        <Radio
                            value="custom"
                            label="Custom Template"
                            {...register('template')}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="flex items-center gap-2 bg-white !text-black hover:bg-gray-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-pulse">Processing...</span>
                                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                            </>
                        ) : (
                            <>
                                <span className="text-black">Next Step</span>
                                <ChevronRight size={14} className="text-black" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
