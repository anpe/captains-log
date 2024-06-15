import SideBar from "./SideBar/SideBar";
import NavPane from "./NavPane/NavPane";
import { useState } from "react";
import TiptapEditor from "./TextEditor/TipTapEditor";
import { Provider } from "react-redux";
import { store } from "./store";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Provider store={store}>
      <div id="app" className="flex h-full">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}></SideBar>
        <NavPane></NavPane>
        <TiptapEditor isOpen={isOpen}></TiptapEditor>
      </div>
    </Provider>
  );
}
