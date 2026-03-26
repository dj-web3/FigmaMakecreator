import { useState, useRef, useEffect } from 'react';
import { CommonHeader } from '../CommonHeader';
import { AIChatDrawer } from '../AIChatDrawer';
import { RMINTFab } from '../RMINTFab';
import { SkillSelector } from '../SkillSelector';
import { ChefSelector } from '../ChefSelector';
import { Plus, Sparkles, ZoomIn, ZoomOut, Hand, Play, FileText, Clock, Package } from 'lucide-react';
import generatedCardImage from 'figma:asset/1bba9780dcb32fd6fc27cb960ad8117745575d99.png';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  image: string;
}

interface FlowNode {
  id: string;
  title: string;
  quantity: string;
  duration: string;
  process: string;
  chef: string;
  image: string;
  position: { x: number; y: number };
}

interface FlowConnection {
  from: string;
  to: string;
  method: string;
}

interface MethodologyStep {
  id: string;
  title: string;
  duration: string;
  quantity: string;
  substeps: { label: string; text: string }[];
  chefs: ('SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR')[];
}

const dummyIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'TOMATO PURÉE',
    quantity: '500ML',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwdXJlZXxlbnwxfHx8fDE3NjU1MzkzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    name: 'HEAVY CREAM',
    quantity: '250ML',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMGNyZWFtfGVufDF8fHx8MTc2NTUzOTM2NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    name: 'GREEK YOGURT',
    quantity: '200G',
    image: 'https://images.unsplash.com/photo-1719077518819-9ddbc5c6ef62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBib3dsJTIwd2hpdGV8ZW58MXx8fHwxNzY1NTM5MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    name: 'GINGER GARLIC',
    quantity: '100G',
    image: 'https://images.unsplash.com/photo-1606172150255-64e15da65c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjBnYXJsaWMlMjBwYXN0ZXxlbnwxfHx8fDE3NjU1MzkzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const dummyFlowNodes: FlowNode[] = [
  {
    id: 'node-1',
    title: 'Boneless Thighs',
    quantity: '1.5KG',
    duration: '30m',
    process: 'Marinating',
    chef: 'Sous',
    image: 'https://images.unsplash.com/photo-1690519315565-c31ce99f8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBjaGlja2VuJTIwcGllY2VzfGVufDF8fHx8MTc2NTUzOTM2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    position: { x: 80, y: 80 }
  },
  {
    id: 'node-2',
    title: 'First Marination',
    quantity: '1.6KG',
    duration: '30m',
    process: 'Marinating',
    chef: 'Sous',
    image: 'https://images.unsplash.com/photo-1749197654348-6883d2eea757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWFyaW5hdGluZyUyMGJvd2x8ZW58MXx8fHwxNzY1NTM5MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    position: { x: 400, y: 80 }
  },
  {
    id: 'node-3',
    title: 'Final Assembly',
    quantity: '2.5KG',
    duration: '15m',
    process: 'Combining',
    chef: 'Sous',
    image: 'https://images.unsplash.com/photo-1649777476920-0eef34169cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXllcmVkJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzY1NTM5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    position: { x: 720, y: 80 }
  },
  {
    id: 'node-4',
    title: 'Makhani Gravy',
    quantity: '1.2L',
    duration: '60m',
    process: 'Folding',
    chef: 'Station',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBncmF2eXxlbnwxfHx8fDE3NjU1MzkzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    position: { x: 80, y: 500 }
  }
];

const dummyConnections: FlowConnection[] = [
  { from: 'node-1', to: 'node-2', method: 'Marinating' },
  { from: 'node-2', to: 'node-3', method: 'Combining' },
  { from: 'node-4', to: 'node-3', method: 'Folding' }
];

const dummyMethodology: MethodologyStep[] = [
  {
    id: '1',
    title: 'Chicken Prep',
    duration: '45m',
    quantity: '0.6KG',
    substeps: [
      { label: 'A', text: 'Boneless Thighs' },
      { label: 'B', text: 'First Marination' }
    ],
    chefs: ['SOUS']
  },
  {
    id: '2',
    title: 'Gravy Production',
    duration: '90m',
    quantity: '0.5L',
    substeps: [
      { label: 'A', text: 'Makhani Gravy' }
    ],
    chefs: ['STATION']
  },
  {
    id: '3',
    title: 'Service Finish',
    duration: '45m',
    quantity: '0.4KG',
    substeps: [
      { label: 'A', text: 'Final Assembly' }
    ],
    chefs: ['SOUS']
  }
];

