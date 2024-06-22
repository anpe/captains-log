import { Dispatch, SetStateAction } from "react";

export default function SettingsButton({
  isSettingsOpen,
  setSettingsOpen,
}: {
  isSettingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <button className="absolute bottom-3 left-0 right-0 mx-auto block w-6 cursor-default py-0 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 rounded hover:bg-zinc-700 hover:stroke-white"
          onClick={() => {
            setSettingsOpen(!isSettingsOpen);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
    </>
  );
}
