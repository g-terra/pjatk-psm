import dynamic from 'next/dynamic';
import React from "react";
import {CollisionParameters} from "@/components/collisions/CollisionCanvas";
import {Particle} from "@/lib/physics-utils/Particle";
import Slider from "@/components/slider/Slider";
import {scalarOptions} from "yaml";
import Str = scalarOptions.Str;

const DynamicCollisionCanvas = dynamic(
    () => import('../../../components/collisions/CollisionCanvas'),
    {ssr: false}
);

function CollisionsPage() {

    type ParticleProperty = 'positionX' | 'positionY' | 'velocity' | 'velocityAngle' | 'mass' | 'radius';

    const canvasHeight = 400;

    const canvasWidth = 300;

    let particle1: Particle = new Particle(
        1,
        100,
        150,
        3,
        0,
        10,
        10,
        '#ef4444'
    );

    let particle2: Particle = new Particle(
        2,
        200,
        150,
        3,
        180,
        10,
        10,
        '#0284c7'
    );


    const [collisionParameters, setCollisionParameters] = React.useState<CollisionParameters>({
            particle1: particle1,
            particle2: particle2
        }
    );

    const handleTextInputChange = (type: string, value: number) => {
        const {id, property} = extractIdAndProperty(type);

        setCollisionParameters((prevParameters) => {
            const originalParticle = id === 1 ? prevParameters.particle1 : prevParameters.particle2;
            const updatedParticle = {...originalParticle};

            updatedParticle[property as ParticleProperty] = value;

            if (property === 'positionX') {
                value = Math.max(value, updatedParticle.radius);
                value = Math.min(value, canvasWidth - updatedParticle.radius);
            }
            if (property === 'positionY') {
                value = Math.max(value, updatedParticle.radius);
                value = Math.min(value, canvasHeight - updatedParticle.radius);
            }

            if (property === 'radius') {
                if (updatedParticle.positionX + updatedParticle.radius > canvasWidth) {
                    updatedParticle.positionX = canvasWidth - updatedParticle.radius;
                }
                if (updatedParticle.positionX - updatedParticle.radius < 0) {
                    updatedParticle.positionX = updatedParticle.radius;
                }
                if (updatedParticle.positionY + updatedParticle.radius > canvasHeight) {
                    updatedParticle.positionY = canvasHeight - updatedParticle.radius;
                }
                if (updatedParticle.positionY - updatedParticle.radius < 0) {
                    updatedParticle.positionY = updatedParticle.radius;
                }
            }

            return {
                ...prevParameters,
                [id === 1 ? 'particle1' : 'particle2']: updatedParticle,
            };
        });
    };


    const extractIdAndProperty = (type: string) => {
        const [idString, property] = type.split('.');
        const id = parseInt(idString.slice(-1));
        return {id, property};
    };


    const renderSliders = (id: number, particle: Particle, name: string) => {

        return (
            <div key={`particle-${id}`} className="flex flex-col bg-gray-100 shadow-md p-2 rounded-xl ">
                <h1 className="text-xl">Particle {id} - {name}</h1>
                <div className={"flex flex-row gap-3"}>
                    <div className="flex flex-col  bg-white  shadow-md p-2 rounded-xl mt-2">
                        <h1 className="text-xl">Position</h1>
                        <Slider
                            label="X"
                            min={particle.radius}
                            max={canvasWidth - particle.radius}
                            step={1}
                            value={particle.positionX}
                            type={`particle${id}.positionX`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Y"
                            min={particle.radius}
                            max={canvasHeight - particle.radius}
                            step={1}
                            value={particle.positionY}
                            type={`particle${id}.positionY`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                    </div>

                    <div className="flex flex-col bg-white shadow-md p-2 rounded-xl mt-2">
                        <h1 className="text-xl">Velocity</h1>
                        <Slider
                            label="Magnitude (px/s)"
                            min={0}
                            max={10}
                            step={1}
                            value={particle.velocity}
                            type={`particle${id}.velocity`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Angle (degrees)"
                            min={0}
                            max={360}
                            step={1}
                            value={particle.velocityAngle}
                            type={`particle${id}.velocityAngle`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                    </div>

                    <div className="flex flex-col bg-white shadow-md p-2 rounded-xl mt-2">
                        <h1 className="text-xl">Structure</h1>
                        <Slider
                            label="Mass (kg)"
                            min={1}
                            max={10}
                            step={1}
                            value={particle.mass}
                            type={`particle${id}.mass`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Radius (px)"
                            min={1}
                            max={50}
                            step={1}
                            value={particle.radius}
                            type={`particle${id}.radius`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                    </div>
                </div>

            </div>
        );
    };


    return (

        <div className="flex flex-col items-center justify-start gap-4">

            <div className={"flex flex-col items-center"}>
                <h1 className="text-3xl font-bold mb-2">Collisions</h1>
                <p className="text-lg">This page is a playground for simulating collisions between two particles.</p>
            </div>

            <div className={"flex flex-row gap-4"}>


                <div className={"flex flex-col justify-between gap-2"}>
                    {renderSliders(1, collisionParameters.particle1, "Red")}
                    {renderSliders(2, collisionParameters.particle2, "Blue")}
                </div>

                <div className={"flex flex-col"}>
                    <DynamicCollisionCanvas canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                                            collisionParameters={collisionParameters}/>

                </div>


            </div>
        </div>
    );
}

export default CollisionsPage;