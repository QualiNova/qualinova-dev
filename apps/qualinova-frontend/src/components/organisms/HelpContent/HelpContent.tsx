'use client';

import { useState } from 'react';
import { HelpCircle, BookOpen, FileQuestion, Mail, MessageSquare, Phone } from 'lucide-react';
import { FAQItem } from '@/components/molecules/FAQItem/FAQItem';
import { SupportCard } from '@/components/molecules/SupportCard/SupportCard';

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

const faqData: FAQ[] = [
    {
        id: 'faq-1',
        question: 'How do I create a new certificate?',
        answer: 'To create a new certificate, navigate to the "Create Certificate" page from the main menu. Fill in the required information including recipient details, certificate type, and validity period. Once completed, click "Generate Certificate" to create your certificate.',
    },
    {
        id: 'faq-2',
        question: 'How can I verify a certificate?',
        answer: 'You can verify a certificate by navigating to the "Verify" page and entering the certificate ID or scanning the QR code on the certificate. The system will display the certificate details and its current status.',
    },
    {
        id: 'faq-3',
        question: 'What types of certificates can I issue?',
        answer: 'QualiNova supports various certificate types including ISO certifications, quality assurance certificates, compliance certificates, and custom certificate templates. You can manage your certificate templates from the "Certificate Templates" tab.',
    },
    {
        id: 'faq-4',
        question: 'How do I manage assigned certificates?',
        answer: 'Navigate to the "Assigned Certificates" tab in the Certifier Panel to view, search, and filter all certificates assigned to companies. You can filter by status (Verified, Pending, Expired) and search by certificate ID, type, or company name.',
    },
    {
        id: 'faq-5',
        question: 'Can I revoke or expire a certificate early?',
        answer: 'Yes, you can manually expire or revoke a certificate before its scheduled expiration date. Navigate to the certificate details and select the appropriate action. Note that revoked certificates cannot be reactivated.',
    },
    {
        id: 'faq-6',
        question: 'How do I export certificate data?',
        answer: 'You can export certificate data from the Reports section. Select the date range and certificate types you want to include, then click "Export" to download the data in CSV or PDF format.',
    },
];

const supportOptions = [
    {
        type: 'chat' as const,
        title: 'Live Chat',
        description: 'Chat with our support team in real-time for immediate assistance.',
        buttonText: 'Start Chat',
    },
    {
        type: 'email' as const,
        title: 'Email Support',
        description: 'Send us an email and we will respond within 24 hours.',
        buttonText: 'Send Email',
    },
    {
        type: 'phone' as const,
        title: 'Phone Support',
        description: 'Call our support line for urgent matters during business hours.',
        buttonText: 'Call Now',
    },
];

interface HelpContentProps {
    className?: string;
}

export const HelpContent = ({ className = '' }: HelpContentProps) => {
    const [openFAQId, setOpenFAQId] = useState<string | null>(null);

    const handleToggleFAQ = (id: string) => {
        setOpenFAQId((prev) => (prev === id ? null : id));
    };

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                    Help Center
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Find answers to common questions and get support
                </p>
            </div>

            {/* Quick Links Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a
                    href="#faq-section"
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all"
                >
                    <FileQuestion className="h-8 w-8 text-blue-500" />
                    <div>
                        <h3 className="text-white font-medium">FAQs</h3>
                        <p className="text-gray-400 text-sm">Common questions answered</p>
                    </div>
                </a>
                <a
                    href="https://docs.qualinova.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all"
                >
                    <BookOpen className="h-8 w-8 text-green-500" />
                    <div>
                        <h3 className="text-white font-medium">Documentation</h3>
                        <p className="text-gray-400 text-sm">Detailed guides and tutorials</p>
                    </div>
                </a>
                <a
                    href="#support-section"
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all"
                >
                    <MessageSquare className="h-8 w-8 text-purple-500" />
                    <div>
                        <h3 className="text-white font-medium">Contact Support</h3>
                        <p className="text-gray-400 text-sm">Get help from our team</p>
                    </div>
                </a>
            </div>

            {/* FAQ Section */}
            <div id="faq-section" className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FileQuestion className="h-5 w-5 text-blue-500" />
                    Frequently Asked Questions
                </h3>
                <div className="divide-y divide-gray-700">
                    {faqData.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFAQId === faq.id}
                            onToggle={() => handleToggleFAQ(faq.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Support Section */}
            <div id="support-section">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Contact Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {supportOptions.map((option, index) => (
                        <SupportCard
                            key={index}
                            type={option.type}
                            title={option.title}
                            description={option.description}
                            buttonText={option.buttonText}
                            onAction={() => {
                                // TODO: Implement support actions
                                console.log(`${option.type} support clicked`);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Additional Help Resources */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-gray-700 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Need more help?</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Our support team is available Monday to Friday, 9 AM - 6 PM EST.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="mailto:support@qualinova.com"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <Mail className="h-4 w-4" />
                            Email Us
                        </a>
                        <a
                            href="tel:+1-800-QUALINOVA"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpContent;
