import MultiFunctionPlotter from "@/components/function-plotter/multi-function-plotter/MultiFunctionPlotter";
import RectangleMethod from "@/lib/math-utils/Integrals/RectangleMethod";
import styles from "@/styles/forms.module.css";
import React, {useEffect, useState} from "react";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import TrapezoidMethod from "@/lib/math-utils/Integrals/TrapezoidMethod";
import {Result} from "@/lib/math-utils/Integrals/Result";
import EquationDisplay from "@/components/equation-display/EquationDisplay";
import SimpsonMethod from "@/lib/math-utils/Integrals/SimpsonMethod";
import {PlottableFunction} from "@/components/function-plotter/multi-function-plotter/PlottableFunction";

export default function Integrals() {

    const [functions, setFunctions] = useState<PlottableFunction[]>([])
    const [mainEquation, setMainEquation] = useState<string>("")
    const [lowerBound, setLowerBound]= useState<number>(-1)
    const [upperBound, setUpperBound]= useState<number>(1)
    const [slices, setSlices] = useState<number>(10)
    const [option, setOption] = useState<string>("rectangle")
    const [refresh, setRefresh] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [result, setResult] = useState<number>(0)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [displayEquation, setDisplayEquation] = useState<string>("")




    useEffect(() => {

        if (mainEquation.length == 0 || !MathFunctionSolver.isValid(mainEquation)) return


        let solveIntegral

        switch (option) {
            case "rectangle":
                solveIntegral = RectangleMethod.resolve
                break

            case "trapezoid":
                solveIntegral = TrapezoidMethod.resolve
                break

            case "simpson":
                solveIntegral = SimpsonMethod.resolve
                break

            default:
                solveIntegral = RectangleMethod.resolve
                break
        }


        const result: Result = solveIntegral(
            mainEquation,
            {
                start: lowerBound,
                end: upperBound
            },
            slices
        );

        const newFunctions = [
            {
                fn: mainEquation,
            },
            ...result.breakdown.map(s => {
                return {
                    fn: s.fn.toDisplayString(),
                    range: [s.start, s.end],
                    closed: true
                }
            })
        ]
        setDisplayEquation("f(x) ==" + mainEquation)
        setFunctions(newFunctions)
        setResult(result.getArea())
        setShowResult(true)

    }, [refresh])


    function getChart() {
        return (
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                <EquationDisplay equation={displayEquation}/>
                <MultiFunctionPlotter functions={functions} key={
                    Math.random().toString(36).substring(7)
                }/>
            </div>
        );
    }

    function handleUpdate() {
        if (mainEquation.length == 0) {
            setError("Please enter a valid equation")
            return
        }

        if (!MathFunctionSolver.isValid(mainEquation)) {
            setError("Please enter a valid equation")
            return
        }

        if (lowerBound >= upperBound) {
            setError("Lower bound must be less than upper bound")
            return
        }
        setError("")
        setRefresh(!refresh)
    }

    function getForm() {
        return <div className={styles.form}>
            {error.length > 0 && <div className="text-red-500">{error}</div>}

            <div className={styles.formInput}>
                <label htmlFor="equation" className={styles.formFieldLabel}>
                    Equation
                </label>
                <input
                    type="text"
                    id="equation"
                    className={styles.formFieldText}
                    placeholder="e.g. x^2"
                    onChange={e => setMainEquation(e.target.value)}
                    value={mainEquation}
                />
            </div>

            <div className={"flex flex-row gap-3"}>
                <div className={styles.formInput}>
                    <label htmlFor="lowerBound" className={styles.formFieldLabel}>
                        From:
                    </label>
                    <input
                        type="number"
                        id="lowerBound"
                        className={styles.formFieldText}
                        placeholder="e.g. 10"
                        value={lowerBound}
                        onChange={e => setLowerBound(Number.parseFloat(e.target.value))}
                    />
                </div>
                <div className={styles.formInput}>
                    <label htmlFor="upperBound" className={styles.formFieldLabel}>
                        To:
                    </label>
                    <input
                        type="number"
                        id="upperBound"
                        className={styles.formFieldText}
                        placeholder="e.g. 10"
                        value={upperBound}
                        onChange={e => setUpperBound(Number.parseFloat(e.target.value))}
                    />
                </div>

            </div>
            <div className={styles.formInput}>
                <label htmlFor="slices" className={styles.formFieldLabel}>
                    Slice count:
                </label>
                <input
                    type="number"
                    id="slices"
                    className={styles.formFieldText}
                    placeholder="e.g. 10"
                    value={slices}
                    onChange={e => setSlices(Number.parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="method" className={styles.formFieldLabel}>
                    Method:
                </label>
                <select
                    id="method"
                    name="method"
                    className={styles.formFieldText}
                    value={option}
                    onChange={e => setOption(e.target.value)}
                >
                    <option value="rectangle">Rectangle</option>
                    <option value="trapezoid">Trapezoid</option>
                    <option value="simpson">Simpson</option>
                </select>
            </div>
            <button
                type="button"
                className={styles.formSubmit}
                onClick={handleUpdate}
            >
                Solve
            </button>
        </div>

    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Integrals</h1>
                <p className="text-gray-600 mb-4">
                    Calculate the area under a curve using numerical integration
                </p>
            </div>
            <div className="flex flex-row justify-evenly gap-3">
                {getForm()}
                {getChart()}
            </div>

            {showResult && <div className="text-2xl font-bold">Result: {result.toFixed(4)}</div>}

        </div>
    )
}
