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
    let iterations: number = 1;

    console.log("precision:", parameters.precision)

    const updateBounds = () => {
        if (Math.sign(EquationSolver.solve(parameters.equation, x)) == Math.sign(EquationSolver.solve(parameters.equation, lowerBound))) {
            lowerBound = x;
        } else {
            upperBound = x;
        }
    }
    let x: number = calculateNewUpperBound(parameters, upperBound, lowerBound);

    while (Math.abs(EquationSolver.solve(parameters.equation, x)) > parameters.precision && iterations < parameters.iterationLimit) {

        updateBounds();
        x = calculateNewUpperBound(parameters, upperBound, lowerBound)
        iterations++;
    }


    const currentY = Math.abs(0 - EquationSolver.solve(parameters.equation, x))

    if (isNaN(x) || currentY > parameters.precision) return Result.fromError("Regula falsi method", "Regula falsi method failed to converge." +
        " Try changing the bounds or the precision. Reasons for failure: 1) There where more iterations than the iteration limit. 2) The selected bounds create a horizontal line.")


    return Result.fromSuccess(x, iterations, "Regula Falsi Method");
}

const RegulaFalsiMethod = {
    resolve
}

export default RegulaFalsiMethod