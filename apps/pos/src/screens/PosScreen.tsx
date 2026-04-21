import { useState } from "react";
import { PosLayout } from "../components/PosLayout";
import { TablesScreen } from "./TablesScreen";
import { OrderScreen } from "./OrderScreen";
import { OrderProvider } from "../context/OrderContext";
import { Badge } from "@restaurant/ui";

type ActiveView =
  | { screen: "section"; section: string }
  | { screen: "order"; tableId: string; tableNumber: number };

export function PosScreen() {
  const [view, setView] = useState<ActiveView>({ screen: "section", section: "tables" });

  const handleOpenOrder = (tableId: string, tableNumber: number) => {
    setView({ screen: "order", tableId, tableNumber });
  };

  const handleBackToTables = () => {
    setView({ screen: "section", section: "tables" });
  };

  const activeSection = view.screen === "section" ? view.section : "tables";

  const handleSectionChange = (section: string) => {
    setView({ screen: "section", section });
  };

  const renderContent = () => {
    if (view.screen === "order") {
      return (
        <OrderProvider>
          <OrderScreen
            tableId={view.tableId}
            tableNumber={view.tableNumber}
            onBack={handleBackToTables}
          />
        </OrderProvider>
      );
    }

    switch (view.section) {
      case "tables":
        return <TablesScreen onOpenOrder={handleOpenOrder} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Badge variant="info" size="md">
              Sección activa
            </Badge>
            <h2 className="text-2xl font-bold text-text-primary capitalize">
              {view.section.replace("-", " ")}
            </h2>
            <p className="text-text-muted text-center max-w-md">
              Próximamente
            </p>
          </div>
        );
    }
  };

  return (
    <PosLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
      {renderContent()}
    </PosLayout>
  );
}