import { useState } from "react"


export default function AddParkForm({ onSubmit }) {
    const [regNoVal, setRegNoVal] = useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(regNoVal);
            setRegNoVal('');
        }} className="field has-addons">
            <div className="control is-expanded">
                <input className="input" type="text" value={regNoVal} onChange={e => {
                    setRegNoVal(e.target.value);
                }} placeholder="Registration Number" />
            </div>
            <div className="control">
                <button className="button is-info">
                    Park Car
                </button>
            </div>
        </form>
    )
}