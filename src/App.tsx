import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Form from './components/form/Form';
import { FormDataInterface } from './interfaces/Formdata';
import Todo from './components/todo/Todo';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';

function App() {

  //State för todo poster
  const [todos, setTodos] = useState<[FormDataInterface] | []>([]);

  //State för error i fetch anrop
  const [error, setError] = useState<string | null>(null);

  //State för loading av todos
  const [loading, setLoading] = useState<boolean>(false);

  //Select options array, skickas som prop till Todo, Form
  const [statusArr] = useState<string []>(["Ej påbörjad", "Pågående", "Avklarad"]);

  //useEffect för att hämta in poster
  useEffect(() => {
    getTodos();
  }, []);

  //Hämtar in poster med GET fetch anrop
  const getTodos = async () => {
    try {
      //Loading
      setLoading(true);

      const response = await fetch("https://dt210g-moment2-api-j7hq.onrender.com/todos", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      });

      if (!response.ok) {
        throw Error("Misslyckades hämtning av poster" + response.status);
      } else {
        const postData = await response.json();
        const storedPosts = postData.storedTodos;

        //Sortera efter status
        const sortedTodos = storedPosts.sort((a: { status: string }, b: { status: string }) => {
          return statusArr.indexOf(a.status) - statusArr.indexOf(b.status);
        });

        setTodos(sortedTodos);

      }

    }
    catch (error) {
      setError("Det gick inte att hämta in todos");
    }
    finally {
      setLoading(false);
    }
  }



  return (
    <>
      <Header />
      <main>

        <Form getTodosProp={getTodos} statusArrProp={statusArr} />

        {
          loading && <LoadingSpinner />
        }

        {
          error && <p>{error}</p>
        }

        {todos.map((todo) => (
          <Todo todoProp={todo} key={todo._id} getTodosProp={getTodos} statusArrProp={statusArr} />
        ))}
      </main>

      <Footer />


    </>
  )
}

export default App
