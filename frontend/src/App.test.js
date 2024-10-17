import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the TodoList component
jest.mock("./components/TodoList", () => () => <div>Mocked TodoList</div>);

describe("App Component", () => {
  test("renders App component", () => {
    render(<App />);

    // Check if the header is rendered
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if the TodoList component is rendered
    expect(screen.getByText("Mocked TodoList")).toBeInTheDocument();
  });
});
