import { FormDataInterface } from "../../interfaces/Formdata";
import './Todo.module.css';


function Todo({ todoProp, todoUpdateProp, statusArrProp }: { todoProp: FormDataInterface, todoUpdateProp: Function, statusArrProp: Array<string> }) {

    const todoStyle = {
        backgroundColor: "white",
        padding: "1rem",
        margin: "0 auto",
        marginBottom: "2rem",
        maxWidth: "40rem",
        borderRadius: "1rem",
        boxShadow: "1px 1px 10px -3px rgba(30, 30, 30, 0.5)"
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

    const todoStatusStyle = todoProp.status === statusArrProp[0] ? "red" : todoProp.status === statusArrProp[1] ? "#ff7700" : "green";

    const bgStatusStyle = todoProp.status === statusArrProp[0] ? "rgb(255, 0, 0, 0.1)" : todoProp.status === statusArrProp[1] ? "rgb(255, 119, 0, 0.1)" : "rgb(0, 128, 0, 0.1)";

    const statusPStyle = {
        color: todoStatusStyle, 
        marginBottom: "1rem", 
        border: "solid 2px",
        padding: "0.5rem"
    }


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
            <article style={{ ...todoStyle, border: "4px solid", borderColor: todoStatusStyle, backgroundColor: bgStatusStyle }}>
                <h3>{todoProp.title}</h3>
                <p style={{marginTop:"2rem"}}>{todoProp.description}</p>
                <div style={{marginTop:"2rem"}}>
                    <p style={statusPStyle}>{todoProp.status}</p>
                    <label htmlFor="status">Ändra status:</label>
                    <select name="status" id="status" defaultValue={todoProp.status} onChange={updateStatus} style={{marginTop:"0.5rem"}}>
                        {
                            statusArrProp.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))
                        }
                    </select>
                    <input type="button" value="Radera" style={deleteBtnStyle} onClick={() => deleteTodo(todoProp._id)} />
                </div>
            </article>
        </>
    )

}


export default Todo