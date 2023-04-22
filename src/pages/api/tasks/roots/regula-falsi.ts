import {NextApiRequest, NextApiResponse} from "next";

import RegulaFalsiMethod from "@/lib/root-finder/regula-falsi-method/RegulaFalsiMethod";

export default function regulaFalsi (req: NextApiRequest, res: NextApiResponse) {
    const result = RegulaFalsiMethod.resolve(req.body);
    res.status(200).json(result);
}

