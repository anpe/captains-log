import SideBar from "./components/SideBar/SideBar";
import NavPane from "./components/NavPane/NavPane";
import { useEffect, useState } from "react";
import TiptapEditor from "./components/TextEditor/TipTapEditor";
import { Entry as EntryType } from "./types/entry.type";
import { setActiveEntryId } from "./stores/journalSlice";
import { useDispatch } from "react-redux";
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const getTodaysDate = () => {
    const today = new Date();
    // We're using UTC since that's how it's stored in the database
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, "0");
    const day = String(today.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const setTodaysEntry = () => {
    window.databaseAPI
      .getEntryByDate(getTodaysDate())
      .then((result: EntryType) => {
        if (result) {
          dispatch(setActiveEntryId(result.id));
        }
      });
  };

  useEffect(() => {
    setTodaysEntry();
  }, []);

  return (
    <div id="app" className="flex h-full flex-row">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}></SideBar>
      <NavPane></NavPane>
      <TiptapEditor isSidebarOpen={isSidebarOpen}></TiptapEditor>
    </div>
  );
}
