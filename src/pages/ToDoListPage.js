import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToDoList from "../features/todos/ToDoList";
import { fetchAllToDo, selectToDoLoading } from "../features/todos/todoSlice";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ToDoListPage() {
  const loading = useSelector(selectToDoLoading);
  let [color, setColor] = useState("#ffffff");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllToDo());
  }, []);
  return (
    <div>
      To Do List Page
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ToDoList />
    </div>
  );
}
