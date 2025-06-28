"use client";

import type React from "react";
import { Button } from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/Textarea/Textarea";
import Select from "@/components/atoms/Select/Select";
import Radio from "@/components/atoms/Radio/Radio";
import FormField from "@/components/molecules/FormField/FormField";
import StepIndicator from "@/components/molecules/StepIndicator/StepIndicator";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { step1Schema } from "@/schemas/CreateCertificate/CreateCertificateSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCertificate } from "@/contexts/CreateCertificateContext";

type Step1FormData = z.infer<typeof step1Schema>;

export default function CertificateForm() {
  const { data, updateData, setStep } = useCreateCertificate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      name: data.name ?? "",
      description: data.description ?? "",
      template: data.template ?? "standard",
      type: data.type ?? "",
    },
  });

  const onSubmit = (data: Step1FormData) => {
    updateData(data);
    setStep?.(2);
  };

  return (
    <div className="bg-secondary rounded-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Certificate Details</h2>
        <StepIndicator currentStep={1} totalSteps={3} />
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Enter the basic certificate information
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Certificate Name" htmlFor="name">
          <Input
            label="Name"
            id="name"
            placeholder="e.g. ISO 9001 Quality Management"
            {...register("name")}
            error={errors.name?.message}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
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
            className="bg-transparent *:bg-[#030817]"
            {...register("type")}
            error={errors.type?.message}
            disabled={isSubmitting}
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? "type-error" : undefined}
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
            className="bg-transparent"
            {...register("description")}
            rows={4}
            error={errors.description?.message}
            disabled={isSubmitting}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <div id="description-error" className="sr-only">
              {errors.description?.message}
            </div>
          )}
        </FormField>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Certificate Template
          </label>
          <div className="space-y-2">
            <Radio
              value="standard"
              label="Standard Template"
              {...register("template")}
              disabled={isSubmitting}
              defaultChecked
            />
            <Radio
              value="premium"
              label="Premium Template"
              {...register("template")}
              disabled={isSubmitting}
            />
            <Radio
              value="custom"
              label="Custom Template"
              {...register("template")}
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
                <span className="!text-black">Next Step</span>
                <ArrowRight size={16} className="!text-black" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
