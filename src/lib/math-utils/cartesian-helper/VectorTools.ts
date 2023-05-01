import {Vector} from "@/lib/math-utils/cartesian-helper/Vector";

const rotateVector = (vector: Vector, angle: number) => {
    const angleRad = (angle * Math.PI) / 180;
    return {
        x: vector.x * Math.cos(angleRad) - vector.y * Math.sin(angleRad),
        y: vector.x * Math.sin(angleRad) + vector.y * Math.cos(angleRad),
    };
};

const getMagnitude = (vector: Vector) => {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

const VectorTools = {
    rotateVector,
    getMagnitude,
}

export default VectorTools;