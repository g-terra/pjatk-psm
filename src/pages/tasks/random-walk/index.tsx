// components/EquationForm.tsx
import React, {useEffect} from 'react';
import axios from "axios";
import Parameters from "@/components/random-walk/parameter-form/Parameters";
import ParameterForm from "@/components/random-walk/parameter-form/ParameterForm";
import ResultCard from "@/components/random-walk/ResultCard";


interface Result {
    probability: number;
    error: string;
}

export default function RandomWalk() {

    //state to keep result in a list
    const [result, setResult] = React.useState<Result>({
        "probability": 0,
        "error": ""
    });
    const [params, setParams] = React.useState<Parameters>(
        new Parameters(
            1, 1, 1, 1, "left"
        )
    );
    const [isInitial, setIsInitial] = React.useState(true);

    useEffect(() => {
        if (isInitial) {
            return;
        }

        if (params) {
            axios.post(`/api/tasks/random-walk`,
                params
            ).then(
                (response) => {
                    setResult(
                        {
                            "probability": response.data.probability,
                            "error": ""
                        }
                    );
                }
            ).catch(
                (error) => {
                    setResult({
                        "probability": 0,
                        "error": error.response.data.message
                    })
                }
            )
        }
    }, [params, isInitial]);


    const handleSubmit = (data: any) => {
        const numberOfSteps = parseFloat(data.steps);
        const leftProbability = parseFloat(data.leftProbability);
        const stepLength = parseFloat(data.stepLength);
        const location = parseFloat(data.location);
        const direction = data.direction;


        const params = new Parameters(
            numberOfSteps, leftProbability, stepLength, location, direction
        )

        setParams(params);

        setIsInitial(false);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">The Drunken Walk</h1>
                <p className="text-gray-600 mb-4">
                    Find the probability of a random walker to be at a certain location after a certain number of steps
                </p>
            </div>
            <div className="bg-white p-4 rounded shadow ">
                <ParameterForm onFormSubmit={handleSubmit}></ParameterForm>
            </div>
            {
                !isInitial &&
                <ResultCard result={result}/>
            }

        </div>
    );
};

