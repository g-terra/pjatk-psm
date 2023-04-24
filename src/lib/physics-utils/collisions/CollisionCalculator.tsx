import {Particle} from "@/lib/physics-utils/collisions/Particle";
import DistanceCalculator from "@/lib/math-utils/cartesian-helper/DistanceCalculator";
import {CollisionResult} from "@/lib/physics-utils/collisions/CollisionResult";
import {cartesianToPolar, polarToCartesian} from "@/lib/math-utils/cartesian-helper/CoordinateConverter";

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
    // Calculate the collision angle
    const angle = Math.atan2(particle2.positionY - particle1.positionY, particle2.positionX - particle1.positionX);

    const particle1Velocity = polarToCartesian(particle1.velocity, particle1.velocityAngle);
    const particle2Velocity = polarToCartesian(particle2.velocity, particle2.velocityAngle);

    const rotatedVelocities = {
        p1: {
            x: particle1Velocity.x * Math.cos(angle) + particle1Velocity.y * Math.sin(angle),
            y: particle1Velocity.y * Math.cos(angle) - particle1Velocity.x * Math.sin(angle),
        },
        p2: {
            x: particle2Velocity.x * Math.cos(angle) + particle2Velocity.y * Math.sin(angle),
            y: particle2Velocity.y * Math.cos(angle) - particle2Velocity.x * Math.sin(angle),
        },
    };

    // Calculate new velocities using 1D elastic collision formulas
    const finalVelocities = {
        p1: ((particle1.mass - particle2.mass) * rotatedVelocities.p1.x + 2 * particle2.mass * rotatedVelocities.p2.x) / (particle1.mass + particle2.mass),
        p2: ((particle2.mass - particle1.mass) * rotatedVelocities.p2.x + 2 * particle1.mass * rotatedVelocities.p1.x) / (particle1.mass + particle2.mass),
    };

    // Rotate the final velocities back to the original coordinate system
    particle1Velocity.x = finalVelocities.p1 * Math.cos(-angle) + rotatedVelocities.p1.y * Math.sin(-angle);
    particle1Velocity.y = rotatedVelocities.p1.y * Math.cos(-angle) - finalVelocities.p1 * Math.sin(-angle);

    particle2Velocity.x = finalVelocities.p2 * Math.cos(-angle) + rotatedVelocities.p2.y * Math.sin(-angle);
    particle2Velocity.y = rotatedVelocities.p2.y * Math.cos(-angle) - finalVelocities.p2 * Math.sin(-angle);


    const newVelocity1 = cartesianToPolar(particle1Velocity.x, particle1Velocity.y);
    const newVelocity2 = cartesianToPolar(particle2Velocity.x, particle2Velocity.y);

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

