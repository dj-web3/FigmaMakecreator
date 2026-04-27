import { useState, useRef } from 'react';
import { Task } from '../views/CreatePlanView';
import { ClockTaskCard } from './ClockTaskCard';

interface ClockViewProps {
  tasks: Task[];
}

const CHEF_COLORS = {
  sous: '#22c55e',
  station: '#f59e0b',
  junior: '#ef4444',
  trainee: '#a855f7',
};

const CHEF_LABELS: Record<string, string> = {
  sous: 'SOUS CHEF',
  station: 'STATION CHEF',
  junior: 'JUNIOR CHEF',
  trainee: 'TRAINEE CHEF',
};

// 7 AM → 7 PM range = 12 hours = 720 minutes
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 19;
const DAY_HOURS = DAY_END_HOUR - DAY_START_HOUR; // 12 hours

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function ClockView({ tasks }: ClockViewProps) {
  const [clockMode, setClockMode] = useState<'1hour' | '12hour'>('12hour');
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Focus hour for 1-hour view (7–18, so last hour starts at 18 = 6 PM)
  const [focusHour, setFocusHour] = useState(10);
  const sliderRef = useRef<HTMLInputElement>(null);

  const CX = 300;
  const CY = 300;
  const BASE_R = 80;
  const RING_W = 40;
  const MAX_R = BASE_R + 4 * RING_W;

  // ── 12h face: hours 1-12 at standard positions ──────────────────
  const getAngle12 = (hour: number, minute = 0) =>
    ((hour % 12) * 30 + minute * 0.5) - 90;

  // ── 1h face: 60 minutes around the full circle, 6° per minute ──
  // minute 0 = top (−90°), minute 30 = bottom
  const getAngle1h = (minute: number) => minute * 6 - 90;

  // ── Task arc helpers ────────────────────────────────────────────
  const arcPath = (
    innerR: number,
    outerR: number,
    startDeg: number,
    sweepDeg: number
  ) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const s = toRad(startDeg);
    const e = toRad(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    const x1 = CX + innerR * Math.cos(s);
    const y1 = CY + innerR * Math.sin(s);
    const x2 = CX + outerR * Math.cos(s);
    const y2 = CY + outerR * Math.sin(s);
    const x3 = CX + outerR * Math.cos(e);
    const y3 = CY + outerR * Math.sin(e);
    const x4 = CX + innerR * Math.cos(e);
    const y4 = CY + innerR * Math.sin(e);
    return [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${x1} ${y1}`,
      'Z',
    ].join(' ');
  };

  // ── Render 12-hour face ─────────────────────────────────────────
  const render12h = () => (
    <>
      {/* Grid rings */}
      {[0, 1, 2, 3].map(i => (
        <circle key={i} cx={CX} cy={CY} r={BASE_R + i * RING_W} fill="none" stroke="#f3f4f6" strokeWidth="1" />
      ))}

      {/* Hour labels */}
      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => {
        const ang = getAngle12(h);
        const r = MAX_R + 34;
        const x = CX + r * Math.cos((ang * Math.PI) / 180);
        const y = CY + r * Math.sin((ang * Math.PI) / 180);
        return (
          <text key={h} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill="#6b7280">
            {h}
          </text>
        );
      })}

      {/* Minute tick marks */}
      {Array.from({ length: 60 }, (_, m) => {
        const ang = getAngle12(0, m);
        const isMajor = m % 5 === 0;
        const r1 = MAX_R + (isMajor ? 8 : 4);
        const r2 = MAX_R + (isMajor ? 16 : 8);
        const rad = (ang * Math.PI) / 180;
        return (
          <line
            key={m}
            x1={CX + r1 * Math.cos(rad)} y1={CY + r1 * Math.sin(rad)}
            x2={CX + r2 * Math.cos(rad)} y2={CY + r2 * Math.sin(rad)}
            stroke={isMajor ? '#d1d5db' : '#e5e7eb'} strokeWidth={isMajor ? 2 : 1}
          />
        );
      })}

      {/* Task arcs */}
      {tasks.map(task => {
        const [h, m] = task.startTime.split(':').map(Number);
        const startAng = getAngle12(h, m);
        const sweepAng = (task.duration / 60) * 30;
        const ringIdx = ['sous', 'station', 'junior', 'trainee'].indexOf(task.chefRole);
        if (ringIdx < 0) return null;
        const innerR = BASE_R + ringIdx * RING_W + 2;
        const outerR = innerR + RING_W - 6;
        return (
          <path
            key={task.id}
            d={arcPath(innerR, outerR, startAng, sweepAng)}
            fill={CHEF_COLORS[task.chefRole as keyof typeof CHEF_COLORS]}
            opacity="0.88"
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onMouseEnter={e => {
              setHoveredTask(task);
              const r = e.currentTarget.getBoundingClientRect();
              setHoverPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            onMouseLeave={() => setHoveredTask(null)}
          />
        );
      })}

      {/* Center */}
      <circle cx={CX} cy={CY} r={BASE_R - 5} fill="white" stroke="#e5e7eb" strokeWidth="2" />
    </>
  );

  // ── Render 1-hour face ──────────────────────────────────────────
  const render1h = () => {
    const focusStartMin = focusHour * 60;
    const focusEndMin = focusStartMin + 60;

    // Filter tasks that overlap the focus window
    const visible = tasks.filter(t => {
      const start = timeToMinutes(t.startTime);
      const end = start + t.duration;
      return start < focusEndMin && end > focusStartMin;
    });

    return (
      <>
        {/* Grid rings */}
        {[0, 1, 2, 3].map(i => (
          <circle key={i} cx={CX} cy={CY} r={BASE_R + i * RING_W} fill="none" stroke="#f3f4f6" strokeWidth="1" />
        ))}

        {/* Minute labels: 0, 5, 10 … 55 */}
        {Array.from({ length: 12 }, (_, i) => i * 5).map(min => {
          const ang = getAngle1h(min);
          const r = MAX_R + 28;
          const x = CX + r * Math.cos((ang * Math.PI) / 180);
          const y = CY + r * Math.sin((ang * Math.PI) / 180);
          return (
            <text key={min} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="#6b7280">
              {min}
            </text>
          );
        })}

        {/* Minor tick marks every 1 minute */}
        {Array.from({ length: 60 }, (_, m) => {
          const ang = getAngle1h(m);
          const isMajor = m % 5 === 0;
          const r1 = MAX_R + (isMajor ? 8 : 4);
          const r2 = MAX_R + (isMajor ? 16 : 8);
          const rad = (ang * Math.PI) / 180;
          return (
            <line
              key={m}
              x1={CX + r1 * Math.cos(rad)} y1={CY + r1 * Math.sin(rad)}
              x2={CX + r2 * Math.cos(rad)} y2={CY + r2 * Math.sin(rad)}
              stroke={isMajor ? '#d1d5db' : '#e5e7eb'} strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}

        {/* Task arcs (mapped to minutes within the focus hour) */}
        {visible.map(task => {
          const taskStart = timeToMinutes(task.startTime);
          const clampedStart = Math.max(taskStart, focusStartMin) - focusStartMin;
          const clampedEnd = Math.min(taskStart + task.duration, focusEndMin) - focusStartMin;
          const startAng = getAngle1h(clampedStart);
          const sweepAng = (clampedEnd - clampedStart) * 6; // 6° per minute
          const ringIdx = ['sous', 'station', 'junior', 'trainee'].indexOf(task.chefRole);
          if (ringIdx < 0 || sweepAng <= 0) return null;
          const innerR = BASE_R + ringIdx * RING_W + 2;
          const outerR = innerR + RING_W - 6;
          return (
            <path
              key={task.id}
              d={arcPath(innerR, outerR, startAng, sweepAng)}
              fill={CHEF_COLORS[task.chefRole as keyof typeof CHEF_COLORS]}
              opacity="0.88"
              className="cursor-pointer hover:opacity-100 transition-opacity"
              onMouseEnter={e => {
                setHoveredTask(task);
                const r = e.currentTarget.getBoundingClientRect();
                setHoverPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              onMouseLeave={() => setHoveredTask(null)}
            />
          );
        })}

        {/* Center */}
        <circle cx={CX} cy={CY} r={BASE_R - 5} fill="white" stroke="#e5e7eb" strokeWidth="2" />

        {/* Focus label in center */}
        <text x={CX} y={CY - 8} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="700" fill="#374151">
          {focusHour % 12 === 0 ? 12 : focusHour % 12}
          {focusHour < 12 ? 'AM' : 'PM'}
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#9ca3af">
          focus
        </text>
      </>
    );
  };

  // ── Duration slider for 1h mode ─────────────────────────────────
  const hourLabels = Array.from({ length: DAY_HOURS + 1 }, (_, i) => {
    const h = DAY_START_HOUR + i;
    return h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`;
  });

  const sliderPercent = ((focusHour - DAY_START_HOUR) / (DAY_HOURS - 1)) * 100;

  return (
    <div className="flex flex-col items-center min-h-full py-8 bg-gradient-to-b from-white to-gray-50">

      {/* ── Mode toggle ── */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setClockMode('1hour')}
          className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
            clockMode === '1hour' ? 'bg-[#FE5D4D] text-white shadow-md' : 'text-gray-600 hover:text-[#4a1710]'
          }`}
        >
          1 HOUR VIEW
        </button>
        <button
          onClick={() => setClockMode('12hour')}
          className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
            clockMode === '12hour' ? 'bg-[#FE5D4D] text-white shadow-md' : 'text-gray-600 hover:text-[#4a1710]'
          }`}
        >
          12 HOUR VIEW
        </button>
      </div>

      {/* ── Duration slider (only in 1h mode) — shown directly below toggle ── */}
      {clockMode === '1hour' && (
        <div className="w-full max-w-xl px-6 mt-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Focus Hour</p>
              <span className="text-sm font-bold text-[#FE5D4D]">
                {hourLabels[focusHour - DAY_START_HOUR]} – {hourLabels[focusHour - DAY_START_HOUR + 1]}
              </span>
            </div>

            {/* Slider track */}
            <div className="relative pt-1 pb-3">
              <div className="relative h-2 bg-gray-100 rounded-full">
                {/* Filled portion */}
                <div
                  className="absolute h-2 bg-[#FE5D4D] rounded-full transition-all"
                  style={{ width: `${sliderPercent}%` }}
                />
                <input
                  ref={sliderRef}
                  type="range"
                  min={DAY_START_HOUR}
                  max={DAY_END_HOUR - 1}
                  value={focusHour}
                  onChange={e => setFocusHour(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                  style={{ margin: 0 }}
                />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#FE5D4D] rounded-full shadow-md border-2 border-white transition-all"
                  style={{ left: `${sliderPercent}%` }}
                />
              </div>

              {/* Hour labels below track */}
              <div className="flex justify-between mt-2">
                {['7AM', '9AM', '11AM', '1PM', '3PM', '5PM', '7PM'].map((label, i) => (
                  <span key={label} className="text-[9px] text-gray-400 font-medium">{label}</span>
                ))}
              </div>
            </div>

            {/* Quick hour chips */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {Array.from({ length: DAY_HOURS }, (_, i) => DAY_START_HOUR + i).map(h => {
                const label = h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`;
                const active = focusHour === h;
                // Check if any task falls in this hour
                const hasTasks = tasks.some(t => {
                  const start = timeToMinutes(t.startTime);
                  return start >= h * 60 && start < (h + 1) * 60;
                });
                return (
                  <button
                    key={h}
                    onClick={() => setFocusHour(h)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all relative ${
                      active
                        ? 'bg-[#FE5D4D] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                    {hasTasks && !active && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FE5D4D] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Clock face ── */}
      <div className="relative mt-6">
        <svg width="600" height="600" viewBox="0 0 600 600" className="mx-auto">
          <circle cx={CX} cy={CY} r={MAX_R + 20} fill="#fff8f7" opacity="0.3" />
          <circle cx={CX} cy={CY} r={MAX_R} fill="white" opacity="0.6" />
          {clockMode === '12hour' ? render12h() : render1h()}
        </svg>
      </div>

      {/* ── Chef color legend ── */}
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
  );
}
