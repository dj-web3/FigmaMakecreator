import { motion } from 'motion/react';
import { Clock, Users, X } from 'lucide-react';
import { Task } from '../views/CreatePlanView';

interface TaskDetailsPopupProps {
  task: Task;
  position: { x: number; y: number };
  onClose: () => void;
}

const sessionBadgeColors = {
  sous: 'bg-[#FE5D4D]/10 text-[#FE5D4D] border-[#FE5D4D]/20',
  station: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  junior: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  trainee: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
};

const sessionLabels = {
  sous: 'Sous Chef',
  station: 'Station Chef',
  junior: 'Junior Chef',
  trainee: 'Trainee Chef'
};

export function TaskDetailsPopup({ task, position }: TaskDetailsPopupProps) {
  // Format time to include AM if not present
  const formatTime = (time: string) => {
    if (time.includes('AM') || time.includes('PM')) return time;
    const hour = parseInt(time.split(':')[0]);
    return hour < 12 ? `${time} AM` : `${time} PM`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-50 bg-white rounded-xl shadow-2xl w-80 border border-gray-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-0.5">
            Task Details
          </p>
          <h2 className="text-sm font-semibold text-[#4a1710]">
            {task.title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Time & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Clock className="size-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                Start Time
              </p>
              <p className="text-sm font-semibold text-[#4a1710] mt-0.5">
                {formatTime(task.startTime)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Clock className="size-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                Duration
              </p>
              <p className="text-sm font-semibold text-[#4a1710] mt-0.5">
                {formatDuration(task.duration)}
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-4 text-gray-500" />
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
              Team Members
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {task.session.map((role) => (
              <span
                key={role}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${sessionBadgeColors[role]}`}
              >
                {sessionLabels[role]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
