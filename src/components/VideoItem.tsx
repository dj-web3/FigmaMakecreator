import { Play, Download, Share2, Edit, Copy, Trash2, FileText, Scissors } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoItemProps {
  video: {
    id: number;
    title: string;
    score: string;
    description: string;
    thumbnail: string;
    resolution: string;
    duration: string;
    featured?: boolean;
  };
  index: number;
}

const thumbnailImages = [
  "https://images.unsplash.com/photo-1659354219145-dedd2324698e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdmlkZW8lMjBjaGVmfGVufDF8fHx8MTc2NTUyOTUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758279745466-f5f4087a87d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwaW5zdHJ1Y3Rpb24lMjBraXRjaGVufGVufDF8fHx8MTc2NTUyOTUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758874960045-199a38f721f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjB0ZWNobmlxdWV8ZW58MXx8fHwxNzY1NTI5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1730596628352-08a13f00f5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJicyUyMGNvb2tpbmclMjBzcGljZXN8ZW58MXx8fHwxNzY1NTI5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1718421670841-19501b4a9e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmF0aW9uJTIwbWVhdCUyMGNoaWNrZW58ZW58MXx8fHwxNzY1NTI5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1612156508186-1a894033c4bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbiUyMGNvb2tpbmclMjBwYW58ZW58MXx8fHwxNzY1NTI5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1548690592-1fc9e7f78087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90JTIwbGlkfGVufDF8fHx8MTc2NTUyOTUwMnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1622001545761-9bd12a4b465b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcmVjaXBlJTIwY29va2luZ3xlbnwxfHx8fDE3NjU1Mjk1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
];

export function VideoItem({ video, index }: VideoItemProps) {
  const thumbnailUrl = thumbnailImages[index % thumbnailImages.length];

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden hover:border-[#ffd6d1] transition-all group">
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative shrink-0">
          <div className="w-[320px] h-[180px] bg-[#f5f5f5] rounded-lg overflow-hidden relative">
            <ImageWithFallback 
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full p-4 cursor-pointer hover:scale-110 transition-transform">
                <Play className="size-8 text-[#fe5d4d] fill-[#fe5d4d]" />
              </div>
            </div>
            {/* Resolution badge */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {video.resolution}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#4a1710] font-['Plus_Jakarta_Sans:Medium',sans-serif] text-sm">
                    #{video.id}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[#4a1710] truncate">
                    {video.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-[#fe5d4d] font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl">
                    {video.score}
                  </div>
                  <span className="text-[#999] text-sm">/10</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#6c63ff] hover:bg-[#5a52e0] text-white px-4 py-2 rounded-lg text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif] flex items-center gap-2 transition-colors">
                  <span>Publish</span>
                </button>
                <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
                  <Download className="size-5 text-[#4a1710]" />
                </button>
                <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
                  <Share2 className="size-5 text-[#4a1710]" />
                </button>
              </div>
            </div>
            <p className="text-[#666] text-sm leading-relaxed line-clamp-2 mt-2">
              {video.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#f0f0f0]">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4a1710] hover:bg-[#fff8f7] rounded-lg transition-colors">
              <Scissors className="size-4" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">Trim/Extend</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4a1710] hover:bg-[#fff8f7] rounded-lg transition-colors">
              <Edit className="size-4" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">Edit</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4a1710] hover:bg-[#fff8f7] rounded-lg transition-colors">
              <FileText className="size-4" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">Rename</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4a1710] hover:bg-[#fff8f7] rounded-lg transition-colors">
              <Copy className="size-4" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">Duplicate</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4a1710] hover:bg-[#fff8f7] rounded-lg transition-colors ml-auto">
              <Trash2 className="size-4" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">Delete</span>
            </button>
            <div className="flex items-center gap-1">
              <input 
                type="checkbox" 
                className="size-4 rounded border-[#ffd6d1] text-[#fe5d4d] focus:ring-[#fe5d4d]"
              />
            </div>
          </div>
        </div>

        {/* Duration indicator */}
        <div className="shrink-0 self-start">
          <div className="flex items-center gap-1 text-[#666] text-sm">
            <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif]">{video.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
