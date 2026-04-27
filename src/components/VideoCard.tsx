import { Play, Clock, ChefHat, Thermometer, Sparkles, Flame, CookingPot } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { forwardRef, useState } from 'react';

interface Ingredient {
  name: string;
  image: string;
}

// Chef role color map for all-chef pills
const CHEF_PILL_COLORS: Record<string, string> = {
  SOUS:    'bg-green-100 text-green-700 border border-green-300',
  STATION: 'bg-amber-100 text-amber-700 border border-amber-300',
  JUNIOR:  'bg-red-100 text-red-700 border border-red-300',
  TRAINEE: 'bg-purple-100 text-purple-700 border border-purple-300',
};

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: string;
    description: string;
    thumbnail: string;
    resolution: string;
    assignedTo: string | null;
    allChefs?: string[];
    process?: string;
    startTime?: string;
    ingredients: {
      major: Ingredient[];
      minor: Ingredient[];
    };
  };
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
  onRename: (id: number, newTitle: string) => void;
  onScroll: (id: number) => void;
  onStepAssign?: (videoId: number, stepIndex: number, chef: string) => void;
  stepAssignments?: Record<string, string>;
  readOnly?: boolean;
}

const chefCategories = [
  'Sous chef',
  'Trainee chef',
  'Junior chef',
  'Station chef'
];

// Parse description into steps
function parseSteps(description: string): string[] {
  // Split by sentence endings followed by capital letters or end of string
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

// Extract heading from step text
function extractStepHeading(stepText: string): string {
  // Get first part up to first verb or action
  const firstPart = stepText.split(/\.|,/)[0];
  return firstPart.trim();
}

// Determine icon type based on step content
function getStepIcon(stepText: string): 'time' | 'chef' | 'cold' | 'flame' | 'oven' {
  const lowerText = stepText.toLowerCase();
  
  // Check for cold temperature (fridge, freezer, refrigerate)
  if (lowerText.includes('fridge') || lowerText.includes('refrigerat') || 
      lowerText.includes('freez') || lowerText.includes('chill') || lowerText.includes('cold')) {
    return 'cold';
  }
  
  // Check for oven-related
  if (lowerText.includes('oven') || lowerText.includes('bake') || lowerText.includes('roast')) {
    return 'oven';
  }
  
  // Check for cooking with heat/flame
  if (lowerText.includes('cook') || lowerText.includes('fry') || lowerText.includes('heat') ||
      lowerText.includes('boil') || lowerText.includes('sauté') || lowerText.includes('seal') ||
      lowerText.includes('high') || lowerText.includes('medium') || lowerText.includes('low')) {
    return 'flame';
  }
  
  // Check for time-related keywords
  if (lowerText.includes('rest') || lowerText.includes('wait') ||
      lowerText.includes('settle') || lowerText.includes('soak')) {
    return 'time';
  }
  
  // Default to chef action
  return 'chef';
}

// Extract time duration from step text
function extractTimeDuration(stepText: string): string | null {
  const lowerText = stepText.toLowerCase();
  
  // Match patterns like "2 hours", "40-45 minutes", "15-20 minutes", "at least 2 hours"
  const timePatterns = [
    /(\d+-?\d*)\s*(minutes?|mins?)/i,
    /(\d+-?\d*)\s*(hours?|hrs?)/i,
  ];
  
  for (const pattern of timePatterns) {
    const match = lowerText.match(pattern);
    if (match) {
      const value = match[1];
      const unit = match[2];
      
      // Format the duration
      if (unit.includes('hour') || unit.includes('hr')) {
        return `${value}hr`;
      } else {
        return `${value}m`;
      }
    }
  }
  
  return null;
}

// Extract temperature from step text
function extractTemperature(stepText: string): string | null {
  const text = stepText;
  
  // Match patterns like "350°F", "350-400°F", "350 degrees F", "350 F"
  const tempPatterns = [
    /(\d+)\s*-?\s*(\d+)?\s*°?\s*F(?:ahrenheit)?/i,
    /(\d+)\s*-?\s*(\d+)?\s*degrees?\s*F(?:ahrenheit)?/i,
  ];
  
  for (const pattern of tempPatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[2]) {
        // Range like "350-400"
        return `${match[1]}-${match[2]}°F`;
      } else {
        // Single value like "350"
        return `${match[1]}°F`;
      }
    }
  }
  
  // Check for heat level descriptions and convert to approximate temps
  const lowerText = stepText.toLowerCase();
  if (lowerText.includes('high heat')) {
    return '400-450°F';
  } else if (lowerText.includes('medium-high heat') || lowerText.includes('medium high')) {
    return '375-400°F';
  } else if (lowerText.includes('medium heat')) {
    return '325-375°F';
  } else if (lowerText.includes('medium-low heat') || lowerText.includes('medium low')) {
    return '275-325°F';
  } else if (lowerText.includes('low heat') || lowerText.includes('lowest heat')) {
    return '200-250°F';
  }
  
  return null;
}

