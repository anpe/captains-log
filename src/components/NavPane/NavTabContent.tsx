import { ReactNode } from "react";

export default function NavTabContent({
  tabId,
  activeTab,
  children,
}: {
  tabId: string;
  activeTab: string;
  children: ReactNode;
}) {
  return (
    <div className={tabId === activeTab ? "block" : "hidden"}>{children}</div>
  );
}
