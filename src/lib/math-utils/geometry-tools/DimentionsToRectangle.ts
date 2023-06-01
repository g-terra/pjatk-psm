//function which accepts a width and height and a center point and returns points tha make a rectangle
export default function generateRectanglePoints(width: number, height: number, center: number[]): number[][] {

    let points: number[][] = [];
    points.push([center[0] - width / 2, center[1] - height / 2]);
    points.push([center[0] + width / 2, center[1] - height / 2]);
    points.push([center[0] + width / 2, center[1] + height / 2]);
    points.push([center[0] - width / 2, center[1] + height / 2]);
    points.push(points[0])

    return points;

}