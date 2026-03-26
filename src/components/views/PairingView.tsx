import { useState } from 'react';
import { CommonHeader } from '../CommonHeader';
import { AIChatDrawer } from '../AIChatDrawer';
import { RMINTFab } from '../RMINTFab';
import { Clock, TrendingUp } from 'lucide-react';
import pairingImage from 'figma:asset/61d3f99ce062bf11be1fae54f8f003b99dd7f143.png';

interface PairingItem {
  id: string;
  name: string;
  angle: number;
  distance: number;
  color: string;
  image: string;
  duration: string;
  demand: number;
  description: string;
}

const dummyPairings: PairingItem[] = [
  { id: '1', name: 'Sour cream\nbutter', angle: 15, distance: 220, color: '#ef4444', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', duration: '25m', demand: 85, description: 'Rich and creamy dairy pairing' },
  { id: '2', name: 'Cream\ncheese', angle: 30, distance: 220, color: '#f97316', image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400', duration: '15m', demand: 92, description: 'Smooth and tangy cheese blend' },
  { id: '3', name: 'Buttermilk', angle: 50, distance: 220, color: '#f59e0b', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', duration: '10m', demand: 78, description: 'Cultured dairy classic' },
  { id: '4', name: 'Chicken\nfonds', angle: 70, distance: 220, color: '#eab308', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', duration: '90m', demand: 95, description: 'Deep and savory stock base' },
  { id: '5', name: '6-rib\nWest Flemish\nRed', angle: 90, distance: 240, color: '#84cc16', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400', duration: '45m', demand: 68, description: 'Premium cut with rich marbling' },
  { id: '6', name: 'Hamburger', angle: 105, distance: 220, color: '#22c55e', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', duration: '20m', demand: 98, description: 'Classic ground meat patty' },
  { id: '7', name: 'Bayonne\nham', angle: 125, distance: 220, color: '#10b981', image: 'https://images.unsplash.com/photo-1624726175512-19b9baf9956b?w=400', duration: '35m', demand: 72, description: 'Cured French delicacy' },
  { id: '8', name: 'Tikka\nMasala', angle: 145, distance: 220, color: '#14b8a6', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', duration: '60m', demand: 94, description: 'Aromatic Indian curry spice' },
  { id: '9', name: 'Lemongrass', angle: 170, distance: 220, color: '#06b6d4', image: 'https://images.unsplash.com/photo-1596040033229-a0b9963a5394?w=400', duration: '5m', demand: 80, description: 'Citrus herb for Asian cuisine' },
  { id: '10', name: 'Vanilla\nTahiti', angle: 190, distance: 220, color: '#0ea5e9', image: 'https://images.unsplash.com/photo-1584113131154-e2be11ce77a3?w=400', duration: '8m', demand: 86, description: 'Premium vanilla extract' },
  { id: '11', name: 'Ginger', angle: 205, distance: 220, color: '#3b82f6', image: 'https://images.unsplash.com/photo-1606172150255-64e15da65c8c?w=400', duration: '12m', demand: 88, description: 'Fresh aromatic root spice' },
  { id: '12', name: 'Pear wood\nsmoke', angle: 220, distance: 220, color: '#6366f1', image: 'https://images.unsplash.com/photo-1619419317219-8e41c1b7a20b?w=400', duration: '40m', demand: 65, description: 'Subtle fruit wood smoking' },
  { id: '13', name: 'Balsamic\nvinegar', angle: 235, distance: 220, color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1609840114035-3c981a782dfe?w=400', duration: '3m', demand: 91, description: 'Aged Italian condiment' },
  { id: '14', name: 'Fish miso', angle: 255, distance: 220, color: '#a855f7', image: 'https://images.unsplash.com/photo-1619143168-4e403f9c1e3a?w=400', duration: '30m', demand: 74, description: 'Fermented fish paste umami' },
  { id: '15', name: 'Doenjang', angle: 270, distance: 220, color: '#d946ef', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400', duration: '50m', demand: 70, description: 'Korean soybean paste' },
  { id: '16', name: 'Tomato', angle: 285, distance: 220, color: '#ec4899', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400', duration: '15m', demand: 96, description: 'Fresh garden tomato' },
  { id: '17', name: 'Roasted\nbell pepper\npuree', angle: 300, distance: 240, color: '#f43f5e', image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400', duration: '45m', demand: 82, description: 'Smoky sweet pepper blend' },
  { id: '18', name: 'Fava\nbean', angle: 315, distance: 220, color: '#ef4444', image: 'https://images.unsplash.com/photo-1542919920-dfc5f01d4012?w=400', duration: '25m', demand: 77, description: 'Protein-rich legume' },
  { id: '19', name: 'Cucumber', angle: 330, distance: 220, color: '#dc2626', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400', duration: '8m', demand: 89, description: 'Crisp and refreshing vegetable' },
  { id: '20', name: 'Baguette', angle: 345, distance: 220, color: '#b91c1c', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', duration: '20m', demand: 93, description: 'Classic French bread' },
  { id: '21', name: 'Cocoa\npowder', angle: 260, distance: 180, color: '#9333ea', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400', duration: '5m', demand: 84, description: 'Pure chocolate powder' },
  { id: '22', name: 'Wieze tripel', angle: 170, distance: 240, color: '#6b7280', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400', duration: '10m', demand: 71, description: 'Belgian ale beer' },
  { id: '23', name: 'Café de\nColombia', angle: 155, distance: 200, color: '#9ca3af', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', duration: '15m', demand: 87, description: 'Premium Colombiancoffee' },
  { id: '24', name: 'Emmental', angle: 140, distance: 180, color: '#a3a3a3', image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400', duration: '25m', demand: 79, description: 'Swiss cheese with holes' },
  { id: '25', name: 'Sencha tea', angle: 195, distance: 240, color: '#737373', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', duration: '12m', demand: 75, description: 'Japanese green tea' },
  { id: '26', name: 'Apple', angle: 175, distance: 200, color: '#6b7280', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', duration: '10m', demand: 90, description: 'Crisp sweet fruit' },
  { id: '27', name: 'Belvedere\nBloody\nMary', angle: 178, distance: 230, color: '#78716c', image: 'https://images.unsplash.com/photo-1607897466156-c0ba9e4df310?w=400', duration: '8m', demand: 73, description: 'Savory vodka cocktail' },
  { id: '28', name: 'Dwarf\nbanana', angle: 185, distance: 200, color: '#9ca3af', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', duration: '5m', demand: 81, description: 'Small sweet banana variety' },
  { id: '29', name: 'Pineapple', angle: 192, distance: 240, color: '#a3a3a3', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', duration: '15m', demand: 85, description: 'Tropical sweet fruit' },
  { id: '30', name: 'Bergamot', angle: 205, distance: 200, color: '#737373', image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=400', duration: '7m', demand: 69, description: 'Citrus fruit with unique aroma' },
  { id: '31', name: 'Gamba', angle: 218, distance: 240, color: '#71717a', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400', duration: '18m', demand: 88, description: 'Large prawn delicacy' },
  { id: '32', name: 'Lobster', angle: 235, distance: 200, color: '#78716c', image: 'https://images.unsplash.com/photo-1625222805067-bb3c71686c70?w=400', duration: '35m', demand: 92, description: 'Premium shellfish' },
  { id: '33', name: 'Plaice', angle: 245, distance: 240, color: '#6b7280', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400', duration: '22m', demand: 76, description: 'Delicate flatfish' },
  { id: '34', name: 'Edible\ncrab', angle: 252, distance: 200, color: '#9ca3af', image: 'https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?w=400', duration: '28m', demand: 83, description: 'Sweet crab meat' },
  { id: '35', name: 'Baguette', angle: 265, distance: 180, color: '#a3a3a3', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', duration: '20m', demand: 93, description: 'Classic French bread' },
  { id: '36', name: 'Toast\nbread', angle: 278, distance: 200, color: '#737373', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', duration: '10m', demand: 87, description: 'Sliced sandwich bread' },
];

export function PairingView() {
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<PairingItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const centerX = 400;
  const centerY = 350;
  const mainItemRadius = 100;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col h-full bg-[#fff8f7]">
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />

      {/* Header */}
      <CommonHeader
        mainItem="Cheese Crispies"
        title="PAIRING EXPLORER • HOVER TO DISCOVER"
      />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          {/* Circular Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {[1, 2, 3, 4].map((ring) => (
              <circle
                key={ring}
                cx={centerX}
                cy={centerY}
                r={ring * 60}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {dummyPairings.map((item) => {
              const radians = (item.angle * Math.PI) / 180;
              const x = centerX + Math.cos(radians) * item.distance;
              const y = centerY + Math.sin(radians) * item.distance;
              
              return (
                <line
                  key={`line-${item.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={item.color}
                  strokeWidth="2"
                  opacity="0.3"
                />
              );
            })}
          </svg>

          {/* Pairing Items */}
          {dummyPairings.map((item) => {
            const radians = (item.angle * Math.PI) / 180;
            const x = centerX + Math.cos(radians) * item.distance;
            const y = centerY + Math.sin(radians) * item.distance;
            
            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div 
                  className="w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-150"
                  style={{ backgroundColor: item.color }}
                />
                <div 
                  className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-xs text-gray-600 font-medium text-center whitespace-pre-line"
                  style={{ width: '80px' }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}

          {/* Center Main Item */}
          <div className="absolute" style={{ left: centerX, top: centerY, transform: 'translate(-50%, -50%)' }}>
            <div 
              className="rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-2xl border-4 border-white"
              style={{ width: mainItemRadius * 2, height: mainItemRadius * 2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4a1710]">Cheese</div>
                <div className="text-2xl font-bold text-[#4a1710]">Crispies</div>
              </div>
            </div>
          </div>

          {/* Hover Popup */}
          {hoveredItem && (
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${mousePos.x + 20}px`,
                top: `${mousePos.y + 20}px`,
              }}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 w-[280px]">
                <img
                  src={hoveredItem.image}
                  alt={hoveredItem.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-[#4a1710] mb-2">{hoveredItem.name.replace('\n', ' ')}</h3>
                  <p className="text-xs text-gray-600 mb-3">{hoveredItem.description}</p>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                      <Clock className="size-3 text-[#FE5D4D]" />
                      <span className="text-xs font-semibold text-gray-600">{hoveredItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                      <TrendingUp className="size-3 text-green-500" />
                      <span className="text-xs font-semibold text-gray-600">{hoveredItem.demand}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
