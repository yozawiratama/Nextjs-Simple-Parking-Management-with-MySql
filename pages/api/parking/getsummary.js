import { differenceInMinutes } from 'date-fns';
import { calculateBill } from '../../../lib/calculateBill';
import excuteQuery from '../../../lib/db'
import nextBase64 from 'next-base64';

export default async(req, res) => {
    try {
        const data = req.query;
        console.log(data)
        if (!data.id) {
            res.status(400).json({ error: 'id is required' })
        } else {
            const result = await excuteQuery({
                query: `
            select
                arrival_at
            from
                carparks
            where
                id = ?
            `,
                values: [data.id],
            });
            if (result.length == 0) res.status(405).json({ error: `data not found with id : ${data.id}` })
            else {
                const currentTime = new Date();
                const minutes = differenceInMinutes(currentTime, result[0].arrival_at);
                const bill = calculateBill(minutes);
                const departData = {
                    current: currentTime.getTime(),
                    minutes,
                    bill
                };
                res.status(200).json({
                    result: {
                        current: currentTime.getTime(),
                        minutes,
                        bill,
                        encdata: nextBase64.encode(JSON.stringify(departData))
                    }
                })
            }

        }
    } catch (error) {
        console.log(error);
    }


};