import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todoActions";
import { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./types";

describe("Todo Actions", () => {
  it("should create an action to fetch todos", () => {
    const expectedAction = { type: FETCH_TODOS };
    expect(fetchTodos()).toEqual(expectedAction);
  });

  it("should create an action to add a todo", () => {
    const title = "New Todo";
    const expectedAction = { type: ADD_TODO, title };
    expect(addTodo(title)).toEqual(expectedAction);
  });

  it("should create an action to update a todo", () => {
    const id = 1;
    const completed = true;
    const expectedAction = { type: UPDATE_TODO, id, completed };
    expect(updateTodo(id, completed)).toEqual(expectedAction);
  });

  it("should create an action to delete a todo", () => {
    const id = 1;
    const expectedAction = { type: DELETE_TODO, id };
    expect(deleteTodo(id)).toEqual(expectedAction);
  });
});
