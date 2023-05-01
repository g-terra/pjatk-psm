import {CollisionLogEntry} from "@/lib/physics-utils/collisions/CollisionCalculator";
import React, {FC} from "react";
import {Particle} from "@/lib/physics-utils/Particle";


interface ParticleProps {
    state: string;
    particle: Particle;
}

export const ParticleLogEntryView: FC<ParticleProps> = ({state, particle}) => {
    return <div className="flex flex-col  bg-white  shadow-md p-2 rounded-xl mt-2">
        <p>{state}</p>
        <div className="flex flex-row gap-2 justify-center">
            <p>velocity: {particle.velocity.toFixed(2)}</p>
            <p>angle: {particle.velocityAngle.toFixed(2)}</p>
        </div>
    </div>;
}

interface Props {
    entry: CollisionLogEntry
}

const ParticleParticleEntryView: FC<Props> = ({entry}) => {

    return <div className="flex flex-row gap-3 bg-white rounded-xl p-1 ">
        <div className="flex flex-col gap-1 bg-white shadow-md rounded-xl p-2">
            <h1> Particle 1</h1>
            <div className={"flex flex-row gap-3 justify-center"}>
                <ParticleLogEntryView particle={entry.particle1BeforeCollision} state={"Entry"}/>
                <ParticleLogEntryView particle={entry.particle1AfterCollision} state={"Exit"}/>
            </div>
        </div>
        <div className="flex flex-col gap-1 bg-white shadow-md rounded-xl p-2">
            <h1> Particle 2</h1>
            <div className={"flex flex-row gap-3 justify-center"}>
                <ParticleLogEntryView particle={entry.particle2BeforeCollision} state={"Entry"}/>
                <ParticleLogEntryView particle={entry.particle2AfterCollision} state={"Exit"}/>
            </div>
        </div>
    </div>
}

export default ParticleParticleEntryView