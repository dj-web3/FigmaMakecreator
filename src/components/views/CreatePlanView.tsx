import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
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
}

export function CreatePlanView() {
  const [viewMode, setViewMode] = useState<'timeline' | 'clock'>('timeline');
  const [selectedDate, setSelectedDate] = useState('22 JAN');
  const [showAIDrawer, setShowAIDrawer] = useState(false);

  const dates = ['20 JAN', '21 JAN', '22 JAN', '23 JAN', '24 JAN'];

  // Mock task data
  const tasks: Task[] = [
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
        <div className="flex items-center justify-between">
          {/* Date Selector */}
          <div className="flex items-center gap-2">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedDate === date
                    ? 'bg-[#FE5D4D] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D] w-64"
              />
            </div>

            {/* View Toggle */}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#fff8f7]">
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