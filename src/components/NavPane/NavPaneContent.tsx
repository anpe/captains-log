import { ReactNode } from "react";

export default function NavPaneContent({ children }: { children: ReactNode }) {
  return (
    <div className="top-10 z-10 w-80 grow overflow-auto bg-zinc-800 p-5 text-white">
      {children}
    </div>
  );
}
