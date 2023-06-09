//generate a given amount of random points  withing a given monte-carlo using pseudo-random number generator. point is number[][]
//monte-carlo is given by height and width parameters
import uniform from "@stdlib/random-base-uniform";

export function generateRandomPoints(amount: number, height: number, width: number): number[][] {
    let points: number[][] = [];
    for (let i = 0; i < amount; i++) {
        points.push([Math.random() * width, Math.random() * height]);
    }
    return points;
}

//generate random points withing a given range for height and width and a given amount of points
export function generateRandomPointsInRange(amount: number, heightRange: number[], widthRange: number[]): number[][] {

    let points: number[][] = [];
    for (let i = 0; i < amount; i++) {
        points.push([
            uniform(
                widthRange[0],
                widthRange[1]
            ),
            uniform(
                heightRange[0],
                heightRange[1]
            )
        ]);
    }
    return points;
}

export function generateRandomPointsInsideBox(amount: number, box : number[][]){

    return generateRandomPointsInRange(amount, [box[0][1], box[3][1]], [box[0][0], box[1][0]]);
}