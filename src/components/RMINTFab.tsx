import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface RMINTFabProps {
  onClick: () => void;
  isVisible?: boolean;
}

export function RMINTFab({ onClick, isVisible = true }: RMINTFabProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-[#FE5D4D] hover:bg-[#e54d3d] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group h-14"
        style={{
          width: isHovered ? 'auto' : '56px',
          paddingLeft: isHovered ? '20px' : '0',
          paddingRight: isHovered ? '20px' : '0',
        }}
      >
        <Sparkles className="size-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
        {isHovered && (
          <span className="ml-2 font-semibold text-sm whitespace-nowrap">RMINT AI</span>
        )}
      </button>
    </div>
  );
}