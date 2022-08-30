

export default function ParkSummaryFormItem({ label, value }) {

    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{label}</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input readOnly className="input is-danger" type="text" value={value} />
                    </div>
                </div>
            </div>
        </div>
    )
}