import {Particle} from "@/lib/physics-utils/collisions/Particle";

export interface CollisionResult {

    particle1PostCollision: Particle;

    particle2PostCollision: Particle;
}