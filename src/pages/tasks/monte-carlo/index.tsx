import React, {useEffect, useState} from "react";
import Link from "next/link";


export default function Area() {

    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-8 py-2">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Monte Carlo</h1>
                <p className="text-gray-600 mb-4">
                    Select the shape you want to calculate the area of
                </p>
            </div>
            <div
                className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">

                <Link href="/tasks/monte-carlo/rectangle">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Rectangle
                    </button>
                </Link>
                <Link href="/tasks/monte-carlo/polygon">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Polygon
                    </button>
                </Link>
                <Link href="/tasks/monte-carlo/curve" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Curve
                    </button>
                </Link>

            </div>
        </main>
    );


}
