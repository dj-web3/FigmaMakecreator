import { useState } from 'react';
import { Task } from '../views/CreatePlanView';
import { ClockTaskCard } from './ClockTaskCard';

interface ClockViewProps {
  tasks: Task[];
}

export function ClockView({ tasks }: ClockViewProps) {
  const [clockMode, setClockMode] = useState<'1hour' | '12hour'>('12hour');
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [focusHour, setFocusHour] = useState(10);

  const hours12 = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteMarkers = Array.from({ length: 12 }, (_, i) => i * 5);

  // Calculate angle for time position (12 o'clock = 0°)
  const getTimeAngle = (hour: number, minute: number = 0) => {
    const hourAngle = ((hour % 12) * 30 + minute * 0.5) - 90;
    return hourAngle;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  // Parse task time to get angle and duration
  const getTaskSegment = (task: Task, ringIndex: number) => {
    const [time] = task.startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const startAngle = getTimeAngle(hours, minutes);
    const durationAngle = (task.duration / 60) * 30; // 30° per hour
    
    return {
      startAngle,
      sweepAngle: durationAngle,
      ringIndex
    };
  };

  const taskSegmentColors = {
    sous: '#4ade80',
    station: '#fde047', 
    junior: '#fb7185',
    trainee: '#c084fc'
  };

  const renderClockFace = () => {
    const centerX = 300;
    const centerY = 300;
    const baseRadius = 80;
    const ringWidth = 40;
    const maxRadius = baseRadius + (4 * ringWidth);

    return (
      <svg width="600" height="600" viewBox="0 0 600 600" className="mx-auto">
        {/* Background circles */}
        <circle cx={centerX} cy={centerY} r={maxRadius + 20} fill="#fff8f7" opacity="0.2" />
        <circle cx={centerX} cy={centerY} r={maxRadius} fill="#ffffff" opacity="0.5" />
        
        {/* Hour markers and labels */}
        {hours12.map((hour) => {
          const angle = getTimeAngle(hour);
          const labelRadius = maxRadius + 35;
          const x = centerX + labelRadius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + labelRadius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <g key={hour}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-semibold fill-gray-500"
              >
                {hour}
              </text>
            </g>
          );
        })}

        {/* Minute markers */}
        {minuteMarkers.map((minute) => {
          const angle = getTimeAngle(0, minute);
          const innerRadius = maxRadius + 10;
          const outerRadius = maxRadius + 15;
          const x1 = centerX + innerRadius * Math.cos((angle * Math.PI) / 180);
          const y1 = centerY + innerRadius * Math.sin((angle * Math.PI) / 180);
          const x2 = centerX + outerRadius * Math.cos((angle * Math.PI) / 180);
          const y2 = centerY + outerRadius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <line
              key={minute}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="2"
            />
          );
        })}

        {/* Concentric rings */}
        {[0, 1, 2, 3].map((ringIndex) => {
          const radius = baseRadius + (ringIndex * ringWidth);
          return (
            <circle
              key={ringIndex}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          );
        })}

        {/* Task segments */}
        {tasks.map((task, index) => {
          const ringIndex = ['sous', 'station', 'junior', 'trainee'].indexOf(task.chefRole);
          const { startAngle, sweepAngle } = getTaskSegment(task, ringIndex);
          const innerRadius = baseRadius + (ringIndex * ringWidth);
          const outerRadius = innerRadius + ringWidth - 4;
          
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + sweepAngle) * Math.PI) / 180;
          
          const x1 = centerX + innerRadius * Math.cos(startRad);
          const y1 = centerY + innerRadius * Math.sin(startRad);
          const x2 = centerX + outerRadius * Math.cos(startRad);
          const y2 = centerY + outerRadius * Math.sin(startRad);
          const x3 = centerX + outerRadius * Math.cos(endRad);
          const y3 = centerY + outerRadius * Math.sin(endRad);
          const x4 = centerX + innerRadius * Math.cos(endRad);
          const y4 = centerY + innerRadius * Math.sin(endRad);
          
          const largeArc = sweepAngle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${x1} ${y1}`,
            `L ${x2} ${y2}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}`,
            `L ${x4} ${y4}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`,
            'Z'
          ].join(' ');

          return (
            <path
              key={task.id}
              d={pathData}
              fill={taskSegmentColors[task.chefRole]}
              opacity="0.9"
              className="cursor-pointer hover:opacity-100 transition-opacity"
              onMouseEnter={(e) => {
                setHoveredTask(task);
                const rect = e.currentTarget.getBoundingClientRect();
                setHoverPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2
                });
              }}
              onMouseLeave={() => setHoveredTask(null)}
            />
          );
        })}

        {/* Center circle with time */}
        <circle cx={centerX} cy={centerY} r={baseRadius - 5} fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold fill-[#4a1710]"
        >
          {clockMode === '1hour' ? `${focusHour}:45 AM` : getCurrentTime()}
        </text>
        {clockMode === '1hour' && (
          <text
            x={centerX}
            y={centerY + 25}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-semibold fill-gray-500"
          >
            45 MIN
          </text>
        )}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 bg-gradient-to-b from-white to-gray-50">
      {/* Clock Mode Toggle */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 mb-12">
        <button
          onClick={() => setClockMode('1hour')}
          className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
            clockMode === '1hour'
              ? 'bg-[#FE5D4D] text-white shadow-md'
              : 'text-gray-600 hover:text-[#4a1710]'
          }`}
        >
          1 HOUR VIEW
        </button>
        <button
          onClick={() => setClockMode('12hour')}
          className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
            clockMode === '12hour'
              ? 'bg-[#FE5D4D] text-white shadow-md'
              : 'text-gray-600 hover:text-[#4a1710]'
          }`}
        >
          12 HOUR VIEW
        </button>
      </div>

      {/* Clock Visualization */}
      <div className="relative">
        {renderClockFace()}
        
        {/* Hour focus selector for 1-hour view */}
        {clockMode === '1hour' && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Focus Duration: 10 AM - 11 AM
            </span>
          </div>
        )}
      </div>

      {/* Hour selector for 1-hour mode */}
      {clockMode === '1hour' && (
        <div className="flex items-center gap-2 mt-20">
          {Array.from({ length: 7 }, (_, i) => i + 8).map((hour) => (
            <button
              key={hour}
              onClick={() => setFocusHour(hour)}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                focusHour === hour
                  ? 'bg-[#FE5D4D] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FE5D4D]'
              }`}
            >
              {hour}
            </button>
          ))}
        </div>
      )}

      {/* Hover Card */}
      {hoveredTask && (
        <ClockTaskCard
          task={hoveredTask}
          position={hoverPosition}
          onClose={() => setHoveredTask(null)}
        />
      )}
    </div>
  );
}
