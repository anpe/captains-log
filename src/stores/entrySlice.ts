import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Entry } from "../models/entry.model";
import { NavTestData } from "../components/NavPane/NavPaneContentTestData";
import { RootState } from "./store";

const initialState: Entry[] = NavTestData;

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    entryAdded(state, action) {
      state.push(action.payload);
    },
    updateEntry(state, action) {
      const existingEntry = state.find((entry) => {
        return entry.id === action.payload.id;
      });
      if (existingEntry) {
        existingEntry.title = action.payload.title;
        existingEntry.content = action.payload.content;
      }
    },
  },
});

export const { entryAdded, updateEntry } = entriesSlice.actions;

export default entriesSlice.reducer;

export const getEntry = createSelector(
  (state: RootState) => state.entries,
  (state: RootState, entryId: string) => entryId,
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);
