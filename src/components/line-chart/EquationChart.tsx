import React, {FC, useEffect, useRef, useState} from 'react';
import {FunctionPlotOptions} from 'function-plot/dist/types';
import Parameters from "@/lib/root-finder/Parameters";

let functionPlot : any;

async function loadFunctionPlot() {
    const [module] = await Promise.all([import('function-plot')]);
    functionPlot = module.default;
}

loadFunctionPlot().then(r => console.log(r));

type LineChartProps = {
    parameters: Parameters;
};

const EquationChart: FC<LineChartProps> = ({parameters}) => {
    const chartRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded && functionPlot) {
            functionPlot(new funcOptions(parameters));
            setIsLoaded(true);
        }
    }, [isLoaded, parameters]);

    return <div ref={chartRef} id={
        'chart'
    }/>;
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

    constructor(parameters: Parameters) {
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
            domain: [-10, 10],
        };
        this.xAxis = {
            domain: [-10, 10],
        };
    }
}
