// for the given parameters, the bisection method should return the correct root
// constants = [-1, -1, 0 , 1]
// lowerBound =1
// upperBound = 2
// acceptableError = 0.0001

import BisectionMethod from "@/lib/root-finder/bisection-method/BisectionMethod";
import {describe, expect, test} from '@jest/globals';
import Parameters from "@/lib/root-finder/Parameters";
import Equation from "@/lib/math-utils/equation-solver/Equation";


describe('Bisection', () => {

    test('should return the correct root for f(x) = x^3-x-1', () => {

        // Arrange
        const constants = [1, -1, -1];
        const powers = [3, 1, 0];

        const equation = new Equation(constants, powers);

        const lowerBound = 1;
        const upperBound = 2;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters(equation, lowerBound, upperBound, acceptableError));

        // Assert
        expect(result.root).toBeCloseTo(1.324717, 5);
        expect(result.iterations).toBeGreaterThan(0);

    });


    test('should return the correct root for f(x) = x^2 ', () => {

        // Arrange
        const constants = [1];
        const powers = [2];

        const equation = new Equation(constants, powers);

        const lowerBound = 0;
        const upperBound = 1;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters(equation, lowerBound, upperBound, acceptableError));

        // Assert
        expect(result.root).toBeCloseTo(0, 5)
        expect(result.iterations).toBeGreaterThan(0);
    });


    test('should return error result if bounds are not valid', () => {

        const constants = [1, -10];
        const powers = [2, 0];

        const equation = new Equation(constants, powers);

        const lowerBound = 0;
        const upperBound = 2;
        const acceptableError = 0.00001;

        // Act
        const result = BisectionMethod.resolve(new Parameters(equation, lowerBound, upperBound, acceptableError));

        // Assert
        expect(result.error).toBe("Invalid bounds. The function result (Y) must have different signs for the given bounds.")


    });

});
