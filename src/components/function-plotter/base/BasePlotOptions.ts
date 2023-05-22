import {FunctionPlotOptions} from "function-plot/dist/types";

export class BasePlotOptions implements FunctionPlotOptions {
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

    disableZoom: boolean;

    constructor(height: number, width: number, data: any , domains : {x: number[] , y: number[]} ,disableZoom: boolean = false , target: string = '#chart' ) {
        this.disableZoom = disableZoom;
        this.target = target;
        this.data = data;
        this.grid = true;
        this.yAxis = {
            domain: domains.x,
        };
        this.xAxis = {
            domain: domains.y,
        };
        this.width = width;
        this.height = height;
    }
}