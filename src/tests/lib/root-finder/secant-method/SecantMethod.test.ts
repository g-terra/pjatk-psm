import {describe, expect, test} from "@jest/globals";
import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import SecantMethod from "@/lib/root-finder/secant-method/SecantMethod";
import Parameters from "@/lib/root-finder/Parameters";

describe("Secant method test", () => {

    test('should return the correct root for f(x) = x^3-x-1', function () {

        const constants = [1, -1, -1];
        const powers = [3, 1, 0];

        const equation = new PolynomialFunction(constants, powers);

        const x0 = 1;
        const x1 = 2;
        const acceptableError = 0.00001;

        // Act
        const result = SecantMethod.resolve(new Parameters(equation.toDisplayString(), x0, x1, acceptableError,1000));

        // Assert
        expect(result.root).toBeCloseTo(1.324717, 5);
        expect(result.iterations).toBeGreaterThan(0);

    });

    test('should return the correct root  f(x) = x^2 ', () => {

        // Arrange
        const constants = [1];
        const powers = [2];

        const equation = new PolynomialFunction(constants, powers);

        const lowerBound = 0;
        const upperBound = 1;
        const acceptableError = 0.00001;

        // Act
        const result = SecantMethod.resolve(new Parameters(equation.toDisplayString(), lowerBound, upperBound, acceptableError,1000));

        // Assert
        expect(result.root).toBeCloseTo(0,5)
        expect(result.iterations).toBeGreaterThan(0);

    });


});