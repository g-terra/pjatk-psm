import {angleBetween, normalizeAngle} from "@/lib/math-utils/cartesian-helper/AngleTools";


describe("AngleTools", () => {

    test("should normalize angle for negative angle", () => {
            const normalizedAngle = normalizeAngle(-90);
            expect(normalizedAngle).toBe(270);
        }
    );

    test("should return same angle for positive angle less then 360", () => {
            const normalizedAngle = normalizeAngle(90);
            expect(normalizedAngle).toBe(90);
        }
    );

    test("should return normalized angle for positive angle greater then 360", () => {
            const normalizedAngle = normalizeAngle(450);
            expect(normalizedAngle).toBe(90);
        }
    );

    test("should return normalized angle for positive angle equal to 360", () => {
            const normalizedAngle = normalizeAngle(360);
            expect(normalizedAngle).toBe(0);
        }
    );


    test("should return the angle between 2 points", () => {
        const angle = angleBetween({x: 1, y: 1}, {x: 2, y: 0})
        expect(angle).toBe(45);
    });

    test("should return the angle between 2 points", () => {
        const angle = angleBetween({x: 1, y: 1}, {x: 2, y: 1})
        expect(angle).toBe(0);
    } );
});