import React, {ReactNode} from 'react';
import {useRouter} from "next/router";

type LayoutProps = {
    children: ReactNode;
};

export default function Root({children}: LayoutProps) {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3">
            <header className="flex flex-col items-start justify-center w-full flex-1 px-20 text-center">
                {
                    router.pathname !== "/" ?
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
                            () => {
                                window.history.back();
                            }
                        }>
                            Back
                        </button> : null

                }
            </header>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                {children}
            </main>
        </div>

    );
}






