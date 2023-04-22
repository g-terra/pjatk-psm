import {NextApiRequest, NextApiResponse} from "next";
import SecantMethod from "@/lib/root-finder/secant-method/SecantMethod";

export default function secant(req: NextApiRequest, res: NextApiResponse) {
    const result = SecantMethod.resolve(req.body);
    res.status(200).json(result);
}
