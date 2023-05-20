import {describe, expect, test} from '@jest/globals';
import PolynomialFunction from "@/lib/math-utils/math-functions/PolynomialFunction";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

describe('mathFunction', () => {

    test('should return the correct value of F(x) = X^2', () => {

        // Arrange
        const constants = [1];
        const powers = [2];
        const equation = new PolynomialFunction(constants, powers);

        // Act
        const result = equation.toDisplayString();
        // Assert
        expect(result).toBe("1x^2")

    });

    test('should return the correct value of F(x) = X^3 - X^2 - X - 1', () => {

            // Arrange
            const constants = [1, -1, -1, -1];
            const powers = [3, 2, 1, 0];
            const equation = new PolynomialFunction(constants, powers);

            // Act
            const result = equation.toDisplayString();
            // Assert
            expect(result).toBe("1x^3-1x^2-1x^1-1x^0")
        }
    );

    test('should return the correct value of F(x) = 1', () => {

        // Arrange
        const constants = [1];
        const powers = [0];
        const equation = PolynomialFunction.fromPoint({x: 0, y: 1});

        // Act
        const result = equation.toDisplayString();
        // Assert
        expect(result).toBe("1x^0")
    });

    test('should return the correct value of F(x) = 2x+1', () => {

            // Arrange
            const constants = [2, 1];
            const powers = [1, 0];
            const equation = new PolynomialFunction(constants, powers);

            // Act
            const result = equation.toDisplayString();
            // Assert
            expect(result).toBe("2x^1+1x^0")
        }
    );
});