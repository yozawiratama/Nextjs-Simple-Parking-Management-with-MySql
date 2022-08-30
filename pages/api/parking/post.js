import excuteQuery from '../../../lib/db'

export default async(req, res) => {
    if (req.method === 'POST') {
        try {
            const data = JSON.parse(req.body);
            console.log(data)
            const result = await excuteQuery({
                query: 'INSERT INTO carparks(car_reg_no) VALUES(?)',
                values: [data.regNo.trim().replace(/ /g, '')],
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