import Modal from "../Modal/Modal";

export default function SettingsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
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
