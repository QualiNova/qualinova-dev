import type { SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
    error?: string;
}

export default function Select({ className, children, error, ...props }: SelectProps) {
    return (
        <div className="relative w-full">
            <select
                className={cn(
                    'flex h-10 w-full appearance-none rounded-md border bg-input px-3 py-2 text-sm  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
                    'flex h-10 sm:h-12 w-full appearance-none rounded-md border border-input bg-input px-3 py-2 text-sm sm:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation',
                    className,
                )}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 opacity-50 pointer-events-none" />
            {error && <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>}
        </div>
    );
}
