//convert angle to 0-360 positive

import {Point} from "@/lib/math-utils/cartesian-helper/Point";

export const normalizeAngle = (angle: number) => {

    if (angle < 0) {
        angle += 360;
    }

    if (angle >= 360) {
        angle -= 360;
    }

    return angle;
}

export const angleBetween = (point1: Point, point2:Point) => {
    return Math.atan2(point1.y-point2.y,point2.x-point1.x) * 180 / Math.PI;
}

const AngleTools = {
    normalizeAngle,
    angleBetween
}

export default AngleTools;

