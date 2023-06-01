import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";

export function isInsidePolygon(point: number[], polygon: number[][]): boolean {
    return pointIsInPoly(point, polygon);
}


function pointIsInPoly(point: number[], polygon: number[][]): boolean {
    let isInside = false;
    let minX = polygon[0][0], maxX = polygon[0][0];
    let minY = polygon[0][1], maxY = polygon[0][1];
    for (let n = 1; n < polygon.length; n++) {
        let q = polygon[n];
        minX = Math.min(q[0], minX);
        maxX = Math.max(q[0], maxX);
        minY = Math.min(q[1], minY);
        maxY = Math.max(q[1], maxY);
    }

    if (point[0] < minX || point[0] > maxX || point[1] < minY || point[1] > maxY) {
        return false;
    }

    for (let i =0 , j =polygon.length - 1; i < polygon.length; j = i++) {
        if ((polygon[i][1] > point[1]) != (polygon[j][1] > point[1]) &&
            point[0] < (polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]) {
            isInside = !isInside;
        }
    }

    return isInside;

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