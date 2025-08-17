'use client';

import Button from '@/components/atoms/Button/button';
import Select from '@/components/atoms/Select/select';
import CertificateTable from '@/components/organisms/CertificateTable/certificateTable';
import { Funnel, RefreshCw, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

enum Status {
    Active = 'Verified',
    Pending = 'Pending',
    Expired = 'Expired',
}

interface Certificate {
    id: string;
    name: string;
    recipient: string;
    issue_date: string;
    expiry_date: string;
    status: Status;
    actions: string;
}

type SortOption =
    | 'All Certificates'
    | 'Sort by Issuance Date'
    | 'Sort by Expiry Date'
    | 'Sort by ID';

const initialCertificates: Certificate[] = [
    {
        id: 'CERT-2023-001',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '14/12/2023',
        expiry_date: '9/12/2024',
        status: Status.Active,
        actions: '...',
    },
    {
        id: 'CERT-2023-002',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '9/12/2023',
        expiry_date: '9/12/2024',
        status: Status.Active,
        actions: '...',
    },
    {
        id: 'CERT-2023-003',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '4/12/2023',
        expiry_date: '4/12/2024',
        status: Status.Pending,
        actions: '...',
    },
    {
        id: 'CERT-2023-004',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '19/11/2023',
        expiry_date: '19/11/2024',
        status: Status.Expired,
        actions: '...',
    },
    {
        id: 'CERT-2023-005',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '14/11/2023',
        expiry_date: '14/11/2024',
        status: Status.Active,
        actions: '...',
    },
    {
        id: 'CERT-2023-006',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '9/11/2023',
        expiry_date: '9/11/2024',
        status: Status.Active,
        actions: '...',
    },
    {
        id: 'CERT-2023-007',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '4/11/2023',
        expiry_date: '4/11/2024',
        status: Status.Pending,
        actions: '...',
    },
    {
        id: 'CERT-2023-008',
        name: 'ISO 9001 Compliance',
        recipient: 'Acme Corporation',
        issue_date: '10/24/2023',
        expiry_date: '10/24/2024',
        status: Status.Active,
        actions: '...',
    },
];

const CertificateDashboard = () => {
    const [certificates, setCertificates] = useState(initialCertificates);
    const [total, setTotal] = useState(certificates.length);
    const [max, setMax] = useState(certificates.length);

    const sort: Record<SortOption, (msg: string) => void> = {
        'All Certificates': (msg: string) => console.log(msg),
        'Sort by Issuance Date': (msg: string) => console.log(msg),
        'Sort by Expiry Date': (msg: string) => console.log(msg),
        'Sort by ID': (msg: string) => console.log(msg),
    };

    return (
        <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div className="text-xl font-bold">Certificates</div>
                <Button variant="secondary">
                    <Image src="/newCert.svg" alt="+" width={20} height={20} />
                    <span>New Certificate</span>
                </Button>
            </div>

            {/* Management Panel */}
            <div className="border border-dark-blue-border p-4 space-y-5 rounded-lg">
                <div>
                    <div>Certificate Management</div>
                    <div className="text-[#717c91] text-xs">
                        View, filter and manage all your blockchain certificates
                    </div>
                </div>

                {/* Filter and Search */}
                <div className="flex">
                    <div className="h-10 px-2 w-full flex border border-dark-blue-border gap-2 rounded-lg items-center">
                        <Search className="text-dark-blue-text text-xs h-5 w-5" />
                        <input
                            type="search"
                            placeholder="Search certificates..."
                            className="bg-inherit lg:w-full focus:outline-none placeholder:text-sm"
                        />
                    </div>

                    <div className="flex h-10 items-center px-4 gap-2">
                        <div className="flex border h-10 border-dark-blue-border rounded-lg items-center px-3 gap-2">
                            <Funnel className="text-xs h-5 w-5" />
                            <Select
                                onChange={(e) => {
                                    const key = e.target.value as SortOption;
                                    sort[key](key + ' from sort function');
                                }}
                                className="w-40 appearance-none border-none focus-visible:ring-0 focus:outline-none bg-inherit hover:cursor-pointer"
                            >
                                {Object.keys(sort).map((key) => (
                                    <option key={key} value={key} className="text-black text-xs">
                                        {key}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="flex h-10 border border-dark-blue-border rounded-lg items-center px-3 hover:cursor-pointer">
                            <RefreshCw className="text-xs h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <CertificateTable certificates={certificates} />

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <div className="text-dark-blue-text text-sm">
                        Showing {total} out of {max} certificates
                    </div>
                    <div className="flex gap-4">
                        <Button type="button" variant="outline">
                            Previous
                        </Button>
                        <Button type="button" variant="outline">
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDashboard;
