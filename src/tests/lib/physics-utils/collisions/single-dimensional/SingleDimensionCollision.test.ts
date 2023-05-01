import singleDimensionCollision from "@/lib/physics-utils/collisions/single-dimensional/SingleDimensionCollision";

describe("SingleDimensionCollision", () => {
    test("should return the correct new velocities", () => {
        // Arrange
        const mass1 = 1;
        const mass2 = 1;
        const velocity1 = 1;
        const velocity2 = -1;
        // Act
        const result = singleDimensionCollision.resolve(mass1, mass2, velocity1, velocity2);
        // Assert
        expect(result.newVelocity1).toBe(-1);
        expect(result.newVelocity2).toBe(1);
    });

    test("should return the correct new velocities", () => {
        // Arrange
        const mass1 = 1;
        const mass2 = 1;
        const velocity1 = 1;
        const velocity2 = 0;
        // Act
        const result = singleDimensionCollision.resolve(mass1, mass2, velocity1, velocity2);
        // Assert
        expect(result.newVelocity1).toBe(0);
        expect(result.newVelocity2).toBe(1);
    });

    test("should return the correct new velocities", () => {
        // Arrange
        const mass1 = 1;
        const mass2 = 1;
        const velocity1 = 0;
        const velocity2 = -1;
        // Act
        const result = singleDimensionCollision.resolve(mass1, mass2, velocity1, velocity2);
        // Assert
        expect(result.newVelocity1).toBe(-1);
        expect(result.newVelocity2).toBe(0);
    });


    test("should return the correct new velocities", () => {

            // Arrange
            const mass1 = 3;
            const mass2 = 1;
            const velocity1 = 10;
            const velocity2 = -10;
            // Act
            const result = singleDimensionCollision.resolve(mass1, mass2, velocity1, velocity2);
            // Assert
            expect(result.newVelocity1).toBe(0);
            expect(result.newVelocity2).toBe(20);

        }
    );
});