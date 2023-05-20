import polinomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import * as math from 'mathjs';

const mathFunctionSolver = {
    solvePoly: (equation: polinomialFunction, x: number): number => {

        let result = 0;
        const constants = equation.constants;
        const powers = equation.powers;

        for (let i = 0; i < constants.length; i++) {
            result += constants[i] * Math.pow(x, powers[i]);
        }

        return result;
    },
    solve: (equation: string, x: number): number => {

        return math.evaluate(equation, {x: x});
    },

    isValid: (equation: string): boolean => {
        try {
           math.parse(equation);
           mathFunctionSolver.solve(equation, 0);
           return true;
        } catch (e) {
            return false;
        }
    }
}

export default mathFunctionSolver