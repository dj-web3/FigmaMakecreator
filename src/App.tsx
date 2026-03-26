import { useState } from "react";
import { MainNavigation } from "./components/MainNavigation";
import { CreateGuideView } from "./components/views/CreateGuideView";
import { CreateMenuView } from "./components/views/CreateMenuView";
import { CreatePlanView } from "./components/views/CreatePlanView";
import { DiscoveryView } from "./components/views/DiscoveryView";
import { PairingView } from "./components/views/PairingView";

type NavigationSection =
  | "create-guide"
  | "create-menu"
  | "create-plan"
  | "discovery"
  | "pairing";

export default function App() {
  const [activeSection, setActiveSection] =
    useState<NavigationSection>("create-guide");

  const renderView = () => {
    switch (activeSection) {
      case "create-guide":
        return <CreateGuideView />;
      case "create-menu":
        return <CreateMenuView />;
      case "create-plan":
        return <CreatePlanView />;
      case "discovery":
        return <DiscoveryView />;
      case "pairing":
        return <PairingView />;
      default:
        return <CreateGuideView />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <MainNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
}