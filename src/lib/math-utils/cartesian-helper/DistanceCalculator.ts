import {Point} from "@/lib/math-utils/cartesian-helper/Point";

const CartesianDistance = (p1: Point, p2: Point) => Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));

const DistanceCalculator = {
    CartesianDistance
}

export default DistanceCalculator;