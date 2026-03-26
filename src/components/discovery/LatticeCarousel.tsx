import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DishCardPopup } from './DishCardPopup';
import { MenuItem } from '../views/DiscoveryView';

interface LatticeCarouselProps {
  currentSlide: number;
  slides: Array<{
    mainDish: MenuItem;
    otherDishes: MenuItem[];
  }>;
  allDishes: MenuItem[];
  onSlideUpdate: (slideIndex: number, updatedSlide: { mainDish: MenuItem; otherDishes: MenuItem[] }) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

const dishColors = [
  'from-purple-200/60 to-purple-300/40', // VEG KOLHAPURI
  'from-orange-200/60 to-orange-300/40', // BUTTER CHICKEN / GULAB JAMUN
  'from-yellow-200/60 to-yellow-300/40', // NAAN
  'from-green-200/60 to-green-300/40', // CHICKEN TIKKA
  'from-blue-200/60 to-blue-300/40', // LASSI
];

const getColorForDish = (dishName: string) => {
  if (dishName.includes('VEG KOLHAPURI')) return dishColors[0];
  if (dishName.includes('BUTTER CHICKEN') || dishName.includes('GULAB')) return dishColors[1];
  if (dishName.includes('NAAN')) return dishColors[2];
  if (dishName.includes('CHICKEN TIKKA')) return dishColors[3];
  if (dishName.includes('LASSI')) return dishColors[4];
  return dishColors[1];
};

export function LatticeCarousel({ 
  currentSlide, 
  slides, 
  allDishes, 
  onSlideUpdate,
  onPrevSlide,
  onNextSlide 
}: LatticeCarouselProps) {
  const slide = slides[currentSlide];

  // Position configurations - properly fitting within 800x360 container with overlaps
  // Container padding is 24px (p-6), so usable space is ~752x312
  const positions = [
    { x: 20, y: 20, width: 220, height: 120, zIndex: 20 },      // Top left
    { x: 480, y: 10, width: 240, height: 130, zIndex: 25 },     // Top right
    { x: 30, y: 180, width: 240, height: 120, zIndex: 15 },     // Bottom left  
    { x: 450, y: 170, width: 250, height: 130, zIndex: 18 },    // Bottom right
  ];

  // Main dish position (center, overlaps with others)
  const mainDishPosition = { x: 200, y: 70, width: 280, height: 140, zIndex: 30 };

  const handleDishChange = (index: number, newDish: MenuItem) => {
    const updatedOtherDishes = [...slide.otherDishes];
    updatedOtherDishes[index] = newDish;
    
    onSlideUpdate(currentSlide, {
      mainDish: slide.mainDish,
      otherDishes: updatedOtherDishes
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#FE5D4D] rounded-full" />
          <h2 className="text-sm font-semibold text-[#4a1710]">
            Signature Makhani Lattice
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevSlide}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-[#FE5D4D] hover:bg-[#fff8f7] transition-all"
          >
            <ChevronLeft className="size-4 text-gray-600" />
          </button>
          
          {/* Slide indicators */}
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-6 bg-[#FE5D4D]'
                    : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={onNextSlide}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-[#FE5D4D] hover:bg-[#fff8f7] transition-all"
          >
            <ChevronRight className="size-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Lattice Visualization */}
      <div className="relative h-[360px] bg-gradient-to-br from-gray-50/50 to-white rounded-xl border border-gray-100 overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {/* Other dishes with popup */}
            {slide.otherDishes.map((dish, index) => (
              <DishCardPopup
                key={`${currentSlide}-${dish.id}-${index}`}
                dish={dish}
                isMain={false}
                allDishes={allDishes}
                onDishChange={(newDish) => handleDishChange(index, newDish)}
                position={positions[index]}
                colorClass={getColorForDish(dish.name)}
                slideIndex={currentSlide}
              />
            ))}

            {/* Main dish (Butter Chicken) - overlaps with others */}
            <DishCardPopup
              key={`${currentSlide}-main`}
              dish={slide.mainDish}
              isMain={true}
              allDishes={allDishes}
              onDishChange={() => {}}
              position={mainDishPosition}
              colorClass={getColorForDish(slide.mainDish.name)}
              slideIndex={currentSlide}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
