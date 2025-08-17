import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'secondary' | 'plain';
    fullWidth?: boolean;
    isLoading?: boolean;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            fullWidth = false,
            isLoading = false,
            className,
            disabled,
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            'py-3 px-5 rounded-lg font-medium transition-all duration-200 flex text-[10px] lg:text-sm items-center justify-center hover:scale-95 transform duration-200 cursor-pointer';

        const variants = {
            primary:
                'bg-gray-text-50 text-black-text rounded-md gap-2 font-medium disabled:cursor-not-allowed',
            secondary: 'bg-secondary-button-bg text-black-text rounded-md font-medium gap-4',
            outline:
                'border border-gray-border-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed',
            plain: '!p-0 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-100',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    fullWidth && 'w-full',
                    (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
                    className,
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    children
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
