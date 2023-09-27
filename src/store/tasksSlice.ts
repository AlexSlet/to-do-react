import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToDoItem } from "../interfaces";

// Define a type for the slice state
interface taskState {
  tasks: ToDoItem[];
}

// Define the initial state using that type
const initialState: taskState = {
  tasks: [],
};

export const counterSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ToDoItem>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<ToDoItem>) => {
      const index = state.tasks.findIndex(
        (item) => item.id === action.payload.id
      );
      state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask } = counterSlice.actions;

export default counterSlice.reducer;
