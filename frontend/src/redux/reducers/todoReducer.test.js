import todoReducer from "./todoReducer";
import { SET_TODOS } from "../actions/types";

describe("todoReducer", () => {
  const initialState = {
    todos: [],
  };

  it("should return the initial state", () => {
    expect(todoReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_TODOS", () => {
    const todos = [
      { id: 1, title: "Test Todo 1", completed: 0 },
      { id: 2, title: "Test Todo 2", completed: 1 },
    ];
    const action = {
      type: SET_TODOS,
      todos,
    };
    const expectedState = {
      todos,
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });
});
