import React, {FC} from 'react';
import {PlottableFunction} from "@/components/function-plotter/multi-function-plotter/PlottableFunction";
import {BasePlotOptions} from "@/components/function-plotter/base/BasePlotOptions";
import BasePlotter from "@/components/function-plotter/base/BasePlotter";

type LineChartProps = {
    height?: number;
    width?: number;
    functions: PlottableFunction[];
};

const MultiFunctionPlotter: FC<LineChartProps> = ({functions, height = 400, width = 600}) => {

    return <BasePlotter height={height} width={width}
                        functionOptions={new MultiFunctionPlotterOptions(height, width, functions)}/>;
};

export default MultiFunctionPlotter;

class MultiFunctionPlotterOptions extends BasePlotOptions {

    constructor(height: number, width: number, functions: PlottableFunction[]) {

        const data = functions.map((value) => {
            return ({
                fn: value.fn,
                range: value.range,
                closed: value.closed,
            })
        })


        super(
            height,
            width,
            data,
            {
                x: [-3, 3],
                y: [-3, 3],
            }
        );


    }
}
