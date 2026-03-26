import { Play, ChevronDown, MoreVertical } from 'lucide-react';
import { VideoItem } from './VideoItem';

const videoClips = [
  {
    id: 1,
    title: "The Wait is Over: Cracking Open the Biryani",
    score: "9.8",
    description: "The ultimate payoff. Tracks the end of cooking, the suspense of opening the seal, and the visual proof that the biryani worked perfectly.",
    thumbnail: "cooking video",
    resolution: "720p",
    duration: "9:16",
    featured: true
  },
  {
    id: 2,
    title: "STOP! Don't Overcook Your Biryani Rice",
    score: "9.6",
    description: "All right. She's been cooking for off 40 minutes in total. We're gonna let it rest for 20 minutes before you cracker open, time to cracker open.",
    thumbnail: "cooking instruction",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 3,
    title: "The Theatrical Dough Seal for Maximum Drama",
    score: "9.4",
    description: "It's always a bit nerve-wrecking, breaking one of these open that you're not being able to see what I do as I'm cooking.",
    thumbnail: "cooking technique",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 4,
    title: "Building the Flavor with Herbs and Aromatics",
    score: "9.2",
    description: "There's no hiding it. So what we're looking for was nice individual grains of rice, chicken nicely cooked and look at that.",
    thumbnail: "herbs cooking",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 5,
    title: "The Secret Marination Time",
    score: "9.0",
    description: "That is what we're after, alright. She's been cooking for off 40 minutes in total.",
    thumbnail: "marination process",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 6,
    title: "The Moment Your Onion Turns 50 Cent Brown",
    score: "8.8",
    description: "We're gonna let it rest for 20 minutes before you cracker open, time to cracker open.",
    thumbnail: "onion cooking",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 7,
    title: "Sealing the Biryani Pot: Dough vs. Tight Lid",
    score: "8.6",
    description: "It's always a bit nerve-wrecking, breaking one of these open that you're not being able to see.",
    thumbnail: "sealing pot",
    resolution: "720p",
    duration: "9:16"
  },
  {
    id: 8,
    title: "My 140M View Recipe Gets an Upgrade",
    score: "8.4",
    description: "Nice individual grains of rice, chicken nicely cooked and look at that. That is what we're after.",
    thumbnail: "recipe upgrade",
    resolution: "720p",
    duration: "9:16"
  }
];

export function VideoList() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#4a1710] text-[24px]">
            Chicken Biryani - A step-by-step guide to the best rice dish ever
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#fff8f7] border border-[#ffd6d1] rounded-lg px-4 py-2 text-[#4a1710] text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif] hover:bg-[#ffeae7] transition-colors">
            Upgrade
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4 pb-4 border-b border-[#ffd6d1]">
        <div className="flex items-center gap-2">
          <span className="text-[#4a1710] text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif]">9:16</span>
        </div>
        <button className="flex items-center gap-2 text-[#4a1710] text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif] hover:text-[#fe5d4d] transition-colors">
          <span>Filter</span>
          <ChevronDown className="size-4" />
        </button>
        <button className="flex items-center gap-2 text-[#4a1710] text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif] hover:text-[#fe5d4d] transition-colors">
          <span>Highest score</span>
          <ChevronDown className="size-4" />
        </button>
        <button className="ml-auto text-[#4a1710] text-sm font-['Plus_Jakarta_Sans:Medium',sans-serif] hover:text-[#fe5d4d] transition-colors">
          Select all
        </button>
      </div>

      {/* Video Items */}
      <div className="space-y-4">
        {videoClips.map((video, index) => (
          <VideoItem 
            key={video.id} 
            video={video} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
