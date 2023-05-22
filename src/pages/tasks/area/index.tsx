import styles from "@/styles/forms.module.css";
import React, {useEffect, useState} from "react";

import MonteCarloPlotter from "@/components/function-plotter/monte-carlos-plotter/MonteCarloPlotter";
import {PlottableCurve} from "@/components/function-plotter/monte-carlos-plotter/PlotableCurve";
import {PlottableShape} from "@/components/function-plotter/monte-carlos-plotter/PlottableShape";
import {PlottablePoint} from "@/components/function-plotter/monte-carlos-plotter/PlottablePoint";
import generateRectanglePoints from "@/lib/math-utils/geometry-tools/DimentionsToRectangle";
import {generateRandomPointsInRange} from "@/lib/math-utils/geometry-tools/RandomPointGenerator";
import {
    isPointBetweenCurveAnX,
    isPointInsideRegularPolygon
} from "@/lib/math-utils/geometry-tools/PointInsideFigureCalculator";
import calculateArea from "@/lib/monte-carlo/MonteCarlo";


export default function Area() {

    const [isInitial, setIsInitial] = useState<boolean>(true)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [option, setOption] = useState<string>("rectangle")


    const [plotPoints, setPlotPoints] = useState<PlottablePoint[]>([])
    const [pointCount, setPointCount] = useState<number>(1000)
    const [hidePoints, setHidePoints] = useState<boolean>(true)


    const [shape, setShape] = useState<PlottableShape>({points: []})
    const [curve, setCurve] = useState<PlottableCurve>({curveFn: "0", from: 0, to: 0})
    const [monteCarloPoints, setMonteCarloPoints] = useState<PlottablePoint[]>([])


    const [boundBoxSize, setBoundBoxSize] = useState<number>(100)


    const [xDomain, setXDomain] = useState<number[]>([0, boundBoxSize])
    const [yDomain, setYDomain] = useState<number[]>([0, boundBoxSize])
    const [center, setCenter] = useState<number[]>([(xDomain[1] - xDomain[0]) / 2, (yDomain[1] - yDomain[0]) / 2])


    const [height, setHeight] = useState<number>(10)
    const [width, setWidth] = useState<number>(10)

    useEffect(() => {
        clearChart()

        if (option === "curve") {

            const newXDomain = [-1 * boundBoxSize / 2, boundBoxSize / 2]
            const newYDomain = [-1 * boundBoxSize / 2, boundBoxSize / 2]
            const newCenter = [(newXDomain[1] - newXDomain[0]) / 2, (newYDomain[1] - newYDomain[0]) / 2]

            setXDomain(newXDomain)
            setYDomain(newYDomain)
            setCenter(newCenter)

        } else {
            const newXDomain = [0, boundBoxSize]
            const newYDomain = [0, boundBoxSize]
            const newCenter = [(newXDomain[1] - newXDomain[0]) / 2, (newYDomain[1] - newYDomain[0]) / 2]

            setXDomain(newXDomain)
            setYDomain(newYDomain)
            setCenter(newCenter)
        }

    }, [boundBoxSize, option])


    const handleHeightChange = (value) => {
        if (value > boundBoxSize) {
            setError("Height can't be greater than bound box size")
            return
        }
        setHeight(value)
        clearChart()
    }

    const handleWidthChange = (value) => {
        if (value > boundBoxSize) {
            setError("Width can't be greater than bound box size")
            return
        }
        setWidth(value)
        clearChart()
    }

    const handlePointCountChange = (value) => {
        setPointCount(value)
        clearChart()
    }

    const clearChart = () => {
        setIsInitial(true)
        setRefresh(!refresh)
    }


    const getChart = (type: string) => {
        return (
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                {type === "rectangle" ? getShapeChart() : getCurveChart()}

                <div className="flex flex-row  items-center w-full">
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
        )
    }

    const getShapeChart = () => (
        <MonteCarloPlotter shape={shape} points={plotPoints} xDomain={xDomain} yDomain={yDomain} key={
            Math.random().toString(36).substring(7)
        }/>
    );

    const getCurveChart = () => (
        <MonteCarloPlotter shape={shape} points={plotPoints} xDomain={xDomain} yDomain={yDomain} key={
            Math.random().toString(36).substring(7)
        }/>
    );

    const handleCalculate = () => {
        setIsInitial(false)
        setRefresh(!refresh)
    };

    useEffect(() => {

        setError("")

        if (isInitial) {
            setMonteCarloPoints([])
            setPlotPoints([])
            setShape({points: []})
            setCurve({curveFn: "0", from: 0, to: 0})
            return
        }

        const randomPoints = generateRandomPointsInRange(pointCount, yDomain, xDomain)

        if (option == "rectangle") {
            const rectangle = generateRectanglePoints(width, height, center)
            const points = mapPointsToShape(randomPoints, rectangle)
            setMonteCarloPoints(points)

            if (!hidePoints) {
                setPlotPoints(points)
            }

            setShape({points: rectangle})
        }

        if (option == "polygon") {

            let newShape

            try {
                if (typeof polygon === "string") {
                    newShape = JSON.parse(`[ ${polygon} ]`)
                }

                if (newShape.length < 3) {
                    setError("polygon must have at least 3 pairs of coordinates")
                    return;
                }

                newShape.push(newShape[0])

            } catch (e) {
                setError("invalid polygon format")
                console.log(e)
                return;
            }


            const points = mapPointsToShape(randomPoints, newShape)
            setMonteCarloPoints(points)
            setShape({points: newShape})

            if (!hidePoints) {
                setPlotPoints(points)
            }


        }

    }, [refresh])


    useEffect(() => {

        if (hidePoints) {
            setPlotPoints([])
            return
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

    const mapPointsToCurve = (randomPoints: number[][]) => {
        return randomPoints.map(point => {
            const isInside = isPointBetweenCurveAnX(point, curve.curveFn, [curve.from, curve.to])
            return {
                x: point[0],
                y: point[1],
                color: isInside ? "green" : "red"
            }
        })

    }

    const rectangleForm = () => <>

        <div className={"flex flex-row gap-3"}>
            <div className={styles.formInput}>
                <label htmlFor="height" className={styles.formFieldLabel}>
                    Height:
                </label>
                <input
                    type="number"
                    id="height"
                    className={styles.formFieldText}
                    placeholder="e.g. 10"
                    value={height}
                    onChange={e => handleHeightChange(Number.parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="width" className={styles.formFieldLabel}>
                    width:
                </label>
                <input
                    type="number"
                    id="width"
                    className={styles.formFieldText}
                    placeholder="e.g. 10"
                    value={width}
                    onChange={e => handleWidthChange(Number.parseFloat(e.target.value))}
                />
            </div>
        </div>
    </>;


    const [polygon, setPolygon] = useState<string>()


    const polygonForm = () => <div>
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

    </div>;
    const curveForm = () => <div>curve</div>;

    const getForm = () => {
        return <div className={styles.form}>
            {error.length > 0 && <div className="text-red-500">{error}</div>}

            {option == "rectangle" && rectangleForm()}
            {option == "polygon" && polygonForm()}
            {option == "curve" && curveForm()}

            <div className={styles.formInput}>
                <label htmlFor="pointCount" className={styles.formFieldLabel}>
                    Number of points:
                </label>
                <input
                    type="number"
                    id="pointCount"
                    className={styles.formFieldText}
                    placeholder="e.g. 10000"
                    value={pointCount}
                    onChange={e => handlePointCountChange(Number.parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="boundBoxSize" className={styles.formFieldLabel}>
                    Bound box size:
                </label>
                <input
                    type="number"
                    id="boundBoxSize"
                    className={styles.formFieldText}
                    placeholder="e.g. 100"
                    value={boundBoxSize}
                    onChange={e => setBoundBoxSize(Number.parseFloat(e.target.value))}
                />
            </div>

            <button
                type="button"
                className={styles.formSubmit}
                onClick={handleCalculate}
            >
                Calculate area
            </button>
        </div>

    }

    const getResults = () => {

        if (monteCarloPoints.length === 0) return <></>

        const pointsInside = monteCarloPoints.filter(point => point.color === "green").length
        const pointsOutside = monteCarloPoints.filter(point => point.color === "red").length

        const totalArea = (xDomain[1] - xDomain[0]) * (yDomain[1] - yDomain[0])
        const area = calculateArea(pointsOutside, pointsInside, totalArea)
        return (
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                <div className="flex flex-row justify-center items-center gap-3">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold mb-2">Area</h1>
                        <p className="text-gray-600 mb-4">
                            {area}
                        </p>
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
                    This is a simple calculator that uses Monte Carlo method to calculate the area of a figure
                </p>
                <div className={"flex flex-col w-full h-full items-center justify-center"}>
                    <label htmlFor="shape" className={styles.formFieldLabel}>
                        Select a shape:
                    </label>
                    <select
                        id="shape"
                        name="shape"
                        className={styles.formFieldText}
                        value={option}
                        onChange={e => setOption(e.target.value)}
                    >
                        <option value="rectangle">Rectangle</option>
                        <option value="polygon">Polygon</option>
                        <option value="curve">Curve</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-row justify-evenly gap-3">
                {getForm()}
                {getChart(option)}

            </div>
            {getResults()}


        </div>
    )
}
