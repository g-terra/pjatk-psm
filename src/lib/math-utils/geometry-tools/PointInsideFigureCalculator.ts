import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

export function isPointInsideRegularPolygon(point: number[], polygon: number[][]): boolean {

    let x = point[0];
    let y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {

        let xi = polygon[i][0];
        let yi = polygon[i][1];
        let xj = polygon[j][0];
        let yj = polygon[j][1];

        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;

}

//check if a point is below a curve using mathjs
export function isPointBetweenCurveAnX(point: number[], curve: string, range?: number[]): boolean {

    let x = point[0];
    let y = point[1];

    let yValue = MathFunctionSolver.solve(curve, x);

    if (range) {
        if (x < range[0] || x > range[1]) {
            return false;
        }
    }

    if (yValue < 0) {
        return y < 0 && y > yValue;
    } else {
        return y > 0 && y < yValue;
    }


}