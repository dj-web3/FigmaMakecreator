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

export interface SharedMethodologyStep {
  id: string;
  title: string;
  duration: string;
  quantity: string;
  substeps: { label: string; text: string }[];
  chefs: ('SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR')[];
}

export interface SharedDishData {
  dishName: string;
  methodology: SharedMethodologyStep[];
}

const defaultMethodology: SharedMethodologyStep[] = [
  {
    id: '1',
    title: 'Chicken Prep',
    duration: '45m',
    quantity: '0.6KG',
    substeps: [
      { label: 'A', text: 'Boneless Thighs' },
      { label: 'B', text: 'First Marination' }
    ],
    chefs: ['SOUS']
  },
  {
    id: '2',
    title: 'Gravy Production',
    duration: '90m',
    quantity: '0.5L',
    substeps: [
      { label: 'A', text: 'Makhani Gravy' }
    ],
    chefs: ['STATION']
  },
  {
    id: '3',
    title: 'Service Finish',
    duration: '45m',
    quantity: '0.4KG',
    substeps: [
      { label: 'A', text: 'Final Assembly' }
    ],
    chefs: ['SOUS']
  }
];

export default function App() {
  const [activeSection, setActiveSection] =
    useState<NavigationSection>("create-guide");

  const [sharedDish, setSharedDish] = useState<SharedDishData>({
    dishName: 'Chicken Biryani',
    methodology: defaultMethodology,
  });

  const renderView = () => {
    switch (activeSection) {
      case "create-guide":
        return <CreateGuideView />;
      case "create-menu":
        return (
          <CreateMenuView
            sharedDish={sharedDish}
            onSharedDishChange={setSharedDish}
          />
        );
      case "create-plan":
        return <CreatePlanView sharedDish={sharedDish} />;
      case "discovery":
        return <DiscoveryView />;
      case "pairing":
        return <PairingView dishName={sharedDish.dishName} />;
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
