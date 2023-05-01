import {Particle} from "@/lib/physics-utils/Particle";
import {polarToCartesian} from "@/lib/math-utils/cartesian-helper/CoordinateConverter";

const calculatePosition = (particle: Particle, time: number) => {

    const velocityComponents = polarToCartesian(particle.velocity, particle.velocityAngle);

    return {
        x: particle.positionX + velocityComponents.x,
        y: particle.positionY + velocityComponents.y,
    };

}

const Motion = {
    calculatePosition
}

export default Motion;