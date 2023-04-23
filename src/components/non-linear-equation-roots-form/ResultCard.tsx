// components/ResultCard.tsx
import React, { FC } from 'react';
import Result from "@/lib/root-finder/Result";

type ResultCardProps = {
    result: Result;
};

const ResultCard: FC<ResultCardProps> = ({ result }) => {
    const isError = result.error?.length > 0;
    const cardBgColor = isError ? 'bg-red-500' : 'bg-white';
    const textColor = isError ? 'text-white' : 'text-black';

    return (
        <div
            className={`p-6 rounded-lg shadow-md ${cardBgColor} ${textColor} h-full w-full overflow-y-auto min-h-[150px] max-w-full`}
        >
            {isError ? (
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Error</h3>
                    <p>{result.error}</p>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-semibold ">{result.methodName}</h3>
                    {/*a line to divide the two sections*/}
                    <hr className="my-4" />

                    <div className="flex flex-col justify-between mt-4 gap-3">
                        <div>
                            <p className="font-semibold">Root:</p>
                            <p>{result.root?.toFixed(10)}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Iterations:</p>
                            <p>{result.iterations}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultCard;
