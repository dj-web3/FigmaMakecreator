import { useState } from "react";
import { MainNavigation } from "./components/MainNavigation";
import { CreateGuideView } from "./components/views/CreateGuideView";
import { CreateMenuView } from "./components/views/CreateMenuView";
import { CreatePlanView } from "./components/views/CreatePlanView";
import { DiscoveryView } from "./components/views/DiscoveryView";
import { PairingView } from "./components/views/PairingView";
import { DISH_DB, getDishKey } from "./data/dishData";
import type { GuideStep, DiscoveryMenuItem, DishPairing } from "./data/dishData";

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
  subtitle: string;
  methodology: SharedMethodologyStep[];
  guideSteps: GuideStep[];
  discoveryItems: DiscoveryMenuItem[];
  pairings: DishPairing[];
}

// Re-export dish data types for views to consume
export type { GuideStep, DiscoveryMenuItem, DishPairing };

const defaultMethodology: SharedMethodologyStep[] = [
  {
    id: '1',
    title: 'Chicken Marination',
    duration: '45m',
    quantity: '0.8kg',
    substeps: [{ label: 'A', text: 'Chicken Marination' }],
    chefs: ['SOUS'],
  },
  {
    id: '2',
    title: 'Rice Parboil',
    duration: '20m',
    quantity: '1kg',
    substeps: [{ label: 'A', text: 'Rice Parboil' }],
    chefs: ['JUNIOR'],
  },
  {
    id: '3',
    title: 'Spice Layer Prep',
    duration: '15m',
    quantity: '200g',
    substeps: [{ label: 'A', text: 'Spice Layer Prep' }],
    chefs: ['STATION'],
  },
  {
    id: '4',
    title: 'Dum Assembly',
    duration: '60m',
    quantity: '2kg',
    substeps: [{ label: 'A', text: 'Dum Assembly' }],
    chefs: ['SOUS', 'STATION'],
  },
];

function buildSharedDish(key: string, methodology: SharedMethodologyStep[]): SharedDishData {
  const record = DISH_DB[key] ?? DISH_DB['biryani'];
  return {
    dishName: record.dishName,
    subtitle: record.subtitle,
    methodology,
    guideSteps: record.guideSteps,
    discoveryItems: record.discoveryItems,
    pairings: record.pairings,
  };
}

export default function App() {
  const [activeSection, setActiveSection] =
    useState<NavigationSection>("create-menu");

  const [sharedDish, setSharedDish] = useState<SharedDishData>(
    buildSharedDish('biryani', defaultMethodology)
  );

  // When CreateMenuView emits new dish data, enrich with full DB lookup
  const handleDishChange = (partial: SharedDishData) => {
    const key = getDishKey(partial.dishName) ?? 'biryani';
    const record = DISH_DB[key] ?? DISH_DB['biryani'];
    setSharedDish({
      dishName: partial.dishName,
      subtitle: record.subtitle,
      methodology: partial.methodology,
      guideSteps: record.guideSteps,
      discoveryItems: record.discoveryItems,
      pairings: record.pairings,
    });
  };

  const renderView = () => {
    switch (activeSection) {
      case "create-menu":
        return (
          <CreateMenuView
            sharedDish={sharedDish}
            onSharedDishChange={handleDishChange}
          />
        );
      case "create-guide":
        return <CreateGuideView sharedDish={sharedDish} />;
      case "create-plan":
        return <CreatePlanView sharedDish={sharedDish} />;
      case "discovery":
        return <DiscoveryView sharedDish={sharedDish} />;
      case "pairing":
        return <PairingView sharedDish={sharedDish} />;
      default:
        return (
          <CreateMenuView
            sharedDish={sharedDish}
            onSharedDishChange={handleDishChange}
          />
        );
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
