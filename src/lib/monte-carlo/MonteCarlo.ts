export default function calculateArea(outsidePointsCount : number, insidePointsCount : number, wrapperArea : number) : number {
    return (insidePointsCount / (outsidePointsCount + insidePointsCount)) * wrapperArea;
}