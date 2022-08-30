import { useState } from "react"


export default function AddParkForm({ onSubmit, disabled, submitButtonText }) {
    const [regNoVal, setRegNoVal] = useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(regNoVal);
            setRegNoVal('');
        }} className="field has-addons">
            <div className="control is-expanded">
                <input className="input" type="text" disabled={disabled} value={regNoVal} onChange={e => {
                    setRegNoVal(e.target.value.toUpperCase());
                }} placeholder="Registration Number" />
            </div>
            <div className="control">
                <button className="button is-info" disabled={disabled}>
                    {submitButtonText}
                </button>
            </div>
        </form>
    )
}