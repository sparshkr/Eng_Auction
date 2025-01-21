import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="alert"
                className={`relative w-full rounded-lg border p-4 flex items-center gap-3 ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Alert.displayName = 'Alert';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={`text-sm flex-1 ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    }
);

AlertDescription.displayName = 'AlertDescription';