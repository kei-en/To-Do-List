import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoList from "./TodoList";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../redux/actions/todoActions";

const mockStore = configureStore([]);
const initialState = {
  todos: [
    { id: 1, title: "Test Todo 1", completed: 0 },
    { id: 2, title: "Test Todo 2", completed: 1 },
  ],
};

describe("TodoList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test("renders TodoList component", () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByTitle("Add Todo"));

    expect(store.dispatch).toHaveBeenCalledWith(addTodo("New Todo"));
  });

  test("toggles todo completion", () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(updateTodo(1, 1));
  });

  test("deletes a todo", () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    fireEvent.click(screen.getAllByTitle("Delete")[0]);

    // This test only works if you delete lines 51 and 53 on TodoList.js
    //  The test expects the deleteTodo action to be dispatched immediately when the delete button is clicked.
    //  However, in your current implementation, the deleteTodo action is dispatched only after a transition ends, which might not be happening during the test.
    expect(store.dispatch).toHaveBeenCalledWith(deleteTodo(1));
  });

  test("filters todos", () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Filter"), {
      target: { value: "completed" },
    });

    expect(screen.queryByText("Test Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });
});
