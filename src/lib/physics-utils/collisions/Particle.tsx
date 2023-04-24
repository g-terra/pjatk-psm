export class Particle {


    constructor(id: number, positionX: number, positionY: number, velocity: number, velocityAngle: number, mass: number, radius: number, color: string) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocity = velocity;
        this.velocityAngle = velocityAngle;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
    }

    id: number;
    positionX: number;
    positionY: number;
    velocity: number
    velocityAngle: number;
    mass: number;
    radius: number;
    color: string;
}