//given an EquationObject, the EquationSolver should return the correct the value of F(x)
// constants = [-1, -1, 0 , 1]
// powers = [3, 2, 1, 0]

import EquationSolver from "@/lib/math-utils/equation-solver/EquationSolver";

import {describe, expect, test} from '@jest/globals';
import Equation from "@/lib/math-utils/equation-solver/Equation";

describe('EquationSolver', () => {

    test('should return the correct value of F(x) = X^2', () => {

        // Arrange
        const constants = [1];
        const powers = [2];
        const equation = new Equation(constants, powers);

        // Act
        const result = EquationSolver.solve(equation, 2);

        // Assert
        expect(result).toBe(4)

    });

    test('should return the correct value of F(x) = X^3 - X^2 - X - 1', () => {

        // Arrange
        const constants = [1, -1, -1, -1];
        const powers = [3, 2, 1, 0];
        const equation = new Equation(constants, powers);

        // Act
        const result = EquationSolver.solve(equation, 2);

        // Assert
        expect(result).toBe(1)
    });

    test('should return the correct value of F(x) = X^2', () => {

        // Arrange
        const constants = [1];
        const powers = [2];
        const equation = new Equation(constants, powers);

        // Act
        const result = EquationSolver.solve(equation, 0);

        // Assert
        expect(result).toBe(0)
    });

});