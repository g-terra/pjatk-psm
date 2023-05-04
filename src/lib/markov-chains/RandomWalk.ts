import MatrixTools from "@/lib/math-utils/matrix-helper/MatrixTools";

const RandomWalk = {

    generateStateMatrix(numSteps: number, leftProbability: number): number[][] {

        const stateMatrix = [];

        const stateCount = 2 * numSteps + 1;

        for (let rowIndex = 0; rowIndex < stateCount; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex < stateCount; columnIndex++) {
                if (rowIndex === columnIndex) {
                    row.push(0);
                } else if (columnIndex - 1 === rowIndex) {
                    row.push(leftProbability);
                } else if (columnIndex + 1 === rowIndex) {
                    row.push(1 - leftProbability);
                } else {
                    row.push(0);
                }
            }
            stateMatrix.push(row);
        }

        return stateMatrix;

    },
    getProbabilitiesForNthStep(numSteps: number, leftProbability: number) {


        const stateMatrix = this.generateStateMatrix(numSteps, leftProbability);

        let initialState = [];

        for (let index = 0; index < stateMatrix.length; index++) {
            initialState.push([0]);
        }

        initialState[Math.floor(stateMatrix.length / 2)][0] = 1;


        for (let index = 0; index < numSteps; index++) {
            initialState = MatrixTools.multiplyMatrix(stateMatrix, initialState);
        }

        return initialState;

    },

    getProbabilityForPositionXatStepNth(numSteps: number, leftProbability:number, number: number) {


        const probabilities = this.getProbabilitiesForNthStep(numSteps, leftProbability);

        return probabilities[number + numSteps][0];

    }
}

export default RandomWalk;