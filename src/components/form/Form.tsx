import { FormDataInterface } from "../../interfaces/Formdata";
import { useState } from "react";
import { ErrorInterface } from "../../interfaces/ErrorInterface";
import formStyleModule from './Form.module.css';

function Form({ getTodosProp, statusArrProp }: { getTodosProp: Function, statusArrProp: string [] }) {

    //Styling
    const submitStyle = {
        backgroundColor: "#1e1e1e",
        border: "none",
        color: "white",
        padding: "1rem",
        cursor: "pointer",
        fontSize: "1.8rem"
    }

    const formStyle = {
        marginBottom: "5rem",
        backgroundColor: "white",
        boxShadow: "1px 1px 10px -3px rgba(30, 30, 30, 0.5)",
        padding: "1rem",
        borderRadius: "1rem"
    }

    //State för formulär
    const [formData, setFormData] = useState<FormDataInterface>({ _id: "", title: "", description: "", status: statusArrProp[0] })

    //State för error validering
    const [formErrors, setFormErrors] = useState<ErrorInterface>({});

    //State för error i fetch anrop
    const [fetchError, setFetchError] = useState<string | null>(null);

    //Validering
    const validateForm = ((data: FormDataInterface) => {
        const errors: ErrorInterface = {};

        if (!data.title) {
            errors.title = "Fyll i titel";
        } else if (data.title.length < 3) {
            errors.title = "Titel måste vara minst 3 tecken";
        }
        if (data.description && data.description.length > 200) {
            errors.description = "Beskrivning får max vara 200 tecken"
        }
        return errors;
    })

    //Funktion för kontroll innan formulär skickas
    const submitForm = (async (event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        //Finns error properties från validationForm?
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
        } else {
            //Nollställer errors
            setFormErrors({});

            //Skicka data vidare för postning
            postTodoForm(formData);
        }
    })

    //Post anrop
    const postTodoForm = (async (formData: FormDataInterface) => {
        console.log(formData);
        try {
            const newTodoPost: { title: string; status: string; description?: string } = {
                title: formData.title,
                status: formData.status
            };

            //Inkludera beskrivning om den ej är tom
            if (formData.description?.trim()) {
                newTodoPost.description = formData.description;
            }

            const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/todo", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newTodoPost)
            });

            if (!response.ok) {
                throw Error("Misslyckades lägga till todo poster" + response.status);

            } else {

                //Kallar på getTodos funktion via prop från föräldrar
                //Hämtar alla todos poster
                getTodosProp();

                //Rensa formuläret
                setFormData({ _id: "", title: "", description: "", status: statusArrProp[0] })

                //Rensa felmeddelande
                setFetchError(null);
            }

        }
        catch (error) {
            console.error("Misslyckades lägga till todo:", error);
            setFetchError("Det gick inte att lägga till todo");
        }
    })



    return (
        <>
            <form onSubmit={submitForm} style={formStyle} className={formStyleModule.form}>
                <div className='form-title'>
                    <label htmlFor="title">Titel:</label>
                    <input type="text" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                    {
                        formErrors.title && <p style={{ color: "red", marginTop: "-1rem" }}>{formErrors.title}</p>
                    }
                </div>

                <div className='form-description'>
                    <label htmlFor="description">Beskrivning:</label>
                    <textarea name="description" id="description" style={{ resize: "vertical" }} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })}></textarea>
                </div>

                <div className='form-status'>
                    <label htmlFor="status">Status:</label>
                    <select name="status" id="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                        {
                            //Loopar igenom alla options
                            statusArrProp.map((status, index) => (
                                <option key={index}>{status}</option>
                            ))
                        }
                    </select>
                </div>
                <input type="submit" value="Lägg till" style={submitStyle} />
                {
                    fetchError && <p>{fetchError}</p>
                }
            </form>
        </>
    )
}

export default Form