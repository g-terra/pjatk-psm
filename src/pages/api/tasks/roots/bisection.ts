import {NextApiRequest, NextApiResponse} from "next";

import BisectionMethod from "@/lib/root-finder/bisection-method/BisectionMethod";

export default function bisection(req: NextApiRequest, res: NextApiResponse)  {
    console.log(`Bisection method request: ${JSON.stringify(req.body)}`)
    const result = BisectionMethod.resolve(req.body);
    res.status(200).json(result);
}

