import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../redux/actions/todoActions";
import { PiPlusSquareFill } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

class TodoList extends Component {
  state = {
    newTodo: "",
    filter: "all",
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    if (this.state.newTodo.trim() === "") return; // Prevent empty todo
    this.props.addTodo(this.state.newTodo);
    this.setState({ newTodo: "" });
  };

  handleToggleComplete = (e, todo) => {
    const item = e.target;

    this.props.updateTodo(todo.id, todo.completed === 1 ? 0 : 1);

    if (item.classList[0] === "check") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
  };

  handleDeleteTodo = (e, id) => {
    const item = e.target;

    if (item.classList[0] === "trash-button") {
      const todo = item.parentElement;
      todo.classList.add("deleted");

      // todo.addEventListener("transitionend", () => {
      this.props.deleteTodo(id);
      // });
    }
  };

  // Function to handle filter change
  filterTodo = (e) => {
    this.setState({ filter: e.target.value });
  };

  // Apply the filter logic
  getFilteredTodos = () => {
    const { filter } = this.state;
    const { todos } = this.props;

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "uncompleted") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  render() {
    const filteredTodos = this.getFilteredTodos();

    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <label htmlFor="todo-input" hidden>
            Add Todo
          </label>
          <input
            id="todo-input"
            className="todo-input"
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            placeholder="Add a new task"
          />
          <button className="todo-submit" type="submit" title="Add Todo">
            <PiPlusSquareFill className="icon" />
          </button>
          <div className="select">
            <label htmlFor="filter" hidden>
              Filter
            </label>
            <select
              id="filter"
              name="todos"
              className="filter-todo"
              onChange={this.filterTodo}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>
        <div className="list-container">
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="todo">
                <label htmlFor="checkbox" hidden>
                  Done/Undone
                </label>
                <input
                  className="check"
                  type="checkbox"
                  checked={todo.completed === 1} // 1 means true, 0 means false in SQLite
                  onChange={(e) => this.handleToggleComplete(e, todo)}
                />
                <li>{todo.title}</li>
                <button
                  title="Delete"
                  className="trash-button"
                  onClick={(e) => this.handleDeleteTodo(e, todo.id)}>
                  <FaTrash className="icon" />
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
