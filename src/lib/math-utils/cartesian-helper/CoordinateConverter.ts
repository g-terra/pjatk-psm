export const polarToCartesian = (magnitude :number , angle:number) => {
    const angleRad = (angle * Math.PI) / 180;
    return {
        x: magnitude * Math.cos(angleRad),
        y: magnitude * Math.sin(angleRad),
    };
};

export const cartesianToPolar = (x:number, y:number) => {
    const magnitude = Math.sqrt(x * x + y * y);
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    return {magnitude, angle};
};

