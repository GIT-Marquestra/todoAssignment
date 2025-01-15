import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  task: string;
  completed: boolean; // Added completed field
}

interface TodoState {
  tasks: Todo[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Todo = {
        id: state.tasks.length + 1,
        task: action.payload,
        completed: false, // Initialize as not completed
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    }
  },
});

export const { addTask, removeTask, toggleTaskStatus } = todoSlice.actions;
export default todoSlice.reducer;