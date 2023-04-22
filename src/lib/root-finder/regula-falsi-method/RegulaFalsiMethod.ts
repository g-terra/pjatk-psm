import Parameters from "@/lib/root-finder/Parameters";
import EquationSolver from "@/lib/math-utils/equation-solver/EquationSolver";
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
    let iterations : number = 1;

    while (x != 0 && Math.abs(EquationSolver.solve(parameters.equation, x)) > parameters.precision) {

        if (Math.sign(EquationSolver.solve(parameters.equation, x)) == Math.sign(EquationSolver.solve(parameters.equation, lowerBound))) {
            lowerBound = x;
        } else {
            upperBound = x;
        }

        x = calculateNewUpperBound(parameters, upperBound, lowerBound);
        iterations++;
    }

    return Result.fromSuccess(x, iterations , "Regula Falsi Method");
}

const RegulaFalsiMethod = {
    resolve
}

export default RegulaFalsiMethod