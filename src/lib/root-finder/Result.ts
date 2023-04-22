class Result {

    public readonly methodName: string;
    public readonly root: number;
    public readonly iterations: number;
    public readonly error: string;

    constructor(root: number, iterations: number, methodName: string, error: string) {
        this.root = root;
        this.iterations = iterations;
        this.methodName = methodName;
        this.error = error;
    }

    static fromError(methodName: string, error: string): Result {
        return new Result(0, 0, methodName, error);
    }

    static fromSuccess(root: number, iterations: number, methodName: string): Result {
        return new Result(root, iterations, methodName, "");
    }

}

export default Result;