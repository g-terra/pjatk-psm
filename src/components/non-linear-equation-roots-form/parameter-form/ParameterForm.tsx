// components/EquationForm.tsx
import React, {FC} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import styles from './ParameterForm.module.css';

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

const ParameterForm: FC<Props> = ({ onFormSubmit }) => {
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
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formInput}>
                        <label htmlFor="constants" className={styles.formFieldLabel}>
                            Equation Constants (comma-separated list):
                        </label>
                        <input
                            type="text"
                            id="constants"
                            {...register<FieldPath<FormData>>('constants', {required: true})}
                            className={styles.formFieldText}
                            placeholder="e.g. 1, -2, 0.5"
                        />
                        {errors.constants && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className={styles.formInput}>
                        <label htmlFor="exponents" className={styles.formFieldLabel}>
                            Equation Exponents (comma-separated list):
                        </label>
                        <input
                            type="text"
                            id="exponents"
                            {...register<FieldPath<FormData>>('exponents', {required: true})}
                            className={styles.formFieldText}
                            placeholder="e.g. 2, 1, 0"
                        />
                        {errors.exponents && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className={styles.formInput}>
                        <label htmlFor="lowerBound" className="block text-sm font-medium">
                            Lower Bound Guess:
                        </label>
                        <input
                            type="number"
                            id="lowerBound"
                            {...register<FieldPath<FormData>>('lowerBound', {required: true})}
                            className={styles.formFieldText}
                            placeholder="e.g. -10"
                        />
                        {errors.lowerBound && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className={styles.formInput}>
                        <label htmlFor="upperBound" className="block text-sm font-medium">
                            Upper Bound Guess:
                        </label>
                        <input
                            type="number"
                            id="upperBound"
                            {...register<FieldPath<FormData>>('upperBound', {required: true})}
                            className={styles.formFieldText}
                            placeholder="e.g. 10"
                        />
                        {errors.upperBound && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className={styles.formInput}>
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
                        <div className="flex justify-between text-xs mt-1 w-full">
                            {Array.from({length: 10}, (_, i) => i + 1).map((step) => (
                                <span key={step}>{step}</span>
                            ))}
                        </div>
                        {errors.precision && <p className="text-red-500">This field is required</p>}
                    </div>
                    <input className={styles.formSubmit} type="submit" value="Find root"/>
                </form>
    );
};

export default ParameterForm;