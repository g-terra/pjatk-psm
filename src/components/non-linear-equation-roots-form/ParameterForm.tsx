// components/EquationForm.tsx
import React, {FC} from 'react';
import {useForm, FieldPath} from 'react-hook-form';

type FormData = {
    constants: string;
    exponents: string;
    lowerBound: string;
    upperBound: string;
    precision: string;
};

interface Props {
    onFormSubmit: (data: FormData) => void;
}

const ParameterForm: FC = ({onFormSubmit} : Props ) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        onFormSubmit(data)
    };

    return (
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="constants" className="block text-sm font-medium">
                            Equation Constants (comma-separated list):
                        </label>
                        <input
                            type="text"
                            id="constants"
                            {...register<FieldPath<FormData>>('constants', {required: true})}
                            className={`border w-full rounded ${
                                errors.constants ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. 1, -2, 0.5"
                        />
                        {errors.constants && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="exponents" className="block text-sm font-medium">
                            Equation Exponents (comma-separated list):
                        </label>
                        <input
                            type="text"
                            id="exponents"
                            {...register<FieldPath<FormData>>('exponents', {required: true})}
                            className={`border w-full rounded ${
                                errors.exponents ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. 2, 1, 0"
                        />
                        {errors.exponents && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="lowerBound" className="block text-sm font-medium">
                            Lower Bound Guess:
                        </label>
                        <input
                            type="number"
                            id="lowerBound"
                            {...register<FieldPath<FormData>>('lowerBound', {required: true})}
                            className={`border w-full rounded ${
                                errors.lowerBound ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. -10"
                        />
                        {errors.lowerBound && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="upperBound" className="block text-sm font-medium">
                            Upper Bound Guess:
                        </label>
                        <input
                            type="number"
                            id="upperBound"
                            {...register<FieldPath<FormData>>('upperBound', {required: true})}
                            className={`border w-full rounded ${
                                errors.upperBound ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. 10"
                        />
                        {errors.upperBound && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="precision" className="block text-sm font-medium">
                            Precision (decimal places):
                        </label>
                        <input
                            type="range"
                            id="precision"
                            min="1"
                            max="10"
                            step="1"
                            {...register<FieldPath<FormData>>('precision', {required: true})}
                            className={`w-full ${
                                errors.precision ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        <div className="flex justify-between text-xs mt-1">
                            {Array.from({length: 10}, (_, i) => i + 1).map((step) => (
                                <span key={step}>{step}</span>
                            ))}
                        </div>
                        {errors.precision && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
};

export default ParameterForm;