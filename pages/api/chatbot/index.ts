import type { NextApiRequest, NextApiResponse } from 'next';
import { getJsTest } from '@/utils/test';
import { getChatbotsList } from '@/utils/chatbots';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    try {
        
        if (req.method === 'GET') {
            console.log("fetching all JS chatbots .....")

            const fileList = await getChatbotsList()

            return res.status(200).json({data : fileList});
          } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
          }

    } catch (error: any) {
        console.log('error', error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}
