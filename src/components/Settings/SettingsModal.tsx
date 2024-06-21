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
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={<div>Tjhoasdfa</div>}
      ></Modal>
    </>
  );
}
