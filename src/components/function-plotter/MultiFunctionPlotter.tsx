import React, {FC, useEffect, useRef, useState} from 'react';
import {FunctionPlotOptions} from 'function-plot/dist/types';
import {PlottableFunction} from "@/components/function-plotter/PlottableFunction";

let functionPlot: any;

async function loadFunctionPlot() {
    const [module] = await Promise.all([import('function-plot')]);
    functionPlot = module.default;
}

loadFunctionPlot().then(r => console.log(r));

type LineChartProps = {
    height?: number;
    width?: number;
    functions: PlottableFunction[];
};


const MultiFunctionPlotter: FC<LineChartProps> = ({functions, height = 400, width = 600}) => {
    const chartRef = useRef(null);
    const [isLoaded] = useState(false);
    const tailwindWidth = `w-[${width + 100}px]`
    const tailwindHeight = `h-[${height + 100}px]`
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    useEffect(() => {
        const loadFunctionPlot = async () => {
            const {default: functionPlot} = await import('function-plot');
            setIsLibraryLoaded(true);
            functionPlot(new FunctionOptions(height, width, functions));
        };

        if (!isLoaded) {
            loadFunctionPlot().then(r => console.log(r));
        }
    }, [isLoaded, functions, height, width, isLibraryLoaded]);


    return (
        <div className={`flex flex-col items-center justify-center ${tailwindWidth} ${tailwindHeight}`}>
            <div ref={chartRef} id={
                'chart'
            }>
            </div>
        </div>
    );
};

export default MultiFunctionPlotter;

class FunctionOptions implements FunctionPlotOptions {
    target: string;
    data: any[];
    grid: boolean;
    yAxis: {
        domain: number[];
    };
    xAxis: {
        domain: number[];
    };
    width: number;
    height: number;
    constructor(height: number, width: number, functions: PlottableFunction[]) {
        this.target = '#chart';
        this.data = [];

        functions.forEach((value) => {
            this.data.push({
                fn: value.fn,
                range: value.range,
                closed: value.closed,
            })
        })

        this.grid = true;
        this.yAxis = {
            domain: [-3, 3],
        };
        this.xAxis = {
            domain: [-3, 3],
        };
        this.width = width;
        this.height = height;
    }
}
