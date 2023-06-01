import React, {FC} from 'react';
import {BasePlotOptions} from "@/components/function-plotter/base/BasePlotOptions";
import BasePlotter from "@/components/function-plotter/base/BasePlotter";
import {PlottableShape} from "@/components/function-plotter/monte-carlos-plotter/PlottableShape";
import {PlottablePoint} from "@/components/function-plotter/monte-carlos-plotter/PlottablePoint";
import {PlottableCurve} from "@/components/function-plotter/monte-carlos-plotter/PlotableCurve";

let functionPlot: any;

async function loadFunctionPlot() {
    const [module] = await Promise.all([import('function-plot')]);
    functionPlot = module.default;
}

loadFunctionPlot().then(r => {});

type Props = {
    height?: number;
    width?: number;
    shape?: PlottableShape;
    curve?: PlottableCurve;
    points: PlottablePoint[];

    locked?: boolean;

    xDomain?: number[];

    yDomain?: number[];
    boundBox?: PlottableShape;
};

const MonteCarloPlotter: FC<Props> = (
    {
        shape,
        curve,
        boundBox,
        locked = true,
        points,
        height = 400,
        width = 600,
        xDomain = [0, 30],
        yDomain = [0, 30],
    }) => {

    return <BasePlotter height={height} width={width}
                        functionOptions={new FigurePlotterOptions(height, width,  xDomain, yDomain ,points, shape, curve ,boundBox, locked)} />;


};

export default MonteCarloPlotter;

class FigurePlotterOptions extends BasePlotOptions {

    constructor(
        height: number,
        width: number,
        xDomain: number[],
        yDomain: number[],
        points: PlottablePoint[],
        figure?: PlottableShape,
        curve?: PlottableCurve,
        boundBox?: PlottableShape,
        locked = true,
    ) {

        const data = []


        if (figure) {
            data.push({
                points: figure.points,
                fnType: 'points',
                graphType: 'polyline',
                color: 'black',
            })
        }

        if (curve) {
            data.push({
                fn: curve.curveFn,
                graphType: 'polyline',
                color: 'black',
            })
        }

        if (boundBox) {
            data.push({
                points: boundBox.points,
                fnType: 'points',
                graphType: 'polyline',
                color: 'purple',
            })
        }

        const pointsByColor = points.reduce((group, point) => {
            const {color} = point;
            group[color] = group[color] ?? [];
            group[color].push([point.x, point.y]);
            return group;
        }, {});

        // const pointsByColor = points.reduce<{ [key: string]: Array<{ x: number, y: number }> }>((group, point) => {
        //     group[point.color] = group[point.color] ?? [];
        //     group[point.color].push({x: point.x, y: point.y});
        //     return group;
        // }, {});

        Object.keys(pointsByColor).forEach((color) => {
            data.push({
                points: pointsByColor[color],
                fnType: 'points',
                graphType: 'scatter',
                color: color,
            })
        })

        super(
            height,
            width,
            data,
            {
                x: xDomain,
                y: yDomain
            },
            locked
        );


    }
}
