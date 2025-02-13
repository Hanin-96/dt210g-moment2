import { FormDataInterface } from "../../interfaces/Formdata";
import './Todo.module.css';
import { ErrorInterface } from "../../interfaces/errorInterface";


function Todo({ todoProp, todoUpdateProp }: { todoProp: FormDataInterface, todoUpdateProp: Function }) {

    //Select options array
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    const todoStyle = {
        backgroundColor: "#ebebeb",
        padding: "1rem",
        margin: "0 auto",
        marginBottom: "2rem",
        maxWidth: "40rem",
    }

    const deleteBtnStyle = {
        backgroundColor: "#D9676E",
        border: "none",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginTop: "1rem",
        boxShadow: "1px 1px 5px -3px rgba(30, 30, 30, 1)",
        cursor: "pointer"
    }

    const todoStatusStyle = todoProp.status === "Ej påbörjad" ? "red" : todoProp.status === "Pågående" ? "orange" : "green";

    // Handle delete action
    const handleDelete = async () => {
        try {
            const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/delete/todo/" + todoProp._id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw Error();
            }

            //Kallar på getTodos funktion via prop från föräldrar
            //Hämtar alla todos poster
            todoUpdateProp();

        } catch (error) {
            console.error("Misslyckades radera todo:", error);
        }
    }

    // Uppdatera status på todo
    const updateStatus = async (event: any) => {
        let newStatus = event.target.value;

        const newStatusTodo = { status: newStatus };

        try {
            //console.log(todoProp._id);
            const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/update/todo/" + todoProp._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newStatusTodo)
            });

            if (!response.ok) {
                throw Error();
            }

            const updatedData = await response.json();

            //Kallar på getTodos funktion via prop från föräldrar
            //Hämtar alla todos poster
            todoUpdateProp();

            <input type="button" value="Radera" style={deleteBtnStyle} onClick={handleDelete} />
        } catch (error) {
            console.error("Misslyckades uppdatera status:", error);
        }
    }

    //Radera todo
    const deleteTodo = async (_id: string) => {
        try {
            console.log(todoProp._id);
            const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/delete/todo/" + _id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw Error();
            }
    
            //Kallar på getTodos funktion via prop från föräldrar
            //Hämtar alla todos poster
            todoUpdateProp();
    
        } catch (error) {
            console.error("Misslyckades radera todo:", error);
        }
    }



    return (
        <>
            <article style={{ ...todoStyle, border: "2px solid", borderColor: todoStatusStyle }}>
                <h3>{todoProp.title}</h3>
                <p>{todoProp.description}</p>
                <div>
                    <label htmlFor="status">Ändra status</label>
                    <select name="status" id="status" defaultValue={todoProp.status} onChange={updateStatus}>
                        {
                            statusArr.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))
                        }
                    </select>
                    <p style={{ color: todoStatusStyle }}>{todoProp.status}</p>
                    <input type="button" value="Radera" style={deleteBtnStyle} onClick={() => deleteTodo(todoProp._id)} />
                </div>
            </article>
        </>
    )

}


export default Todo