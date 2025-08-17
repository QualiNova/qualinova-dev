import { z } from 'zod';

export const step1Schema = z.object({
    name: z.string().nonempty('Name cannot be empty').min(3, 'Name must be at least 3 characters'),
    type: z.string().nonempty('Select a type'),
    description: z.string().min(10),
    template: z.enum(['standard', 'premium', 'custom']),
});

export const step2Schema = z.object({
    recipientName: z
        .string()
        .nonempty('Name cannot be empty')
        .min(2, 'Name must be at least 2 characters'),
    recipientEmail: z.string().nonempty('Email is required').email('Enter a valid email'),
    issueDate: z.string().nonempty('Issue date cannot be empty'),
    expiryDate: z.string().nonempty('Expiry date cannot be empty'),
    certificateId: z.string().optional(),
});

export const fullCreateCertificateSchema = step1Schema.merge(step2Schema);
