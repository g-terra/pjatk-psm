//return list of results for roots

import { NextApiRequest, NextApiResponse } from 'next';

import BisectionMethod from '@/lib/root-finder/bisection-method/BisectionMethod';

import RegulaFalsiMethod from '@/lib/root-finder/regula-falsi-method/RegulaFalsiMethod';

import SecantMethod from '@/lib/root-finder/secant-method/SecantMethod';

export default function roots(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const bisectionResult = BisectionMethod.resolve(req.body);
    const regulaFalsiResult = RegulaFalsiMethod.resolve(req.body);
    const secantResult = SecantMethod.resolve(req.body);

    res.status(200).json([
        bisectionResult,
        regulaFalsiResult,
        secantResult
    ]);
}