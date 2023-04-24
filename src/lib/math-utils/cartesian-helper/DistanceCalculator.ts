import {Point} from "@/lib/math-utils/cartesian-helper/Point";

const CartesianDistance = (p1 : Point, p2 : Point) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

const DistanceCalculator = {
    CartesianDistance
}

export default DistanceCalculator;