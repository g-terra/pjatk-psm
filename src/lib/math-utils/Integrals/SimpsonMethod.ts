import {Result, Slice} from "@/lib/math-utils/Integrals/Result";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";


const areaSimpson = (fn: string, xValues: number[], h: number): number => {

    const multiplier = h / 3;
    return xValues.map((xVal, i) => {
        if (i == 0 || i == xValues.length - 1) {
            return multiplier * (MathFunctionSolver.solve(fn, xVal));
        } else if (i % 2 == 0 && i != xValues.length - 1) {
            return 2 * multiplier * (MathFunctionSolver.solve(fn, xVal));
        } else {
            return 4 * multiplier * (MathFunctionSolver.solve(fn, xVal))
        }
    }).reduce((a, b) => a + b, 0);

}
const resolve = (fn: string, range: { start: number, end: number }, slices: number): Result => {


    //create a list of all x values
    const xValues = [];
    const sliceWidth = (range.end - range.start) / slices;
    let x = range.start;
    for (let i = 0; i < slices; i++) {
        xValues.push(x);
        x += sliceWidth;
    }
    xValues.push(range.end);

    console.log("xValues", xValues)

    const groups = [];
    let i = 0;
    while (i < xValues.length - 1) {
        const group = [];
        group.push(xValues[i]);
        group.push((xValues[i] + xValues[i + 1]) / 2);
        group.push(xValues[i + 1]);
        groups.push(group);
        i++;
    }

    console.log("groups", groups)


    //generate the function for each group
    const breakdown = [];
    for (const group of groups) {
        const points = group.map((xVal, i) => {
                return {
                    x: xVal,
                    y: MathFunctionSolver.solve(fn, xVal)
                }
            }
        );

        console.log("points", points);
        const simpson = PolynomialFunction.from3Points(points[0], points[1], points[2]);
        breakdown.push({
            fn: simpson,
            start: points[0].x,
            end: points[2].x,
            area: 0
        })
    }


    return new ResultSimpson("Simpson Method", breakdown, areaSimpson(fn, xValues, sliceWidth));
}

const SimpsonMethod = {
    resolve: resolve
}

class ResultSimpson extends Result {
    //override the getArea method to provide a value form a variable from the constructor
    area: number;

    constructor(methodName: string, breakdown: Slice[], area: number) {
        super(methodName, breakdown);
        this.area = area;
    }

    getArea(): number {
        return this.area;
    }
}

export default SimpsonMethod
