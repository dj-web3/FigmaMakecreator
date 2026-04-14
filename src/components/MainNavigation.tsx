import { BookOpen, Menu as MenuIcon, Calendar, Compass, Wine, Settings } from 'lucide-react';
import { useState } from 'react';

type NavigationSection = 'create-guide' | 'create-menu' | 'create-plan' | 'discovery' | 'pairing';

interface MainNavigationProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
}

const navigationItems = [
  { id: 'create-menu' as const, icon: MenuIcon, label: 'Create Menu' },
  { id: 'create-guide' as const, icon: BookOpen, label: 'Create Guide' },
  { id: 'create-plan' as const, icon: Calendar, label: 'Create Plan' },
  { id: 'discovery' as const, icon: Compass, label: 'Discovery' },
  { id: 'pairing' as const, icon: Wine, label: 'Pairing' },
];

export function MainNavigation({ activeSection, onSectionChange }: MainNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-[#4a1710] text-white flex flex-col items-center py-4 relative transition-all duration-300"
      style={{ width: isExpanded ? '200px' : '60px' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo/Brand */}
      <div className="mb-8 flex items-center justify-center w-full px-3">
        <div className="size-9 rounded-lg bg-[#FE5D4D] flex items-center justify-center font-bold text-sm">
          R
        </div>
        {isExpanded && (
          <span className="ml-3 font-semibold text-sm whitespace-nowrap">RMINT</span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-[#FE5D4D] text-white' 
                  : 'text-[#ffd6d1] hover:bg-[#5c1f14] hover:text-white'
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="size-5 flex-shrink-0" />
              {isExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto w-full px-2">
        <button
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#ffd6d1] hover:bg-[#5c1f14] hover:text-white transition-all w-full"
          title={!isExpanded ? 'Settings' : undefined}
        >
          <Settings className="size-5 flex-shrink-0" />
          {isExpanded && (
            <span className="text-sm font-medium whitespace-nowrap">Settings</span>
          )}
        </button>
      </div>
    </div>
  );
}
