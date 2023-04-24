import dynamic from 'next/dynamic';
import React from "react";
import {CollisionParameters} from "@/components/collisions/CollisionCanvas";
import {Particle} from "@/lib/physics-utils/collisions/Particle";
import Slider from "@/components/slider/Slider";

const DynamicCollisionCanvas = dynamic(
    () => import('../../../components/collisions/CollisionCanvas'),
    {ssr: false}
);

function CollisionsPage() {

    type ParticleProperty = 'positionX' | 'positionY' | 'velocity' | 'velocityAngle' | 'mass' | 'radius';


    const canvasHeight = 400;

    const canvasWidth = 400;

    let particle1: Particle = new Particle(
        1,
        100,
        100,
        0,
        0,
        10,
        10,
        'red'
    );

    let particle2: Particle = new Particle(
        2,
        200,
        200,
        0,
        0,
        10,
        10,
        'blue'
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

            return {
                ...prevParameters,
                [id === 1 ? 'particle1' : 'particle2']: updatedParticle,
            };
        });
    };


    const extractIdAndProperty = (type : string) => {
        const [idString, property] = type.split('.');
        const id = parseInt(idString.slice(-1));
        return {id, property};
    };


    const renderSliders = (id : number, particle : Particle) => {

        return (
            <div key={`particle-${id}`} className="flex flex-col bg-gray-100 shadow-md p-2 rounded-xl ">
                <h1 className="text-xl">Particle {id}</h1>
                <div className={"flex flex-row gap-3"}>
                    <div className="flex flex-col  bg-white  shadow-md p-2 rounded-xl mt-2">
                        <h1 className="text-xl">Position</h1>
                        <Slider
                            label="X"
                            min={0}
                            max={canvasWidth}
                            step={1}
                            value={particle.positionX}
                            type={`particle${id}.positionX`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Y"
                            min={0}
                            max={canvasHeight}
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
                            label="Magnitude"
                            min={0}
                            max={10}
                            step={1}
                            value={particle.velocity}
                            type={`particle${id}.velocity`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Angle"
                            min={-180}
                            max={180}
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
                            label="Mass"
                            min={1}
                            max={10}
                            step={1}
                            value={particle.mass}
                            type={`particle${id}.mass`}
                            onNumberChange={handleTextInputChange}
                            onRangeChange={handleTextInputChange}
                        />
                        <Slider
                            label="Radius"
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


                <div className={"flex flex-col justify-between"}>
                    {renderSliders(1, collisionParameters.particle1)}
                    {renderSliders(2, collisionParameters.particle2)}
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