import React, {FC} from 'react';

interface Result {
    probability: number;
    error: string;
}

type ResultCardProps = {
    result: Result;
};

const ResultCard: FC<ResultCardProps> = ({result}) => {
    const isError = result.error.length > 0;
    const cardBgColor = isError ? 'bg-red-500' : 'bg-white';
    const textColor = isError ? 'text-white' : 'text-black';

    return (
        <div
            className={`p-6 rounded-lg shadow-md ${cardBgColor} ${textColor} h-full w-full min-h-[150px] max-w-full`}
        >
            {isError ? (
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Error</h3>
                    <p>{result.error}</p>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-semibold ">Probability</h3>
                    <hr className="my-4"/>
                    <div className="flex flex-col justify-between mt-4 gap-3">
                        <div>
                            <p>{(result.probability * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultCard;
