import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ChefSelectorProps {
  value: string;
  onChange: (value: string) => void;
  nodeId: string;
}

const CHEF_TYPES = ['Sous', 'Station', 'Trainee', 'Junior'];

export function ChefSelector({ value, onChange, nodeId }: ChefSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (chef: string) => {
    onChange(chef);
    setIsOpen(false);
  };

  const dropdownContent = isOpen ? (
    <div 
      ref={dropdownRef}
      className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden w-[240px] z-[9999]"
      onClick={(e) => e.stopPropagation()}
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
      }}
    >
      <div className="max-h-[200px] overflow-y-auto">
        {CHEF_TYPES.map((chef) => (
          <button
            key={chef}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(chef);
            }}
            className={`w-full px-4 py-2.5 text-xs font-medium text-left transition-colors ${
              chef === value
                ? 'bg-gray-100 text-[#4a1710]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {chef}
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <User className="size-3" />
          <span>{value}</span>
        </div>
        <ChevronDown className={`size-3 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}
