import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteChatbot} from '@/utils/chatbots';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    try {
        
        if (req.method === 'DELETE') {
            const { chatbotId } = req.query;
            if (chatbotId && typeof chatbotId === 'string') {
                const deletedValue = await deleteChatbot(chatbotId)
                return res.status(200).json({data : deletedValue});
            }

          } else {
            res.setHeader('Allow', ['DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
          }

    } catch (error: any) {
        console.log('error', error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}
