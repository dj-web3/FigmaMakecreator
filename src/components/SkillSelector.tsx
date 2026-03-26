import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

interface SkillSelectorProps {
  value: string;
  onChange: (value: string) => void;
  nodeId: string;
}

const COOKING_SKILLS = [
  'Marinating',
  'Dicing',
  'Chopping',
  'Mincing',
  'Slicing',
  'Deep Frying',
  'Shallow Frying',
  'Sautéing',
  'Grilling',
  'Roasting',
  'Baking',
  'Boiling',
  'Steaming',
  'Blanching',
  'Braising',
  'Searing',
  'Caramelizing',
  'Glazing',
  'Reducing',
  'Emulsifying',
  'Whisking',
  'Folding',
  'Mixing',
  'Blending',
  'Combining',
  'Assembling',
  'Plating',
  'Garnishing',
  'Seasoning',
  'Pickling',
  'Fermenting',
  'Smoking',
  'Poaching',
  'Stir-Frying',
  'Pan-Frying',
  'Broiling',
  'Tempering',
  'Kneading',
  'Proofing'
];

export function SkillSelector({ value, onChange, nodeId }: SkillSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredSkills = COOKING_SKILLS.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

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
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (skill: string) => {
    onChange(skill);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filteredSkills.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredSkills[highlightedIndex]) {
          handleSelect(filteredSkills[highlightedIndex]);
        } else if (searchTerm.trim()) {
          handleSelect(searchTerm.trim());
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        break;
    }
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
      {/* Search Bar */}
      <div className="p-2 border-b border-gray-100 bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Skills List */}
      <div className="max-h-[250px] overflow-y-auto">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <button
              key={skill}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(skill);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-4 py-2.5 text-xs font-medium text-left transition-colors ${
                index === highlightedIndex
                  ? 'bg-[#FE5D4D] text-white'
                  : skill === value
                  ? 'bg-gray-100 text-[#4a1710]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {skill}
            </button>
          ))
        ) : searchTerm.trim() ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(searchTerm.trim());
            }}
            className="w-full px-4 py-3 text-xs font-medium text-left bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            Add "{searchTerm.trim()}" as custom skill
          </button>
        ) : (
          <div className="px-4 py-6 text-center text-xs text-gray-500">
            No skills found
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div className="relative w-full" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-between transition-colors"
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{value}</span>
        <ChevronDown className={`size-3 flex-shrink-0 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}
