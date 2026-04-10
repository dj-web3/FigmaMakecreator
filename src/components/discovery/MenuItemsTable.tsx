import { Clock } from 'lucide-react';
import { MenuItem } from '../views/DiscoveryView';

interface MenuItemsTableProps {
  items: MenuItem[];
}

const getRiskBadge = (score: number) => {
  if (score <= 20) {
    return {
      label: 'Low',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  } else if (score <= 50) {
    return {
      label: 'Medium',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  } else {
    return {
      label: 'High',
      color: 'bg-red-50 text-red-700 border-red-200'
    };
  }
};

const formatTime = (minutes: number) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes}m`;
};

export function MenuItemsTable({ items }: MenuItemsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
        <div className="w-1 h-5 bg-[#FE5D4D] rounded-full" />
        <h2 className="text-sm font-semibold text-[#4a1710]">
          Menu Performance Matrix
        </h2>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
        <div className="text-xs font-medium text-gray-600">
          Menu Item
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">
          Prep Window
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">
          Unit Margin
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">
          Demand
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">
          Risk Score
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">
          Status
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-50">
        {items.map((item) => {
          const risk = getRiskBadge(item.riskScore);
          
          return (
            <div
              key={item.id}
              className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group"
            >
              {/* Menu Item Name */}
              <div className="flex items-center">
                <span className="font-semibold text-[#4a1710] text-xs uppercase tracking-wide group-hover:text-[#FE5D4D] transition-colors">
                  {item.name}
                </span>
              </div>

              {/* Prep Window */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Clock className="size-3.5" />
                  <span className="text-xs font-medium">
                    {formatTime(item.prepWindow)}
                  </span>
                </div>
              </div>

              {/* Unit Margin */}
              <div className="flex items-center justify-center">
                <span className="text-xs font-semibold text-[#4a1710]">
                  ${item.unitMargin.toFixed(2)}
                </span>
              </div>

              {/* Demand */}
              <div className="flex items-center justify-center">
                <span className="text-base font-semibold text-[#4a1710]">
                  {item.demand}
                </span>
              </div>

              {/* Risk Score */}
              <div className="flex items-center justify-center">
                <span className="text-base font-semibold text-[#4a1710]">
                  {item.riskScore}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-semibold border ${risk.color}`}>
                  {risk.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
