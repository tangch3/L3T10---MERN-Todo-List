import { useEffect, useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export const Home = () => {

  const [todo, setTodo] = useState([]);
  // following the mongodb Todo Data Structure
  const [addTodo, setAddTodo] = useState({
    task: ""
  })
  const [cookies, _] = useCookies([ "access_token" ]);

  // DISPLAYING ALL TODOS ON THE PAGE WHEN LOADED

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/todo",
          // NEED TO PASS ACCESS TOKEN INTO THE HEADERS OF THE REQUEST TO VERIFY.
          {
            headers: {authorization: cookies.access_token}
          }
        );
        setTodo(response.data)
      } catch (err) {
        console.error(err)
      }
    };
    fetchTodos()
  }, [] /* This means only render once on load */)

  // Logic to ADD a TODO

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAddTodo({...addTodo, [name]: value})
    // console.log(addTodo)
  }

  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      if(addTodo.task.length > 140) {
        alert("Todo is longer than 140 characters. Please make it shorter")
      } else {
        await axios.post(
          "http://localhost:8080/todo/add",
          addTodo,
          {
            headers: {authorization: cookies.access_token}
          });
        window.location.reload()
      }
    } catch (err) {
      alert("Please login or register to add")
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete("http://localhost:8080/todo/"+id)
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const updateTodo = async (id) => {
    const updatedTask = prompt("Enter updated task");
    await axios.put("http://localhost:8080/todo/"+id, { task: updatedTask});
    window.location.reload()
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input type="text" id="task" name="task" placeholder="Add Task" onChange={handleChange}></input> {' '}
        <button type="submit" onClick={submitTodo}>Add</button>
      </div>
      <ul>
        {todo.map((t) => (
          <li key={t._id}>
            <p>{t.task} {' '}
            <button type="submit" onClick={() => updateTodo(t._id)}>Edit</button> {' '}
            <button type="submit" onClick={() => deleteTodo(t._id)}>Delete</button> {' '}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
