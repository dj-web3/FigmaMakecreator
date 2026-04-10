import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LatticeCarousel } from '../discovery/LatticeCarousel';
import { MenuItemsTable } from '../discovery/MenuItemsTable';
import { AIChatDrawer } from '../AIChatDrawer';
import { CommonHeader } from '../CommonHeader';
import { RMINTFab } from '../RMINTFab';

export interface MenuItem {
  id: string;
  name: string;
  prepWindow: number; // in minutes
  unitMargin: number;
  demand: number; // percentage
  riskScore: number;
}

export function DiscoveryView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAIDrawer, setShowAIDrawer] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'BUTTER CHICKEN',
      prepWindow: 45,
      unitMargin: 12.0,
      demand: 142,
      riskScore: 14
    },
    {
      id: '2',
      name: 'NAAN',
      prepWindow: 120,
      unitMargin: 1.5,
      demand: 138,
      riskScore: 16
    },
    {
      id: '3',
      name: 'LASSI',
      prepWindow: 15,
      unitMargin: 4.0,
      demand: 91,
      riskScore: 52
    },
    {
      id: '4',
      name: 'GULAB JAMUN',
      prepWindow: 40,
      unitMargin: 3.0,
      demand: 117,
      riskScore: 45
    },
    {
      id: '5',
      name: 'CHICKEN TIKKA',
      prepWindow: 240,
      unitMargin: 18.0,
      demand: 89,
      riskScore: 44
    },
    {
      id: '6',
      name: 'VEG KOLHAPURI',
      prepWindow: 25,
      unitMargin: 8.0,
      demand: 64,
      riskScore: 77
    }
  ];

  // Carousel data - Butter Chicken is always the main dish
  const [carouselSlides, setCarouselSlides] = useState([
    {
      mainDish: menuItems[0], // Butter Chicken
      otherDishes: [menuItems[1], menuItems[4], menuItems[3], menuItems[5]]
    },
    {
      mainDish: menuItems[0], // Butter Chicken
      otherDishes: [menuItems[5], menuItems[2], menuItems[1], menuItems[3]]
    },
    {
      mainDish: menuItems[0], // Butter Chicken
      otherDishes: [menuItems[3], menuItems[5], menuItems[2], menuItems[4]]
    }
  ]);

  const handleSlideUpdate = (slideIndex: number, updatedSlide: { mainDish: MenuItem; otherDishes: MenuItem[] }) => {
    const newSlides = [...carouselSlides];
    newSlides[slideIndex] = updatedSlide;
    setCarouselSlides(newSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* AI Chat Drawer */}
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      
      {/* Header - consistent with Create Guide */}
      <CommonHeader 
        mainItem="Chicken Biryani"
        title="Neural Lattice Intelligence Matrix - Discovery"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#fff8f7]">
        <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-8">
          {/* Lattice Carousel */}
          <LatticeCarousel
            currentSlide={currentSlide}
            slides={carouselSlides}
            allDishes={menuItems}
            onSlideUpdate={handleSlideUpdate}
            onPrevSlide={handlePrevSlide}
            onNextSlide={handleNextSlide}
          />

          {/* Menu Items Table */}
          <MenuItemsTable items={menuItems} />
        </div>
      </div>

      {/* RMINT Fab */}
      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />
    </div>
  );
}