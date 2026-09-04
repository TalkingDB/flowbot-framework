import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/config/mongodb';
import { getUsers } from '@/models/userModel';
import { isAdmin } from '@/utils/adminAuth';
import { getVerifiedEmail } from '@/utils/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await dbConnect();
        if (req.method === 'GET') {
            const email = getVerifiedEmail(req);
            if (!isAdmin(email)) {
                return res.status(403).json({
                    error: 'Forbidden',
                });
            }

            const { skip, limit } = req.query;
            const users = await getUsers(Number(skip), Number(limit))
            return res.status(200).json(users);
        }

        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            error: error.message || 'Something went wrong',
        });
    }
}