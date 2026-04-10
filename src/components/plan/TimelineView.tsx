import { useState } from 'react';
import { User } from 'lucide-react';
import { Task, ChefRole } from '../views/CreatePlanView';
import { TaskDetailsPopup } from './TaskDetailsPopup';

interface TimelineViewProps {
  tasks: Task[];
}

const chefRoles = [
  { id: 'sous' as ChefRole, name: 'SOUS CHEF', label: 'ACTIVE SHIFT' },
  { id: 'station' as ChefRole, name: 'STATION CHEF', label: 'ACTIVE SHIFT' },
  { id: 'junior' as ChefRole, name: 'JUNIOR CHEF', label: 'ACTIVE SHIFT' },
  { id: 'trainee' as ChefRole, name: 'TRAINEE CHEF', label: 'ACTIVE SHIFT' }
];

const timeSlots = [
  '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'
];

const taskColors: Record<ChefRole, string> = {
  sous: 'bg-[#dcfce7] border-[#22c55e]/30',
  station: 'bg-[#fef3c7] border-[#f59e0b]/30',
  junior: 'bg-[#fee2e2] border-[#ef4444]/30',
  trainee: 'bg-[#f3e8ff] border-[#a855f7]/30'
};

const taskDotColors: Record<ChefRole, string> = {
  sous: '#22c55e',
  station: '#f59e0b',
  junior: '#ef4444',
  trainee: '#a855f7'
};

export function TimelineView({ tasks }: TimelineViewProps) {
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const getTaskPosition = (startTime: string) => {
    // Parse time in format "HH:MM" or "HH:MM AM/PM"
    const parts = startTime.split(' ');
    const [hours, minutes] = parts[0].split(':').map(Number);
    
    let hour24 = hours;
    if (parts[1]) {
      const period = parts[1];
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
    }
    
    const startHour = 7;
    const hourOffset = hour24 - startHour;
    const minuteOffset = minutes / 60;
    
    return (hourOffset + minuteOffset) * 100 / 12; // percentage
  };

  const getTaskWidth = (duration: number) => {
    return (duration / 60) * (100 / 12); // percentage
  };

  const handleTaskHover = (task: Task, event: React.MouseEvent) => {
    setHoveredTask(task);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          {/* Header with Time Slots */}
          <div className="flex mb-6">
            <div className="w-48 flex-shrink-0">
              <h3 className="text-xs font-medium text-gray-500">
                Team Role
              </h3>
            </div>
            <div className="flex-1 grid grid-cols-13 px-4">
              {timeSlots.map((time) => (
                <div key={time} className="text-xs font-medium text-gray-500">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-1">
            {chefRoles.map((role) => {
              const roleTasks = tasks.filter(task => task.chefRole === role.id);
              
              return (
                <div key={role.id} className="flex items-center relative group">
                  {/* Chef Role Label */}
                  <div className="w-48 flex-shrink-0 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: taskDotColors[role.id] + '33' }}>
                        <User className="size-5" style={{ color: taskDotColors[role.id] }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#4a1710]">
                          {role.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {role.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Grid */}
                  <div className="flex-1 relative h-20 border-l border-gray-100">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex">
                      {timeSlots.map((_, index) => (
                        <div
                          key={index}
                          className="flex-1 border-r border-gray-100 last:border-r-0"
                        />
                      ))}
                    </div>

                    {/* Tasks */}
                    {roleTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`absolute top-1/2 -translate-y-1/2 h-14 ${taskColors[role.id]} rounded-lg shadow-sm border border-gray-200 px-3 py-2 cursor-pointer hover:shadow-md transition-all hover:scale-105 hover:z-10`}
                        style={{
                          left: `${getTaskPosition(task.startTime)}%`,
                          width: `${getTaskWidth(task.duration)}%`
                        }}
                        onMouseEnter={(e) => handleTaskHover(task, e)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: taskDotColors[role.id] }} />
                          <div className="text-xs font-semibold text-[#4a1710] truncate">
                            {task.title}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          {task.duration} MIN
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hover Popup */}
          {hoveredTask && (
            <TaskDetailsPopup
              task={hoveredTask}
              position={hoverPosition}
              onClose={() => setHoveredTask(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}