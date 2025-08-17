import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "Search...",
  value = "",
  onChange,
  className = "",
}: SearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div
      className={`h-10 px-2 w-full flex border border-dark-blue-border gap-2 rounded-lg items-center ${className}`}
    >
      <Search className="text-dark-blue-text text-xs h-5 w-5" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="bg-inherit w-full focus:outline-none placeholder:text-sm"
      />
    </div>
  );
};

export default SearchBar;
