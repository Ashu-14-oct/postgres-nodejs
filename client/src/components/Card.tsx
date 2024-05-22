import { useEffect, useState } from "react";
import { addTodo, getTodo, updateTodo } from "../lib/api";
import { Todo } from "../types";


const Card = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [todoData, setTodoData] = useState('');

  const handleCheckboxChange = async (index: number) => {
    try {
        const update = await updateTodo(index);
        console.log(update);
        window.location.reload();
    } catch (error) {
      console.log('error in handleCheckboxChange', error);
      
    }
  }

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await addTodo(todoData);
      console.log(data);
      
      const newTodo = {
        id: data.id,
        todo: data.todo,
        completed: data.completed,
      };
      console.log(newTodo);
      
      setTodo(prevTodo => [...prevTodo, newTodo]);
      setTodoData("");
    } catch (error) {
        console.log('error in handleAddTodo', error);
        
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoData(e.target.value);
  }

  useEffect(() => {
    async function getTodoData() {
      const data = await getTodo();
      
      const allRows = data;
      setTodo(allRows);
      console.log(allRows);
    }

    getTodoData();
  }, [todo]);
  return (
    <div className="card">
      <form className="form" onSubmit={(e) => handleAddTodo(e)}>
        <div className="form-row">{
          todo.map((ele) => (
            <ul key={ele.id}>
              <li>
                  <label htmlFor="check">{ele.todo}</label>
                  <input id="check" type="checkbox" checked={ele.completed} onChange={() => handleCheckboxChange(ele.id)}/>
                  <button type="submit" className="button-2">Edit</button>
              </li>
            </ul>
          ))
        }
        </div>
        <div className="form-row">
          <input type="text" className="inputfield" placeholder="New item" value={todoData} onChange={handleInputChange}/>
          <button type="submit" className="button-1" >Add</button>
        </div>
      </form>
    </div>
  );
};

export default Card;
