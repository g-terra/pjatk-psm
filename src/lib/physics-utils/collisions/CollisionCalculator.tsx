import {Particle} from "@/lib/physics-utils/Particle";
import DistanceCalculator from "@/lib/math-utils/cartesian-helper/DistanceCalculator";
import {CollisionResult} from "@/lib/physics-utils/collisions/CollisionResult";
import {cartesianToPolar, polarToCartesian} from "@/lib/math-utils/cartesian-helper/CoordinateConverter";
import AngleTools, {normalizeAngle} from "@/lib/math-utils/cartesian-helper/AngleTools";
import SingleDimensionCollision from "@/lib/physics-utils/collisions/single-dimensional/SingleDimensionCollision";
import TwoDimensionalCollision from "@/lib/physics-utils/collisions/two-dimensional/TwoDimensionalCollision";
import VectorTools from "@/lib/math-utils/cartesian-helper/VectorTools";

export const checkCollision = (particle1: Particle, particle2: Particle): boolean => {

    const particle1Coordinates = {
        x: particle1.positionX,
        y: particle1.positionY
    }

    const particle2Coordinates = {
        x: particle2.positionX,
        y: particle2.positionY
    }

    return DistanceCalculator.CartesianDistance(particle1Coordinates, particle2Coordinates) <= particle1.radius + particle2.radius;
}


export const collide = (particle1: Particle, particle2: Particle): CollisionResult => {

    const hasCollision = checkCollision(particle1, particle2);

    if (!hasCollision) {
        return {
            particle1PostCollision: particle1,
            particle2PostCollision: particle2
        }
    }

    // decompose the velocity vectors
    const particle1Velocity = polarToCartesian(particle1.velocity, particle1.velocityAngle);
    const particle2Velocity = polarToCartesian(particle2.velocity, particle2.velocityAngle);

    // Calculate the collision angle
    const angle = AngleTools.angleBetween({
            x: particle1.positionX,
            y: particle1.positionY
        },
        {
            x: particle2.positionX,
            y: particle2.positionY
        })


    // Rotate the velocity vectors so that the collision angle is 0
    const rotatedVelocities = {
        v1: VectorTools.rotateVector(particle1Velocity, angle),
        v2: VectorTools.rotateVector(particle2Velocity, angle)
    }

    // Calculate the final velocity vectors
    const results = TwoDimensionalCollision.resolve(particle1.mass, particle2.mass, rotatedVelocities.v1, rotatedVelocities.v2);

    // Rotate the final velocity vectors back so that the collision angle is preserved
    const finalVelocity1 = VectorTools.rotateVector(results.newVelocity1, -angle);
    const finalVelocity2 = VectorTools.rotateVector(results.newVelocity2, -angle);


    // Convert the final velocity vectors to polar coordinates
    const newVelocity1 = cartesianToPolar(finalVelocity1.x, finalVelocity1.y);
    const newVelocity2 = cartesianToPolar(finalVelocity2.x, finalVelocity2.y);

    return {
        particle1PostCollision: {
            ...particle1,
            velocity: newVelocity1.magnitude,
            velocityAngle: newVelocity1.angle
        },
        particle2PostCollision: {
            ...particle2,
            velocity: newVelocity2.magnitude,
            velocityAngle: newVelocity2.angle
        }
    }
};

export const checkBoxCollision = (particle: Particle, width: number, height: number) => {

    const leftCollision = particle.positionX - particle.radius <= 0;
    const rightCollision = particle.positionX + particle.radius >= width;
    const topCollision = (particle.positionY + particle.radius) >= height;
    const bottomCollision = particle.positionY - particle.radius <= 0;

    return {
        leftCollision,
        rightCollision,
        topCollision,
        bottomCollision
    }
}

export const collideWithBox = (particle: Particle, width: number, height: number): Particle => {

    const {leftCollision, rightCollision, topCollision, bottomCollision} = checkBoxCollision(particle, width, height);

    let angle = particle.velocityAngle;

    if (leftCollision || rightCollision) {
        angle = normalizeAngle(180 - angle);
    }

    if (topCollision || bottomCollision) {
        angle = normalizeAngle(360 - angle);
    }

    return {
        ...particle,
        velocityAngle: angle
    };

}
