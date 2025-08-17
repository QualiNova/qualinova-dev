'use client';

import { HelpContent } from '@/components/organisms/HelpContent/HelpContent';
import { HelpHeader } from '@/components/organisms/HelpHeader/HelpHeader';
import { SupportOptions } from '@/components/organisms/SupportOptions/SupportOptions';
import { Award, BookOpen, FileText, Settings, Shield, Users } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

// Mock data - in a real app, this would come from props or API
const supportOptions = [
    {
        type: 'chat' as const,
        title: 'Live Chat',
        description: 'Talk to our support team',
        buttonText: 'Start Chat',
        onAction: () => console.log('Starting chat...'),
    },
    {
        type: 'email' as const,
        title: 'Send Ticket',
        description: 'Create a technical support ticket',
        buttonText: 'Create Ticket',
        onAction: () => console.log('Creating ticket...'),
    },
    {
        type: 'phone' as const,
        title: 'Phone Support',
        description: 'Call us for immediate help',
        buttonText: '+1 (555) 123-4567',
        onAction: () => console.log('Calling support...'),
    },
];

const tabs = [
    { id: 'faq', label: 'Frequently Asked Questions' },
    { id: 'guides', label: 'Guides' },
    { id: 'videos', label: 'Video Tutorials' },
    { id: 'resources', label: 'Resources' },
];

const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'audits', label: 'Audits', icon: FileText },
    { id: 'blockchain', label: 'Blockchain', icon: Settings },
    { id: 'security', label: 'Security', icon: Users },
];

const faqs = [
    {
        id: '1',
        question: 'How do I create a new certificate?',
        answer: 'To create a new certificate, navigate to the "Create Certificate" section in the main menu. Complete all required fields including certificate information, beneficiary data, and validation criteria. Once completed, the certificate will be registered on the blockchain.',
        category: 'certificates',
    },
    {
        id: '2',
        question: 'How do I verify the authenticity of a certificate?',
        answer: 'You can verify a certificate using its unique ID or QR code in the "Verify" section. The system will query the blockchain to confirm authenticity and display all certificate details including its current status.',
        category: 'verification',
    },
    {
        id: '3',
        question: 'What is blockchain technology and why do we use it?',
        answer: 'Blockchain is a distributed ledger technology that ensures data immutability and transparency. We use it to ensure certificates cannot be forged or altered, providing reliable and permanent verification.',
        category: 'blockchain',
    },
    {
        id: '4',
        question: 'How does the audit process work?',
        answer: 'The audit process involves systematic review of certificates by certified auditors. Auditors can access specialized tools to validate information, verify supporting documents, and approve or reject certificates according to established standards.',
        category: 'audits',
    },
    {
        id: '5',
        question: 'How long does it take to register a certificate on blockchain?',
        answer: "Blockchain registration typically takes 1-3 minutes depending on network congestion. Once confirmed, you'll receive a notification and the certificate will be available for immediate verification.",
        category: 'blockchain',
    },
    {
        id: '6',
        question: 'What security measures does QualiNova implement?',
        answer: 'QualiNova implements multiple security layers including end-to-end encryption, multi-factor authentication, regular security audits, and blockchain technology to ensure data integrity.',
        category: 'security',
    },
];

export const HelpPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl 2xl:max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <HelpHeader
                    title="Help Center"
                    subtitle="Find answers to your questions, step-by-step guides, and resources to get the most out of QualiNova"
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                />

                <div className="pb-12">
                    <SupportOptions options={supportOptions} className="mb-16" />

                    <HelpContent tabs={tabs} faqs={faqs} categories={categories} />
                </div>
            </div>
        </div>
    );
};
