import { useState } from 'react';
import { Search } from 'lucide-react';
import type { SharedDishData } from '../../App';
import { TimelineView } from '../plan/TimelineView';
import { ClockView } from '../plan/ClockView';
import { AIChatDrawer } from '../AIChatDrawer';
import { CommonHeader } from '../CommonHeader';
import { RMINTFab } from '../RMINTFab';

export type ChefRole = 'sous' | 'station' | 'junior' | 'trainee';

export interface Task {
  id: string;
  title: string;
  startTime: string;
  duration: number; // in minutes
  chefRole: ChefRole;
  session: ChefRole[];
  process?: string;
  ingredients?: { id: string; name: string; quantity: string; image: string }[];
}

interface CreatePlanViewProps {
  sharedDish?: SharedDishData;
}

const chefRoleMap: Record<string, ChefRole> = {
  'SOUS': 'sous',
  'STATION': 'station',
  'JUNIOR': 'junior',
  'TRAINEE': 'trainee',
};

const parseDuration = (dur: string): number => {
  const match = dur.match(/(\d+)/);
  return match ? parseInt(match[1]) : 60;
};

export function CreatePlanView({ sharedDish }: CreatePlanViewProps) {
  const [viewMode, setViewMode] = useState<'timeline' | 'clock'>('timeline');
  const [showAIDrawer, setShowAIDrawer] = useState(false);

  // Derive tasks from shared methodology if available
  const methodologyTasks: Task[] = sharedDish?.methodology.flatMap((step, i) =>
    step.chefs.map((chef, j) => ({
      id: `method-${step.id}-${j}`,
      title: step.title,
      startTime: step.startTime || '09:00',
      duration: parseDuration(step.duration),
      chefRole: chefRoleMap[chef] || 'sous',
      session: [chefRoleMap[chef] || 'sous'],
      process: step.process,
      ingredients: step.ingredients,
    }))
  ) || [];

  // Additional static demo tasks
  const staticTasks: Task[] = [
    {
      id: '1',
      title: 'Breakfast Prep',
      startTime: '07:00',
      duration: 90,
      chefRole: 'sous',
      session: ['sous', 'junior']
    },
    {
      id: '2',
      title: 'Stock Production',
      startTime: '09:00',
      duration: 60,
      chefRole: 'sous',
      session: ['sous']
    },
    {
      id: '3',
      title: 'GRAVY PRODUCTION',
      startTime: '09:30',
      duration: 90,
      chefRole: 'station',
      session: ['sous', 'station', 'junior', 'trainee']
    },
    {
      id: '4',
      title: 'Chicken Prep',
      startTime: '08:00',
      duration: 120,
      chefRole: 'station',
      session: ['station', 'junior']
    },
    {
      id: '5',
      title: 'Vegetable Prep',
      startTime: '09:00',
      duration: 45,
      chefRole: 'junior',
      session: ['junior']
    },
    {
      id: '6',
      title: 'Sauce Prep',
      startTime: '11:00',
      duration: 60,
      chefRole: 'junior',
      session: ['junior', 'trainee']
    },
    {
      id: '7',
      title: 'Kitchen Clean',
      startTime: '07:30',
      duration: 60,
      chefRole: 'trainee',
      session: ['trainee']
    },
    {
      id: '8',
      title: 'Ingredient Prep',
      startTime: '10:00',
      duration: 90,
      chefRole: 'trainee',
      session: ['trainee', 'junior']
    },
    {
      id: '9',
      title: 'Lunch Service',
      startTime: '12:00',
      duration: 120,
      chefRole: 'sous',
      session: ['sous', 'station', 'junior']
    },
    {
      id: '10',
      title: 'Pastry Prep',
      startTime: '14:00',
      duration: 75,
      chefRole: 'station',
      session: ['station']
    }
  ];

  const tasks: Task[] = [...methodologyTasks, ...staticTasks];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* AI Chat Drawer */}
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      
      {/* Header - consistent with other views */}
      <CommonHeader 
        mainItem="Chicken Biryani"
        title="Chef Scheduling & Task Management"
      />

      {/* Control Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Search — moved to LHS */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D] w-64"
            />
          </div>

          {/* View Toggle — moved to LHS */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-[#FE5D4D] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('clock')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'clock'
                  ? 'bg-white text-[#FE5D4D] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clock
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden bg-[#fff8f7]">
        {viewMode === 'timeline' ? (
          <TimelineView tasks={tasks} />
        ) : (
          <ClockView tasks={tasks} />
        )}
      </div>

      {/* RMINT Fab */}
      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />
    </div>
  );
}