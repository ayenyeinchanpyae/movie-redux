import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveToDoApi } from "./toDoAPI";

const initialState = {
  items: [
    {
      id: 0,
      text: "One",
    },
    {
      id: 1,
      text: "Two",
    },
  ],
};

export const saveToDo = createAsyncThunk("todos/saveToDo", async (id) => {
  const response = await saveToDoApi(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.items.push(action.payload);
    },
    removeToDo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(saveToDo.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(saveToDo.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { addToDo, removeToDo } = todoSlice.actions;
export const selectToDO = (state) => state.todos.items;
export default todoSlice.reducer;
