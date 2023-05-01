import {FC} from "react";


interface Props {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    type: string;
    onNumberChange: (type: string, value: number) => void;
    onRangeChange: (type: string, value: number) => void;

}


const Slider :FC<Props> = ({label, min, max, step, value, type, onNumberChange, onRangeChange}) => {
    return (
        <div className="flex flex-col items-start w-full">
            <label className="mr-4">{label}</label>
            <div className="flex flex-row w-full">
                <input
                    className="mr-4 flex-grow"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onRangeChange(type, parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    className="w-[75px] h-10 rounded shadow-sm focus:outline-none ring-2 transition duration-300 ease-in-out"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onNumberChange(type, parseFloat(e.target.value))}
                />
            </div>
        </div>


    );
};

export default Slider;