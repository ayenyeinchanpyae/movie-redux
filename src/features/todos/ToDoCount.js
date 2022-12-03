import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToDO } from "./todoSlice";

export default function ToDoCount(props) {
  const todos = useSelector(selectToDO);
  const dispatch = useDispatch();
  return <div>To Do Count {todos.length}</div>;
}
