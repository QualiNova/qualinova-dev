import {
  CircleCheckBig,
  CircleX,
  Clock4,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const base =
    "px-2 py-1 font-medium rounded-xl text-xs flex items-center justify-center gap-1";
  switch (status) {
    case "Verified":
      return (
        <div className={`${base} text-success-dark bg-success-light`}>
          <CircleCheckBig className="h-4 w-4" />
          {status}
        </div>
      );
    case "Pending":
      return (
        <div className={`${base} text-error-dark bg-error-light`}>
          <Clock4 className="h-4 w-4" />
          {status}
        </div>
      );
    case "Expired":
      return (
        <div className={`${base} text-white bg-error-dark`}>
          <CircleX className="h-4 w-4" />
          {status}
        </div>
      );
    // Audit statuses
    case "Completed":
      return (
        <div className={`${base} text-success-dark bg-success-light`}>
          <CheckCircle className="h-4 w-4" />
          {status}
        </div>
      );
    case "In Process":
      return (
        <div className={`${base} text-[#1D4ED8] bg-[#DBEAFE]`}>
          <AlertTriangle className="h-4 w-4" />
          {status}
        </div>
      );
    case "With Observations":
      return (
        <div className={`${base} text-[#92400E] bg-[#FEF3C7]`}>
          <AlertTriangle className="h-4 w-4" />
          {status}
        </div>
      );
    default:
      return <div className={base}>{status}</div>;
  }
};

export default StatusBadge;
