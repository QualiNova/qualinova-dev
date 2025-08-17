export type CertificateStatus = 'Verified' | 'Pending' | 'Expired';

export interface Certificate {
    name: string;
    company: string;
    date: string;
    status: CertificateStatus;
}

export interface DashboardData {
    metrics: {
        total: { count: number; percentChange: string };
        active: { count: number; percentText: string };
        pending: { count: number; statusText: string };
        expired: { count: number; percentText: string };
    };
    chartData: { name: string; value: number }[];
    recentCertificates: Certificate[];
}

export const dummyData: DashboardData = {
    metrics: {
        total: { count: 142, percentChange: '+22% from last month' },
        active: { count: 124, percentText: '87% of total certificates' },
        pending: { count: 8, statusText: 'Awaiting blockchain confirmation' },
        expired: { count: 10, percentText: '7% of total certificates' },
    },
    chartData: [
        { name: 'Jan', value: 12 },
        { name: 'Feb', value: 19 },
        { name: 'Mar', value: 23 },
        { name: 'Apr', value: 27 },
        { name: 'May', value: 36 },
        { name: 'Jun', value: 32 },
        { name: 'Jul', value: 38 },
        { name: 'Aug', value: 43 },
        { name: 'Sep', value: 55 },
    ],
    recentCertificates: [
        {
            name: 'ISO 9001 Compliance',
            company: 'Acme Corporation',
            date: '10/12/2023',
            status: 'Verified',
        },
        {
            name: 'Food Safety Certification',
            company: 'Fresh Foods Inc.',
            date: '8/17/2023',
            status: 'Verified',
        },
        {
            name: 'Environmental Management',
            company: 'Green Solutions Ltd.',
            date: '7/05/2023',
            status: 'Pending',
        },
        {
            name: 'Quality Assurance',
            company: 'Tech Innovations',
            date: '3/21/2023',
            status: 'Expired',
        },
        {
            name: 'Health & Safety Standard',
            company: 'Construction Co.',
            date: '1/6/2023',
            status: 'Verified',
        },
    ],
};
