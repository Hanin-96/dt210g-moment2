import { FormDataInterface } from "../../interfaces/Formdata";
import './Todo.module.css';
function Todo({ todoProp, todoUpdateProp }: { todoProp: FormDataInterface, todoUpdateProp: Function }) {

    //Select options array
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    const todoStyle = {
        backgroundColor: "#ebebeb",
        padding: "1rem",
        marginBottom: "1.5rem",
    }

    const todoStatusStyle = todoProp.status === "Ej påbörjad" ? "red" : todoProp.status === "Påbörjad" ? "orange" : "green";

    //Uppdatera status på todo
    const updateStatus = async (event: any) => {
        let newStatus = event.target.value;

        const newStatusTodo = { status: newStatus };

        try {
            console.log(todoProp._id);
            const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/update/todo/" + todoProp._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newStatusTodo)
            });

            if(!response.ok) {
                throw Error();
            }

            const updatedData = await response.json();

            //Kallar på getTodos funktion via prop från föräldrar
            todoUpdateProp();


        } catch(error) {

        }
    }



    return (
        <>
            <article style={todoStyle}>
                <h3>{todoProp.title}</h3>
                <p>{todoProp.description}</p>
                <form>
                    <label htmlFor="status">Ändra status</label>
                    <select name="status" id="status" defaultValue={todoProp.status} onChange={updateStatus}>
                        {
                            statusArr.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))
                        }
                    </select>
                    <p style={{ color: todoStatusStyle }}>{todoProp.status}</p>
                </form>
            </article>
        </>
    )

}


export default Todo