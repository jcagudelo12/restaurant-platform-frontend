import { useState } from "react";
import { PosLayout } from "../components/PosLayout";
import { TablesScreen } from "./TablesScreen";
import { Badge } from "@restaurant/ui";

export function PosScreen() {
  const [activeSection, setActiveSection] = useState("tables");

  const renderSection = () => {
    switch (activeSection) {
      case "tables":
        return <TablesScreen />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Badge variant="info" size="md">
              Sección activa
            </Badge>
            <h2 className="text-2xl font-bold text-text-primary capitalize">
              {activeSection.replace("-", " ")}
            </h2>
            <p className="text-text-muted text-center max-w-md">
              Próximamente: semana 4 — pantalla de pedidos
            </p>
          </div>
        );
    }
  };

  return (
    <PosLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </PosLayout>
  );
}