import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import {Result, Slice} from "@/lib/math-utils/Integrals/Result";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

function calcArea(width:number,height:number) {
    return width * height;
}

const resolve = (fn: string, range: { start: number, end: number }, slices: number): Result => {

    const sliceWidth = (range.end - range.start) / slices;
    const slicesArray: Slice[] = [];
    let x = range.start;
    for (let i = 0; i < slices; i++) {


        const from = x;
        const to = x + sliceWidth;
        const xAvg = (from + to) / 2;
        const yAvg = MathFunctionSolver.solve(fn, xAvg);
        const sliceFn = PolynomialFunction.fromPoint({
            x: xAvg,
            y: yAvg
        })

        const slice = {
            fn: sliceFn,
            start: from,
            end: to,
            area: calcArea(sliceWidth, yAvg)
        }

        slicesArray.push(slice);
        x += sliceWidth;
    }
    return new Result("Rectangle Method", slicesArray);
}


const RectangleMethod = {
    resolve: resolve
}

export default RectangleMethod