import SideBar from "./components/SideBar/SideBar";
import NavPane from "./components/NavPane/NavPane";
import { useState } from "react";
import TiptapEditor from "./components/TextEditor/TipTapEditor";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="app" className="flex h-full flex-row">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}></SideBar>
      <NavPane></NavPane>
      <TiptapEditor isOpen={isOpen}></TiptapEditor>
    </div>
  );
}
