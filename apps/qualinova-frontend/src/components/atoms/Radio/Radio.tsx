import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Radio({ className, label, ...props }: RadioProps) {
  return (
    <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer py-1 sm:py-2 hover:bg-gray-50 rounded transition-colors duration-150 touch-manipulation">
      <input
        type="radio"
        className={cn(
          "h-4 w-4 sm:h-5 sm:w-5 text-primary border-input focus:ring-primary focus:ring-2 focus:ring-offset-2 transition-all duration-150",
          className
        )}
        {...props}
      />
      <span className="text-sm sm:text-base font-medium select-none">{label}</span>
    </label>
  )
}