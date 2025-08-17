import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export default function Textarea({ className, error, ...props }: TextareaProps) {
    return (
        <div className="w-full">
            <textarea
                className={cn(
                    'flex min-h-[80px] sm:min-h-[100px] w-full rounded-md border border-input bg-input px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y touch-manipulation',
                    className,
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>}
        </div>
    );
}
