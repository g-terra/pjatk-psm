import React, {FC, useState} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import styles from './ParameterForm.module.css';

type FormData = {
    steps: number,
    leftProbability: number,

    stepLength: number,

    location: number,

    direction: "left" | "right"
};

interface Props {
    onFormSubmit: (data: FormData) => void;
}

const ParameterForm: FC<Props> = ({onFormSubmit}) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        onFormSubmit(data)
    };

    const [probability, setProbability] = useState<number>(50);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formInput}>
                <label htmlFor="steps" className={styles.formFieldLabel}>
                    Number of steps:
                </label>
                <input
                    type="number"
                    id="steps"
                    {...register<FieldPath<FormData>>('steps', {required: true})}
                    className={styles.formFieldText}
                    placeholder="e.g. 10"
                />
                {errors.steps && <p className="text-red-500">This field is required</p>}
            </div>

            <div className={styles.formInput}>
                <label htmlFor="stepLength" className={styles.formFieldLabel}>
                    Step length (meters):
                </label>
                <input
                    type="text"
                    id="stepLength"
                    {...register<FieldPath<FormData>>('stepLength', {required: true})}
                    className={styles.formFieldText}
                    placeholder="e.g. 1"
                />
                {errors.stepLength && <p className="text-red-500">This field is required</p>}
            </div>

            <div className={styles.formInput}>
                <label htmlFor="leftProbability" className={styles.formFieldLabel}>
                    Probability of going left (%) - right is 100 - left:
                </label>
                <div className="flex items-center justify-center w-full gap-3">
                    <input
                        type="range"
                        id="leftProbability"
                        {...register<FieldPath<FormData>>('leftProbability', {required: true})}
                        className="grow"
                        placeholder="50"
                        min={0}
                        max={100}
                        onChange={(e) => setProbability(parseInt(e.target.value))}
                    />
                </div>
                <div className="flex flex-row items-center justify-evenly w-full gap-3">
                    <div className="text-center">
                        Left: {probability}%
                    </div>
                    <div className="text-center">
                        Right: {100 - probability}%
                    </div>

                </div>
                {errors.leftProbability && <p className="text-red-500">This field is required</p>}
            </div>

            <div className={styles.formInput}>
                <label htmlFor="location" className={styles.formFieldLabel}>
                    Required end location (distance from the starting point in meters):
                </label>
                <input
                    type="number"
                    id="location"
                    {...register<FieldPath<FormData>>('location', {required: true})}
                    className={styles.formFieldText}
                    placeholder="e.g. 0"
                />
                {errors.location && <p className="text-red-500">This field is required</p>}
            </div>

            {/*//toggle switch for direction*/}

            <div className={styles.formInput}>
                <label htmlFor="direction" className={styles.formFieldLabel}>
                    Direction:
                </label>
                <select
                    id="direction"
                    {...register<FieldPath<FormData>>('direction', {required: true})}
                    className={styles.formFieldText}
                    placeholder="e.g. left"
                >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
                {errors.direction && <p className="text-red-500">This field is required</p>}
            </div>

            <input className={styles.formSubmit} type="submit" value="Find Probability"/>
        </form>
    );
};

export default ParameterForm;