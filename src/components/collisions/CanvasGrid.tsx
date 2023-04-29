import {Line, Rect} from "react-konva";
import React, {FC} from "react";

interface Props {
    width: number;
    height: number;
    gridSize: number;
}

const CanvasGrid: FC<Props> = (
    {
        width,
        height,
        gridSize
    }
) => {
    const lines = [];

    // Draw horizontal lines
    for (let i = gridSize; i < height; i += gridSize) {
        lines.push(
            <Line
                key={`h-${i}`}
                points={[0, i, width, i]}
                stroke="#ccc"
                strokeWidth={1}
            />
        );
    }

    // Draw vertical lines
    for (let i = gridSize; i < width; i += gridSize) {
        lines.push(
            <Line
                key={`v-${i}`}
                points={[i, 0, i, height]}
                stroke="#ccc"
                strokeWidth={1}
            />
        );
    }

    return (
        <>
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                stroke="#ccc"
                strokeWidth={1}
            />
            {lines}
        </>
    );
};

export default CanvasGrid;