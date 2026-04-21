import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type PosLayoutProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: ReactNode;
};

export function PosLayout({ activeSection, onSectionChange, children }: PosLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-surface-secondary overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}