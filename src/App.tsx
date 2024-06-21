import SideBar from "./components/SideBar/SideBar";
import NavPane from "./components/NavPane/NavPane";
import { useState } from "react";
import TiptapEditor from "./components/TextEditor/TipTapEditor";
import { Provider } from "react-redux";
import { store } from "./stores/store";
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
