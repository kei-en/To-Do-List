import { SET_TODOS } from "../actions/types";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    default:
      return state;
  }
};

export default todoReducer;