export function CreateMenuView() {
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [inputMode, setInputMode] = useState<'url' | 'transcript'>('url');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [promptText, setPromptText] = useState('');
  const [manualIngredient, setManualIngredient] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>(dummyIngredients);
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>(dummyFlowNodes);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [editingNode, setEditingNode] = useState<{ id: string; field: 'title' | 'quantity' } | null>(null);
  const [methodology, setMethodology] = useState<MethodologyStep[]>(dummyMethodology);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Multi-select with Cmd/Ctrl
    if (e.metaKey || e.ctrlKey) {
      if (selectedNodes.includes(nodeId)) {
        setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
      } else {
        setSelectedNodes([...selectedNodes, nodeId]);
      }
    } else {
      // Single select
      setSelectedNodes([nodeId]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on canvas, not on a node
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.canvas-background')) {
      setSelectedNodes([]);
      setEditingNode(null);
    }
  };

  const handleAddIngredient = () => {
    if (manualIngredient.trim()) {
      const newIngredient: Ingredient = {
        id: `ing-${Date.now()}`,
        name: manualIngredient.toUpperCase(),
        quantity: '100G',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400'
      };
      setIngredients([...ingredients, newIngredient]);
      setManualIngredient('');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.5), 2));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (panMode) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panMode) {
      const dx = e.clientX - lastPanPoint.x;
      const dy = e.clientY - lastPanPoint.y;
      setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleNodeEdit = (nodeId: string, field: 'title' | 'quantity', value: string) => {
    setFlowNodes(flowNodes.map(node => 
      node.id === nodeId ? { ...node, [field]: value } : node
    ));
  };

  const toggleChef = (stepId: string, chef: 'SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR') => {
    setMethodology(methodology.map(step => {
      if (step.id === stepId) {
        const chefs = step.chefs.includes(chef)
          ? step.chefs.filter(c => c !== chef)
          : [...step.chefs, chef];
        return { ...step, chefs };
      }
      return step;
    }));
  };

  const getNodePosition = (nodeId: string) => {
    const node = flowNodes.find(n => n.id === nodeId);
    return node?.position || { x: 0, y: 0 };
  };

  const handleDragStart = (e: React.DragEvent, ingredient: Ingredient) => {
    e.dataTransfer.setData('ingredient', JSON.stringify(ingredient));
  };

  const findNonOverlappingPosition = (baseX: number, baseY: number) => {
    // Actual measured card dimensions
    const CARD_WIDTH = 240;
    const CARD_HEIGHT = 400; // Increased to account for all dropdowns
    const MIN_SPACING = 100; // Minimum gap between cards
    
    // Check if a position has any collision
    const hasCollision = (testX: number, testY: number): boolean => {
      for (const node of flowNodes) {
        // Calculate distances between card centers
        const centerX1 = testX + CARD_WIDTH / 2;
        const centerY1 = testY + CARD_HEIGHT / 2;
        const centerX2 = node.position.x + CARD_WIDTH / 2;
        const centerY2 = node.position.y + CARD_HEIGHT / 2;
        
        const distanceX = Math.abs(centerX1 - centerX2);
        const distanceY = Math.abs(centerY1 - centerY2);
        
        // Cards collide if they're too close on both axes
        const minDistanceX = CARD_WIDTH / 2 + MIN_SPACING;
        const minDistanceY = CARD_HEIGHT / 2 + MIN_SPACING;
        
        if (distanceX < minDistanceX && distanceY < minDistanceY) {
          return true; // Collision detected
        }
      }
      return false; // No collision
    };
    
    // Test the original position first
    if (!hasCollision(baseX, baseY)) {
      return { x: baseX, y: baseY };
    }
    
    // Grid search with very wide spacing
    const STEP = 350; // Large step to ensure no overlap
    
    // Try positions in a spiral pattern
    const positions = [
      // Right
      { x: baseX + STEP, y: baseY },
      { x: baseX + STEP * 2, y: baseY },
      { x: baseX + STEP * 3, y: baseY },
      // Down
      { x: baseX, y: baseY + STEP },
      { x: baseX, y: baseY + STEP * 2 },
      // Diagonal down-right
      { x: baseX + STEP, y: baseY + STEP },
      { x: baseX + STEP * 2, y: baseY + STEP },
      // Down-right far
      { x: baseX + STEP, y: baseY + STEP * 2 },
      // Left
      { x: baseX - STEP, y: baseY },
      { x: baseX - STEP * 2, y: baseY },
      // Up
      { x: baseX, y: baseY - STEP },
      // More right
      { x: baseX + STEP * 4, y: baseY },
      { x: baseX + STEP * 5, y: baseY },
      // Far down
      { x: baseX, y: baseY + STEP * 3 },
    ];
    
    // Test each position
    for (const pos of positions) {
      if (pos.x >= 50 && pos.y >= 50) {
        if (!hasCollision(pos.x, pos.y)) {
          return pos;
        }
      }
    }
    
    // Ultimate fallback: far to the right
    return { 
      x: 80 + (flowNodes.length * STEP), 
      y: 80 
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ingredientData = e.dataTransfer.getData('ingredient');
    if (ingredientData) {
      const ingredient = JSON.parse(ingredientData);
      const rect = e.currentTarget.getBoundingClientRect();
      const baseX = (e.clientX - rect.left - panOffset.x) / zoomLevel - 140;
      const baseY = (e.clientY - rect.top - panOffset.y) / zoomLevel - 80;
      
      const position = findNonOverlappingPosition(Math.max(20, baseX), Math.max(20, baseY));
      
      const newNode: FlowNode = {
        id: `node-${Date.now()}`,
        title: ingredient.name,
        quantity: ingredient.quantity,
        duration: '30m',
        process: 'Marinating',
        chef: 'Sous',
        image: ingredient.image,
        position
      };
      setFlowNodes([...flowNodes, newNode]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleGenerateFromSelection = () => {
    if (selectedNodes.length < 2 || !promptText.trim()) {
      return;
    }

    // Get the selected nodes' data
    const selectedNodeData = flowNodes.filter(node => selectedNodes.includes(node.id));
    
    // Calculate center position of selected nodes for placing new card
    const avgX = selectedNodeData.reduce((sum, node) => sum + node.position.x, 0) / selectedNodeData.length;
    const avgY = selectedNodeData.reduce((sum, node) => sum + node.position.y, 0) / selectedNodeData.length;
    
    // Offset to the right and down from center
    const baseX = avgX + 400;
    const baseY = avgY + 150;
    
    // Find non-overlapping position
    const position = findNonOverlappingPosition(baseX, baseY);
    
    // Create a combined title from the prompt
    const combinedTitle = promptText.length > 30 ? promptText.substring(0, 27) + '...' : promptText;
    
    // Calculate combined quantity (simplified - just sum up)
    const totalQty = selectedNodeData.reduce((sum, node) => {
      const qty = parseFloat(node.quantity);
      return sum + (isNaN(qty) ? 0 : qty);
    }, 0);
    
    // Use the generated card image
    const image = generatedCardImage;
    
    // Create new combined node
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      title: combinedTitle,
      quantity: `${totalQty.toFixed(1)}KG`,
      duration: '45m',
      process: 'Combining',
      chef: 'Sous',
      image,
      position
    };
    
    setFlowNodes([...flowNodes, newNode]);
    setSelectedNodes([newNode.id]);
    setPromptText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#fff8f7]">
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />

      {/* Header */}
      <CommonHeader
        mainItem="Chicken Biryani"
        title="DRAG FROM PANTRY • CLICK TO SELECT • SPACEBAR FOR HAND"
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Neural Engine & Ingredient Library */}
        <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col">
          {/* Neural Engine Section */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#4a1710] tracking-wide">NEURAL ENGINE</h2>
              
              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setInputMode('url')}
                  className={`p-1.5 rounded transition-colors ${
                    inputMode === 'url'
                      ? 'bg-white shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  <Play className="size-4" />
                </button>
                <button
                  onClick={() => setInputMode('transcript')}
                  className={`p-1.5 rounded transition-colors ${
                    inputMode === 'transcript'
                      ? 'bg-white shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  <FileText className="size-4" />
                </button>
              </div>
            </div>

            {/* Input Field */}
            {inputMode === 'url' ? (
              <input
                type="text"
                placeholder="YouTube URL..."
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D] mb-3"
              />
            ) : (
              <textarea
                placeholder="Paste recipe transcript..."
                rows={5}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D] resize-none mb-3"
              />
            )}

            <button className="w-full px-4 py-3 text-sm font-bold bg-[#6b7280] text-white rounded-xl hover:bg-[#4b5563] transition-colors flex items-center justify-center gap-2">
              <Sparkles className="size-4" />
              EXTRACT PROCESS
            </button>
          </div>

          {/* Ingredient Library */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-bold text-[#4a1710] tracking-wide">INGREDIENT LIBRARY</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, ingredient)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all border border-gray-100 overflow-hidden"
                >
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <div className="text-xs font-bold text-[#4a1710] mb-1">
                      {ingredient.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      QTY: {ingredient.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manual Add */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Manual entry..."
                  value={manualIngredient}
                  onChange={(e) => setManualIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                  className="w-full px-3 py-2 pr-10 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D]"
                />
                <button 
                  onClick={handleAddIngredient}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#4a1710] rounded-full flex items-center justify-center hover:bg-[#3a1108] transition-colors"
                >
                  <Plus className="size-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Flow Chart Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden" 
          onClick={handleCanvasClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: panMode ? (isPanning ? 'grabbing' : 'grab') : 'default' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50">
            {/* Canvas with zoom and pan */}
            <div 
              className="absolute inset-0 origin-top-left transition-transform"
              style={{ 
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              }}
            >
              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                {dummyConnections.map((conn, index) => {
                  const fromPos = getNodePosition(conn.from);
                  const toPos = getNodePosition(conn.to);
                  
                  const x1 = fromPos.x + 240;
                  const y1 = fromPos.y + 80;
                  const x2 = toPos.x + 20;
                  const y2 = toPos.y + 80;
                  
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  
                  return (
                    <g key={index}>
                      <path
                        d={`M ${x1} ${y1} Q ${midX} ${y1}, ${midX} ${midY} T ${x2} ${y2}`}
                        stroke="#d1d5db"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx={midX} cy={midY} r="16" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                      <text
                        x={midX}
                        y={midY + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold fill-[#FE5D4D]"
                        style={{ fontSize: '10px' }}
                      >
                        {conn.method.charAt(0)}
                      </text>
                      <text
                        x={midX}
                        y={midY - 25}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-600"
                        style={{ fontSize: '11px' }}
                      >
                        {conn.method}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Flow Nodes */}
              {flowNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={(e) => {
                    // Prevent if clicking on interactive elements
                    const target = e.target as HTMLElement;
                    if (target.closest('button') || target.closest('input') || target.tagName === 'INPUT') {
                      return;
                    }
                    handleNodeClick(node.id, e);
                  }}
                  className={`absolute transition-all ${
                    selectedNodes.includes(node.id)
                      ? 'ring-4 ring-[#FE5D4D] z-10'
                      : 'hover:ring-2 hover:ring-gray-300'
                  } ${panMode ? 'cursor-grab' : 'cursor-pointer'}`}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    pointerEvents: 'auto'
                  }}
                >
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-[240px] border-2 border-gray-100">
                    <div className="relative">
                      <img
                        src={node.image}
                        alt={node.title}
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#FE5D4D] flex items-center gap-1 shadow-md">
                        <Clock className="size-3" />
                        {node.duration}
                      </div>
                      {selectedNodes.includes(node.id) && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#FE5D4D] rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {editingNode?.id === node.id && editingNode.field === 'title' ? (
                        <input
                          autoFocus
                          type="text"
                          value={node.title}
                          onChange={(e) => handleNodeEdit(node.id, 'title', e.target.value)}
                          onBlur={() => setEditingNode(null)}
                          className="w-full font-bold text-[#4a1710] border-b border-[#FE5D4D] focus:outline-none mb-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <div 
                          className="font-bold text-[#4a1710] mb-2 cursor-text hover:bg-gray-50 px-1 rounded text-sm"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            setEditingNode({ id: node.id, field: 'title' });
                          }}
                        >
                          {node.title}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {editingNode?.id === node.id && editingNode.field === 'quantity' ? (
                          <input
                            autoFocus
                            type="text"
                            value={node.quantity}
                            onChange={(e) => handleNodeEdit(node.id, 'quantity', e.target.value)}
                            onBlur={() => setEditingNode(null)}
                            className="text-xs text-gray-600 font-semibold border-b border-[#FE5D4D] focus:outline-none w-24"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div 
                            className="text-xs text-gray-600 font-semibold cursor-text hover:bg-gray-50 px-1 rounded"
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              setEditingNode({ id: node.id, field: 'quantity' });
                            }}
                          >
                            QTY: {node.quantity}
                          </div>
                        )}
                      </div>

                      {/* Skill Selector */}
                      <div onClick={(e) => e.stopPropagation()} className="mb-2">
                        <SkillSelector
                          value={node.process}
                          onChange={(newProcess) => {
                            setFlowNodes(flowNodes.map(n => 
                              n.id === node.id ? { ...n, process: newProcess } : n
                            ));
                          }}
                          nodeId={node.id}
                        />
                      </div>

                      {/* Chef Selector */}
                      <div onClick={(e) => e.stopPropagation()}> 
                        <ChefSelector
                          value={node.chef}
                          onChange={(newChef) => {
                            setFlowNodes(flowNodes.map(n => 
                              n.id === node.id ? { ...n, chef: newChef } : n
                            ));
                          }}
                          nodeId={node.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button 
              onClick={() => setPanMode(!panMode)}
              className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all border-2 ${
                panMode 
                  ? 'bg-[#1a1a2e] border-[#1a1a2e] text-white' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Hand className="size-5" />
            </button>
            <button 
              onClick={handleZoomIn}
              className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              <Plus className="size-5 text-gray-600" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              <svg className="size-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
          </div>

          {/* Prompt Bar */}
          {selectedNodes.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px]">
              <div className="bg-[#1a1a2e] rounded-full shadow-2xl flex items-center gap-3 px-6 py-4">
                <Sparkles className="size-5 text-[#FE5D4D] flex-shrink-0" />
                <input
                  type="text"
                  placeholder={`Transform ${selectedNodes.length} item${selectedNodes.length > 1 ? 's' : ''}...`} 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  onClick={handleGenerateFromSelection}
                  disabled={selectedNodes.length < 2 || !promptText.trim()}
                  className="bg-white text-[#1a1a2e] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  EXECUTE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Live Methodology */}
        <div className="w-[340px] bg-white border-l border-gray-200 flex flex-col">
          <div className="p-5 border-b border-gray-200 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FE5D4D] rounded-full"></span>
            <h2 className="text-sm font-bold text-[#4a1710] tracking-wide">LIVE METHODOLOGY</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {methodology.map((step, index) => (
              <div key={step.id} className="bg-white rounded-3xl p-5 border-2 border-gray-100 shadow-sm">
                {/* Header with number, title, time, and qty */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#4a1710] mb-2">
                      {step.title}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                        <Clock className="size-3 text-[#FE5D4D]" />
                        <span className="text-xs font-semibold text-gray-600">{step.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                        <Package className="size-3 text-[#FE5D4D]" />
                        <span className="text-xs font-semibold text-gray-600">{step.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Substeps */}
                <div className="space-y-2 mb-4 ml-13">
                  {step.substeps.map((substep, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 bg-[#4a1710] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">{substep.label}</span>
                      </div>
                      <div className="text-sm text-gray-700 font-medium pt-0.5">
                        {substep.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chef pills */}
                <div className="flex flex-wrap gap-2">
                  {(['Sous', 'Station', 'Trainee', 'Junior'] as const).map((chef) => (
                    <button
                      key={chef}
                      onClick={() => toggleChef(step.id, chef.toUpperCase() as 'SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR')}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                        step.chefs.includes(chef.toUpperCase() as 'SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR')
                          ? 'bg-white border-2 border-[#FE5D4D] text-[#FE5D4D]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      {chef}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}