import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";

export class Result {

    constructor(methodName: string, breakdown: Slice[]) {
        this.methodName = methodName;
        this.breakdown = breakdown;
    }
    methodName: string;
    breakdown: Slice[];

    getArea(): number {
        let sum = 0;
        for (const slice of this.breakdown) {
            sum += slice.area;
        }
        return sum;
    }
}

export interface Slice {

    fn: PolynomialFunction;

    start: number;

    end: number;

    area: number;
}