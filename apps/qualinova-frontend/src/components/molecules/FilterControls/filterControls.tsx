import React from "react";
import { Funnel, RefreshCw } from "lucide-react";
import Select from "@/components/atoms/Select/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterControlsProps {
  options: FilterOption[];
  onFilterChange?: (value: string) => void;
  onRefresh?: () => void;
  className?: string;
}

const FilterControls = ({
  options,
  onFilterChange,
  onRefresh,
  className = "",
}: FilterControlsProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterChange) {
      onFilterChange(e.target.value);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div
      className={`flex h-10 items-center gap-2 w-full sm:w-auto ${className}`}
    >
      <div className="flex border h-10 border-dark-blue-border rounded-lg items-center px-3 gap-2 w-full sm:w-auto">
        <Funnel className="text-xs h-5 w-5" />
        <Select
          onChange={handleFilterChange}
          className="w-full sm:w-40 appearance-none border-none focus-visible:ring-0 focus:outline-none bg-inherit hover:cursor-pointer"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black text-xs"
            >
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div
        className="flex h-10 border border-dark-blue-border rounded-lg items-center px-3 hover:cursor-pointer"
        onClick={handleRefresh}
      >
        <RefreshCw className="text-xs h-5 w-5" />
      </div>
    </div>
  );
};

export default FilterControls;
