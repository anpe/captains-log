import "./Modal.css";
export default function Modal({
  isOpen,
  setIsOpen,
  content,
}: {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsOpen: Function;
  content: JSX.Element;
}) {
  function onModalOverlayClick(): void {
    if (isOpen) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={`modal-overlay absolute top-0 h-screen w-screen bg-zinc-800 opacity-30 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onModalOverlayClick}
      ></div>
      <div
        className={`modal fixed bottom-0 left-0 right-0 top-0 m-auto h-3/4 w-3/4 rounded-lg border border-zinc-500 bg-zinc-800 p-5 text-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {content}
      </div>
    </>
  );
}
