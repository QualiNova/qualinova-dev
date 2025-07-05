import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  name: string;
  value: number;
}

interface ChartContainerProps {
  data: ChartDataPoint[];
  title: string;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  data,
  title,
  className = "",
}) => {
  return (
    <div className={`p-3 sm:p-4 lg:border-r border-[#1E293B] ${className}`}>
      <h2 className="text-[#F8FAFC] text-base sm:text-lg font-medium mb-2 sm:mb-4">
        {title}
      </h2>
      <div className="h-48 sm:h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#333"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              width={30}
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                borderColor: "#374151",
                borderRadius: "4px",
                padding: "8px",
              }}
              labelStyle={{
                color: "white",
                fontWeight: "500",
              }}
              itemStyle={{
                color: "#3B82F6",
              }}
              cursor={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6" }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
