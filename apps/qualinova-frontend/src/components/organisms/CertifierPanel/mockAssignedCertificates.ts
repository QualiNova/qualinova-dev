export interface AssignedCertificate {
    id: string;
    certificateType: string;
    receivingCompany: string;
    assignmentDate: string;
    expirationDate: string;
    status: 'Verified' | 'Pending' | 'Expired';
}

export const initialAssignedCertificates: AssignedCertificate[] = [
    {
        id: 'CERT-2024-001',
        certificateType: 'ISO 9001 Quality Management',
        receivingCompany: 'Acme Corporation',
        assignmentDate: '1/19/2024',
        expirationDate: '1/19/2025',
        status: 'Verified',
    },
    {
        id: 'CERT-2024-002',
        certificateType: 'ISO 9001 Quality Management',
        receivingCompany: 'Tech Solutions Ltd.',
        assignmentDate: '1/17/2024',
        expirationDate: '1/17/2025',
        status: 'Verified',
    },
    {
        id: 'CERT-2024-003',
        certificateType: 'ISO 14001 Environmental Management',
        receivingCompany: 'Green Energy Corp.',
        assignmentDate: '1/14/2024',
        expirationDate: '1/14/2025',
        status: 'Pending',
    },
    {
        id: 'CERT-2024-004',
        certificateType: 'ISO 45001 Occupational Health & Safety',
        receivingCompany: 'Construction Plus Inc.',
        assignmentDate: '1/11/2024',
        expirationDate: '1/11/2025',
        status: 'Verified',
    },
];
