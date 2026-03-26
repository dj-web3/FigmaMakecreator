import { Sparkles } from 'lucide-react';

interface CommonHeaderProps {
  title: string;
  mainItem?: string;
  onAIClick?: () => void;
}

export function CommonHeader({ title, mainItem }: CommonHeaderProps) {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
      <div className="flex items-center gap-3">
        {mainItem && (
          <>
            <div className="px-3 py-1.5 bg-[#fff8f7] border border-[#ffd6d1] text-[#4a1710] rounded-full font-medium text-sm">
              {mainItem}
            </div>
            <div className="w-px h-6 bg-gray-300" />
          </>
        )}
        <h1 className="text-base font-medium text-[#4a1710]">{title}</h1>
      </div>
    </div>
  );
}