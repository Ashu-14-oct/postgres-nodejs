import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import axios from "axios";

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache()
});


const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      todo
      completed
    }
  }
`;
// get todos
export const getTodo = async () => {
    try {
        const { data } = await client.query({ query: GET_TODOS });
        return data.getTodos;
    } catch (error) {
        console.log('error in getTodo',error);
    }
}


const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: Int!) {
    updateTodoStatus(id: $id)
  }
`;
// update checkbox
export const updateTodo = async (id: number) => {
    try {
        const { data } = await client.mutate({
            mutation: UPDATE_TODO_STATUS,
            variables: { id },
          });
          return data.updateTodoStatus;
    } catch (error) {
        console.log('error in updateTodo api', error);
        
    }
}

const ADD_TODO = gql`
  mutation AddTodoMutation($todo: String!) {
    addTodo(todo: $todo) {
      id
      todo
      completed
    }
  }
`;
// add todo
export const addTodo = async (todo: String) => {
    try {
        const { data } = await client.mutate({
            mutation: ADD_TODO,
            variables: { todo },
          });
          return data.addTodo;
    } catch (error) {
        console.log('error in addTodo', error);
        
    }
}