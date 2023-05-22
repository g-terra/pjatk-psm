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
    isPointBetweenCurveAnX,
    isPointInsideRegularPolygon
} from "@/lib/math-utils/geometry-tools/PointInsideFigureCalculator";
import calculateArea from "@/lib/monte-carlo/MonteCarlo";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import {PlottableCurve} from "@/components/function-plotter/monte-carlos-plotter/PlotableCurve";


export default function Curve() {

    const [boundBoxShape, setBoundBoxShape] = useState<PlottableShape>({points: []})
    const [plottedCurve, setPlottedCurve] = useState<PlottableCurve>({curveFn: "0", from: 0, to: 0})
    const [plotPoints, setPlotPoints] = useState<PlottablePoint[]>([])
    const [hidePoints, setHidePoints] = useState<boolean>(false)
    const [xDomain, setXDomain] = useState<number[]>([0, 110])
    const [yDomain, setYDomain] = useState<number[]>([0, 110])

    const [monteCarloPoints, setMonteCarloPoints] = useState<PlottablePoint[]>([])

    //form states

    const [curve, setCurve] = useState<string>()
    const [error, setError] = useState<string>("")
    const [pointCount, setPointCount] = useState<number>(1000)
    const [boxFromX, setBoxFromX] = useState<string>("-50")
    const [boxToX, setBoxToX] = useState<string>("50")
    const [boxFromY, setBoxFromY] = useState<string>("-50")
    const [boxToY, setBoxToY] = useState<string>("50")

    //results
    const [area, setArea] = useState<Number>()


    const handleSubmit = () => {

        setError("")



        if (curve === undefined) {
            setError("Please enter a valid equation")
            return
        }

        if (curve.length == 0) {
            setError("Please enter a valid equation")
            return
        }

        if (!MathFunctionSolver.isValid(curve)) {
            setError("Please enter a valid equation")
            return
        }

        const boxFromXParsed = Number.parseFloat(boxFromX)
        const boxToXParsed = Number.parseFloat(boxToX)
        const boxFromYParsed = Number.parseFloat(boxFromY)
        const boxToYParsed = Number.parseFloat(boxToY)

        console.log("boxFromXParsed", boxFromXParsed)
        console.log("boxToXParsed", boxToXParsed)
        console.log("boxFromYParsed", boxFromYParsed)
        console.log("boxToYParsed", boxToYParsed)

        const minDomain = Math.min(boxFromXParsed, boxFromYParsed)
        const maxDomain = Math.max(boxToXParsed, boxToYParsed)

        console.log("minDomain", minDomain)
        console.log("maxDomain", maxDomain)

        const newXd = [boxFromXParsed, boxToXParsed]
        const newYd = [boxFromYParsed, boxToYParsed]

        console.log("newXd", newXd)
        console.log("newYd", newYd)

        const center = [(boxFromXParsed + boxToXParsed) / 2, (boxFromYParsed + boxToYParsed) / 2]

        console.log("center", center)

        const plotCurve: PlottableCurve = {
            curveFn: curve,
            from: boxFromXParsed,
            to: boxToXParsed
        }


        const boundBoxWidth = boxToXParsed - boxFromXParsed
        const boundBoxHeight = boxToYParsed - boxFromYParsed
        const boundBoxPoints = generateRectanglePoints(boundBoxWidth, boundBoxHeight, center)

        const boundBoxShape: PlottableShape = {
            points: boundBoxPoints
        }

        console.log("boundBoxPoints", boundBoxPoints)

        const randomPoints = generateRandomPointsInsideBox(pointCount, boundBoxPoints)
        const samplingPoints = mapPointsToCurve(randomPoints, plotCurve)

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
        setPlottedCurve(plotCurve)
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


    const mapPointsToCurve = (randomPoints: number[][], curve: PlottableCurve) => {
        return randomPoints.map(point => {
            const isInside = isPointBetweenCurveAnX(point, curve.curveFn, [curve.from, curve.to])
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
                                    placeholder="e.g. x^2"
                                    value={curve}
                                    onChange={e => setCurve(`${e.target.value}`)}
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
                                onChange={e => setPointCount(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"flex flex-row justify-evenly gap-3"}>
                            <div className={styles.formInput}>
                                <label htmlFor="boxFromX" className={"text-md mb-2"}>
                                    Box from X:
                                </label>
                                <input
                                    type="number"
                                    id="boxFromX"
                                    className={styles.formFieldText}
                                    placeholder="e.g. -10"
                                    value={boxFromX}
                                    onChange={e => setBoxFromX(e.target.value)}
                                />
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor="boxToX" className={"text-md mb-2"}>
                                    Box from X:
                                </label>
                                <input
                                    type="number"
                                    id="boxToX"
                                    className={styles.formFieldText}
                                    placeholder="e.g. -10"
                                    value={boxToX}
                                    onChange={e => setBoxToX(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={"flex flex-row justify-evenly gap-3"}>
                            <div className={styles.formInput}>
                                <label htmlFor="boxFromY" className={"text-md mb-2"}>
                                    Box from Y:
                                </label>
                                <input
                                    type="number"
                                    id="boxFromY"
                                    className={styles.formFieldText}
                                    placeholder="e.g. -10"
                                    value={boxFromY}
                                    onChange={e => setBoxFromY(e.target.value)}
                                />
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor="boxToY" className={"text-md mb-2"}>
                                    Box to Y:
                                </label>
                                <input
                                    type="number"
                                    id="boxToY"
                                    className={styles.formFieldText}
                                    placeholder="e.g. -10"
                                    value={boxToY}
                                    onChange={e => setBoxToY(e.target.value)}
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
                    <MonteCarloPlotter curve={plottedCurve} points={plotPoints} xDomain={xDomain} yDomain={yDomain}
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
