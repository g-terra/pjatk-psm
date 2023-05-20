// components/EquationDisplay.tsx
import React, { FC } from 'react';
import * as math from 'mathjs';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type EquationDisplayProps = {
    equation: string;
};

const EquationDisplay: FC<EquationDisplayProps> = ({ equation }) => {
    const node = math.parse(equation);
    const latex = node.toTex();

    if (latex === 'undefined') {
        return <div />;
    }

    return <InlineMath math={latex} />;
};

export default EquationDisplay;
