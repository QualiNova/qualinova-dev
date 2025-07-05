import ContentHeader from "../../atoms/ContentHeader";

const ReportsContent = () => {
  return (
    <div className="mt-4 border border-[#1E293B] rounded-md overflow-x-auto">
      <div className="mt-6">
        <ContentHeader
          title="Reports"
          description="Generate and download reports about your certification activity"
        />

        <div className="border border-[#1E293B] rounded-md p-8 min-h-[500px] flex items-center justify-center">
          <p className="text-[#94A3B8] text-center">
            Reports dashboard coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;
