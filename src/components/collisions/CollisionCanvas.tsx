import React, {FC, useCallback, useEffect, useState} from 'react';
import {Layer, Stage} from 'react-konva';
import {
    collide,
    collideWithBox
} from "@/lib/physics-utils/collisions/CollisionCalculator";
import {Particle} from "@/lib/physics-utils/Particle";
import Motion from "@/lib/physics-utils/Motion/Motion";
import CanvasGrid from "@/components/collisions/CanvasGrid";
import ParticleView from "@/components/collisions/ParticleView";
import ParticleStatus from "@/components/collisions/PaticleStatus";


export interface CollisionParameters {
    particle1: Particle;
    particle2: Particle;
}

interface Props {
    canvasHeight: number;
    canvasWidth: number;
    collisionParameters: CollisionParameters;
}

function handleCanvasCollision(particles: Particle[], canvasWidth: number, canvasHeight: number) {
    return particles.map((particle) => {
            return collideWithBox(particle, canvasWidth, canvasHeight);
        }
    );
}

function handleParticleCollision(particles: Particle[]) {
    const collisionResult = collide(particles[0], particles[1]);
    return [
        collisionResult.particle1PostCollision,
        collisionResult.particle2PostCollision
    ]
}

function runCollision(updatedParticles: { positionY: number; velocityAngle: number; color: string; mass: number; id: number; velocity: number; radius: number; positionX: number }[], canvasWidth: number, canvasHeight: number) {
    updatedParticles = handleCanvasCollision(updatedParticles, canvasWidth, canvasHeight);
    return handleParticleCollision(updatedParticles);
}

function updateParticlesPositioning(particles: Particle[]) {
    return particles.map((particle) => {
            const newPosition = Motion.calculatePosition(particle, 1);
            return {
                ...particle,
                positionX: newPosition.x,
                positionY: newPosition.y,
            };
        }
    );
}

const CollisionCanvas: FC<Props> = ({canvasHeight, canvasWidth, collisionParameters}) => {

    const [particles, setParticles] = useState<Particle[]>([collisionParameters.particle1, collisionParameters.particle2]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showArrow, setShowArrow] = useState(true);

    const handleReset = useCallback(() => {
        setParticles([collisionParameters.particle1, collisionParameters.particle2]);
        setIsPlaying(false);
    }, [collisionParameters]);


    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        handleReset();
    }, [collisionParameters, handleReset]);

    useEffect(() => {
        if (isPlaying) {

            const interval = setInterval(() => {

                let updatedParticles = updateParticlesPositioning(particles);

                updatedParticles = runCollision(updatedParticles, canvasWidth, canvasHeight);

                setParticles(updatedParticles);

            }, 1000 / 60);
            return () => clearInterval(interval);
        }
    }, [particles, isPlaying, canvasWidth, canvasHeight]);


    return (
        <div className='flex flex-row gap-3'>
            <div>
                <div className="p-4 bg-white rounded-xl shadow-md ">
                    <div
                        style={{
                            width: canvasWidth,
                        }}
                    >
                        <Stage width={canvasWidth} height={canvasHeight} >
                            <Layer>
                                <CanvasGrid width={canvasWidth} height={canvasHeight} gridSize={25}></CanvasGrid>
                                <ParticleView particle={particles[0]} showArrow={showArrow} canvasWidth={ canvasWidth} canvasHeight={canvasHeight}></ParticleView>
                                <ParticleView particle={particles[1]} showArrow={showArrow} canvasWidth={ canvasWidth} canvasHeight={canvasHeight}></ParticleView>
                            </Layer>
                        </Stage>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4"
                        onClick={() => setShowArrow(!showArrow)}
                    >
                        {showArrow ? "Hide Arrows" : "Show Arrows"}
                    </button>
                </div>
            </div>
            <div className={"flex flex-col justify-start"}>
                <h1 className="text-xl">Particle Status</h1>
                <ParticleStatus particle={particles[0]}/>
                <ParticleStatus particle={particles[1]}/>
            </div>

        </div>
    );
};

export default CollisionCanvas;

