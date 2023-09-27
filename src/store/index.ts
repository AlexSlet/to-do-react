import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch