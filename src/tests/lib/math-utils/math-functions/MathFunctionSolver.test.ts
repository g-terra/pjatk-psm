import mathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

import {describe, expect, test} from '@jest/globals';
import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

describe('mathFunctionSolver', () => {

    test('should return the correct value of F(x) = X^2', () => {

        // Arrange
        const constants = [1];
        const powers = [2];
        const equation = new PolynomialFunction(constants, powers);

        // Act
        const result = MathFunctionSolver.solvePoly(equation, 2);

        // Assert
        expect(result).toBe(4)

    });

    test('should return the correct value of F(x) = X^3 - X^2 - X - 1', () => {

        // Arrange
        const constants = [1, -1, -1, -1];
        const powers = [3, 2, 1, 0];
        const equation = new PolynomialFunction(constants, powers);

        // Act
        const result = MathFunctionSolver.solvePoly(equation, 2);

        // Assert
        expect(result).toBe(1)
    });

    test('should return the correct value of F(x) = X^2', () => {

        // Arrange
        const constants = [1];
        const powers = [2];
        const equation = new PolynomialFunction(constants, powers);

        // Act
        const result = MathFunctionSolver.solvePoly(equation, 0);

        // Assert
        expect(result).toBe(0)
    });

    test('should return the correct value of F(x) = x^2', () => {

        // Arrange
        const equation = "x^2";

        // Act
        const result = MathFunctionSolver.solve(equation, 2);

        // Assert
        expect(result).toBe(4)
    });


    //test if the function is complete
    test('should return true if the function is complete', () => {

            // Arrange
            const equation = "x^2";

            // Act
            const result = MathFunctionSolver.isValid(equation);
            // Assert
            expect(result).toBe(true)
        }
    );

    test('should return false if the function is not complete', () => {

            // Arrange
            const equation = "x^2+";

            // Act
            const result = MathFunctionSolver.isValid(equation);
            // Assert
            expect(result).toBe(false)
        }
    );

    test('should return false` if the function has more than one variable', () => {

        // Arrange
        const equation = "x^2+y";

        // Act
        const result = MathFunctionSolver.isValid(equation);
        // Assert
        expect(result).toBe(false)
    });

});