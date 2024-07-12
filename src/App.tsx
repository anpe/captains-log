import SideBar from "./components/SideBar/SideBar";
import NavPane from "./components/NavPane/NavPane";
import { useState } from "react";
import TiptapEditor from "./components/TextEditor/TipTapEditor";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  // TODO
  // On init, check if today's entry has been created
  // If not, create it and set it as current entry
  // If it exists, set it as current entry
  return (
    <div id="app" className="flex h-full flex-row">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}></SideBar>
      <NavPane></NavPane>
      <TiptapEditor isOpen={isOpen}></TiptapEditor>
    </div>
  );
}
