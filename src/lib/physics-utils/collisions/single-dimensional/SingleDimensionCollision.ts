export interface SingleDimensionCollisionResult {
    newVelocity1: number;
    newVelocity2: number;
}

//Resolve a collision between two particles for a single dimension with collision angle 0
const resolve = (mass1: number, mass2: number, velocity1: number, velocity2: number): SingleDimensionCollisionResult => {
    const newVelocity1 = (velocity1 * (mass1 - mass2) + (2 * mass2 * velocity2)) / (mass1 + mass2);
    const newVelocity2 = (velocity2 * (mass2 - mass1) + (2 * mass1 * velocity1)) / (mass1 + mass2);
    return {
        newVelocity1,
        newVelocity2
    };
}

const SingleDimensionCollision = {
    resolve
}

export default SingleDimensionCollision;