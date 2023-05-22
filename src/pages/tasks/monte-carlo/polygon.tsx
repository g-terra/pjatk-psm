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
import {LOG2E} from "mathjs";


export default function Polygon() {

    const [boundBoxShape, setBoundBoxShape] = useState<PlottableShape>({points: []})
    const [plottedShape, setPlottedShape] = useState<PlottableShape>({points: []})
    const [plotPoints, setPlotPoints] = useState<PlottablePoint[]>([])
    const [hidePoints, setHidePoints] = useState<boolean>(false)
    const [xDomain, setXDomain] = useState<number[]>([0, 110])
    const [yDomain, setYDomain] = useState<number[]>([0, 110])

    const [monteCarloPoints, setMonteCarloPoints] = useState<PlottablePoint[]>([])

    //form states

    const [polygon, setPolygon] = useState<string>()
    const [error, setError] = useState<string>("")
    const [boundBoxHeight, setBoundBoxHeight] = useState<number>(100)
    const [boundBoxWidth, setBoundBoxWidth] = useState<number>(100)
    const [pointCount, setPointCount] = useState<number>(1000)

    //results
    const [area, setArea] = useState<Number>()

    const parsePolygon = (polygon: string | undefined) => {
        try {
            const poly = JSON.parse(`[ ${polygon} ]`)
            poly.push(poly[0])
            return poly

        } catch (e) {
            setError("invalid polygon format")
        }
    }

    const handleSubmit = () => {

        setError("")


        let poly

        try {
            poly = JSON.parse(`[ ${polygon} ]`)
        } catch (e) {
            setError("Invalid polygon format")
            return
        }

        if (poly === undefined) {
            setError("Invalid polygon format")
            return;
        }

        if (poly.length < 3) {
            setError("Polygon must have at least 3 points")
            return;
        }

        if (boundBoxHeight <= 0 || boundBoxWidth <= 0) {
            setError("Bounding box dimensions must be positive")
            return;
        }


        const domain = Math.max(boundBoxWidth, boundBoxHeight)

        const newXd = [0, domain]
        const newYd = [0, domain]

        const center = [boundBoxWidth / 2, boundBoxHeight / 2]


        const polygonPoints = parsePolygon(polygon)
        const polygonShape: PlottableShape = {
            points: polygonPoints
        }

        const boundBoxPoints = generateRectanglePoints(boundBoxWidth, boundBoxHeight, center)

        const minX = Math.min(...boundBoxPoints.map(point => point[0])).toFixed(2)
        const maxX = Math.max(...boundBoxPoints.map(point => point[0])).toFixed(2)
        const minY = Math.min(...boundBoxPoints.map(point => point[1])).toFixed(2)
        const maxY = Math.max(...boundBoxPoints.map(point => point[1])).toFixed(2)

        for (const point of poly) {
            if (point[0] < minX || point[0] > maxX || point[1] < minY || point[1] > maxY) {
                console.log(boundBoxPoints)
                setError(`Polygon must be inside bounding box. X must be between ${minX} and ${maxX} and Y must be between ${minY} and ${maxY}`)
                return;
            }
        }


        const boundBoxShape: PlottableShape = {
            points: boundBoxPoints
        }


        const randomPoints = generateRandomPointsInsideBox(pointCount, boundBoxPoints)
        const samplingPoints = mapPointsToShape(randomPoints, polygonPoints)

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
        setPlottedShape(polygonShape)
        setBoundBoxShape(boundBoxShape)
        setArea(area)


        if (!hidePoints) {
            setPlotPoints(samplingPoints)
        } else {
            setPlotPoints([])
        }


    }

    useEffect(() => {

        if (hidePoints) {
            setPlotPoints([])
        } else {
            setPlotPoints(monteCarloPoints)
        }

    }, [hidePoints])


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
                    {error.length > 0 && <div className="text-red-500 flex-wrap text-center w-[400px]">{error}</div>}
                    <div className={"flex flex-col gap-3 bg-gray-100 p-3 rounded-xl shadow-md w-full"}>
                        <h1 className="text-2xl font-bold mb-2">Shape</h1>
                        <div className={"flex flex-row justify-evenly gap-3"}>
                            <div className={styles.formInput + " min-w-[400px]"}>
                                <label htmlFor="polygon" className={styles.formFieldLabel}>
                                    Polygon coordinates:
                                </label>
                                <input
                                    type="text"
                                    id="polygon"
                                    className={styles.formFieldText}
                                    placeholder="e.g. [0,0],[0,10],[10,10],[10,0],[0,0]"
                                    value={polygon}
                                    onChange={e => setPolygon(`${e.target.value}`)}
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
