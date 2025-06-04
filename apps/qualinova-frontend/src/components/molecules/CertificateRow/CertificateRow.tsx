import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";

const CertificateRow = ({ cert }: { cert: any }) => (
  <tr className="space-x-3 border-[#20293c] *: *:py-5 border-t">
    <td>{cert.id}</td>
    <td className="flex items-center gap-2">
      {/* <Icon src="/cert.svg" alt="certLogo" width={15} height={40} /> */}
      {cert.name}
    </td>
    <td>{cert.recipient}</td>
    <td>{cert.issue_date}</td>
    <td>{cert.expiry_date}</td>
    <td className="text-center">
      <StatusBadge status={cert.status} />
    </td>
    <td className="text-center">{cert.actions}</td>
  </tr>
);

export default CertificateRow;
