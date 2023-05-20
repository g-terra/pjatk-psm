import {Particle} from "@/lib/physics-utils/Particle";
import {
    checkBoxCollision,
    checkCollision,
    collide,
    collideWithBox
} from "@/lib/physics-utils/collisions/CollisionCalculator";


describe("Physics Utils: Collisions", () => {
    describe("checkCollision", () => {
        it("should detect a collision between two particles", () => {
            const particle1 = new Particle(1, 0, 0, 1, 0, 1, 1, "red");
            const particle2 = new Particle(2, 2, 0, 1, 0, 1, 1, "blue");

            expect(checkCollision(particle1, particle2)).toBe(true);
        });

        it("should not detect a collision when particles are not colliding", () => {
            const particle1 = new Particle(1, 0, 0, 1, 0, 1, 1, "red");
            const particle2 = new Particle(2, 4, 0, 1, 0, 1, 1, "blue");

            expect(checkCollision(particle1, particle2)).toBe(false);
        });
    });

    describe("collide", () => {
        it("should return the same particles when there is no collision", () => {
            const particle1 = new Particle(1, 0, 0, 1, 0, 1, 1, "red");
            const particle2 = new Particle(2, 4, 0, 1, 0, 1, 1, "blue");

            const result = collide(particle1, particle2);
            expect(result.particle1PostCollision).toEqual(particle1);
            expect(result.particle2PostCollision).toEqual(particle2);
        });

        it("should return the new velocities when particles collide", () => {
            const particle1 = new Particle(1, 0, 0, 1, 0, 1, 1, "red");
            const particle2 = new Particle(2, 2, 0, 1, 180, 1, 1, "blue");

            const result = collide(particle1, particle2);
            expect(result.particle1PostCollision.velocity).toBeCloseTo(1);
            expect(result.particle1PostCollision.velocityAngle).toBeCloseTo(180);
            expect(result.particle2PostCollision.velocity).toBeCloseTo(1);
            expect(result.particle2PostCollision.velocityAngle).toBeCloseTo(0);
        });
    });

    describe("collideWithBox", () => {
        it("should return the new velocity angle after colliding with horizontal walls", () => {
            const particle = new Particle(1, 2, 1, 1, 90, 1, 1, "red");
            const width = 4;
            const height = 4;

            const result = collideWithBox(particle, width, height,() => {});
            expect(result.velocityAngle).toBeCloseTo(270);
        });

        it("should return the new velocity angle after colliding with vertical walls", () => {
            const particle = new Particle(1, 1, 1, 1, 0, 1, 1, "red");
            const width = 4;
            const height = 4;

            const result = collideWithBox(particle, width, height,() => {});
            expect(result.velocityAngle).toBeCloseTo(180);
        });

        it("should return the same particle when there is no collision with walls", () => {
            const particle = new Particle(1, 2, 2, 1, 45, 1, 1, "red");
            const width = 4;
            const height = 4;
            const result = collideWithBox(particle, width, height , () => {});
            expect(result).toEqual(particle);
        });

        it("should reverse the angle when hitting on a corner with 45 degrees of entry", () => {
            const particle = new Particle(1, 1, 3, 1, 225, 1, 1, "red");
            const width = 4;
            const height = 4;
            const result = collideWithBox(particle, width, height,() => {});
            expect(result.velocityAngle).toBeCloseTo(45);
        });
    });

    describe("checkCollisionWithBox", () => {

            it('should detect collision when location plus radius cross the box limits', function () {

                const particle = new Particle(1, 2, 2, 1, 45, 1, 2.1, "red");
                const width = 4;
                const height = 4;
                const result = checkBoxCollision(particle, width, height);
                expect(result.bottomCollision).toBe(true);
                expect(result.leftCollision).toBe(true);
                expect(result.rightCollision).toBe(true);
                expect(result.topCollision).toBe(true);
            });

            it('should detect collision with left top corner', function () {

                const particle = new Particle(1, 1, 3, 1, 225, 1, 1, "red");
                const width = 4;
                const height = 4;
                const result = checkBoxCollision(particle, width, height);
                expect(result.leftCollision).toBe(true);
                expect(result.topCollision).toBe(true);
            });


        }
    );


});

