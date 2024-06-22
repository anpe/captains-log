import { Dispatch, SetStateAction, useState } from "react";
import NavPaneButton from "../NavPane/NavPaneButton";
import SettingsButton from "../Settings/SettingsButton";
import SettingsModal from "../Settings/SettingsModal";

export default function SideBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="z-10 h-full w-11 bg-zinc-800 pb-2 pt-2">
        <NavPaneButton isOpen={isOpen} setIsOpen={setIsOpen}></NavPaneButton>
        <SettingsButton
          isSettingsOpen={isSettingsOpen}
          setSettingsOpen={setSettingsOpen}
        ></SettingsButton>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        setIsOpen={setSettingsOpen}
      ></SettingsModal>
    </>
  );
}
