import Parameters from "@/lib/root-finder/Parameters";
import EquationSolver from "@/lib/math-utils/equation-solver/EquationSolver";
import Result from "@/lib/root-finder/Result";

const methodName = "Bisection Method";
const resolve = (parameters: Parameters): Result => {

    let lowerBound: number = parameters.lowerBound;
    let upperBound: number = parameters.upperBound;
    let midPoint: number = (lowerBound + upperBound) / 2;
    let iterations: number = 1;

    if (
        Math.sign(EquationSolver.solve(parameters.equation, lowerBound)) ==
        Math.sign(EquationSolver.solve(parameters.equation, upperBound))
    ) {
        return Result.fromError(methodName, "Invalid bounds. The function result (Y) must have different signs for the given bounds.");
    }


    while (Math.abs(lowerBound - upperBound) > parameters.precision) {
        console.log(`Iteration ${iterations}:`)
        const yLowerBound = EquationSolver.solve(parameters.equation, lowerBound);
        const yMidPoint = EquationSolver.solve(parameters.equation, midPoint);

        if (yLowerBound * yMidPoint <= 0) {
            upperBound = midPoint;
        } else {
            lowerBound = midPoint;
        }

        midPoint = (lowerBound + upperBound) / 2;

        iterations++;
    }

    return Result.fromSuccess(midPoint, iterations, methodName);
}

const BisectionMethod = {
    resolve
}

export default BisectionMethod