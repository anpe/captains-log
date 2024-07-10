import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { EntryListItem } from "../types/entry.type";

type InitialState = {
  currentEntryId: string;
  entryList: EntryListItem[];
  saveInterval?: NodeJS.Timer;
};
const initialState: InitialState = {
  currentEntryId: "",
  entryList: [],
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setCurrentEntryId(state, action) {
      state.currentEntryId = action.payload;
    },
    setEntryList(state, action) {
      state.entryList = action.payload;
    },
    setSaveInterval(state, action) {
      clearInterval(state.saveInterval);
      state.saveInterval = action.payload;
    },
    clearSaveInterval(state) {
      clearInterval(state.saveInterval);
    },
  },
});

export const {
  setCurrentEntryId,
  setEntryList,
  setSaveInterval,
  clearSaveInterval,
} = journalSlice.actions;

export default journalSlice.reducer;

export const getCurrentEntryId = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.currentEntryId,
);

export const getEntryList = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.entryList,
);

export const getSaveInterval = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.saveInterval,
);
