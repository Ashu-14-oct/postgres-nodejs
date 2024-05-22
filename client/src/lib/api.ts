import axios from "axios";

// get todos
export const getTodo = async () => {
    try {
        const data = await axios.get('http://localhost:3000/todo');
        return data;
    } catch (error) {
        console.log('error in getTodo',error);
    }
}

// update checkbox
export const updateTodo = async (id: number) => {
    try {
        const data = await axios.post('http://localhost:3000/todo', {id});
        return data;
    } catch (error) {
        console.log('error in updateTodo api', error);
        
    }
}

// add todo
export const addTodo = async (todo: String) => {
    try {
        const data = await axios.post('http://localhost:3000/add-todo', {todo});
        return data;
    } catch (error) {
        console.log('error in addTodo', error);
        
    }
}