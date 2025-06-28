import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-white">{label}</label>
        <input
          ref={ref}
          {...props}
          className={cn(
            "mt-1 p-2 border border-[#27272A] rounded-[6px]  text-white focus:ring-2 focus:ring-slate-500 bg-transparent",
            className
          )}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
