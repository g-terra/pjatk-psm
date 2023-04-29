import {Particle} from "@/lib/physics-utils/Particle";

export interface CollisionResult {

    particle1PostCollision: Particle;

    particle2PostCollision: Particle;
}