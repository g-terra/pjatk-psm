const MatrixTools = {
    multiplyMatrix(matrix1: number[][], matrix2: number[][]) : number[][] {

        const result = [];

        for (let row = 0; row < matrix1.length; row++) {
            const rowResult = [];
            for (let column = 0; column < matrix2[0].length; column++) {
                let sum = 0;
                for (let index = 0; index < matrix1[0].length; index++) {
                    sum += matrix1[row][index] * matrix2[index][column];
                }
                rowResult.push(sum);
            }
            result.push(rowResult);
        }


        return result;

    }
}

export default MatrixTools;