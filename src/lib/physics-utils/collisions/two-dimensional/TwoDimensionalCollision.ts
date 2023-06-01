import {Point} from "@/lib/math-utils/cartesian-helper/model/Point";
import SingleDimensionCollision from "@/lib/physics-utils/collisions/single-dimensional/SingleDimensionCollision";

export interface TwoDimensionalCollisionResult {
    newVelocity1: Point;
    newVelocity2: Point;
}

//Resolve a collision between two particles for a two dimension plan with collision angle 0
const resolve = (mass1: number, mass2: number, velocity1: Point, velocity2: Point): TwoDimensionalCollisionResult => {

    const xResult = SingleDimensionCollision.resolve(mass1, mass2, velocity1.x, velocity2.x);
    const yResult = SingleDimensionCollision.resolve(mass1, mass2, velocity1.y, velocity2.y);

    return {
        newVelocity1: {
            x: xResult.newVelocity1,
            y: yResult.newVelocity1
        },
        newVelocity2: {
            x: xResult.newVelocity2,
            y: yResult.newVelocity2
        }
    };

}

const TwoDimensionalCollision = {
    resolve
}

export default TwoDimensionalCollision;

