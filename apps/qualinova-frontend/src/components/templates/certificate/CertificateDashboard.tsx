"use client";

import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import CertificateTable from "@/components/organisms/CertificateTable/CertificateTable";
import Image from "next/image";
import React, { useState } from "react";

enum Status {
  Active = "Active",
  Pending = "Pending",
  Expired = "Expired",
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
  | "All Certificates"
  | "Sort by Issuance Date"
  | "Sort by Expiry Date"
  | "Sort by ID";

const initialCertificates: Certificate[] = [
  {
    id: "CERT-2023-001",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "14/12/2023",
    expiry_date: "9/12/2024",
    status: Status.Active,
    actions: "...",
  },
  {
    id: "CERT-2023-002",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "9/12/2023",
    expiry_date: "9/12/2024",
    status: Status.Active,
    actions: "...",
  },
  {
    id: "CERT-2023-003",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "4/12/2023",
    expiry_date: "4/12/2024",
    status: Status.Pending,
    actions: "...",
  },
  {
    id: "CERT-2023-004",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "19/11/2023",
    expiry_date: "19/11/2024",
    status: Status.Expired,
    actions: "...",
  },
  {
    id: "CERT-2023-005",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "14/11/2023",
    expiry_date: "14/11/2024",
    status: Status.Active,
    actions: "...",
  },
  {
    id: "CERT-2023-006",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "9/11/2023",
    expiry_date: "9/11/2024",
    status: Status.Active,
    actions: "...",
  },
  {
    id: "CERT-2023-007",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "4/11/2023",
    expiry_date: "4/11/2024",
    status: Status.Pending,
    actions: "...",
  },
  {
    id: "CERT-2023-008",
    name: "ISO 9001 Compliance",
    recipient: "Acme Corporation",
    issue_date: "10/24/2023",
    expiry_date: "10/24/2024",
    status: Status.Active,
    actions: "...",
  },
];

const CertificateDashboard = () => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [total, setTotal] = useState(certificates.length);
  const [max, setMax] = useState(9);

  const sort: Record<SortOption, (msg: string) => void> = {
    "All Certificates": (msg: string) => console.log(msg),
    "Sort by Issuance Date": (msg: string) => console.log(msg),
    "Sort by Expiry Date": (msg: string) => console.log(msg),
    "Sort by ID": (msg: string) => console.log(msg),
  };

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="text-xl font-bold">Certificates</div>
        <Button>
          <Image src="/newCert.svg" alt="+" width={20} height={20} />
          <span>New Certificate</span>
        </Button>
      </div>

      {/* Management Panel */}
      <div className="border-2 border-[#20293c] p-4 space-y-5 rounded-lg">
        <div>
          <div>Certificate Management</div>
          <div className="text-[#717c91] text-xs">
            View, filter and manage all your blockchain certificates
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex space-x-3">
          <div className="p-2 w-full flex border-2 border-[#20293c] space-x-3 rounded-lg">
            <Image
              src="/search.svg"
              alt="+"
              width={20}
              height={20}
              className=""
            />
            <input
              type="search"
              placeholder="Search"
              className="bg-inherit lg:w-full focus:outline-none"
            />
          </div>

          <div className="flex *:border-2 *:border-[#20293c] *:rounded-lg space-x-3">
            <div className="flex space-x-3 items-center px-2">
              <Image
                src="/filter.svg"
                alt="+"
                width={20}
                height={20}
                className=""
              />
            <Select
                onChange={(e) => {
                  const key = e.target.value as SortOption;
                  sort[key](key + " from sort function");
                }}
                className="w-40 appearance-none  border-none  focus-visible:ring-0 focus:outline-none bg-inherit"
              >
                {Object.keys(sort).map((key) => (
                  <option key={key} value={key} className="text-black">
                    {key}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center w-14 p-3">
              <Image
                src="/reset.svg"
                alt="+"
                width={45}
                height={45}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <CertificateTable certificates={certificates} />

        {/* Footer */}
        <div className="flex justify-between">
          <div>
            showing {total} out of {max} certificates
          </div>
          <div className="flex *:border-2 space-x-3 *:rounded-lg *:p-2 *:border-[#20293c]">
            <button type="button">Previous</button>
            <button type="button">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDashboard;
