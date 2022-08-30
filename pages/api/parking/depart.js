import excuteQuery from '../../../lib/db'
import nextBase64 from 'next-base64';

export default async(req, res) => {
    if (req.method === 'PUT') {
        try {
            const body = JSON.parse(req.body);
            const { current, minutes, bill } = JSON.parse(nextBase64.decode(body.data));
            console.log(data)
            const result = await excuteQuery({
                query: 'update carparks set depart_at=?, time_range=?, minutes=? where id = ?',
                values: [current, minutes, bill, body.id],
            });
            console.log(result);
            res.status(200).json({ result })
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    } else {
        res.status(400);
    }


};