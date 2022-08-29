import ParkSummaryFormItem from "./ParkSummaryFormItem";


export default function ParkSummaryModal({ data = {}, show = false, onClose }) {

    return (
        <div className={show ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Summary: {data?.car_reg_no}</p>
                    <button onClick={onClose} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <fieldset disabled>
                        <ParkSummaryFormItem label={'Arrival'} value={data?.arrival_at} />
                        <ParkSummaryFormItem label={'Departure'} value={data?.depart_at} />
                        <ParkSummaryFormItem label={'Park Time Range'} value={data?.time_range} />
                        <hr />
                        <ParkSummaryFormItem label={'Bill'} value={data?.bill} />
                    </fieldset>
                </section>
                <footer className="modal-card-foot">
                    <button onClick={onClose} className="button">Tutup</button>
                </footer>
            </div>
        </div>
    )
}