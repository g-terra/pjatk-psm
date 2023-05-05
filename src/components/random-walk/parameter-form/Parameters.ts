export default class Parameters {

    constructor(numberOfSteps: number, leftProbability: number, stepLength: number, location: number, direction: "left" | "right") {
        this.steps = numberOfSteps;
        this.leftProbability = leftProbability;
        this.stepLength = stepLength;
        this.location = location;
        this.direction = direction;
    }

    steps: number
    leftProbability: number

    stepLength: number

    location: number

    direction: "left" | "right"

}