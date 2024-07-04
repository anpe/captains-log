import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  currentEntryId: "",
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setCurrentEntry(state, action) {
      state.currentEntryId = action.payload;
    },
  },
});

export const { setCurrentEntry } = journalSlice.actions;

export default journalSlice.reducer;

export const getCurrentEntryId = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.currentEntryId,
);
