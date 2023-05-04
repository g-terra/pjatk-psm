import MatrixTools from "@/lib/math-utils/matrix-helper/MatrixTools";

describe('MatrixTools', () => {

    test('should multiply matrix', () => {

            const matrix1 = [
                [1, 2],
                [4, 5]
            ];

            const matrix2 = [
                [2],
                [3]
            ];

            const expected = [
                [8],
                [23]
            ];

            const actual = MatrixTools.multiplyMatrix(matrix1, matrix2);

            expect(actual).toEqual(expected);

        }
    );
});