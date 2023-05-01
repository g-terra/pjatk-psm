import {Particle} from "@/lib/physics-utils/Particle";
import React, {FC} from "react";
import {polarToCartesian} from "@/lib/math-utils/cartesian-helper/CoordinateConverter";
import {Circle, Line} from "react-konva";

interface Props {
    particle: Particle;
    showArrow: boolean;

    canvasHeight: number;

    canvasWidth: number;
}

const Arrow = (particle: Particle , canvasHeight: number) => {
    const arrowLength = 10 * particle.velocity; // Changed from 1.5 * particle.radius
    const arrowHeadSize = 5;
    const particleVelocity = polarToCartesian(particle.velocity, particle.velocityAngle);
    const arrowEndPointX = particle.positionX + (particleVelocity.x / particle.velocity) * arrowLength;
    const arrowEndPointY = particle.positionY + (particleVelocity.y / particle.velocity) * arrowLength;
    const arrowHeadAngle = Math.atan2(arrowEndPointY - particle.positionY, arrowEndPointX - particle.positionX);
    const color = "#047857"

    return (
        <>
            <Line
                points={[
                    particle.positionX,
                    canvasHeight - particle.positionY,
                    arrowEndPointX,
                    canvasHeight - arrowEndPointY,
                ]}
                stroke={color}
                strokeWidth={2}
            />
            <Line
                points={[
                    arrowEndPointX - arrowHeadSize * Math.cos(arrowHeadAngle - Math.PI / 6),
                    canvasHeight- (arrowEndPointY - arrowHeadSize * Math.sin(arrowHeadAngle - Math.PI / 6)),
                    arrowEndPointX,
                    canvasHeight- arrowEndPointY,
                    arrowEndPointX - arrowHeadSize * Math.cos(arrowHeadAngle + Math.PI / 6),
                    canvasHeight-(arrowEndPointY - arrowHeadSize * Math.sin(arrowHeadAngle + Math.PI / 6))
                ]}
                stroke={color}
                strokeWidth={2}
            />
        </>
    );
};


const ParticleView: FC<Props> = ({particle, canvasHeight , canvasWidth, showArrow = false}) => {
    return (
        <>
            <Circle
                x={particle.positionX}
                y={canvasHeight- particle.positionY}
                radius={particle.radius}
                fill={particle.color}
            />
            {showArrow && Arrow(particle, canvasHeight)}
        </>
    );
}

export default ParticleView;


