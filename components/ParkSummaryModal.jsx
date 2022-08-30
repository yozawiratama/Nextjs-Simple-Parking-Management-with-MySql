import useSWR from 'swr'
import ParkSummaryFormItem from "./ParkSummaryFormItem";

const fetcher = url => fetch(url).then(r => r.json());

export default function ParkSummaryModal({ data = {}, onClose, onSaveChanges }) {

    const { data: summary, error } = useSWR(data ? `/api/parking/getsummary?id=${data.id}` : null, fetcher)

    if (error) return <div>failed to load</div>
    if (!summary) return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                Loading ...
            </div>
        </div>
    )

    const handleSave = () =>{
        const dataSave = {
            id: data.id,
            data: summary.result.encdata
        }

        onSaveChanges(dataSave);
    }
    

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Summary: {data?.car_reg_no}</p>
                    <button onClick={onClose} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <fieldset disabled>
                        <ParkSummaryFormItem label={'Arrival'} value={data?.arrival_at} />
                        <ParkSummaryFormItem label={'Departure'} value={summary.result.current} />
                        <ParkSummaryFormItem label={'Time (Minutes)'} value={summary.result.minutes} />
                        <hr />
                        <ParkSummaryFormItem label={'Bill'} value={summary.result.bill} />
                    </fieldset>
                </section>
                <footer className="modal-card-foot">
                    <button onClick={handleSave} className="button is-primary">Bayar</button>
                    <button onClick={onClose} className="button">Tutup</button>
                </footer>
            </div>
        </div>
    )
}