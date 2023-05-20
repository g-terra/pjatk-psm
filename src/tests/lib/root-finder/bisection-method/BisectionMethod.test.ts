import BisectionMethod from "@/lib/root-finder/bisection-method/BisectionMethod";
import {describe, expect, test} from '@jest/globals';
import Parameters from "@/lib/root-finder/Parameters";
import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";

describe('Bisection', () => {

    test('should return the correct root for f(x) = x^3-x-1', () => {

        const lowerBound = 1;
        const upperBound = 2;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters("x^3-x-1", lowerBound, upperBound, acceptableError,1000));

        console.log(result);

        // Assert
        expect(result.root).toBeCloseTo(1.32472, 4);
        expect(result.iterations).toBeGreaterThan(0);

    });


    test('should return the correct root for f(x) = x^2 ', () => {

        // Arrange
        const constants = [1];
        const powers = [2];

        const equation = new PolynomialFunction(constants, powers);

        const lowerBound = 0;
        const upperBound = 1;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters(equation.toDisplayString(), lowerBound, upperBound, acceptableError,1000));

        // Assert
        expect(result.root).toBeCloseTo(0, 5)
        expect(result.iterations).toBeGreaterThan(0);
    });

    test('should return the correct root for f(x) = 3x-1 ', () => {

        // Arrange
        const lowerBound = 0;
        const upperBound = 1;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters("3x-1", lowerBound, upperBound, acceptableError,1000));

        // Assert
        expect(result.root).toBeCloseTo(0.33333, 4)
        expect(result.iterations).toBeGreaterThan(0);
    });



});
