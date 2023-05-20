import exp from "constants";
import {Point} from "@/lib/math-utils/cartesian-helper/Point";

class PolynomialFunction {
    public readonly constants: number[];

    public readonly powers: number[];

    constructor(constants: number[], powers: number[]) {
        this.constants = constants;
        this.powers = powers;
    }

    public toDisplayString(): string {
        let equationString = "";
        for (let i = 0; i < this.constants.length; i++) {
            equationString += this.constants[i] + "x^" + this.powers[i];
            if (i < this.constants.length - 1) {
                if (this.constants[i + 1] >= 0) {
                    equationString += "+";
                }
            }
        }
        return equationString;
    }

    isValid() {
        return this.constants.length > 0 && this.constants.length === this.powers.length;
    }

    static fromPoint(point: Point): PolynomialFunction {
        return new PolynomialFunction([point.y], [0]);
    }

    static from2Points(point1: Point, point2: Point): PolynomialFunction {
        const slope = (point2.y - point1.y) / (point2.x - point1.x);
        const yIntercept = point1.y - slope * point1.x;
        return new PolynomialFunction([yIntercept, slope], [0, 1]);
    }

    static from3Points(point1: Point, point2: Point, point3: Point): PolynomialFunction {

        const x1 = point1.x;
        const x2 = point2.x;
        const x3 = point3.x;

        const y1 = point1.y;
        const y2 = point2.y;
        const y3 = point3.y;

        const a = ((y1 - y2) * (x1 - x3) - (y1 - y3) * (x1 - x2)) / ((x1 - x2) * (x1 - x3) * (x2 - x3));
        const b = ((y1 - y2) - a * (x1 * x1 - x2 * x2)) / (x1 - x2);
        const c = y1 - a * x1 * x1 - b * x1;

        return new PolynomialFunction([c, b, a], [0, 1, 2]);

    }

}


export default PolynomialFunction;