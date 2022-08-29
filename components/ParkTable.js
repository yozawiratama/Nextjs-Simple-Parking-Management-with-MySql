
export default function ParkTable({ parkings = [], onItemSummaryClick, hiddenColumns = [] }) {

    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Registration No</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Status</th>
                    {hiddenColumns.indexOf('TIME') == -1 ? <th>Time</th> : null}
                    {hiddenColumns.indexOf('BILL') == -1 ? <th>Bill</th> : null}
                    {hiddenColumns.indexOf('ACTION') == -1 ? <th>Action</th> : null}
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Registration No</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Status</th>
                    {hiddenColumns.indexOf('TIME') == -1 ? <th>Time</th> : null}
                    {hiddenColumns.indexOf('BILL') == -1 ? <th>Bill</th> : null}
                    {hiddenColumns.indexOf('ACTION') == -1 ? <th>Action</th> : null}
                </tr>
            </tfoot>
            <tbody>
                {parkings.length == 0 ? <tr><td className="has-text-centered" colSpan={6}>No Data</td></tr> : <>
                    {parkings.map(it => (
                        <tr key={it.id}>
                            <td>
                                <span className="tag is-dark">{it.car_reg_no}</span>
                            </td>
                            <td>{it.arrival_at}</td>
                            <td>{it.depart_at}</td>
                            <td>{it.status == 'PARKED' ? <span className="tag is-warning">{it.status}</span> : <span className="tag is-primary">{it.status}</span>}</td>
                            {hiddenColumns.indexOf('TIME') == -1 ? <td>{it.time_range}</td> : null}
                            {hiddenColumns.indexOf('BILL') == -1 ? <td>{it.bill}</td> : null}
                            {hiddenColumns.indexOf('ACTION') == -1 ? <td>
                                <button className="button is-primary" onClick={() => onItemSummaryClick(it)} >Summary</button>
                            </td> : null}
                        </tr>
                    ))}
                </>}

            </tbody>
        </table>
    )
}