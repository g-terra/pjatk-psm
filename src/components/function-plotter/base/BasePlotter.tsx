import React, {FC, useEffect, useRef, useState} from 'react';
import {BasePlotOptions} from "@/components/function-plotter/base/BasePlotOptions";

let functionPlot: any;

async function loadFunctionPlot() {
    const [module] = await Promise.all([import('function-plot')]);
    functionPlot = module.default;
}

loadFunctionPlot().then(r => console.log(r));

type Props = {
    height?: number;
    width?: number;
    functionOptions: BasePlotOptions;
};


const BasePlotter: FC<Props> = ({functionOptions}) => {
    const chartRef = useRef(null);
    const [isLoaded] = useState(false);
    const tailwindWidth = `w-[${functionOptions.width + 100}px]`
    const tailwindHeight = `h-[${functionOptions.height + 100}px]`
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    useEffect(() => {
        const loadFunctionPlot = async () => {
            const {default: functionPlot} = await import('function-plot');
            setIsLibraryLoaded(true);
            functionPlot(functionOptions);
        };

        if (!isLoaded) {
            loadFunctionPlot().then(r => console.log(r));
        }
    }, [isLoaded, functionOptions , isLibraryLoaded]);


    return (
        <div className={`flex flex-col items-center justify-center ${tailwindWidth} ${tailwindHeight}`}>
            <div ref={chartRef} id={
                'chart'
            }>
            </div>
        </div>
    );
};

export default BasePlotter;
