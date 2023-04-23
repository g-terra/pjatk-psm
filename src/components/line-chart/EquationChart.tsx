import React, {FC, useEffect, useRef, useState} from 'react';
import {FunctionPlotOptions} from 'function-plot/dist/types';
import Parameters from "@/lib/root-finder/Parameters";
import EquationDisplay from "@/components/line-chart/EquationDisplay";

let functionPlot: any;

async function loadFunctionPlot() {
    const [module] = await Promise.all([import('function-plot')]);
    functionPlot = module.default;
}

loadFunctionPlot().then(r => console.log(r));

type LineChartProps = {
    parameters: Parameters;
    height?: number;
    width?: number;

    showEquation?: boolean;
};

const EquationChart: FC<LineChartProps> = ({parameters, height = 400, width = 600, showEquation = false}) => {
    const chartRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const tailwindWidth = `w-[${width + 100}px]`
    const tailwindHeight = `h-[${height + 100}px]`
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    useEffect(() => {
        const loadFunctionPlot = async () => {
            const {default: functionPlot} = await import('function-plot');
            setIsLibraryLoaded(true);
            functionPlot(new funcOptions(parameters, height, width));
        };

        if (!isLoaded) {
            loadFunctionPlot().then(r => console.log(r));
        }
    }, [isLoaded, parameters, height, width, isLibraryLoaded]);

    return (
        <div className={`flex flex-col items-center justify-center ${tailwindWidth} ${tailwindHeight}`}>
            <div>
                <h1 className="text-2xl font-bold">Graph</h1>
            </div>
            {showEquation && <EquationDisplay equation={parameters.equation}/>}
            <div ref={chartRef} id={
                'chart'
            }/>
        </div>
    )
        ;
};

export default EquationChart;

class funcOptions implements FunctionPlotOptions {
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

    constructor(parameters: Parameters, height: number, width: number) {
        this.target = '#chart';
        this.data = [
            {
                fn: parameters.equation.toDisplayString(),
                sampler: 'builtIn',
                graphType: 'polyline',
            },
        ];
        this.grid = true;
        this.yAxis = {
            domain: [-5, 5],
        };
        this.xAxis = {
            domain: [-5, 5],
        };
        this.width = width;
        this.height = height;

    }
}
