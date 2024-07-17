import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { EntryListItem } from "../types/entry.type";

type InitialState = {
  activeEntryId: string;
  entryList: EntryListItem[];
  saveInterval?: NodeJS.Timer;
};
const initialState: InitialState = {
  activeEntryId: "",
  entryList: [],
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setActiveEntryId(state, action) {
      state.activeEntryId = action.payload;
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
  setActiveEntryId,
  setEntryList,
  setSaveInterval,
  clearSaveInterval,
} = journalSlice.actions;

export default journalSlice.reducer;

export const getActiveEntryId = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.activeEntryId,
);

export const getEntryList = createSelector(
  (state: RootState) => state.journal,
  (journal) => journal.entryList,
);

