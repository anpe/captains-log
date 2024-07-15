// See the Electron documentation for details on how to use preload scripts:
import { Content } from "./types/content.type";

declare global {
  interface Window {
    databaseAPI: {
      getEntryList: () => Promise<any>;
      getEntry: (id: string) => Promise<any>;
      updateEntry: (entry: EntryUpdate) => void;
      getEntryByDate: (date: string) => Promise<any>;
      addEntry: (title: string, content: Content) => Promise<any>;
    };
  }
}
import { ipcRenderer } from "electron";
// eslint-disable-next-line import/no-unresolved
import { contextBridge } from "electron/renderer";
import { EntryUpdate } from "./types/entry.type";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const databaseAPI = {
  getEntryList: () => {
    return ipcRenderer.invoke("databaseAPI:getEntryList");
  },
  getEntry: (id: string) => {
    return ipcRenderer.invoke("databaseAPI:getEntry", id);
  },
  updateEntry: (entry: EntryUpdate) => {
    return ipcRenderer.send("databaseAPI:updateEntry", entry);
  },
  getEntryByDate: (date: string) => {
    return ipcRenderer.invoke("databaseAPI:getEntryByDate", date);
  },
  addEntry: (title: string, content: Content) => {
    return ipcRenderer.invoke("databaseAPI:addEntry", title, content);
  },
};
contextBridge.exposeInMainWorld("databaseAPI", databaseAPI);
