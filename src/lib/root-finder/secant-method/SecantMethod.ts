import Parameters from "@/lib/root-finder/Parameters";
import EquationSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import Result from "@/lib/root-finder/Result";

function calculateNewUpperBound(parameters: Parameters, upperBound: number, lowerBound: number): number {
    const fUpperBound: number = EquationSolver.solve(parameters.equation, upperBound);
    const fLowerBound: number = EquationSolver.solve(parameters.equation, lowerBound);
    return upperBound - (fUpperBound * (upperBound - lowerBound)) / (fUpperBound - fLowerBound);
}

const resolve = (parameters: Parameters): Result => {
    let lowerBound: number = parameters.lowerBound;
    let upperBound: number = parameters.upperBound;
    let x: number = calculateNewUpperBound(parameters, upperBound, lowerBound);
    let iterations = 1;

    while (Math.abs(x - upperBound) > parameters.precision && iterations < parameters.iterationLimit) {
        lowerBound = upperBound;
        upperBound = x;
        x = calculateNewUpperBound(parameters, upperBound, lowerBound);
        iterations++;
    }


    const currentY = Math.abs(0 - EquationSolver.solve(parameters.equation, x))

    if (isNaN(x) ||currentY > parameters.precision) return Result.fromError("Secant method", "Secant method failed to converge." +
        " Try changing the bounds or the precision. Reasons for failure: 1) There where more iterations than the iteration limit. 2) The function does not fully cross the x axis.")


    return Result.fromSuccess(x, iterations, "Secant Method");
}

const SecantMethod = {
    resolve
}

export default SecantMethod