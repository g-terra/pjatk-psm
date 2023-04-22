import Equation from "@/lib/math-utils/equation-solver/Equation";

class Parameters {
    public readonly equation: Equation;
    public readonly lowerBound: number;
    public readonly upperBound: number;
    public readonly precision: number;

    constructor(equation: Equation, lowerBound: number, upperBound: number, acceptableError: number) {
        this.lowerBound = lowerBound;
        this.equation = equation;
        this.upperBound = upperBound;
        this.precision = acceptableError;
    }

}

export default Parameters;
