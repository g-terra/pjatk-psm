import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";

class Parameters {
    public readonly equation: string;
    public readonly lowerBound: number;
    public readonly upperBound: number;
    public readonly precision: number;
    public readonly iterationLimit: number;

    constructor(equation: string, lowerBound: number, upperBound: number, acceptableError: number, iterationLimit : number) {
        this.lowerBound = lowerBound;
        this.equation = equation;
        this.upperBound = upperBound;
        this.precision = acceptableError;
        this.iterationLimit = iterationLimit;
    }

}

export default Parameters;