// Determine if a step is important/crucial
function isImportantStep(stepText: string, stepIndex: number, totalSteps: number): boolean {
  const lowerText = stepText.toLowerCase();
  
  // Keywords that indicate crucial steps
  const importantKeywords = [
    'crucial', 'important', 'ensure', 'seal', 'key',
    'perfect', 'essential', 'critical', 'must',
    'carefully', 'attention', 'technique'
  ];
  
  // Check if step contains important keywords
  const hasImportantKeyword = importantKeywords.some(keyword => 
    lowerText.includes(keyword)
  );
  
  // First step is often important for prep
  const isFirstStep = stepIndex === 0;
  
  return hasImportantKeyword || isFirstStep;
}

export const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(
  ({ video, isSelected, onSelect, onRename, onStepAssign, stepAssignments, readOnly = false }, ref) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(video.title);

    const steps = parseSteps(video.description);

    const handleTitleSave = () => {
      if (editedTitle.trim() && editedTitle !== video.title) {
        onRename(video.id, editedTitle);
      }
      setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTitleSave();
      } else if (e.key === 'Escape') {
        setEditedTitle(video.title);
        setIsEditingTitle(false);
      }
    };

    return (
      <div 
        ref={ref}
        className={`bg-white border rounded-lg hover:border-[#FFD3D3] transition-colors ${
          isSelected ? 'border-[#FE5D4D]' : 'border-[#FFD3D3]'
        }`}
      >
        <div className="p-4">
          {/* Top Section - Video and Content */}
          <div className="flex gap-4 mb-4">
            {/* Vertical Video Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-[160px] h-[240px] bg-gray-900 rounded-lg overflow-hidden relative group">
                <ImageWithFallback 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Resolution Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.resolution}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white rounded-full p-3 cursor-pointer hover:scale-110 transition-transform">
                    <Play className="size-8 text-gray-900 fill-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title — editable in Create Menu, read-only in Create Guide */}
              <div className="flex items-start gap-2 mb-2">
                {!readOnly && isEditingTitle ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyDown={handleTitleKeyDown}
                    className="flex-1 text-base font-medium text-gray-900 border border-[#FE5D4D] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]"
                    autoFocus
                  />
                ) : (
                  <h3
                    className={`text-base font-medium text-gray-900 px-2 py-1 rounded transition-colors ${!readOnly ? 'editable-title cursor-text hover:bg-gray-50' : 'select-text'}`}
                    onClick={() => { if (!readOnly) setIsEditingTitle(true); }}
                  >
                    <span className="text-gray-500">#{video.id}</span>
                    <span className="ml-2">{editedTitle}</span>
                  </h3>
                )}
              </div>

              {/* Duration, Start Time, Process, and Chef Pills */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {/* Duration Pill */}
                <div className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                  {video.duration}
                </div>

                {/* Start Time Pill */}
                {video.startTime && (
                  <div className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                    <Clock className="size-3 text-gray-400" />
                    {video.startTime}
                  </div>
                )}

                {/* Process Badge */}
                {video.process && (
                  <div className="inline-block bg-[#FFF0EE] text-[#4A1710] text-xs px-2.5 py-1 rounded-full font-medium border border-[#FE5D4D]/20">
                    {video.process}
                  </div>
                )}

                {/* All Chef Pills (from Create Menu) */}
                {video.allChefs && video.allChefs.length > 0 ? (
                  video.allChefs.map(chef => (
                    <div
                      key={chef}
                      className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
                        CHEF_PILL_COLORS[chef] ?? 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {chef.charAt(0) + chef.slice(1).toLowerCase()}
                    </div>
                  ))
                ) : video.assignedTo ? (
                  <div className="inline-block bg-[#FFE6E3] text-[#4A1710] text-xs px-3 py-1 rounded-full font-medium">
                    {video.assignedTo}
                  </div>
                ) : null}
              </div>

              {/* Ingredients Section - In Grey Boxes */}
              {(video.ingredients.major.length > 0 || video.ingredients.minor.length > 0) && (
                <div className="mb-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredients Required</h4>
                  
                  <div className="flex gap-3">
                    {/* Major Ingredients */}
                    {video.ingredients.major.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
                        <p className="text-xs text-gray-600 font-medium mb-2">Main Ingredients</p>
                        <div className="flex flex-wrap gap-3">
                          {video.ingredients.major.map((ingredient, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mb-1">
                                <ImageWithFallback 
                                  src={ingredient.image}
                                  alt={ingredient.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-[10px] text-gray-700 text-center max-w-[60px] leading-tight">
                                {ingredient.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Minor Ingredients */}
                    {video.ingredients.minor.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
                        <p className="text-xs text-gray-600 font-medium mb-2">Spices & Aromatics</p>
                        <div className="flex flex-wrap gap-2">
                          {video.ingredients.minor.map((ingredient, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 mb-1">
                                <ImageWithFallback 
                                  src={ingredient.image}
                                  alt={ingredient.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-[9px] text-gray-600 text-center max-w-[50px] leading-tight">
                                {ingredient.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Method Section - Full Width */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Method</h4>
            
            {/* Vertical Step Cards */}
            <div className="space-y-2">
              {steps.map((step, idx) => {
                const iconType = getStepIcon(step);
                const timeDuration = extractTimeDuration(step);
                const temperature = extractTemperature(step);
                const stepHeading = extractStepHeading(step);
                const isKeyStep = isImportantStep(step, idx, steps.length);
                const stepKey = `${video.id}-${idx}`;
                const assignedChef = stepAssignments?.[stepKey];
                
                return (
                  <div 
                    key={idx} 
                    className={`rounded-lg p-3 relative transition-all ${
                      isKeyStep 
                        ? 'bg-gradient-to-r from-[#FFF8F7] to-gray-50 border-l-2 border-l-[#FE5D4D] border-y border-r border-gray-200 shadow-sm' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {/* Step number in corner - subtle */}
                    <span className="absolute top-2 right-3 text-[10px] text-gray-400 font-medium">
                      {idx + 1}
                    </span>
                    
                    {/* Key Step Badge */}
                    {isKeyStep && (
                      <div className="absolute top-2 left-2">
                        <Sparkles className="size-3.5 text-[#FE5D4D] opacity-70" />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      {/* Icon based on step type */}
                      <div className="flex-shrink-0 mt-0.5">
                        {iconType === 'time' && (
                          <Clock className={`size-5 ${isKeyStep ? 'text-[#FE5D4D]' : 'text-gray-600'}`} />
                        )}
                        {iconType === 'cold' && (
                          <Thermometer className={`size-5 ${isKeyStep ? 'text-[#FE5D4D]' : 'text-gray-600'}`} />
                        )}
                        {iconType === 'chef' && (
                          <ChefHat className={`size-5 ${isKeyStep ? 'text-[#FE5D4D]' : 'text-gray-600'}`} />
                        )}
                        {iconType === 'flame' && (
                          <Flame className={`size-5 ${isKeyStep ? 'text-[#FE5D4D]' : 'text-gray-600'}`} />
                        )}
                        {iconType === 'oven' && (
                          <CookingPot className={`size-5 ${isKeyStep ? 'text-[#FE5D4D]' : 'text-gray-600'}`} />
                        )}
                      </div>
                      
                      <div className="flex-1 pr-6">
                        {/* Step Heading */}
                        <h5 className={`text-sm font-medium mb-1.5 ${isKeyStep ? 'text-[#4A1710]' : 'text-gray-900'}`}>
                          {stepHeading}
                        </h5>
                        
                        {/* Step Description */}
                        <p className="text-xs text-gray-700 leading-relaxed mb-2">
                          {step}
                        </p>
                        
                        {/* Pills Container */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Time Duration Pill */}
                          {timeDuration && (
                            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1">
                              <Clock className="size-3 text-gray-500" />
                              <span className="text-[10px] text-gray-600 font-medium">{timeDuration}</span>
                            </div>
                          )}
                          
                          {/* Temperature Pill */}
                          {temperature && (
                            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1">
                              <Thermometer className="size-3 text-gray-500" />
                              <span className="text-[10px] text-gray-600 font-medium">{temperature}</span>
                            </div>
                          )}
                          
                          {/* Assigned Chef Pill */}
                          {assignedChef && (
                            <div className="inline-flex items-center gap-1 bg-[#FFE6E3] border border-[#FFD6D1] rounded-full px-2 py-1">
                              <ChefHat className="size-3 text-[#4A1710]" />
                              <span className="text-[10px] text-[#4A1710] font-medium">{assignedChef}</span>
                            </div>
                          )}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }
);

VideoCard.displayName = 'VideoCard';