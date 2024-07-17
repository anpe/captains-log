import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Entry as EntryType } from "../types/entry.type";
import { NavTestData } from "../components/NavPane/NavPaneContentTestData";
import { RootState } from "./store";

const initialState: EntryType[] = NavTestData;

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
});

// export const {} = entriesSlice.actions;

export default entriesSlice.reducer;

export const getEntry = createSelector(
  (state: RootState) => state.entries,
  (state: RootState, entryId: string) => entryId,
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);
