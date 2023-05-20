import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import {Result, Slice} from "@/lib/math-utils/Integrals/Result";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

function calcAreaTrapezoid(base: number, height1: number, height2: number) {
    return (base) * ((height1) + (height2)) / 2;
}

const resolve = (fn: string, range: { start: number, end: number }, slices: number): Result => {

    const sliceWidth = (range.end - range.start) / slices;
    const slicesArray: Slice[] = [];
    let x = range.start;
    for (let i = 0; i < slices; i++) {


        const from = x;
        const to = x + sliceWidth;
        const yFrom = MathFunctionSolver.solve(fn, from);
        const yTo = MathFunctionSolver.solve(fn, to);
        const sliceFn = PolynomialFunction.from2Points({
                x: from,
                y: yFrom
            }, {
                x: to,
                y: yTo
            }
        )

        const slice = {
            fn: sliceFn,
            start: from,
            end: to,
            area: calcAreaTrapezoid(sliceWidth, yFrom, yTo)
        }

        slicesArray.push(slice);
        x += sliceWidth;
    }
    return new Result("Rectangle Method", slicesArray);
}


const TrapezoidMethod = {
    resolve: resolve
}

export default TrapezoidMethod