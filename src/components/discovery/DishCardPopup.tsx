import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, ArrowRight, X } from 'lucide-react';
import { MenuItem } from '../views/DiscoveryView';

interface DishCardPopupProps {
  dish: MenuItem;
  isMain: boolean;
  allDishes: MenuItem[];
  onDishChange: (newDish: MenuItem) => void;
  position: { x: number; y: number; width: number; height: number; zIndex: number };
  colorClass: string;
  slideIndex: number;
}

export function DishCardPopup({
  dish,
  isMain,
  allDishes,
  onDishChange,
  position,
  colorClass,
  slideIndex,
}: DishCardPopupProps) {
  const [showMenu, setShowMenu] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Filter out the current dish
  const availableDishes = allDishes.filter(d => d.id !== dish.id);

  const handleDishSelect = (newDish: MenuItem) => {
    onDishChange(newDish);
    setShowMenu(false);
  };

  const handleCardClick = () => {
    if (!isMain) {
      setShowMenu(!showMenu);
    }
  };

  return (
    <>
      {/* Dish Card */}
      <motion.div
        ref={cardRef}
        initial={{ 
          x: position.x + 30,
          y: position.y + 30,
          opacity: 0,
          scale: 0.9
        }}
        animate={{ 
          x: position.x,
          y: position.y,
          opacity: 1,
          scale: 1
        }}
        exit={{ 
          x: position.x - 30,
          y: position.y - 30,
          opacity: 0,
          scale: 0.9
        }}
        transition={{ 
          duration: 0.5,
          delay: isMain ? 0.15 : slideIndex * 0.08,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: position.width,
          height: position.height,
          zIndex: showMenu ? 1000 : position.zIndex,
        }}
      >
        <motion.div
          whileHover={{ scale: isMain ? 1 : 1.05 }}
          className={`relative w-full h-full bg-gradient-to-br ${colorClass} backdrop-blur-sm rounded-2xl shadow-md border ${
            isMain ? 'border-[#FE5D4D]/40 border-2' : 'border-white/60'
          } p-4 ${!isMain ? 'cursor-pointer' : ''} hover:shadow-lg transition-all`}
          onClick={handleCardClick}
        >
          <div className="flex flex-col h-full justify-between">
            <h3 className={`${isMain ? 'text-sm' : 'text-xs'} font-bold text-[#4a1710] uppercase tracking-wide leading-tight`}>
              {dish.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px]">
              <TrendingUp className="size-3 text-[#FE5D4D]" />
              <span className="font-semibold text-[#4a1710]">
                {dish.demand} orders
              </span>
            </div>
          </div>

          {/* Click indicator for non-main dishes */}
          {!isMain && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-white/80 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-[#FE5D4D] rounded-full" />
            </div>
          )}
        </motion.div>

        {/* Premium Popup Menu - positioned relative to the card */}
        <AnimatePresence>
          {showMenu && !isMain && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[9998]"
                onClick={() => setShowMenu(false)}
                style={{ left: 0, top: 0 }}
              />
              
              {/* Menu - positioned below the card */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ 
                  duration: 0.18, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-[9999] border border-gray-100"
                style={{
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '8px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Swap Item
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Select replacement
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X className="size-3.5 text-gray-500" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="max-h-72 overflow-y-auto">
                  {availableDishes.map((availableDish) => (
                    <button
                      key={availableDish.id}
                      onClick={() => handleDishSelect(availableDish)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0"
                    >
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                          {availableDish.name}
                        </p>
                        <div className="flex items-center gap-2.5 mt-1">
                          <span className="text-[10px] text-gray-500">
                            {availableDish.demand} orders
                          </span>
                          <span className="text-[10px] text-[#FE5D4D] font-semibold">
                            ${availableDish.unitMargin.toFixed(2)} margin
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="size-3.5 text-gray-400 group-hover:text-[#FE5D4D] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
