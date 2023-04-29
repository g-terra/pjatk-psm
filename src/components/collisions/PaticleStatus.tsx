import {Particle} from "@/lib/physics-utils/Particle";
import React from "react";

interface Props {
    particle: Particle;
}

const ParticleStatus = ({particle}: Props) => {
    return <div className="flex flex-col bg-gray-100 shadow-md p-2 rounded-xl mt-2 min-w-[250px]">
        <h1 className="text-xl">Particle {particle.id} </h1>
        <p>Position:
            ({particle.positionX.toFixed(2)}, {particle.positionY.toFixed(2)})</p>
        <p>Velocity: {particle.velocity.toFixed(2)}</p>
        <p>Angle: {particle.velocityAngle.toFixed(2)}</p>
    </div>;
}

export default ParticleStatus;