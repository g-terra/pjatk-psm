// components/EquationDisplay.tsx
import React, { FC } from 'react';
import Equation from '@/lib/math-utils/equation-solver/Equation';

type EquationDisplayProps = {
    equation: Equation;
};

const EquationDisplay: FC<EquationDisplayProps> = ({ equation }) => {
    const terms = [];

    for (let i = 0; i < equation.constants.length; i++) {
        const coefficient = equation.constants[i];
        const exponent = equation.powers[i];

        terms.push(
            <span key={i} className="inline-flex items-baseline">
        {i > 0 && (coefficient > 0 ? <span>+</span> : <span>-</span>)}
                <span className="mx-1">{Math.abs(coefficient)}</span>
                {exponent !== 0 && (
                    <span>
            x{exponent !== 1 && <sup>{exponent}</sup>}
          </span>
                )}
      </span>,
        );
    }

    return <div className="text-lg">{terms}</div>;
};

export default EquationDisplay;
