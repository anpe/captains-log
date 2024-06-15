import { ReactNode } from "react";

export default function NavPaneBarButton({
  tabId,
  setActiveTab,
  children,
}: {
  tabId: string;
  setActiveTab: (tabId: string) => void;
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex flex-1 justify-center">
        <button
          className="hover:white cursor-default p-2 text-white hover:rounded hover:bg-zinc-700"
          onClick={ setActiveTab.bind(null, tabId)}
        >
          {children}
        </button>
      </div>
    </>
  );
}
