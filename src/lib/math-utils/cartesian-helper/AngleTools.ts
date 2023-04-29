//convert angle to 0-360 positive

export const normalizeAngle = (angle: number) => {

    if (angle < 0) {
        angle += 360;
    }

    console.log(angle)

    return angle;
}

