import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col">
                <label aria-label={`Label for ${label}`} className="text-white text-xs lg:text-sm">
                    {label}
                </label>
                <input
                    ref={ref}
                    {...props}
                    className={cn(
                        'custom-date-input mt-1 p-2 border border-gray-border-800 rounded-lg text-white text-xs lg:text-base focus:ring-2 focus:ring-slate-500 bg-transparent placeholder:text-xs placeholder:lg:text-base',
                        className,
                    )}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
