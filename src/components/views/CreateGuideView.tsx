import { ArrowLeft, Search, MoreVertical, HelpCircle, Sparkles } from 'lucide-react';
import { VideoSidebar } from '../VideoSidebar';
import { VideoCard } from '../VideoCard';
import { VideoActions } from '../VideoActions';
import { AIChatDrawer } from '../AIChatDrawer';
import { CommonHeader } from '../CommonHeader';
import { RMINTFab } from '../RMINTFab';
import { useState, useRef } from 'react';
import type { SharedDishData } from '../../App';

const videoClips = [
  {
    id: 1,
    title: "Marinating the Chicken - Building Flavor Foundation",
    duration: "15mins.",
    description: "Start by marinating the chicken pieces with yogurt, ginger-garlic paste, and aromatic spices. This crucial step ensures tender, flavorful meat. The yogurt tenderizes the chicken while the spices penetrate deep into the meat. Let it rest for at least 2 hours, or overnight for best results. Mix well to ensure every piece is coated evenly.",
    thumbnail: "https://images.unsplash.com/photo-1749197654348-6883d2eea757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWFyaW5hdGluZyUyMGJvd2x8ZW58MXx8fHwxNzY1NTM5MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Chicken", image: "https://images.unsplash.com/photo-1690519315565-c31ce99f8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBjaGlja2VuJTIwcGllY2VzfGVufDF8fHx8MTc2NTUzOTM2NHww&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Yogurt", image: "https://images.unsplash.com/photo-1719077518819-9ddbc5c6ef62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBib3dsJTIwd2hpdGV8ZW58MXx8fHwxNzY1NTM5MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Ginger Garlic", image: "https://images.unsplash.com/photo-1606172150255-64e15da65c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjBnYXJsaWMlMjBwYXN0ZXxlbnwxfHx8fDE3NjU1MzkzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: [
        { name: "Cardamom", image: "https://images.unsplash.com/photo-1592501054695-053ef5884468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYW1vbSUyMHNwaWNlJTIwcG9kc3xlbnwxfHx8fDE3NjU1MzkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Cinnamon", image: "https://images.unsplash.com/photo-1601379758962-cadba22b1e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5uYW1vbiUyMHN0aWNrc3xlbnwxfHx8fDE3NjU1Mjc1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080" }
      ]
    }
  },
  {
    id: 2,
    title: "Parboiling the Basmati Rice to Perfection",
    duration: "12mins.",
    description: "Rinse the basmati rice thoroughly until water runs clear. Boil water with whole spices and salt. Add the rice and cook until 70% done - the grains should still have a bite. This is crucial as the rice will continue cooking during dum. Drain immediately and spread on a plate to prevent overcooking.",
    thumbnail: "https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNtYXRpJTIwcmljZSUyMGNvb2tpbmd8ZW58MXx8fHwxNzY1NTM5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Basmati Rice", image: "https://images.unsplash.com/photo-1505216980056-a7b7b1c6e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNtYXRpJTIwcmljZSUyMGdyYWluc3xlbnwxfHx8fDE3NjU1MzkzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: [
        { name: "Bay Leaves", image: "https://images.unsplash.com/photo-1749044005505-d37ee622eee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXklMjBsZWF2ZXMlMjBkcmllZHxlbnwxfHx8fDE3NjU1MzkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Cardamom", image: "https://images.unsplash.com/photo-1592501054695-053ef5884468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYW1vbSUyMHNwaWNlJTIwcG9kc3xlbnwxfHx8fDE3NjU1MzkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Cinnamon", image: "https://images.unsplash.com/photo-1601379758962-cadba22b1e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5uYW1vbiUyMHN0aWNrc3xlbnwxfHx8fDE3NjU1Mjc1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080" }
      ]
    }
  },
  {
    id: 3,
    title: "Frying Onions Until Golden Brown",
    duration: "20mins.",
    description: "Thinly slice onions and deep fry them in hot oil until they turn golden brown and crispy. This step requires patience and constant attention. The fried onions (birista) add a sweet, caramelized flavor and beautiful color to the biryani. Save some for garnishing at the end.",
    thumbnail: "https://images.unsplash.com/photo-1719024682396-2b8ed97310f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbnMlMjBmcnlpbmclMjBnb2xkZW58ZW58MXx8fHwxNzY1NTM5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Onions", image: "https://images.unsplash.com/photo-1765295218728-8e29bb47c1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbnMlMjBzbGljZWR8ZW58MXx8fHwxNzY1NTM5MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: []
    }
  },
  {
    id: 4,
    title: "Cooking Spices and Chicken Together",
    duration: "25mins.",
    description: "Heat ghee and add whole spices. Once fragrant, add the marinated chicken. Cook on high heat initially to seal the juices, then reduce to medium. The chicken should be 80% cooked. Add half the fried onions and fresh herbs. The aroma of spices cooking with chicken is the soul of biryani.",
    thumbnail: "https://images.unsplash.com/photo-1651774178704-60e212482645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBjb29raW5nJTIwcGFufGVufDF8fHx8MTc2NTUzOTM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Ghee", image: "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGVlJTIwY2xhcmlmaWVkJTIwYnV0dGVyfGVufDF8fHx8MTc2NTUzOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1648036933917-762235e009c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVhdmVzJTIwZnJlc2h8ZW58MXx8fHwxNzY1NTIxMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Coriander", image: "https://images.unsplash.com/photo-1723810315254-e189f1294bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWxhbnRybyUyMGNvcmlhbmRlciUyMGZyZXNofGVufDF8fHx8MTc2NTUzOTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: [
        { name: "Cardamom", image: "https://images.unsplash.com/photo-1592501054695-053ef5884468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYW1vbSUyMHNwaWNlJTIwcG9kc3xlbnwxfHx8fDE3NjU1MzkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Bay Leaves", image: "https://images.unsplash.com/photo-1749044005505-d37ee622eee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXklMjBsZWF2ZXMlMjBkcmllZHxlbnwxfHx8fDE3NjU1MzkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" }
      ]
    }
  },
  {
    id: 5,
    title: "Layering Rice and Chicken - The Art of Dum",
    duration: "10mins.",
    description: "In a heavy-bottomed pot, create layers starting with chicken at the bottom. Add a layer of rice, then sprinkle fried onions and fresh herbs. Repeat the layers. The layering technique ensures every bite has rice, meat, and aromatics. This is where the magic of biryani begins.",
    thumbnail: "https://images.unsplash.com/photo-1649777476920-0eef34169cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXllcmVkJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzY1NTM5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Mint", image: "https://images.unsplash.com/photo-1648036933917-762235e009c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVhdmVzJTIwZnJlc2h8ZW58MXx8fHwxNzY1NTIxMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Coriander", image: "https://images.unsplash.com/photo-1723810315254-e189f1294bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWxhbnRybyUyMGNvcmlhbmRlciUyMGZyZXNofGVufDF8fHx8MTc2NTUzOTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Onions", image: "https://images.unsplash.com/photo-1765295218728-8e29bb47c1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbnMlMjBzbGljZWR8ZW58MXx8fHwxNzY1NTM5MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: []
    }
  },
  {
    id: 6,
    title: "Adding Saffron Milk and Ghee",
    duration: "5mins.",
    description: "Soak saffron threads in warm milk to release their color and aroma. Drizzle this golden saffron milk over the layered rice in a decorative pattern. Add dots of ghee on top. The saffron gives the characteristic yellow-orange streaks and royal fragrance to the biryani.",
    thumbnail: "https://images.unsplash.com/photo-1699723521107-bb297f2642ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZmcm9uJTIwbWlsayUyMGdvbGRlbnxlbnwxfHx8fDE3NjU1MzkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Saffron", image: "https://images.unsplash.com/photo-1709004157726-cb9df09bfce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZmcm9uJTIwdGhyZWFkc3xlbnwxfHx8fDE3NjU1MzkzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Ghee", image: "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGVlJTIwY2xhcmlmaWVkJTIwYnV0dGVyfGVufDF8fHx8MTc2NTUzOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: []
    }
  },
  {
    id: 7,
    title: "Sealing and Cooking on Dum",
    duration: "45mins.",
    description: "Cover the pot with a tight-fitting lid. Seal the edges with dough to trap all the steam inside. Cook on high heat for 3 minutes, then reduce to lowest heat. Let it cook for 40-45 minutes. The sealed pot creates a pressure-cooker effect, steaming the rice and infusing all flavors.",
    thumbnail: "https://images.unsplash.com/photo-1706263484944-1b9910d14540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFsZWQlMjBjb29raW5nJTIwcG90fGVufDF8fHx8MTc2NTUzOTM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [],
      minor: []
    }
  },
  {
    id: 8,
    title: "Resting the Biryani Before Serving",
    duration: "20mins.",
    description: "Once cooking is complete, turn off the heat but don't open the lid immediately. Let the biryani rest for 15-20 minutes. This resting period allows the steam to settle and the flavors to meld together perfectly. The rice firms up and separates beautifully.",
    thumbnail: "https://images.unsplash.com/photo-1666251214795-a1296307d29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwc2VydmluZyUyMHBsYXRlfGVufDF8fHx8MTc2NTUzOTM1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [],
      minor: []
    }
  },
  {
    id: 9,
    title: "Garnishing and Final Presentation",
    duration: "8mins.",
    description: "Gently open the lid and breathe in the aromatic steam. Garnish with remaining fried onions, fresh mint, and coriander leaves. Serve hot with raita, pickle, and papad. The presentation is crucial - serve from the pot to show the beautiful layers of saffron-colored rice and aromatic chicken.",
    thumbnail: "https://images.unsplash.com/photo-1694035449560-bbcfc84baef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwZ2FybmlzaGVkJTIwaGVyYnN8ZW58MXx8fHwxNzY1NTM5MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    resolution: "720p",
    assignedTo: null,
    ingredients: {
      major: [
        { name: "Mint", image: "https://images.unsplash.com/photo-1648036933917-762235e009c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVhdmVzJTIwZnJlc2h8ZW58MXx8fHwxNzY1NTIxMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Coriander", image: "https://images.unsplash.com/photo-1723810315254-e189f1294bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWxhbnRybyUyMGNvcmlhbmRlciUyMGZyZXNofGVufDF8fHx8MTc2NTUzOTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
        { name: "Onions", image: "https://images.unsplash.com/photo-1765295218728-8e29bb47c1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbnMlMjBzbGljZWR8ZW58MXx8fHwxNzY1NTM5MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080" }
      ],
      minor: []
    }
  }
];

