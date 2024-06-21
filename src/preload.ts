// See the Electron documentation for details on how to use preload scripts:
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    databaseAPI: any;
  }
}
import { ipcRenderer } from "electron";
// eslint-disable-next-line import/no-unresolved
import { contextBridge } from "electron/renderer";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const databaseAPI = {
  getEntryList: () => {
    return ipcRenderer.invoke("databaseAPI:getEntryList");
  },
  getEntry: (id: string) => {
    return ipcRenderer.invoke("databaseAPI:getEntry", id);
  },
};
contextBridge.exposeInMainWorld("databaseAPI", databaseAPI);

