import VectorTools from "@/lib/math-utils/cartesian-helper/VectorTools";

describe("VectorTools", () => {
    test("should rotate vector", () => {
        // Arrange
        const vector = {x: 1, y: 0};
        const angle = 90;
        // Act
        const result = VectorTools.rotateVector(vector, angle);
        // Assert
        expect(result.x).toBeCloseTo(0);
        expect(result.y).toBeCloseTo(1);
    });


    test("magnitude should be the same after rotation", () => {

        // Arrange
        const vector = {x: 15, y: 32};
        const angle = 180;
        // Act

        const lengthBefore = VectorTools.getMagnitude(vector);
        const result = VectorTools.rotateVector(vector, angle);
        const lengthAfter = VectorTools.getMagnitude(result);
        // Assert

        expect(lengthBefore).toBe(lengthAfter);

    });
});
