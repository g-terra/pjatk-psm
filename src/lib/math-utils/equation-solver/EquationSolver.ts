import Equation from "@/lib/math-utils/equation-solver/Equation";

const equationSolver = {
    solve: (equation :Equation , x: number): number => {

        let result = 0;
        const constants = equation.constants;
        const powers = equation.powers;

        for (let i = 0; i < constants.length; i++) {
            result += constants[i] * Math.pow(x, powers[i]);
        }

        return result;
    }
}

export default equationSolver