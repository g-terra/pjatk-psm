import styles from "@/styles/forms.module.css";
import React, {useEffect, useState} from "react";

import MonteCarloPlotter from "@/components/function-plotter/monte-carlos-plotter/MonteCarloPlotter";
import {PlottableShape} from "@/components/function-plotter/monte-carlos-plotter/PlottableShape";
import {PlottablePoint} from "@/components/function-plotter/monte-carlos-plotter/PlottablePoint";
import generateRectanglePoints from "@/lib/math-utils/geometry-tools/DimentionsToRectangle";
import {
    generateRandomPointsInsideBox
} from "@/lib/math-utils/geometry-tools/RandomPointGenerator";
import {
    isPointInsideRegularPolygon
} from "@/lib/math-utils/geometry-tools/PointInsideFigureCalculator";
import calculateArea from "@/lib/monte-carlo/MonteCarlo";


export default function Rectangle() {

    const [boundBoxShape, setBoundBoxShape] = useState<PlottableShape>({points: []})
    const [plottedShape, setPlottedShape] = useState<PlottableShape>({points: []})
    const [plotPoints, setPlotPoints] = useState<PlottablePoint[]>([])
    const [hidePoints, setHidePoints] = useState<boolean>(false)
    const [xDomain, setXDomain] = useState<number[]>([0, 110])
    const [yDomain, setYDomain] = useState<number[]>([0, 110])

    const [monteCarloPoints, setMonteCarloPoints] = useState<PlottablePoint[]>([])

    //form states
    const [error, setError] = useState<string>("")
    const [height, setHeight] = useState<number>(10)
    const [width, setWidth] = useState<number>(10)
    const [boundBoxHeight, setBoundBoxHeight] = useState<number>(100)
    const [boundBoxWidth, setBoundBoxWidth] = useState<number>(100)
    const [pointCount, setPointCount] = useState<number>(1000)

    //results
    const [area, setArea] = useState<Number>()

    const handleSubmit = () => {

        try {
            validateInput()


            const domain = Math.max(boundBoxWidth, boundBoxHeight) * 1.1

            const newXd = [0, domain]
            const newYd = [0, domain]

            const center = [(newXd[1] - newXd[0]) / 2, (newYd[1] - newYd[0]) / 2]

            const rectanglePoints = generateRectanglePoints(width, height, center)
            const rectangleShape: PlottableShape = {
                points: rectanglePoints
            }

            const boundBoxPoints = generateRectanglePoints(boundBoxWidth, boundBoxHeight, center)
            const boundBoxShape: PlottableShape = {
                points: boundBoxPoints
            }


            const randomPoints = generateRandomPointsInsideBox(pointCount, boundBoxPoints)
            const samplingPoints = mapPointsToShape(randomPoints, rectanglePoints)

            const countByColor = {
                'red': 0,
                'green': 0
            }

            samplingPoints.forEach(point => {
                countByColor[point.color]++
            })

            const boundingBoxArea = boundBoxWidth * boundBoxHeight
            const area = calculateArea(countByColor['red'], countByColor['green'], boundingBoxArea)


            setMonteCarloPoints(samplingPoints)
            setXDomain(newXd)
            setYDomain(newYd)
            setPlottedShape(rectangleShape)
            setBoundBoxShape(boundBoxShape)
            setArea(area)


            if (!hidePoints) {
                setPlotPoints(samplingPoints)
            } else {
                setPlotPoints([])
            }

        } catch (e) {
            setError(e.message)
            return
        }
    }

    useEffect(() => {

        if (hidePoints) {
            setPlotPoints([])
        } else {
            setPlotPoints(monteCarloPoints)
        }

    }, [hidePoints])

    const validateInput = () => {
        if (height <= 0 || width <= 0 || boundBoxWidth <= 0 || boundBoxHeight <= 0 || pointCount <= 0) {
            throw new Error("All values must be positive and non-zero")
        }
        if (height > boundBoxHeight || width > boundBoxWidth) {
            throw new Error("Shape must be smaller than the bounding box")
        }
        setError("")
    }

    const mapPointsToShape = (randomPoints: number[][], shape: number[][]) => {
        return randomPoints.map(point => {
            const isInside = isPointInsideRegularPolygon(point, shape)
            return {
                x: point[0],
                y: point[1],
                color: isInside ? "green" : "red"
            }
        })
    }


    const getResults = () => {

        if (!area) {
            return <>   </>
        }

        const distribution = {
            'red': 0,
            'green': 0
        }

        monteCarloPoints.forEach(point => {
            distribution[point.color]++;
        })

        return (
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                <div className="flex flex-row justify-center items-center gap-3">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold mb-2">Simulated Area : {area}</h1>
                        <div className="flex flex-col justify-center items-center ">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-xl font-bold mb-2">Hits : {distribution['green']}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-xl font-bold mb-2">Misses : {distribution['red']}</h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Monte Carlo</h1>
                <p className="text-gray-600 mb-4">
                    This is a simple calculator that uses Monte Carlo method to calculate the area of a rectangle
                </p>
            </div>
            <div className="flex flex-row justify-evenly gap-3">
                <div className={styles.form}>
                    {error.length > 0 && <div className="text-red-500">{error}</div>}
                    <div className={"flex flex-col gap-3 bg-gray-100 p-3 rounded-xl shadow-md w-full"}>
                        <h1 className="text-2xl font-bold mb-2">Shape</h1>
                        <div className={"flex flex-row justify-evenly gap-3"}>
                            <div className={styles.formInput}>
                                <label htmlFor="height" className={"text-md mb-2"}>
                                    Height:
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    className={styles.formFieldText}
                                    placeholder="e.g. 10"
                                    value={height}
                                    onChange={e => setHeight(Number.parseFloat(e.target.value))}
                                />
                            </div>
                            <div className={styles.formInput}>
                                <label htmlFor="width" className={"text-md mb-2"}>
                                    width:
                                </label>
                                <input
                                    type="number"
                                    id="width"
                                    className={styles.formFieldText}
                                    placeholder="e.g. 10"
                                    value={width}
                                    onChange={e => setWidth(Number.parseFloat(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-3 bg-gray-100 p-3 rounded-xl shadow-md"}>
                        <h1 className="text-2xl font-bold mb-2">Monte Carlo params</h1>
                        <div className={styles.formInput}>
                            <label htmlFor="pointCount" className={"text-md mb-2"}>
                                Number of points:
                            </label>
                            <input
                                type="number"
                                id="pointCount"
                                className={styles.formFieldText}
                                placeholder="e.g. 10000"
                                value={pointCount}
                                onChange={e => setPointCount(Number.parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"flex flex-row justify-evenly gap-3"}>
                            <div className={styles.formInput}>
                                <label htmlFor="boundBoxHeight" className={"text-md mb-2"}>
                                    Box height:
                                </label>
                                <input
                                    type="number"
                                    id="boundBoxHeight"
                                    className={styles.formFieldText}
                                    placeholder="e.g. 100"
                                    value={boundBoxHeight}
                                    onChange={e => setBoundBoxHeight(Number.parseFloat(e.target.value))}
                                />
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor="boundBoxWidth" className={"text-md mb-2"}>
                                    Box width:
                                </label>
                                <input
                                    type="number"
                                    id="boundBoxWidth"
                                    className={styles.formFieldText}
                                    placeholder="e.g. 100"
                                    value={boundBoxWidth}
                                    onChange={e => setBoundBoxWidth(Number.parseFloat(e.target.value))}
                                />
                            </div>

                        </div>
                    </div>


                    <button
                        type="button"
                        className={styles.formSubmit}
                        onClick={handleSubmit}
                    >
                        Calculate area
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                    <MonteCarloPlotter shape={plottedShape} points={plotPoints} xDomain={xDomain} yDomain={yDomain}
                                       boundBox={boundBoxShape} locked={false}
                                       key={
                                           JSON.stringify(plotPoints)
                                       }/>
                    <div className="flex flex-row  items-center mt-4">
                        <div className="flex flex-row  items-center w-full">
                            <div className="flex flex-row justify-end items-center w-full">
                                <label className="text-gray-500 text-sm font-medium">hide plot points</label>
                                <input type="checkbox" className="ml-2" checked={hidePoints} onChange={(e) => {
                                    setHidePoints(e.target.checked)
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {getResults()}


        </div>
    )
}
