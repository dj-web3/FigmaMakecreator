import { useState } from 'react';
import { Task } from '../views/CreatePlanView';
import { ClockTaskCard } from './ClockTaskCard';

interface ClockViewProps {
  tasks: Task[];
}

const CHEF_COLORS = {
  sous:    '#22c55e',
  station: '#f59e0b',
  junior:  '#ef4444',
  trainee: '#a855f7',
};

const CHEF_LABELS: Record<string, string> = {
  sous:    'SOUS CHEF',
  station: 'STATION CHEF',
  junior:  'JUNIOR CHEF',
  trainee: 'TRAINEE CHEF',
};

const CHEF_BADGE: Record<string, string> = {
  SOUS:    'bg-green-100 text-green-700',
  STATION: 'bg-amber-100 text-amber-700',
  JUNIOR:  'bg-red-100 text-red-700',
  TRAINEE: 'bg-purple-100 text-purple-700',
};

const DAY_START_HOUR = 7;
const DAY_END_HOUR   = 19;

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function ClockView({ tasks }: ClockViewProps) {
  const [clockMode, setClockMode] = useState<'1hour' | '12hour'>('12hour');
  const [hoveredTask, setHoveredTask]     = useState<Task | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);
  const [focusHour, setFocusHour]         = useState(10);

  const CX = 300, CY = 300;
  const BASE_R = 80, RING_W = 40;
  const MAX_R = BASE_R + 4 * RING_W;

  // ── Arc opacity ──────────────────────────────────────────────────
  const arcOpacity = (taskId: string) => {
    if (!highlightedTaskId) return 0.88;
    return highlightedTaskId === taskId ? 1 : 0.15;
  };

  // ── Step card click ──────────────────────────────────────────────
  const handleStepCardClick = (task: Task) => {
    const isSame = highlightedTaskId === task.id;
    setHighlightedTaskId(isSame ? null : task.id);
    if (!isSame) {
      const [h] = task.startTime.split(':').map(Number);
      setFocusHour(Math.max(DAY_START_HOUR, Math.min(DAY_END_HOUR - 1, h)));
    }
  };

  // ── Angle helpers ────────────────────────────────────────────────
  const getAngle12 = (hour: number, minute = 0) =>
    ((hour % 12) * 30 + minute * 0.5) - 90;

  const getAngle1h = (minute: number) => minute * 6 - 90;

  // ── Arc path builder ─────────────────────────────────────────────
  const arcPath = (innerR: number, outerR: number, startDeg: number, sweepDeg: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const s = toRad(startDeg), e = toRad(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    const x1 = CX + innerR * Math.cos(s), y1 = CY + innerR * Math.sin(s);
    const x2 = CX + outerR * Math.cos(s), y2 = CY + outerR * Math.sin(s);
    const x3 = CX + outerR * Math.cos(e), y3 = CY + outerR * Math.sin(e);
    const x4 = CX + innerR * Math.cos(e), y4 = CY + innerR * Math.sin(e);
    return [
      `M ${x1} ${y1}`, `L ${x2} ${y2}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${x1} ${y1}`, 'Z',
    ].join(' ');
  };

  // ── 12h face ─────────────────────────────────────────────────────
  const render12h = () => (
    <>
      {[0,1,2,3].map(i => (
        <circle key={i} cx={CX} cy={CY} r={BASE_R + i * RING_W}
          fill="none" stroke="#f3f4f6" strokeWidth="1" />
      ))}
      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => {
        const ang = getAngle12(h);
        const r = MAX_R + 34;
        return (
          <text key={h}
            x={CX + r * Math.cos((ang * Math.PI) / 180)}
            y={CY + r * Math.sin((ang * Math.PI) / 180)}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="13" fontWeight="600" fill="#6b7280">{h}</text>
        );
      })}
      {Array.from({ length: 60 }, (_, m) => {
        const ang = getAngle12(0, m);
        const isMajor = m % 5 === 0;
        const r1 = MAX_R + (isMajor ? 8 : 4), r2 = MAX_R + (isMajor ? 16 : 8);
        const rad = (ang * Math.PI) / 180;
        return (
          <line key={m}
            x1={CX + r1 * Math.cos(rad)} y1={CY + r1 * Math.sin(rad)}
            x2={CX + r2 * Math.cos(rad)} y2={CY + r2 * Math.sin(rad)}
            stroke={isMajor ? '#d1d5db' : '#e5e7eb'} strokeWidth={isMajor ? 2 : 1} />
        );
      })}
      {tasks.map(task => {
        const [h, m] = task.startTime.split(':').map(Number);
        const startAng = getAngle12(h, m);
        const sweepAng = (task.duration / 60) * 30;
        const ringIdx = ['sous','station','junior','trainee'].indexOf(task.chefRole);
        if (ringIdx < 0) return null;
        const innerR = BASE_R + ringIdx * RING_W + 2;
        const outerR = innerR + RING_W - 6;
        return (
          <path key={task.id}
            d={arcPath(innerR, outerR, startAng, sweepAng)}
            fill={CHEF_COLORS[task.chefRole as keyof typeof CHEF_COLORS]}
            opacity={arcOpacity(task.id)}
            className="cursor-pointer transition-opacity duration-200"
            onMouseEnter={e => {
              setHoveredTask(task);
              const r = e.currentTarget.getBoundingClientRect();
              setHoverPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            onMouseLeave={() => setHoveredTask(null)} />
        );
      })}
      <circle cx={CX} cy={CY} r={BASE_R - 5} fill="white" stroke="#e5e7eb" strokeWidth="2" />
    </>
  );

  // ── 1h face ──────────────────────────────────────────────────────
  const render1h = () => {
    const focusStartMin = focusHour * 60;
    const focusEndMin   = focusStartMin + 60;
    const visible = tasks.filter(t => {
      const start = timeToMinutes(t.startTime);
      return start < focusEndMin && start + t.duration > focusStartMin;
    });
    return (
      <>
        {[0,1,2,3].map(i => (
          <circle key={i} cx={CX} cy={CY} r={BASE_R + i * RING_W}
            fill="none" stroke="#f3f4f6" strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }, (_, i) => i * 5).map(min => {
          const ang = getAngle1h(min);
          const r = MAX_R + 28;
          return (
            <text key={min}
              x={CX + r * Math.cos((ang * Math.PI) / 180)}
              y={CY + r * Math.sin((ang * Math.PI) / 180)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="12" fontWeight="600" fill="#6b7280">{min}</text>
          );
        })}
        {Array.from({ length: 60 }, (_, m) => {
          const ang = getAngle1h(m);
          const isMajor = m % 5 === 0;
          const r1 = MAX_R + (isMajor ? 8 : 4), r2 = MAX_R + (isMajor ? 16 : 8);
          const rad = (ang * Math.PI) / 180;
          return (
            <line key={m}
              x1={CX + r1 * Math.cos(rad)} y1={CY + r1 * Math.sin(rad)}
              x2={CX + r2 * Math.cos(rad)} y2={CY + r2 * Math.sin(rad)}
              stroke={isMajor ? '#d1d5db' : '#e5e7eb'} strokeWidth={isMajor ? 2 : 1} />
          );
        })}
        {visible.map(task => {
          const taskStart   = timeToMinutes(task.startTime);
          const clampedStart = Math.max(taskStart, focusStartMin) - focusStartMin;
          const clampedEnd   = Math.min(taskStart + task.duration, focusEndMin) - focusStartMin;
          const startAng = getAngle1h(clampedStart);
          const sweepAng = (clampedEnd - clampedStart) * 6;
          const ringIdx  = ['sous','station','junior','trainee'].indexOf(task.chefRole);
          if (ringIdx < 0 || sweepAng <= 0) return null;
          const innerR = BASE_R + ringIdx * RING_W + 2;
          const outerR = innerR + RING_W - 6;
          return (
            <path key={task.id}
              d={arcPath(innerR, outerR, startAng, sweepAng)}
              fill={CHEF_COLORS[task.chefRole as keyof typeof CHEF_COLORS]}
              opacity={arcOpacity(task.id)}
              className="cursor-pointer transition-opacity duration-200"
              onMouseEnter={e => {
                setHoveredTask(task);
                const r = e.currentTarget.getBoundingClientRect();
                setHoverPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              onMouseLeave={() => setHoveredTask(null)} />
          );
        })}
        <circle cx={CX} cy={CY} r={BASE_R - 5} fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <text x={CX} y={CY - 8} textAnchor="middle" dominantBaseline="middle"
          fontSize="13" fontWeight="700" fill="#374151">
          {focusHour % 12 === 0 ? 12 : focusHour % 12}{focusHour < 12 ? 'AM' : 'PM'}
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fill="#9ca3af">focus</text>
      </>
    );
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-gradient-to-b from-white to-gray-50">

      {/* ── LHS Step Panel (30%) ── */}
      <div style={{ width: '30%', flexShrink: 0 }} className="bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-[#4a1710] uppercase tracking-wider">Steps</p>
          <p className="text-xs text-gray-400 mt-0.5">Tap a step to highlight</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {tasks.length === 0 ? (
            <p className="text-xs text-gray-400 p-2">No steps — create a dish first.</p>
          ) : (
            tasks.map(task => {
              const isActive = highlightedTaskId === task.id;
              const color = CHEF_COLORS[task.chefRole as keyof typeof CHEF_COLORS] ?? '#6b7280';
              return (
                <button
                  key={task.id}
                  onClick={() => handleStepCardClick(task)}
                  className={`w-full text-left rounded-xl border px-3 py-2.5 transition-all ${
                    isActive
                      ? 'border-[#FE5D4D] bg-[#fff0ee] shadow-sm'
                      : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#4a1710] truncate">{task.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{task.duration} min · {task.startTime}</div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: color }} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      CHEF_BADGE[task.chefRole.toUpperCase()] ?? 'bg-gray-100 text-gray-600'
                    }`}>
                      {task.chefRole.toUpperCase()} CHEF
                    </span>
                    {task.process && (
                      <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF0EE] text-[#4a1710] border border-[#FE5D4D]/20">
                        {task.process}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Clock area ── */}
      <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col items-center overflow-auto py-8">

        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          {(['1hour', '12hour'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setClockMode(mode)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                clockMode === mode
                  ? 'bg-[#FE5D4D] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#4a1710]'
              }`}
            >
              {mode === '1hour' ? '1 HOUR VIEW' : '12 HOUR VIEW'}
            </button>
          ))}
        </div>

        {/* Hour pills — only in 1-hour view */}
        {clockMode === '1hour' && (
          <div className="flex flex-wrap justify-center gap-2 mt-5 px-6">
            {Array.from({ length: 13 }, (_, i) => {
              const h = i + 7; // 7 AM … 7 PM
              const label = h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
              const isActive = focusHour === h;
              return (
                <button
                  key={h}
                  onClick={() => setFocusHour(h)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FE5D4D] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Clock SVG */}
        <div className="relative mt-6">
          <svg width="600" height="600" viewBox="0 0 600 600" className="mx-auto">
            <circle cx={CX} cy={CY} r={MAX_R + 20} fill="#fff8f7" opacity="0.3" />
            <circle cx={CX} cy={CY} r={MAX_R} fill="white" opacity="0.6" />
            {clockMode === '12hour' ? render12h() : render1h()}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 flex-wrap justify-center px-4">
          {Object.entries(CHEF_COLORS).map(([role, color]) => (
            <div key={role} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {CHEF_LABELS[role]}
              </span>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredTask && (
          <ClockTaskCard
            task={hoveredTask}
            position={hoverPosition}
            onClose={() => setHoveredTask(null)}
          />
        )}
      </div>
    </div>
  );
}
