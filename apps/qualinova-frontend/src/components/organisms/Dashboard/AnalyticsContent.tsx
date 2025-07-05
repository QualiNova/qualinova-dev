import ContentHeader from "../../atoms/ContentHeader";

const AnalyticsContent = () => {
  return (
    <div className="mt-4 rounded-md overflow-x-auto border border-[#1E293B]">
      <ContentHeader
        title="Analytics"
        description="Detailed analytics about your certificates and verification activity"
      />

      <div className="border border-[#1E293B] rounded-md p-8 min-h-[500px] flex items-center justify-center">
        <p className="text-[#94A3B8] text-center">
          Analytics dashboard coming soon
        </p>
      </div>
    </div>
  );
};

export default AnalyticsContent;