interface CreateGuideViewProps {
  sharedDish?: SharedDishData;
}

export function CreateGuideView({ sharedDish }: CreateGuideViewProps) {
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const videoRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Merge DB guide steps with live methodology data from Create Menu.
  // methodology[i] carries the current title, chefs, and duration set by the user.
  const baseVideos = sharedDish?.guideSteps ?? videoClips;
  const videos = baseVideos.map((video, i) => {
    const step = sharedDish?.methodology?.[i];
    return {
      ...video,
      // Title: use what the user typed in Create Menu, fall back to DB title
      title: step?.title || video.title,
      // Chef: use the first assigned chef from Create Menu
      assignedTo: step?.chefs?.[0] ?? video.assignedTo ?? null,
      // Duration: use value from Create Menu if set
      duration: step?.duration || video.duration,
    };
  });

  // Build stepAssignments from methodology so chef pills show on sub-steps too.
  // Key format matches VideoCard: `${videoId}-${stepIndex}`.
  const stepAssignments: Record<string, string> = {};
  if (sharedDish?.methodology) {
    sharedDish.methodology.forEach((step, videoIdx) => {
      const videoId = baseVideos[videoIdx]?.id;
      if (videoId == null) return;
      if (step.chefs?.[0]) {
        // Assign the chef to step 0 of this video card (the first sub-step)
        stepAssignments[`${videoId}-0`] = step.chefs[0];
      }
    });
  }

  const handleScrollToVideo = (id: number) => {
    const videoElement = videoRefs.current[id];
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* AI Chat Drawer */}
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />

      {/* Top Header - Full Width */}
      <CommonHeader
        mainItem={sharedDish?.dishName ?? 'Chicken Biryani'}
        title={sharedDish?.subtitle ?? 'A step-by-step guide to the best rice dish ever'}
      />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Numbered Video List */}
        <VideoSidebar
          videos={videos}
          onVideoClick={handleScrollToVideo}
          stepAssignments={stepAssignments}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Cards Container */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto p-6">
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex gap-4">
                    <div className="flex-1">
                      <VideoCard
                        video={video}
                        isSelected={false}
                        onSelect={() => {}}
                        onRename={() => {}}
                        readOnly={true}
                        onScroll={handleScrollToVideo}
                        stepAssignments={stepAssignments}
                        ref={el => videoRefs.current[video.id] = el}
                      />
                    </div>
                    <VideoActions videoId={video.id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}