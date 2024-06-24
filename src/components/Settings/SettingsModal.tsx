import { Dispatch, SetStateAction } from "react";
import Modal from "../Modal/Modal";

export default function SettingsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>This is sample content for the settings modal</div>
    </Modal>
  );
}
