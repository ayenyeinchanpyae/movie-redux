import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToDO, addToDo, removeToDo, saveToDo } from "./todoSlice";
import { nextId } from "../util/Util";

const uniqueId = nextId(2);

export default function ToDoList(props) {
  const todos = useSelector(selectToDO);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState();

  const addToDoHandler = () => {
    console.log("new item ", newItem);
    let payload = {
      id: uniqueId(),
      text: newItem,
    };
    dispatch(addToDo(payload));
    setNewItem("");
  };
  const removeToDoHandler = (toDoItem) => {
    dispatch(removeToDo(toDoItem));
  };
  const saveHandler = () => {
    dispatch(saveToDo(uniqueId()));
  };
  return (
    <>
      <div>
        {todos.map((item) => {
          return (
            <div key={item.id}>
              {item.text}
              <button
                type={"button"}
                className={"btn btn-danger"}
                onClick={() => removeToDoHandler(item)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type={"text"}
          className={"form-control"}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          type={"button"}
          className={"btn btn-primary"}
          onClick={addToDoHandler}
        >
          Add
        </button>
        <button
          type={"button"}
          className={"btn btn-primary"}
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </>
  );
}
