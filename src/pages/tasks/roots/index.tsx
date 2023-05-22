// components/EquationForm.tsx
import React, {useEffect, useState} from 'react';
import Parameters from "@/lib/root-finder/Parameters";
import ResultCard from "@/components/non-linear-equation-roots/ResultCard";
import MultiFunctionPlotter from "@/components/function-plotter/multi-function-plotter/MultiFunctionPlotter";
import styles from "@/styles/forms.module.css";
import MathFunctionSolver from "@/lib/math-utils/math-functions/MathFunctionSolver";
import EquationDisplay from "@/components/equation-display/EquationDisplay";
import BisectionMethod from "@/lib/root-finder/bisection-method/BisectionMethod";
import SecantMethod from "@/lib/root-finder/secant-method/SecantMethod";
import RegulaFalsiMethod from "@/lib/root-finder/regula-falsi-method/RegulaFalsiMethod";
import {PlottableFunction} from "@/components/function-plotter/multi-function-plotter/PlottableFunction";
import Result from "@/lib/root-finder/Result";

export default function NonLinearEquationRoots() {


    const [functions, setFunctions] = useState<PlottableFunction[]>([])
    const [mainEquation, setMainEquation] = useState<string>("")
    const [lowerBound, setLowerBound] = useState<string>("-1")
    const [upperBound, setUpperBound] = useState<string>("1")
    const [precision, setPrecision] = useState<number>(5)
    const [iterationsLimit, setIterationsLimit] = useState<number>(1000)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [result, setResult] = useState<Result[]>([])
    const [displayEquation, setDisplayEquation] = useState<string>("")


    const resolve = () => {

        const decimalPlaces = 1 / Math.pow(10, precision);


        const params = new Parameters(
            mainEquation,
            Number.parseFloat(lowerBound),
            Number.parseFloat(upperBound),
            decimalPlaces,
            iterationsLimit
        )

        return [
            BisectionMethod.resolve(params),
            RegulaFalsiMethod.resolve(params),
            SecantMethod.resolve(params),
        ]

    }

    useEffect(() => {

        if (mainEquation.length == 0 || !MathFunctionSolver.isValid(mainEquation)) return

        const newFunctions = [
            {
                fn: mainEquation,
            }
        ]
        setDisplayEquation("f(x) ==" + mainEquation)
        setFunctions(newFunctions)
        setResult(resolve())

    }, [refresh])

    function handleUpdate() {
        if (mainEquation.length == 0) {
            setError("Please enter a valid equation")
            return
        }

        if (!MathFunctionSolver.isValid(mainEquation)) {
            setError("Please enter a valid equation")
            return
        }

        if (lowerBound == null || upperBound == null) {
            setError("Please enter valid bounds")
            return
        }

        if (lowerBound == upperBound) {
            setError("Bounds cannot be equal")
            return
        }

        if (Number.parseFloat(lowerBound) == -Number.parseFloat(upperBound) || Number.parseFloat(upperBound) == -Number.parseFloat(lowerBound)) {
            setError("Bounds cannot be mirrored")
            return
        }

        if (Number.parseFloat(lowerBound) > Number.parseFloat(upperBound)) {
            setError(`Lower bound(${lowerBound}) must be lower than upper bound(${upperBound})`)
            return
        }

        setError("")
        setRefresh(!refresh)
    }

    function getChart() {
        return (
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-3">
                <EquationDisplay equation={displayEquation}/>
                <MultiFunctionPlotter functions={functions}/>
            </div>
        );
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
                        Lower Bound:
                    </label>
                    <input
                        type="number"
                        id="lowerBound"
                        className={styles.formFieldText}
                        placeholder="e.g. 10"
                        value={lowerBound}
                        onChange={e => setLowerBound(e.target.value)}
                    />
                </div>
                <div className={styles.formInput}>
                    <label htmlFor="upperBound" className={styles.formFieldLabel}>
                        Upper Bound:
                    </label>
                    <input
                        type="number"
                        id="upperBound"
                        className={styles.formFieldText}
                        placeholder="e.g. 10"
                        value={upperBound}
                        onChange={e => setUpperBound(e.target.value)}
                    />
                </div>

            </div>
            <div className={styles.formInput}>
                <label htmlFor="iterationsLimit" className={styles.formFieldLabel}>
                    Max number of iterations:
                </label>
                <input
                    type="number"
                    id="iterationsLimit"
                    className={styles.formFieldText}
                    placeholder="e.g. 1000"
                    value={iterationsLimit}
                    onChange={e => setIterationsLimit(Number.parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="precision" className={styles.formFieldLabel}>
                    Precision (decimal places):
                </label>
                <input
                    type="range"
                    id="precision"
                    min="1"
                    max="5"
                    step="1"
                    className={"w-full border-gray-300"}
                    value={precision}
                    onChange={e => setPrecision(Number.parseFloat(e.target.value))}
                />
                <div className="flex justify-between text-xs mt-1 w-full">
                    {Array.from({length: 5}, (_, i) => i + 1).map((step) => (
                        <span key={step}>{step}</span>
                    ))}
                </div>
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
                <h1 className="text-3xl font-bold mb-2">Roots</h1>
                <p className="text-gray-600 mb-4">
                    Find the roots of a non-linear equation using Bisection, Secant and Regula Falsi methods
                </p>
            </div>
            <div className="flex flex-row justify-evenly gap-3">
                {getForm()}
                {getChart()}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4"
            >
                {
                    error.length == 0 && result.map((result, index) => (
                        <ResultCard result={result} key={index}/>
                    ))
                }
            </div>
        </div>
    )

};

