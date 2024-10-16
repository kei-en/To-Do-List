import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_TODOS,
} from "../actions/types";

const API_URL = "http://localhost:5000/api/todos";

// Worker Saga: Fetch todos
function* fetchTodos() {
  const response = yield call(axios.get, API_URL);
  yield put({ type: SET_TODOS, todos: response.data });
}

// Worker Saga: Add a todo
function* addTodoSaga(action) {
  yield call(axios.post, API_URL, { title: action.title });
  yield fetchTodos();
}

// Worker Saga: Update a todo
function* updateTodoSaga(action) {
  yield call(axios.put, `${API_URL}/${action.id}`, {
    completed: action.completed,
  });
  yield fetchTodos();
}

// Worker Saga: Delete a todo
function* deleteTodoSaga(action) {
  yield call(axios.delete, `${API_URL}/${action.id}`);
  yield fetchTodos();
}

// Watcher Saga
function* todoSagas() {
  yield takeEvery(FETCH_TODOS, fetchTodos);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(UPDATE_TODO, updateTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
}

export default todoSagas;
