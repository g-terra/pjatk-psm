import Parameters from "@/lib/root-finder/Parameters";
import EquationSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import Result from "@/lib/root-finder/Result";

const methodName = "Bisection Method";
const resolve = (parameters: Parameters): Result => {

    console.log("parameters:", parameters)

    let A: number = parameters.lowerBound;
    let C: number = parameters.upperBound;
    let x
    let iterations = 1

    if (EquationSolver.solve(parameters.equation, A) == 0) return Result.fromSuccess(A, iterations, methodName);
    if (EquationSolver.solve(parameters.equation, C) == 0) return Result.fromSuccess(C, iterations, methodName);

    do {
        x = (A + C) / 2;
        let fB = EquationSolver.solve(parameters.equation, x);
        let fA = EquationSolver.solve(parameters.equation, A);

        if (fA * fB <= 0) {
            C = x;
        } else {
            A = x;
        }

        iterations++;

    } while (Math.abs(A - C) > parameters.precision && iterations < parameters.iterationLimit)



    if (isNaN(x)) {
        return Result.fromError("Bisection method", "Bisection Method failed to converge." +
            " Try changing the bounds or the precision. Reasons for failure: 1) There where more iterations than the iteration limit. 2) The function does not fully cross the x axis.")
    }
    return Result.fromSuccess(x, iterations, methodName);

}


const BisectionMethod = {
    resolve
}

export default BisectionMethod