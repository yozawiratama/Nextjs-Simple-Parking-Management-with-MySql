import { format } from 'date-fns';
import excuteQuery from '../../../lib/db'

const dateformat = 'dd MMM yyyy HH:mm';

export default async(req, res) => {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM carparks where status = ? ORDER BY arrival_at',
            values: ['PARKED'],
        });
        const mappedResult = result.map(it => ({
            id: it.id,
            car_reg_no: it.car_reg_no,
            arrival_at: format(it.arrival_at, dateformat),
            depart_at: it.depart_at ? format(it.format, dateformat) : '-',
            status: it.status
        }));
        res.status(200).json({ result: mappedResult })
    } catch (error) {
        console.log(error);
    }


};