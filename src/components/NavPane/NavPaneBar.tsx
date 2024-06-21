import { ReactNode } from "react";

export default function NavPaneBar({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed z-10 ml-11 flex h-10 w-80 bg-zinc-800">
        {children}
      </div>
    </>
  );
}
