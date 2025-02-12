import { FormDataInterface } from "../../interfaces/Formdata";
import { useState } from "react";
import './Form.module.css';

function Form() {

    //Styling
    const submitStyle = {
        backgroundColor: "#1e1e1e",
        border: "none",
        color: "white",
        padding: "1rem",
        cursor: "pointer",
        fontSize: "1.8rem"
    }

    //Select options array
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    //State för formulär
    const [formData, setFormData] = useState<FormDataInterface>({ _id: "", title: "", description: "", status: statusArr[0] })

    //Funktion för att skicka formulär
    const submitForm = (async (event: any) => {
        event.preventDefault();
    })

    return (
        <>
            <form onSubmit={submitForm}>
                <div className='form-title'>
                    <label htmlFor="title">Titel:</label>
                    <input type="text" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                </div>

                <div className='form-description'>
                    <label htmlFor="description">Beskrivning:</label>
                    <textarea name="description" id="description" style={{resize: "vertical"}} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })}></textarea>
                </div>

                <div className='form-status'>
                    <label htmlFor="status">Status:</label>
                    <select name="status" id="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                        {
                            //Loopar igenom alla options
                            statusArr.map((status, index) => (
                                <option key={index}>{status}</option>
                            ))
                        }
                    </select>
                </div>
                <input type="submit" value="Lägg till" style={submitStyle} />
            </form>
        </>
    )
}

export default Form