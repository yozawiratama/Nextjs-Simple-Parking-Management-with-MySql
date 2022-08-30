import { format } from 'date-fns';
import excuteQuery from '../../../lib/db'

const dateformat = 'dd MMM yyyy HH:mm';

export default async(req, res) => {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM carparks where status = ? ORDER BY arrival_at',
            values: ['HAS_LEFT'],
        });
        if (result) {
            const mappedResult = result.map(it => ({
                id: it.id,
                car_reg_no: it.car_reg_no,
                arrival_at: format(it.arrival_at, dateformat),
                depart_at: format(it.depart_at, dateformat),
                status: it.status,
                bill: it.bill,
                time_range: `${it.time_range} Minutes`
            }));
            res.status(200).json({ result: mappedResult })
        } else {
            res.status(200).json({ result: [] })
        }
    } catch (error) {
        console.log(error);
    }


};