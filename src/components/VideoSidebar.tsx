import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChefHat } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  resolution: string;
  assignedTo: string | null;
  ingredients: {
    major: Array<{ name: string; image: string }>;
    minor: Array<{ name: string; image: string }>;
  };
}

interface VideoSidebarProps {
  videos: Video[];
  onVideoClick?: (videoId: number) => void;
  stepAssignments?: Record<string, string>;
}

// Parse description into steps
function parseSteps(description: string): string[] {
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

export function VideoSidebar({ videos, onVideoClick, stepAssignments = {} }: VideoSidebarProps) {
  // Get step assignments for a video
  const getVideoStepAssignments = (videoId: number, description: string) => {
    const steps = parseSteps(description);
    const assignments: string[] = [];
    
    steps.forEach((_, idx) => {
      const stepKey = `${videoId}-${idx}`;
      const chef = stepAssignments[stepKey];
      if (chef && !assignments.includes(chef)) {
        assignments.push(chef);
      }
    });
    
    return assignments;
  };

  return (
    <div className="w-[240px] border-r border-gray-200 bg-white overflow-y-auto">
      {/* Video List */}
      <div className="py-2">
        {videos.map((video) => {
          const stepAssigns = getVideoStepAssignments(video.id, video.description);
          
          return (
            <div 
              key={video.id}
              onClick={() => onVideoClick?.(video.id)}
              className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer group"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded flex items-center justify-center text-xs">
                {video.id}
              </div>

              {/* Thumbnail */}
              <div className="flex-shrink-0 w-12 h-16 bg-gray-200 rounded overflow-hidden relative">
                <ImageWithFallback 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and Assignments */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 line-clamp-3 leading-tight mb-1">
                  {video.title}
                </p>
                
                {/* Video-level Assignment */}
                {video.assignedTo && (
                  <div className="inline-block bg-[#FFE6E3] text-[#4A1710] text-[10px] px-2 py-0.5 rounded-full mt-1">
                    {video.assignedTo}
                  </div>
                )}
                
                {/* Step-level Assignments */}
                {stepAssigns.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stepAssigns.map((chef, idx) => (
                      <div key={idx} className="inline-flex items-center gap-0.5 bg-[#FFF8F7] border border-[#FFD6D1] text-[#4A1710] text-[9px] px-1.5 py-0.5 rounded-full">
                        <ChefHat className="size-2.5" />
                        <span>{chef}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}