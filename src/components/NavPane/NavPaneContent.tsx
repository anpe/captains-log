import { ReactNode } from "react";

export default function NavPaneContent({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed top-10 z-10 ml-11 h-full w-80 overflow-auto bg-zinc-800 p-5 text-white">
        {children}
      </div>
    </>
  );
}
