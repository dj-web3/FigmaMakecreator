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
  startTime: string;
  quantity: string;
  process: string;
  substeps: { label: string; text: string }[];
  chefs: ('SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR')[];
  ingredients: { id: string; name: string; quantity: string; image: string }[];
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
    startTime: '07:00',
    quantity: '0.8kg',
    process: 'Marinating',
    substeps: [{ label: 'A', text: 'Chicken Marination' }],
    chefs: ['SOUS'],
    ingredients: [],
  },
  {
    id: '2',
    title: 'Rice Parboil',
    duration: '20m',
    startTime: '08:00',
    quantity: '1kg',
    process: 'Boiling',
    substeps: [{ label: 'A', text: 'Rice Parboil' }],
    chefs: ['JUNIOR'],
    ingredients: [],
  },
  {
    id: '3',
    title: 'Spice Layer Prep',
    duration: '15m',
    startTime: '09:00',
    quantity: '200g',
    process: 'Sautéing',
    substeps: [{ label: 'A', text: 'Spice Layer Prep' }],
    chefs: ['STATION'],
    ingredients: [],
  },
  {
    id: '4',
    title: 'Dum Assembly',
    duration: '60m',
    startTime: '09:30',
    quantity: '2kg',
    process: 'Combining',
    substeps: [{ label: 'A', text: 'Dum Assembly' }],
    chefs: ['SOUS', 'STATION'],
    ingredients: [],
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

  // Keep all views permanently mounted so local state (e.g. flowNodes in
  // CreateMenuView) is never discarded when the user switches tabs.
  // Each wrapper is shown/hidden via CSS only — React never unmounts them.
  const show = (section: NavigationSection) =>
    activeSection === section ? 'flex flex-col flex-1 h-full min-h-0' : 'hidden';

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <MainNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className={show('create-menu')}>
          <CreateMenuView
            sharedDish={sharedDish}
            onSharedDishChange={handleDishChange}
          />
        </div>
        <div className={show('create-guide')}>
          <CreateGuideView sharedDish={sharedDish} />
        </div>
        <div className={show('create-plan')}>
          <CreatePlanView sharedDish={sharedDish} />
        </div>
        <div className={show('discovery')}>
          <DiscoveryView sharedDish={sharedDish} />
        </div>
        <div className={show('pairing')}>
          <PairingView sharedDish={sharedDish} />
        </div>
      </div>
    </div>
  );
}
