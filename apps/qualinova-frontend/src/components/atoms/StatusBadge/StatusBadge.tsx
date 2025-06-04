const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 font-bold rounded-xl text-xs";
  switch (status) {
    case "Active":
      return (
        <div className={`${base} text-[#256532] bg-[#dffce6]`}>{status}</div>
      );
    case "Pending":
      return (
        <div className={`${base} text-[#923208] bg-[#dbcdb8]`}>{status}</div>
      );
    case "Expired":
      return <div className={`${base} text-white bg-[#256532]`}>{status}</div>;
    default:
      return <div className={base}>{status}</div>;
  }
};

export default StatusBadge;
