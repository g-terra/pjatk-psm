import React, {FC, useCallback, useEffect, useState} from 'react';
import {Circle, Layer, Line, Rect, Stage} from 'react-konva';
import {checkCollision, collide} from "@/lib/physics-utils/collisions/CollisionCalculator";
import {Particle} from "@/lib/physics-utils/collisions/Particle";
import {cartesianToPolar, polarToCartesian} from "@/lib/math-utils/cartesian-helper/CoordinateConverter";


export interface CollisionParameters {
    particle1: Particle;
    particle2: Particle;
}

interface Props {
    canvasHeight: number;
    canvasWidth: number;
    collisionParameters: CollisionParameters;
}

const CollisionCanvas: FC<Props> = ({canvasHeight, canvasWidth, collisionParameters}) => {

    const [particles, setParticles] = useState<Particle[]>([collisionParameters.particle1, collisionParameters.particle2]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleReset = useCallback(() => {
        setParticles([collisionParameters.particle1, collisionParameters.particle2]);
    }, [collisionParameters]);

    const updateParticles = useCallback(() => {

        const updatedParticles = particles.map((particle) => {
            return recalculatePosition(particle);
        });

        if (checkCollision(updatedParticles[0], updatedParticles[1])) {
            const collisionResult = collide(updatedParticles[0], updatedParticles[1]);
            updatedParticles[0] = collisionResult.particle1PostCollision;
            updatedParticles[1] = collisionResult.particle2PostCollision;
        }

        setParticles(updatedParticles);

    }, [particles]);

    const recalculatePosition = useCallback(
        (particle: Particle) => {

            const velocity = polarToCartesian(particle.velocity, particle.velocityAngle);

            const newPosition = {
                x: particle.positionX + velocity.x,
                y: particle.positionY + velocity.y,
            };

            const newVelocity = {
                x: velocity.x,
                y: velocity.y,
            };

            if (newPosition.x - particle.radius <= 0 || newPosition.x + particle.radius >= canvasWidth) {
                newVelocity.x = -newVelocity.x;
            }

            if (newPosition.y - particle.radius <= 0 || newPosition.y + particle.radius >= canvasHeight) {
                newVelocity.y = -newVelocity.y;
            }


            const polarVelocity = cartesianToPolar(newVelocity.x, newVelocity.y)

            return {
                ...particle,
                positionX: newPosition.x,
                positionY: newPosition.y,
                velocity: polarVelocity.magnitude,
                velocityAngle: polarVelocity.angle
            };
        },
        [canvasHeight, canvasWidth]
    )

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        handleReset();
    }, [collisionParameters, handleReset]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(updateParticles, 1000 / 60);
            return () => clearInterval(interval);
        }
    }, [particles, isPlaying, updateParticles]);


    const renderGrid = (width: number, height: number, gridSize: number) => {
        const lines = [];

        // Draw horizontal lines
        for (let i = gridSize; i < height; i += gridSize) {
            lines.push(
                <Line
                    key={`h-${i}`}
                    points={[0, i, width, i]}
                    stroke="#ccc"
                    strokeWidth={1}
                />
            );
        }

        // Draw vertical lines
        for (let i = gridSize; i < width; i += gridSize) {
            lines.push(
                <Line
                    key={`v-${i}`}
                    points={[i, 0, i, height]}
                    stroke="#ccc"
                    strokeWidth={1}
                />
            );
        }

        return lines;
    };


    return (
        <div>

            <div className="p-4 bg-white rounded-xl shadow-md ">
                <div
                    style={{
                        width: canvasWidth, // Add this line to set the width of the parent div
                    }}
                >
                    <Stage width={canvasWidth} height={canvasHeight}>
                        <Layer>

                            {renderGrid(canvasWidth, canvasHeight, 20)}

                            <Rect
                                x={0}
                                y={0}
                                width={canvasWidth}
                                height={canvasHeight}
                                stroke="#ccc"
                                strokeWidth={1}
                            />

                            <Circle
                                key={particles[0].id}
                                x={particles[0].positionX}
                                y={particles[0].positionY}
                                radius={particles[0].radius}
                                fill={particles[0].color}
                            />

                            <Circle
                                key={particles[1].id}
                                x={particles[1].positionX}
                                y={particles[1].positionY}
                                radius={particles[1].radius}
                                fill={particles[1].color}
                            />
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
            </div>
        </div>
    );
};

export default CollisionCanvas;

