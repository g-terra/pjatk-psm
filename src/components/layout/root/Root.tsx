import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Root({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-2 overflow-y-auto">
            {children}
        </div>
    );
}






