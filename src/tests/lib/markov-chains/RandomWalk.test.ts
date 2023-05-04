import RandomWalk from "@/lib/markov-chains/RandomWalk";

describe('RandomWalk', () => {
    test('should return state matrix when number of steps is 1', () => {

        const numSteps = 1;
        const left = 0.5;
        const right = 1 - left;

        const expected = [
            [0, right, 0],
            [left, 0, right],
            [0, left, 0]
        ];

        const actual = RandomWalk.generateStateMatrix(numSteps, left, right);

        console.log(actual)
        expect(actual.length).toEqual(expected.length);
        expect(actual[0].length).toEqual(expected[0].length);
        expect(actual).toEqual(expected);
    });

    test('should return state matrix when number of steps is 2', () => {
        const numSteps = 2;
        const left = 0.5;
        const right = 1 - left;

        const expected = [
            [0, right, 0, 0, 0],
            [left, 0, right, 0, 0],
            [0, left, 0, right, 0],
            [0, 0, left, 0, right],
            [0, 0, 0, left, 0]
        ];

        const actual = RandomWalk.generateStateMatrix(numSteps, left, right);

        expect(actual.length).toEqual(expected.length);
        expect(actual[0].length).toEqual(expected[0].length);
        expect(actual).toEqual(expected);

    });


    test('should return possibilities for requested step', () => {
        const numSteps = 1;
        const left = 0.5;
        const right = 1 - left;

        const expected = [[left], [0], [right]];

        const actual = RandomWalk.getProbabilitiesForNthStep(numSteps, left, right);

        expect(actual.length).toEqual(expected.length);
        expect(actual[0].length).toEqual(expected[0].length);
        expect(actual).toEqual(expected);

    });

    test('should return possibilities for requested step', () => {
        const numSteps = 2;
        const left = 0.5;
        const right = 1 - left;

        const expected = [[.25], [0], [.5], [0], [.25]];

        const actual = RandomWalk.getProbabilitiesForNthStep(numSteps, left, right);

        expect(actual.length).toEqual(expected.length);
        expect(actual[0].length).toEqual(expected[0].length);
        expect(actual).toEqual(expected);

    });

    test('should return possibilities for requested step', () => {
        const numSteps = 3;
        const left = 0.5;
        const right = 1 - left;

        const expected = [[.125], [0], [.375], [0], [.375], [0], [.125]];

        const actual = RandomWalk.getProbabilitiesForNthStep(numSteps, left, right);

        expect(actual.length).toEqual(expected.length);
        expect(actual[0].length).toEqual(expected[0].length);
        expect(actual).toEqual(expected);
    });

    test('should return possibilities for a given position', () => {
            const numSteps = 3;
            const left = 0.5;
            const right = 1 - left;
            const expected = .375
            const actual = RandomWalk.getProbabilityForPositionXatStepNth(numSteps, left, right, -1);

            expect(actual).toEqual(expected);
        }
    );

    test('should return possibilities for a given position', () => {
            const numSteps = 2;
            const left = 0.5;
            const right = 1 - left;
            const expected = .25
            const actual = RandomWalk.getProbabilityForPositionXatStepNth(numSteps, left, right, 2);

            expect(actual).toEqual(expected);
        }
    );
});