// components/EquationForm.tsx
import React, {useEffect} from 'react';
import ParameterForm from "@/components/non-linear-equation-roots-form/parameter-form/ParameterForm";
import Parameters from "@/lib/root-finder/Parameters";
import Equation from "@/lib/math-utils/equation-solver/Equation";
import Result from "@/lib/root-finder/Result";
import axios from "axios";
import EquationChart from "@/components/line-chart/EquationChart";
import ResultCard from "@/components/non-linear-equation-roots-form/ResultCard";

export default function NonLinearEquationRoots() {

    //state to keep result in a list
    const [results, setResults] = React.useState<Result[]>([]);
    const [params, setParams] = React.useState<Parameters>(new Parameters(new Equation([0], [0]), 0, 1, 0.0000000001));
    const [isInitial, setIsInitial] = React.useState(true);

    useEffect(() => {
        if (isInitial) {
            return;
        }

        if (params) {
            axios.post(`/api/tasks/roots`,
                params
            ).then(
                (response) => {
                    setResults(response.data);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
    }, [params, isInitial]);


    const handleSubmit = (data: any) => {
        const constants = data.constants.split(",").map((x: string) => parseFloat(x));
        const exponents = data.exponents.split(",").map((x: string) => parseFloat(x));
        const lowerBound = parseFloat(data.lowerBound);
        const upperBound = parseFloat(data.upperBound);
        const precision = 1 / Math.pow(10, parseInt(data.precision));

        const params = new Parameters(new Equation(
                constants,
                exponents
            ),
            lowerBound, upperBound, precision)

        setParams(params);
        setIsInitial(false);
    }

    const [height, setHeight] = React.useState(400);
    const [width, setWidth] = React.useState(600);

    const chartContainerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const padding = {height: 30, width: 30, minWidth: 200, maxHeight: 400};

        function handleResize() {
            if (chartContainerRef.current) {
                const parentWidth = chartContainerRef.current?.clientWidth;
                const parentHeight = chartContainerRef.current?.clientHeight;

                // Set the chart height and width based on the parent div's dimensions and the padding
                setHeight(Math.min(parentHeight - padding.height, padding.maxHeight));
                setWidth(Math.max(parentWidth - padding.width, padding.minWidth));
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Non Linear Equation Roots</h1>
                <p className="text-gray-600 mb-4">
                    Find the roots of a non linear equation using different methods
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <ParameterForm onFormSubmit={handleSubmit}></ParameterForm>
                </div>
                <div
                    className="bg-white p-4 rounded shadow"
                    ref={chartContainerRef}
                >
                    <EquationChart
                        height={height}
                        width={width}
                        parameters={params}
                        showEquation={!isInitial}
                        key={JSON.stringify({...params, height, width})}
                    />
                </div>
            </div>

            {
                !isInitial && <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4"
    >
                    {results.map((result, index) => (
                        <ResultCard result={result} key={index}/>
                    ))}
                </div>
            }

        </div>
    );
};

