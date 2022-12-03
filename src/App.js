import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ToDoList from "./features/todos/ToDoList";
import ToDoCount from "./features/todos/ToDoCount";

function App() {
  return (
    <div>
      <ToDoCount />
      <ToDoList />
    </div>
  );
}

export default App;
