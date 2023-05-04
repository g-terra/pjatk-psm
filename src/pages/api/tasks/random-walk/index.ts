import {NextApiRequest, NextApiResponse} from "next";
import RandomWalk from "@/lib/markov-chains/RandomWalk";


type RequestBody = {
    steps: number,
    leftProbability: number,

    stepLength: number,

    location: number,

    direction: "left" | "right"

}

function isValidBody<T extends Record<string, unknown>>(
    body: any,
    fields: (keyof T)[],
): body is T {
    return Object.keys(body).every((key) => fields.includes(key))
}

export default function randomWalk(req: NextApiRequest, res: NextApiResponse) {

    console.log(req.body)


    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'});
        return;
    }

    if (!isValidBody<RequestBody>(req.body, ['steps', 'leftProbability', 'stepLength', 'location', 'direction'])) {
        return res.status(402).json({message: 'Invalid request body'});
    }


    let position = req.body.location / req.body.stepLength;

    if (req.body.direction === 'left') {
        position = -position;
    }

    if (!Number.isInteger(position)) {
        return res.status(402).json({message: 'Invalid location , location must be a multiple of step length'});
    }

    //check if position is in range
    if (position < -req.body.steps || position > req.body.steps) {
        return res.status(402).json({message: `Invalid location , location must be in range ${req.body.steps * req.body.stepLength} to the left or ${req.body.steps * req.body.stepLength} to the right`});
    }

    const stepResults = RandomWalk.getProbabilityForPositionXatStepNth(
        req.body.steps,
        req.body.leftProbability / 100,
        position
    );


    res.status(200).json(
        {
            probability: stepResults,
        }
    );

}