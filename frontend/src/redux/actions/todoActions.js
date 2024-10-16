import { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./types";

export const fetchTodos = () => ({ type: FETCH_TODOS });
export const addTodo = (title) => ({ type: ADD_TODO, title });
export const updateTodo = (id, completed) => ({
  type: UPDATE_TODO,
  id,
  completed,
});
export const deleteTodo = (id) => ({ type: DELETE_TODO, id });
