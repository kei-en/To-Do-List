import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "./reducers/todoReducer";
import todoSagas from "./sagas/todoSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: todoReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(todoSagas);

export default store;
