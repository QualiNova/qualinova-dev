'use client';
import React from 'react';
import { Clock, Award, RefreshCcw, Search, FilePlus, FileCheck, FileX } from 'lucide-react';
import MetricCard from '@/components/molecules/MetricCard/metricCard';
import CertificateList from '@/components/organisms/CertificateList/certificateList';
import CertificateActivityChart from '@/components/molecules/CertificateActivityChart/certificateActivityChart';
import QuickActions from '@/components/organisms/QuickActions/quickActions';
import { dummyData } from '@/data/dashboardData';

const metricsConfig = [
    {
        title: 'Total Certificates',
        count: dummyData.metrics.total.count,
        subtext: dummyData.metrics.total.percentChange,
        icon: <Award size={18} />,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-[#2563EB]',
    },
    {
        title: 'Active Certificates',
        count: dummyData.metrics.active.count,
        subtext: dummyData.metrics.active.percentText,
        icon: <FileCheck size={18} />,
        iconBg: 'bg-green-500/10',
        iconColor: 'text-[#16A34A]',
    },
    {
        title: 'Pending Certificates',
        count: dummyData.metrics.pending.count,
        subtext: dummyData.metrics.pending.statusText,
        icon: <Clock size={18} />,
        iconBg: 'bg-orange-500/10',
        iconColor: 'text-[#EA580C]',
    },
    {
        title: 'Expired Certificates',
        count: dummyData.metrics.expired.count,
        subtext: dummyData.metrics.expired.percentText,
        icon: <FileX size={18} />,
        iconBg: 'bg-red-500/10',
        iconColor: 'text-[#DC2626]',
    },
];

const OverviewContent = () => {
    return (
        <div className="min-h-screen text-white p-4 space-y-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsConfig.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="lg:col-span-7 p-4 border-r border-[#1E293B]">
                    <h2 className="text-lg font-medium mb-4">Certificate Activity</h2>
                    <CertificateActivityChart data={dummyData.chartData} />
                </div>

                <div className="lg:col-span-5 p-4">
                    <h2 className="text-lg font-medium mb-1">Recent Certificates</h2>
                    <p className="text-[#94A3B8] text-xs mb-4">
                        Recently created or updated certificates
                    </p>
                    <CertificateList certificates={dummyData.recentCertificates} />
                    <div className="mt-4 text-center">
                        <button className="text-sm text-white hover:text-blue-400">
                            View All Certificates
                        </button>
                    </div>
                </div>
            </div>

            <QuickActions
                actions={[
                    {
                        icon: <FilePlus size={16} className="text-[#0F172A]" />,
                        title: 'Create Certificate',
                        desc: 'Generate a new certificate',
                        bg: 'bg-[#2563EB]',
                        text: 'text-[#0F172A]',
                    },
                    {
                        icon: <Search size={16} className="text-white" />,
                        title: 'Verify Certificate',
                        desc: 'Check certificate validity',
                        bg: 'border border-[#1E293B]',
                        text: 'text-white',
                    },
                    {
                        icon: <RefreshCcw size={16} className="text-white" />,
                        title: 'Renew Certificate',
                        desc: 'Extend certificate validity',
                        bg: 'border border-[#1E293B]',
                        text: 'text-white',
                    },
                ]}
            />
        </div>
    );
};

export default OverviewContent;
