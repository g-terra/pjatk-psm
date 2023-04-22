// components/EquationForm.tsx
import React, {useEffect} from 'react';
import ParameterForm from "@/components/non-linear-equation-roots-form/ParameterForm";
import Parameters from "@/lib/root-finder/Parameters";
import Equation from "@/lib/math-utils/equation-solver/Equation";
import Result from "@/lib/root-finder/Result";
import axios from "axios";
import ResultCard from "@/components/non-linear-equation-roots-form/ResultCard";
import EquationChart from "@/components/line-chart/EquationChart";
import EquationDisplay from "@/components/line-chart/EquationDisplay";
import Link from "next/link";

export default function NonLinearEquationRoots() {

    //state to keep result in a list
    const [results, setResults] = React.useState<Result[]>([]);
    const [params, setParams] = React.useState<Parameters | null>(null);


    useEffect(() => {

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

    }, [params])


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
    }


    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center justify-start p-16 gap-8">

                <Link href="/" passHref>
                    <button
                        className="absolute top-4 left-4 sm:left-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Home
                    </button>
                </Link>

                <h1 className="text-2xl sm:text-3xl font-bold">Non Linear Equation Roots</h1>

                <p className="text-lg">Find roots of non linear equations using different methods</p>

                <div className="flex flex-col md:flex-row items-start justify-center gap-6">
                    <ParameterForm onFormSubmit={handleSubmit}></ParameterForm>
                    {params && <div className="flex flex-col items-center justify-center">
                        <EquationDisplay equation={params.equation}/>
                        <EquationChart parameters={params} key={JSON.stringify(params)}/>
                    </div>}
                </div>


                <div className="overflow-x-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                        {
                            results.map((result, index) => {
                                return <ResultCard result={result} key={index}></ResultCard>
                            })
                        }
                    </div>
                </div>
            </div>


        </div>
    );


}
