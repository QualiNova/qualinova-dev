import React from "react";
import Button from "@/components/atoms/Button/button";

interface PaginationControlsProps {
  currentCount: number;
  totalCount: number;
  onPrevious?: () => void;
  onNext?: () => void;
  itemName?: string;
  className?: string;
}

const PaginationControls = ({
  currentCount,
  totalCount,
  onPrevious,
  onNext,
  itemName = "items",
  className = "",
}: PaginationControlsProps) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${className}`}
    >
      <div className="text-dark-blue-text text-sm">
        Showing {currentCount} out of {totalCount} {itemName}
      </div>
      <div className="flex gap-4 w-full sm:w-auto">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
