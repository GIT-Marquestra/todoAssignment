import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter :counterSlice.reducer,
    todos: todoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch