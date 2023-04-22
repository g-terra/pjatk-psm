class Equation {
    public readonly constants: number[];

    public readonly powers: number[];

    constructor(constants: number[], powers: number[]) {
        this.constants = constants;
        this.powers = powers;
    }

    public toDisplayString() : string {
        let equationString = "";
        for (let i = 0; i < this.constants.length; i++) {
            equationString += this.constants[i] + "x^" + this.powers[i];
            if (i < this.constants.length - 1) {
                equationString += " + ";
            }
        }
        return equationString;
    }

}

export default Equation;