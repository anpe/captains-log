import { configureStore } from '@reduxjs/toolkit'
import entriesReducer from './Entry/EntrySlice'
import journalReducer from './JournalSlice'

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    journal: journalReducer
  },
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {entries: EntriesState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']