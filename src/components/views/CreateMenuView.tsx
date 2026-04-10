import { useState, useRef, useCallback } from 'react';
import { CommonHeader } from '../CommonHeader';
import { AIChatDrawer } from '../AIChatDrawer';
import { RMINTFab } from '../RMINTFab';
import {
  Plus, Sparkles, ZoomIn, ZoomOut, Hand, Link, FileText,
  Clock, Package, ChevronDown, Check, X, Loader2, ChefHat,
  ArrowRight, TrendingUp
} from 'lucide-react';
import type { SharedDishData, SharedMethodologyStep } from '../../App';

/* ─── Types ─────────────────────────────────────────────── */

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
  chefs: string[];
  image: string;
  position: { x: number; y: number };
}

interface FlowConnection {
  from: string;
  to: string;
  method: string;
}

/* ─── Chef & Process config ──────────────────────────────── */

const CHEF_ROLES = ['Sous', 'Station', 'Junior', 'Trainee'] as const;
const PROCESS_TYPES = ['Marinating', 'Grilling', 'Sautéing', 'Boiling', 'Folding', 'Combining', 'Finishing', 'Plating'] as const;

const CHEF_COLORS: Record<string, string> = {
  Sous:    'bg-green-100 text-green-700 border-green-300',
  Station: 'bg-amber-100 text-amber-700 border-amber-300',
  Junior:  'bg-red-100 text-red-700 border-red-300',
  Trainee: 'bg-purple-100 text-purple-700 border-purple-300',
};

const CHEF_DOT: Record<string, string> = {
  Sous:    'bg-green-500',
  Station: 'bg-amber-500',
  Junior:  'bg-red-500',
  Trainee: 'bg-purple-500',
};

/* ─── Text helpers ───────────────────────────────────────── */

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/* ─── Image mapping ──────────────────────────────────────── */

const IMAGE_MAP: Record<string, string> = {
  chicken:   'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
  rice:      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80',
  biryani:   'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  marinat:   'https://images.unsplash.com/photo-1549590143-d5855148a9d5?w=600&q=80',
  spice:     'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  gravy:     'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
  tomato:    'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80',
  cream:     'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80',
  yogurt:    'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&q=80',
  ginger:    'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&q=80',
  garlic:    'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&q=80',
  onion:     'https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&q=80',
  tikka:     'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
  butter:    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80',
  makhani:   'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
  grill:     'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  assembly:  'https://images.unsplash.com/photo-1649777476920-0eef34169cdb?w=600&q=80',
  layer:     'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  masala:    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
  naan:      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
  bread:     'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  sauce:     'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  milk:      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
  ghee:      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80',
  sugar:     'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80',
  jaggery:   'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  cardamom:  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  saffron:   'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  almond:    'https://images.unsplash.com/photo-1574570435-6b44d8da8903?w=600&q=80',
  cashew:    'https://images.unsplash.com/photo-1574570435-6b44d8da8903?w=600&q=80',
  raisin:    'https://images.unsplash.com/photo-1574570435-6b44d8da8903?w=600&q=80',
  nut:       'https://images.unsplash.com/photo-1574570435-6b44d8da8903?w=600&q=80',
  payasam:   'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  pudding:   'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  kheer:     'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  chocolate: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  cake:      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  flour:     'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  egg:       'https://images.unsplash.com/photo-1518569656558-1f25e69d2491?w=600&q=80',
  pasta:     'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
  pizza:     'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  dal:       'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
  lentil:    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
  paneer:    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
  lamb:      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80',
  fish:      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
  prawn:     'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
  default:   'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
};

function getImageForTerm(term: string): string {
  const lower = term.toLowerCase();
  for (const [key, url] of Object.entries(IMAGE_MAP)) {
    if (lower.includes(key)) return url;
  }
  return IMAGE_MAP.default;
}

/* ─── Dish datasets ──────────────────────────────────────── */

const DISH_DATA: Record<string, {
  dishName: string;
  ingredients: Ingredient[];
  nodes: FlowNode[];
  connections: FlowConnection[];
}> = {
  biryani: {
    dishName: 'Chicken Biryani',
    ingredients: [
      { id: 'i1', name: 'Basmati Rice',       quantity: '1kg',  image: getImageForTerm('rice') },
      { id: 'i2', name: 'Chicken Thighs',     quantity: '800g', image: getImageForTerm('chicken') },
      { id: 'i3', name: 'Greek Yogurt',       quantity: '200g', image: getImageForTerm('yogurt') },
      { id: 'i4', name: 'Biryani Spices',     quantity: '50g',  image: getImageForTerm('spice') },
      { id: 'i5', name: 'Fried Onions',       quantity: '150g', image: getImageForTerm('onion') },
      { id: 'i6', name: 'Ginger Garlic Paste',quantity: '80g',  image: getImageForTerm('ginger') },
    ],
    nodes: [
      { id: 'n1', title: 'Chicken Marination', quantity: '0.8kg', duration: '45m', process: 'Marinating', chefs: ['Sous'],            image: getImageForTerm('marinat'), position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Rice Parboil',        quantity: '1kg',   duration: '20m', process: 'Boiling',    chefs: ['Junior'],           image: getImageForTerm('rice'),    position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Spice Layer Prep',    quantity: '200g',  duration: '15m', process: 'Finishing',  chefs: ['Station'],          image: getImageForTerm('spice'),   position: { x: 60, y: 440 } },
      { id: 'n4', title: 'Dum Assembly',        quantity: '2kg',   duration: '60m', process: 'Combining',  chefs: ['Sous', 'Station'],  image: getImageForTerm('layer'),   position: { x: 700, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n4', method: 'Layer' },
      { from: 'n2', to: 'n4', method: 'Layer' },
      { from: 'n3', to: 'n4', method: 'Add' },
    ],
  },
  butterchicken: {
    dishName: 'Butter Chicken',
    ingredients: [
      { id: 'i1', name: 'Chicken Breast',   quantity: '800g',  image: getImageForTerm('chicken') },
      { id: 'i2', name: 'Tomato Purée',     quantity: '500ml', image: getImageForTerm('tomato') },
      { id: 'i3', name: 'Heavy Cream',      quantity: '250ml', image: getImageForTerm('cream') },
      { id: 'i4', name: 'Butter',           quantity: '100g',  image: getImageForTerm('butter') },
      { id: 'i5', name: 'Ginger Garlic',    quantity: '80g',   image: getImageForTerm('ginger') },
      { id: 'i6', name: 'Makhani Spices',   quantity: '40g',   image: getImageForTerm('spice') },
    ],
    nodes: [
      { id: 'n1', title: 'Chicken Tikka',    quantity: '0.8kg', duration: '40m', process: 'Grilling',   chefs: ['Station'],          image: getImageForTerm('tikka'),    position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Makhani Gravy',    quantity: '1l',    duration: '60m', process: 'Sautéing',   chefs: ['Sous'],             image: getImageForTerm('makhani'), position: { x: 60, y: 440 } },
      { id: 'n3', title: 'Cream Finish',     quantity: '250ml', duration: '10m', process: 'Folding',    chefs: ['Sous'],             image: getImageForTerm('cream'),   position: { x: 380, y: 440 } },
      { id: 'n4', title: 'Final Assembly',   quantity: '1.5kg', duration: '20m', process: 'Combining',  chefs: ['Sous', 'Junior'],   image: getImageForTerm('assembly'), position: { x: 700, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n4', method: 'Add' },
      { from: 'n2', to: 'n3', method: 'Fold' },
      { from: 'n3', to: 'n4', method: 'Combine' },
    ],
  },
  tikka: {
    dishName: 'Chicken Tikka Masala',
    ingredients: [
      { id: 'i1', name: 'Chicken Breast',   quantity: '1kg',   image: getImageForTerm('chicken') },
      { id: 'i2', name: 'Tandoor Spices',   quantity: '60g',   image: getImageForTerm('spice') },
      { id: 'i3', name: 'Yogurt',           quantity: '200g',  image: getImageForTerm('yogurt') },
      { id: 'i4', name: 'Masala Sauce',     quantity: '600ml', image: getImageForTerm('masala') },
      { id: 'i5', name: 'Cream',            quantity: '150ml', image: getImageForTerm('cream') },
    ],
    nodes: [
      { id: 'n1', title: 'Spice Marination', quantity: '1kg',   duration: '240m', process: 'Marinating', chefs: ['Trainee'],          image: getImageForTerm('marinat'), position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Char Grill',        quantity: '0.9kg', duration: '30m',  process: 'Grilling',   chefs: ['Station'],          image: getImageForTerm('grill'),   position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Tikka Masala Sauce',quantity: '750ml', duration: '40m',  process: 'Sautéing',   chefs: ['Sous'],             image: getImageForTerm('masala'),  position: { x: 60, y: 440 } },
      { id: 'n4', title: 'Final Plating',     quantity: '1.5kg', duration: '15m',  process: 'Plating',    chefs: ['Sous', 'Station'],  image: getImageForTerm('tikka'),   position: { x: 700, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n2', method: 'Marinate' },
      { from: 'n2', to: 'n4', method: 'Add' },
      { from: 'n3', to: 'n4', method: 'Sauce' },
    ],
  },

  payasam: {
    dishName: 'Payasam',
    ingredients: [
      { id: 'i1', name: 'Full Fat Milk',   quantity: '1l',   image: getImageForTerm('milk') },
      { id: 'i2', name: 'Rice',            quantity: '100g', image: getImageForTerm('rice') },
      { id: 'i3', name: 'Ghee',            quantity: '2tbsp',image: getImageForTerm('ghee') },
      { id: 'i4', name: 'Jaggery',         quantity: '150g', image: getImageForTerm('jaggery') },
      { id: 'i5', name: 'Green Cardamom',  quantity: '4pods',image: getImageForTerm('cardamom') },
      { id: 'i6', name: 'Saffron',         quantity: '1pinch',image: getImageForTerm('saffron') },
      { id: 'i7', name: 'Almonds',         quantity: '30g',  image: getImageForTerm('almond') },
      { id: 'i8', name: 'Cashew Nuts',     quantity: '30g',  image: getImageForTerm('cashew') },
      { id: 'i9', name: 'Golden Raisins',  quantity: '20g',  image: getImageForTerm('raisin') },
    ],
    nodes: [
      { id: 'n1', title: 'Toast Rice in Ghee',   quantity: '100g',  duration: '3m',  process: 'Sautéing',   chefs: ['Station'],         image: getImageForTerm('ghee'),    position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Milk Reduction',        quantity: '1l',    duration: '20m', process: 'Boiling',    chefs: ['Sous'],             image: getImageForTerm('milk'),    position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Add Jaggery & Stir',   quantity: '150g',  duration: '5m',  process: 'Folding',    chefs: ['Sous'],             image: getImageForTerm('jaggery'), position: { x: 700, y: 60 } },
      { id: 'n4', title: 'Saffron & Cardamom',   quantity: '1pinch',duration: '2m',  process: 'Finishing',  chefs: ['Junior'],           image: getImageForTerm('saffron'), position: { x: 700, y: 440 } },
      { id: 'n5', title: 'Toast & Add Nuts',     quantity: '80g',   duration: '4m',  process: 'Grilling',   chefs: ['Trainee'],          image: getImageForTerm('cashew'), position: { x: 380, y: 440 } },
      { id: 'n6', title: 'Final Payasam',         quantity: '1.2l',  duration: '5m',  process: 'Plating',    chefs: ['Sous', 'Station'],  image: getImageForTerm('payasam'), position: { x: 1020, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n2', method: 'Add' },
      { from: 'n2', to: 'n3', method: 'Stir' },
      { from: 'n3', to: 'n4', method: 'Season' },
      { from: 'n4', to: 'n6', method: 'Combine' },
      { from: 'n5', to: 'n6', method: 'Garnish' },
    ],
  },

  kheer: {
    dishName: 'Rice Kheer',
    ingredients: [
      { id: 'i1', name: 'Basmati Rice',    quantity: '80g',  image: getImageForTerm('rice') },
      { id: 'i2', name: 'Full Cream Milk', quantity: '1l',   image: getImageForTerm('milk') },
      { id: 'i3', name: 'Sugar',           quantity: '120g', image: getImageForTerm('sugar') },
      { id: 'i4', name: 'Cardamom',        quantity: '4pods',image: getImageForTerm('cardamom') },
      { id: 'i5', name: 'Saffron',         quantity: '1pinch',image: getImageForTerm('saffron') },
      { id: 'i6', name: 'Pistachios',      quantity: '30g',  image: getImageForTerm('nut') },
    ],
    nodes: [
      { id: 'n1', title: 'Soak Rice',       quantity: '80g',  duration: '30m', process: 'Marinating', chefs: ['Trainee'],          image: getImageForTerm('rice'),    position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Boil Milk',       quantity: '1l',   duration: '10m', process: 'Boiling',    chefs: ['Sous'],             image: getImageForTerm('milk'),    position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Cook Rice in Milk',quantity: '1.1l',duration: '25m', process: 'Sautéing',   chefs: ['Sous'],             image: getImageForTerm('rice'),    position: { x: 700, y: 60 } },
      { id: 'n4', title: 'Sweeten & Flavor',quantity: '150g', duration: '5m',  process: 'Finishing',  chefs: ['Junior'],           image: getImageForTerm('cardamom'),position: { x: 700, y: 440 } },
      { id: 'n5', title: 'Chill & Garnish', quantity: '1.2l', duration: '15m', process: 'Plating',    chefs: ['Sous', 'Junior'],   image: getImageForTerm('kheer'),   position: { x: 1020, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n3', method: 'Add' },
      { from: 'n2', to: 'n3', method: 'Combine' },
      { from: 'n3', to: 'n4', method: 'Stir' },
      { from: 'n4', to: 'n5', method: 'Plate' },
    ],
  },

  chocolate_cake: {
    dishName: 'Chocolate Cake',
    ingredients: [
      { id: 'i1', name: 'All-Purpose Flour',quantity: '250g', image: getImageForTerm('flour') },
      { id: 'i2', name: 'Cocoa Powder',     quantity: '80g',  image: getImageForTerm('chocolate') },
      { id: 'i3', name: 'Sugar',            quantity: '300g', image: getImageForTerm('sugar') },
      { id: 'i4', name: 'Eggs',             quantity: '3',    image: getImageForTerm('egg') },
      { id: 'i5', name: 'Butter',           quantity: '150g', image: getImageForTerm('butter') },
      { id: 'i6', name: 'Heavy Cream',      quantity: '200ml',image: getImageForTerm('cream') },
      { id: 'i7', name: 'Dark Chocolate',   quantity: '200g', image: getImageForTerm('chocolate') },
      { id: 'i8', name: 'Baking Powder',    quantity: '2tsp', image: getImageForTerm('flour') },
    ],
    nodes: [
      { id: 'n1', title: 'Cream Butter & Sugar', quantity: '450g', duration: '5m',  process: 'Folding',    chefs: ['Junior'],           image: getImageForTerm('butter'),    position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Mix Dry Ingredients',  quantity: '330g', duration: '3m',  process: 'Combining',  chefs: ['Trainee'],          image: getImageForTerm('flour'),     position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Fold Batter',          quantity: '800g', duration: '5m',  process: 'Folding',    chefs: ['Sous'],             image: getImageForTerm('chocolate'), position: { x: 700, y: 60 } },
      { id: 'n4', title: 'Bake Cake',            quantity: '800g', duration: '35m', process: 'Grilling',   chefs: ['Station'],          image: getImageForTerm('cake'),      position: { x: 700, y: 440 } },
      { id: 'n5', title: 'Ganache Finish',       quantity: '400ml',duration: '10m', process: 'Finishing',  chefs: ['Sous'],             image: getImageForTerm('cream'),     position: { x: 380, y: 440 } },
      { id: 'n6', title: 'Frost & Plate',        quantity: '1.2kg',duration: '15m', process: 'Plating',    chefs: ['Sous', 'Station'],  image: getImageForTerm('cake'),      position: { x: 1020, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n3', method: 'Fold' },
      { from: 'n2', to: 'n3', method: 'Sift in' },
      { from: 'n3', to: 'n4', method: 'Bake' },
      { from: 'n4', to: 'n6', method: 'Layer' },
      { from: 'n5', to: 'n6', method: 'Frost' },
    ],
  },

  pasta: {
    dishName: 'Pasta Carbonara',
    ingredients: [
      { id: 'i1', name: 'Spaghetti',        quantity: '400g', image: getImageForTerm('pasta') },
      { id: 'i2', name: 'Pancetta',         quantity: '150g', image: getImageForTerm('chicken') },
      { id: 'i3', name: 'Eggs',             quantity: '4',    image: getImageForTerm('egg') },
      { id: 'i4', name: 'Parmesan',         quantity: '100g', image: getImageForTerm('cream') },
      { id: 'i5', name: 'Black Pepper',     quantity: '2tsp', image: getImageForTerm('spice') },
      { id: 'i6', name: 'Garlic',           quantity: '3 cloves', image: getImageForTerm('garlic') },
    ],
    nodes: [
      { id: 'n1', title: 'Boil Pasta',      quantity: '400g', duration: '10m', process: 'Boiling',    chefs: ['Junior'],           image: getImageForTerm('pasta'),   position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Fry Pancetta',    quantity: '150g', duration: '8m',  process: 'Grilling',   chefs: ['Station'],          image: getImageForTerm('grill'),   position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Egg & Parmesan Sauce', quantity: '200g', duration: '3m',  process: 'Folding',    chefs: ['Sous'],             image: getImageForTerm('egg'),     position: { x: 60, y: 440 } },
      { id: 'n4', title: 'Toss & Finish',   quantity: '750g', duration: '4m',  process: 'Combining',  chefs: ['Sous', 'Station'],  image: getImageForTerm('pasta'),   position: { x: 700, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n4', method: 'Add' },
      { from: 'n2', to: 'n4', method: 'Toss' },
      { from: 'n3', to: 'n4', method: 'Fold' },
    ],
  },

  dal_makhani: {
    dishName: 'Dal Makhani',
    ingredients: [
      { id: 'i1', name: 'Black Lentils',   quantity: '300g',  image: getImageForTerm('lentil') },
      { id: 'i2', name: 'Kidney Beans',    quantity: '100g',  image: getImageForTerm('dal') },
      { id: 'i3', name: 'Tomato Purée',    quantity: '400ml', image: getImageForTerm('tomato') },
      { id: 'i4', name: 'Cream',           quantity: '100ml', image: getImageForTerm('cream') },
      { id: 'i5', name: 'Butter',          quantity: '60g',   image: getImageForTerm('butter') },
      { id: 'i6', name: 'Spice Mix',       quantity: '40g',   image: getImageForTerm('spice') },
      { id: 'i7', name: 'Ginger Garlic',   quantity: '50g',   image: getImageForTerm('ginger') },
    ],
    nodes: [
      { id: 'n1', title: 'Soak Lentils',    quantity: '400g', duration: '480m', process: 'Marinating', chefs: ['Trainee'],          image: getImageForTerm('dal'),     position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Pressure Cook',   quantity: '400g', duration: '45m',  process: 'Boiling',    chefs: ['Junior'],           image: getImageForTerm('lentil'),  position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Makhani Tadka',   quantity: '600ml',duration: '15m',  process: 'Sautéing',   chefs: ['Sous'],             image: getImageForTerm('tomato'),  position: { x: 60, y: 440 } },
      { id: 'n4', title: 'Slow Simmer',     quantity: '1l',   duration: '60m',  process: 'Boiling',    chefs: ['Sous'],             image: getImageForTerm('gravy'),   position: { x: 700, y: 240 } },
      { id: 'n5', title: 'Cream Finish',    quantity: '1.1l', duration: '10m',  process: 'Finishing',  chefs: ['Sous', 'Junior'],   image: getImageForTerm('cream'),   position: { x: 1020, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n2', method: 'Cook' },
      { from: 'n2', to: 'n4', method: 'Add' },
      { from: 'n3', to: 'n4', method: 'Combine' },
      { from: 'n4', to: 'n5', method: 'Finish' },
    ],
  },

  paneer: {
    dishName: 'Paneer Butter Masala',
    ingredients: [
      { id: 'i1', name: 'Paneer',          quantity: '400g', image: getImageForTerm('paneer') },
      { id: 'i2', name: 'Tomatoes',        quantity: '500g', image: getImageForTerm('tomato') },
      { id: 'i3', name: 'Butter',          quantity: '80g',  image: getImageForTerm('butter') },
      { id: 'i4', name: 'Cream',           quantity: '150ml',image: getImageForTerm('cream') },
      { id: 'i5', name: 'Cashews',         quantity: '50g',  image: getImageForTerm('cashew') },
      { id: 'i6', name: 'Spice Mix',       quantity: '40g',  image: getImageForTerm('spice') },
      { id: 'i7', name: 'Ginger Garlic',   quantity: '60g',  image: getImageForTerm('ginger') },
    ],
    nodes: [
      { id: 'n1', title: 'Pan Fry Paneer',  quantity: '400g', duration: '8m',  process: 'Grilling',   chefs: ['Station'],          image: getImageForTerm('paneer'),  position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Tomato Cashew Base', quantity: '600g', duration: '20m', process: 'Boiling',    chefs: ['Sous'],             image: getImageForTerm('tomato'),  position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Butter Masala Gravy', quantity: '700ml',duration: '15m', process: 'Sautéing',   chefs: ['Sous'],             image: getImageForTerm('makhani'), position: { x: 60, y: 440 } },
      { id: 'n4', title: 'Cream & Combine', quantity: '1.1kg',duration: '8m',  process: 'Combining',  chefs: ['Sous', 'Station'],  image: getImageForTerm('cream'),   position: { x: 700, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n4', method: 'Add' },
      { from: 'n2', to: 'n3', method: 'Blend' },
      { from: 'n3', to: 'n4', method: 'Sauce' },
    ],
  },

  pizza: {
    dishName: 'Margherita Pizza',
    ingredients: [
      { id: 'i1', name: 'Pizza Dough',     quantity: '500g', image: getImageForTerm('bread') },
      { id: 'i2', name: 'San Marzano Tomatoes', quantity: '400g', image: getImageForTerm('tomato') },
      { id: 'i3', name: 'Mozzarella',      quantity: '250g', image: getImageForTerm('cream') },
      { id: 'i4', name: 'Basil',           quantity: '1bunch',image: getImageForTerm('spice') },
      { id: 'i5', name: 'Olive Oil',       quantity: '3tbsp',image: getImageForTerm('sauce') },
    ],
    nodes: [
      { id: 'n1', title: 'Prove Dough',    quantity: '500g', duration: '60m', process: 'Marinating', chefs: ['Trainee'],          image: getImageForTerm('bread'),   position: { x: 60, y: 60 } },
      { id: 'n2', title: 'Tomato Sauce',   quantity: '400g', duration: '15m', process: 'Boiling',    chefs: ['Junior'],           image: getImageForTerm('tomato'),  position: { x: 380, y: 60 } },
      { id: 'n3', title: 'Shape & Top',    quantity: '1.1kg',duration: '10m', process: 'Combining',  chefs: ['Station'],          image: getImageForTerm('pizza'),   position: { x: 700, y: 60 } },
      { id: 'n4', title: 'Wood Fire Bake', quantity: '1.1kg',duration: '10m', process: 'Grilling',   chefs: ['Station', 'Sous'],  image: getImageForTerm('grill'),   position: { x: 700, y: 440 } },
      { id: 'n5', title: 'Garnish & Serve',quantity: '1.2kg',duration: '3m',  process: 'Plating',    chefs: ['Sous'],             image: getImageForTerm('pizza'),   position: { x: 1020, y: 240 } },
    ],
    connections: [
      { from: 'n1', to: 'n3', method: 'Shape' },
      { from: 'n2', to: 'n3', method: 'Sauce' },
      { from: 'n3', to: 'n4', method: 'Bake' },
      { from: 'n4', to: 'n5', method: 'Plate' },
    ],
  },
};

/* ─── Transcript NLP-lite parser ─────────────────────────── */

const ACTION_VERB_TO_PROCESS: Record<string, string> = {
  marinat: 'Marinating', marinate: 'Marinating', marinating: 'Marinating',
  fry: 'Sautéing', frying: 'Sautéing', saute: 'Sautéing', sauté: 'Sautéing', sauteing: 'Sautéing',
  grill: 'Grilling', grilling: 'Grilling', char: 'Grilling',
  boil: 'Boiling', boiling: 'Boiling', parboil: 'Boiling', simmer: 'Boiling', simmering: 'Boiling',
  fold: 'Folding', folding: 'Folding', mix: 'Folding', mixing: 'Folding',
  combin: 'Combining', combine: 'Combining', combining: 'Combining', layer: 'Combining', assemble: 'Combining',
  finish: 'Finishing', garnish: 'Finishing', season: 'Finishing', seasoning: 'Finishing',
  plate: 'Plating', plating: 'Plating', serve: 'Plating', serving: 'Plating',
};

const PROCESS_CHEF_MAP: Record<string, string> = {
  Marinating: 'Trainee',
  Boiling: 'Junior',
  Grilling: 'Station',
  Sautéing: 'Station',
  Folding: 'Sous',
  Combining: 'Sous',
  Finishing: 'Sous',
  Plating: 'Sous',
};

function detectProcess(text: string): string {
  const lower = text.toLowerCase();
  for (const [verb, process] of Object.entries(ACTION_VERB_TO_PROCESS)) {
    if (lower.includes(verb)) return process;
  }
  return 'Combining';
}

const UNITS = 'kg|g|gm|gram|ml|l|liter|litre|cup|tbsp|tsp|tablespoon|teaspoon|piece|pieces|pod|bunch|clove|inch|stick|sprig|handful|pinch|dash|can|packet';
const UNIT_RE = new RegExp(`^(\\d+(?:[./]\\d+)?)\\s*(${UNITS})s?\\s+(.+)$`, 'i');
const QTY_RE  = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${UNITS})s?`, 'i');
const DUR_RE  = /(\d+)\s*(?:to\s*\d+\s*)?(min(?:ute)?s?|hour?s?|hrs?)/i;

function parseDuration(text: string): string {
  const m = text.match(DUR_RE);
  if (!m) return '30m';
  const val = parseInt(m[1]);
  return m[2].toLowerCase().startsWith('h') ? `${val * 60}m` : `${val}m`;
}

function parseQty(text: string): string {
  const m = text.match(QTY_RE);
  return m ? `${m[1]}${m[2].toLowerCase()}` : '—';
}

function stepTitle(text: string, processType: string): string {
  const SKIP = new Set(['with','and','for','the','add','until','then','once','into','onto','over','from','heat','a','an','at','by','in','of','on','to','up','until','about']);
  const words = text.trim().replace(/[.,!?;:]+/g, '').split(/\s+/);
  const action = words.find(w => Object.keys(ACTION_VERB_TO_PROCESS).some(v => w.toLowerCase().startsWith(v)));
  const noun   = words.find(w => w.length > 3 && !SKIP.has(w.toLowerCase()) && w.toLowerCase() !== action?.toLowerCase());
  if (action && noun) return `${toTitleCase(action)} ${toTitleCase(noun)}`;
  const meaningful = words.filter(w => w.length > 3 && !SKIP.has(w.toLowerCase())).slice(0, 3);
  return meaningful.length ? meaningful.map(w => toTitleCase(w)).join(' ') : processType;
}

/* ── Section splitter ─────────────────────────────────────── */
function splitSections(input: string): { ingText: string; stepText: string } {
  const lines = input.split('\n');
  let ingStart = -1, ingEnd = -1, stepStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim().toLowerCase();
    if (ingStart === -1 && /^ingredients?[:\s]*$/.test(t)) { ingStart = i + 1; continue; }
    if (ingStart !== -1 && ingEnd === -1 && /^(instructions?|method|steps?|directions?|preparation|how to)[:\s]*$/.test(t)) { ingEnd = i; stepStart = i + 1; break; }
    if (stepStart === -1 && /^(instructions?|method|steps?|directions?|preparation|how to)[:\s]*$/.test(t)) { stepStart = i + 1; }
  }

  const ingLines  = ingStart  !== -1 ? lines.slice(ingStart,  ingEnd  !== -1 ? ingEnd  : stepStart !== -1 ? stepStart - 1 : lines.length) : lines;
  const stepLines = stepStart !== -1 ? lines.slice(stepStart) : lines;

  return { ingText: ingLines.join('\n'), stepText: stepLines.join('\n') };
}

/* ── Ingredient line parser ───────────────────────────────── */
function parseIngredientLines(text: string): Ingredient[] {
  const results: Ingredient[] = [];
  const seen = new Set<string>();

  for (const raw of text.split('\n')) {
    // Strip bullet/number prefix: "- ", "• ", "1. ", "* "
    const line = raw.replace(/^\s*[-•*\d]+[.):\s]+/, '').trim();
    if (!line || line.length < 3 || line.length > 80) continue;

    let name = '', qty = '—';

    // Try: "qty unit name"  →  e.g. "1 kg basmati rice", "200g yogurt", "2 tbsp masala"
    const m1 = line.match(UNIT_RE);
    if (m1) {
      qty  = `${m1[1]}${m1[2].toLowerCase()}`;
      name = m1[3].replace(/[,(].*/,'').trim();       // drop trailing "(optional)" etc.
    } else {
      // Try: "name – qty unit"  or  "name: qty unit"
      const m2 = line.match(/^(.+?)\s*[–—:-]+\s*(\d[\d./]*)\s*([a-z]+)$/i);
      if (m2) {
        name = m2[1].trim();
        qty  = `${m2[2]}${m2[3].toLowerCase()}`;
      } else {
        // Plain ingredient name with no qty (still useful)
        // Only accept if it looks like an ingredient word (no verbs, short)
        if (line.split(' ').length <= 5 && !/^(step|note|tip|heat|bring|cook|add|stir|mix)/i.test(line)) {
          name = line.replace(/[,(].*/,'').trim();
        }
      }
    }

    const key = name.toLowerCase();
    if (name.length > 2 && !seen.has(key)) {
      seen.add(key);
      results.push({ id: `pi-${results.length + 1}`, name: toTitleCase(name), quantity: qty, image: getImageForTerm(name) });
    }
  }
  return results;
}

/* ── Step line parser ─────────────────────────────────────── */
function parseStepLines(text: string, fullInput: string): string[] {
  const results: string[] = [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Pass 1: numbered steps  "1. …" / "Step 1: …" / "1) …"
  for (const line of lines) {
    const m = line.match(/^(?:step\s*)?\d+\s*[.):\-]\s*(.{10,})/i);
    if (m) results.push(m[1].trim());
  }

  // Pass 2: bullets  "- do this"
  if (results.length < 2) {
    for (const line of lines) {
      const m = line.match(/^[-•*]\s*(.{10,})/);
      if (m) results.push(m[1].trim());
    }
  }

  // Pass 3: any line with an action verb that's long enough
  if (results.length < 2) {
    const candidates = (fullInput + '\n' + text)
      .split(/[\n.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 12 && s.length < 250);
    for (const s of candidates) {
      if (Object.keys(ACTION_VERB_TO_PROCESS).some(v => s.toLowerCase().startsWith(v) || s.toLowerCase().includes(' ' + v))) {
        results.push(s);
      }
    }
  }

  // Dedupe (same first 25 chars)
  return results.filter((s, i) =>
    results.findIndex(r => r.slice(0, 25).toLowerCase() === s.slice(0, 25).toLowerCase()) === i
  );
}

// Maps detected dish names to DISH_DATA keys
const DISH_KEYWORDS: [string, string][] = [
  // longest/most specific first to avoid false matches
  ['dal makhani', 'dal_makhani'], ['dal tadka', 'dal_makhani'], ['dal fry', 'dal_makhani'],
  ['butter chicken', 'butterchicken'], ['murgh makhani', 'butterchicken'],
  ['tikka masala', 'tikka'], ['chicken tikka', 'tikka'],
  ['chocolate cake', 'chocolate_cake'], ['choco cake', 'chocolate_cake'],
  ['paneer butter', 'paneer'], ['shahi paneer', 'paneer'], ['paneer makhani', 'paneer'],
  ['biryani', 'biryani'], ['biriyani', 'biryani'],
  ['tikka', 'tikka'],
  ['payasam', 'payasam'], ['paysam', 'payasam'], ['payasam', 'payasam'],
  ['kheer', 'kheer'], ['rice pudding', 'kheer'], ['rice kheer', 'kheer'],
  ['halwa', 'kheer'],
  ['carbonara', 'pasta'], ['pasta', 'pasta'], ['spaghetti', 'pasta'],
  ['margherita', 'pizza'], ['pizza', 'pizza'],
  ['paneer', 'paneer'],
  ['makhani', 'butterchicken'],
  ['cake', 'chocolate_cake'], ['chocolate', 'chocolate_cake'],
  ['dal', 'dal_makhani'],
];

function parseTranscript(input: string): {
  dishName: string;
  ingredients: Ingredient[];
  nodes: FlowNode[];
  connections: FlowConnection[];
} {
  const lower = input.toLowerCase();

  // ── 1. Detect dish name → prefer preset data ──
  for (const [kw, dataKey] of DISH_KEYWORDS) {
    if (lower.includes(kw)) {
      const preset = DISH_DATA[dataKey];
      if (preset) {
        return {
          dishName: preset.dishName,
          ingredients: preset.ingredients,
          nodes: preset.nodes,
          connections: preset.connections,
        };
      }
    }
  }

  // ── 2. No known dish — try to parse structured transcript ──
  const { ingText, stepText } = splitSections(input);
  const ingredients = parseIngredientLines(ingText);
  const rawSteps = parseStepLines(stepText, input);

  const COL_W = 380, ROW_H = 460, COLS = 3;
  const nodes: FlowNode[] = rawSteps.map((text, i) => {
    const process = detectProcess(text);
    return {
      id: `pn-${i + 1}`,
      title:    stepTitle(text, process),
      quantity: parseQty(text),
      duration: parseDuration(text),
      process,
      chefs:    [PROCESS_CHEF_MAP[process] || 'Sous'],
      image:    getImageForTerm(text),
      position: { x: 60 + (i % COLS) * COL_W, y: 60 + Math.floor(i / COLS) * ROW_H },
    };
  });

  const connections: FlowConnection[] = nodes.slice(0, -1).map((node, i) => ({
    from: node.id, to: nodes[i + 1].id,
    method: nodes[i + 1].process.slice(0, 7),
  }));

  // ── 3. Final fallback ──
  if (nodes.length === 0) {
    const p = DISH_DATA.biryani;
    return { dishName: p.dishName, ingredients: p.ingredients, nodes: p.nodes, connections: p.connections };
  }

  return {
    dishName: 'Custom Recipe',
    ingredients: ingredients.length > 0 ? ingredients : nodes.map((n, i) => ({
      id: `fi-${i}`, name: n.title, quantity: n.quantity, image: n.image,
    })),
    nodes,
    connections,
  };
}

/* ─── Extended step type (local only) ───────────────────── */

interface DerivedStep extends SharedMethodologyStep {
  processType: string;   // the process key that groups nodes for this step
}

/* ─── Derive methodology from nodes ─────────────────────── */

function deriveMethodologyFromNodes(
  nodes: FlowNode[],
  connections: FlowConnection[]
): DerivedStep[] {
  const groups = new Map<string, FlowNode[]>();
  for (const node of nodes) {
    if (!groups.has(node.process)) groups.set(node.process, []);
    groups.get(node.process)!.push(node);
  }

  const hasIncoming = new Set(connections.map(c => c.to));
  const sorted = [
    ...nodes.filter(n => !hasIncoming.has(n.id)),
    ...nodes.filter(n => hasIncoming.has(n.id)),
  ];

  const seen = new Set<string>();
  const steps: DerivedStep[] = [];
  let idx = 1;

  for (const node of sorted) {
    if (seen.has(node.process)) continue;
    seen.add(node.process);
    const group = groups.get(node.process)!;
    const totalDur = group.reduce((acc, n) => {
      const m = n.duration.match(/(\d+)/);
      return acc + (m ? parseInt(m[1]) : 0);
    }, 0);
    const uniqueChefs = [...new Set(group.flatMap(n => n.chefs))].map(
      c => c.toUpperCase() as 'SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR'
    );
    steps.push({
      id: String(idx++),
      title: group.length === 1 ? group[0].title : node.process,
      duration: `${totalDur}m`,
      quantity: group[group.length - 1].quantity,
      substeps: group.map((n, i) => ({ label: String.fromCharCode(65 + i), text: n.title })),
      chefs: uniqueChefs,
      processType: node.process,
    });
  }

  return steps;
}

/* ─── Contextual title generator ────────────────────────── */

const PROCESS_PAIR_TITLES: Record<string, string> = {
  'Marinating+Boiling':  'Assembly Prep',
  'Marinating+Grilling': 'Marinated Grill',
  'Boiling+Combining':   'Mixed Assembly',
  'Grilling+Combining':  'Grilled Finish',
  'Grilling+Sautéing':   'Cooked Blend',
  'Sautéing+Combining':  'Sauce Assembly',
  'Folding+Combining':   'Cream Fold',
  'Finishing+Plating':   'Garnished Plate',
};

function inferContextualTitle(selectedNodes: FlowNode[], promptHint: string): string {
  const processes = [...new Set(selectedNodes.map(n => n.process))].sort();
  const pairKey = processes.slice(0, 2).join('+');
  if (PROCESS_PAIR_TITLES[pairKey]) return PROCESS_PAIR_TITLES[pairKey];

  // Use last selected node's title + contextual suffix
  if (selectedNodes.length > 0) {
    const baseTitle = selectedNodes[selectedNodes.length - 1].title;
    const suffixes = ['Assembly', 'Blend', 'Finish', 'Combination'];
    const suffix = suffixes[selectedNodes.length % suffixes.length];
    // Take first meaningful word from base title
    const word = baseTitle.split(' ').find(w => w.length > 3) || baseTitle;
    return `${toTitleCase(word)} ${suffix}`;
  }

  return 'Combined Step';
}

/* ─── Props ──────────────────────────────────────────────── */

interface CreateMenuViewProps {
  sharedDish: SharedDishData;
  onSharedDishChange: (data: SharedDishData) => void;
}

/* ─── Inline sub-components ──────────────────────────────── */

function ProcessSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-semibold text-gray-700 hover:bg-gray-50 w-full"
      >
        <span className="truncate flex-1 text-left">{value}</span>
        <ChevronDown className="size-3 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-40" onClick={e => e.stopPropagation()}>
          {PROCESS_TYPES.map(p => (
            <button
              key={p}
              onClick={() => { onChange(p); setOpen(false); }}
              className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 flex items-center gap-2"
            >
              {p === value && <Check className="size-3 text-[#FE5D4D]" />}
              <span className={p === value ? 'font-semibold text-[#FE5D4D]' : 'text-gray-700'}>{p}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChefSelectorInline({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const toggle = (chef: string) =>
    onChange(selected.includes(chef) ? selected.filter(c => c !== chef) : [...selected, chef]);
  return (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-semibold text-gray-700 hover:bg-gray-50 w-full"
      >
        <ChefHat className="size-3 text-gray-400 shrink-0" />
        <span className="truncate flex-1 text-left">
          {selected.length === 0 ? 'Assign chef' : selected.join(', ')}
        </span>
        <ChevronDown className="size-3 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-36" onClick={e => e.stopPropagation()}>
          {CHEF_ROLES.map(chef => (
            <button
              key={chef}
              onClick={() => toggle(chef)}
              className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 flex items-center gap-2"
            >
              <div className={`size-2 rounded-full ${CHEF_DOT[chef]}`} />
              <span className="flex-1 text-gray-700">{chef}</span>
              {selected.includes(chef) && <Check className="size-3 text-[#FE5D4D]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Card dimensions ────────────────────────────────────── */
const CARD_W = 240;
const CARD_H = 390;
const CARD_GAP = 80;

/* ─── Main component ─────────────────────────────────────── */

export function CreateMenuView({ sharedDish, onSharedDishChange }: CreateMenuViewProps) {
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [inputMode, setInputMode] = useState<'url' | 'transcript'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [transcriptInput, setTranscriptInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>(DISH_DATA.biryani.ingredients);
  const [manualIngredient, setManualIngredient] = useState('');

  const [flowNodes, setFlowNodes] = useState<FlowNode[]>(DISH_DATA.biryani.nodes);
  const [connections, setConnections] = useState<FlowConnection[]>(DISH_DATA.biryani.connections);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [promptText, setPromptText] = useState('');

  const [zoomLevel, setZoomLevel] = useState(0.9);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);
  // Always-current ref so removeNode never reads stale connections
  const connectionsRef = useRef(connections);
  connectionsRef.current = connections;

  /* ── Sync nodes → shared state ── */
  const syncToShared = useCallback((nodes: FlowNode[], conns: FlowConnection[], dishName: string) => {
    onSharedDishChange({ dishName, methodology: deriveMethodologyFromNodes(nodes, conns) });
  }, [onSharedDishChange]);

  /* ── Live derived methodology (never stored separately) ── */
  const methodology = deriveMethodologyFromNodes(flowNodes, connections);

  /* ── Update helpers ── */
  const updateNode = (id: string, patch: Partial<FlowNode>) => {
    const next = flowNodes.map(n => n.id === id ? { ...n, ...patch } : n);
    setFlowNodes(next);
    syncToShared(next, connections, sharedDish.dishName);
  };

  // Only the last card can be removed; reads connections from ref to avoid stale closure
  const removeLastNode = () => {
    if (flowNodes.length === 0) return;
    const lastId = flowNodes[flowNodes.length - 1].id;
    const nextNodes = flowNodes.slice(0, -1);
    const nextConns = connectionsRef.current.filter(c => c.from !== lastId && c.to !== lastId);
    setFlowNodes(nextNodes);
    setConnections(nextConns);
    setSelectedNodes(prev => prev.filter(s => s !== lastId));
    syncToShared(nextNodes, nextConns, sharedDish.dishName);
  };

  /* Fix #5 – RHS chef toggle propagates to all nodes with same process */
  const updateStepChefs = (processType: string, chefs: string[]) => {
    const next = flowNodes.map(n => n.process === processType ? { ...n, chefs } : n);
    setFlowNodes(next);
    syncToShared(next, connections, sharedDish.dishName);
  };

  /* Fix #13 – RHS field edit propagates back to canvas */
  const updateStepInNodes = (processType: string, patch: Partial<FlowNode>) => {
    let nextConns = connections;
    const next = flowNodes.map(n => {
      if (n.process !== processType) return n;
      const updated = { ...n, ...patch };
      // If process changed, update connections that involve this node
      if (patch.process && patch.process !== processType) {
        nextConns = nextConns.map(c => {
          if (c.from === n.id) return { ...c, method: (patch.process as string).slice(0, 8) };
          return c;
        });
      }
      return updated;
    });
    setFlowNodes(next);
    if (nextConns !== connections) setConnections(nextConns);
    syncToShared(next, nextConns, sharedDish.dishName);
  };

  /* ── Collision detection ── */
  const findFreePosition = (baseX: number, baseY: number, existingNodes: FlowNode[]) => {
    const collides = (x: number, y: number) =>
      existingNodes.some(n => Math.abs(x - n.position.x) < CARD_W + CARD_GAP && Math.abs(y - n.position.y) < CARD_H + CARD_GAP);
    if (!collides(baseX, baseY)) return { x: baseX, y: baseY };
    const step = CARD_W + CARD_GAP;
    for (let ring = 1; ring <= 8; ring++) {
      for (const c of [
        { x: baseX + ring * step, y: baseY },
        { x: baseX, y: baseY + ring * (CARD_H + CARD_GAP) },
        { x: baseX + ring * step, y: baseY + ring * (CARD_H + CARD_GAP) },
        { x: baseX - ring * step, y: baseY },
      ]) {
        if (c.x >= 40 && c.y >= 40 && !collides(c.x, c.y)) return c;
      }
    }
    return { x: 80 + existingNodes.length * step, y: 80 };
  };

  /* ── Drag & drop ── */
  const handleDragStart = (e: React.DragEvent, ingredient: Ingredient) => {
    e.dataTransfer.setData('ingredient', JSON.stringify(ingredient));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('ingredient');
    if (!data) return;
    const ing: Ingredient = JSON.parse(data);
    const rect = canvasRef.current!.getBoundingClientRect();
    const rawX = (e.clientX - rect.left - panOffset.x) / zoomLevel - CARD_W / 2;
    const rawY = (e.clientY - rect.top - panOffset.y) / zoomLevel - CARD_H / 2;
    const position = findFreePosition(Math.max(40, rawX), Math.max(40, rawY), flowNodes);
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      title: toTitleCase(ing.name),
      quantity: ing.quantity,
      duration: '30m',
      process: 'Marinating',
      chefs: ['Sous'],
      image: ing.image,
      position,
    };
    const next = [...flowNodes, newNode];
    setFlowNodes(next);
    syncToShared(next, connections, sharedDish.dishName);
  };

  /* ── Node selection ── */
  const handleNodeClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.canvas) setSelectedNodes([]);
  };

  /* ── Pan / zoom ── */
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoomLevel(prev => Math.min(Math.max(prev + (e.deltaY > 0 ? -0.05 : 0.05), 0.4), 2));
    }
  };
  const handleMouseDown  = (e: React.MouseEvent) => { if (panMode) { setIsPanning(true); setLastPanPoint({ x: e.clientX, y: e.clientY }); } };
  const handleMouseMove  = (e: React.MouseEvent) => { if (isPanning) { setPanOffset(prev => ({ x: prev.x + e.clientX - lastPanPoint.x, y: prev.y + e.clientY - lastPanPoint.y })); setLastPanPoint({ x: e.clientX, y: e.clientY }); } };
  const handleMouseUp    = () => setIsPanning(false);

  /* ── Generate step from selection (Fix #6) ── */
  const handlePromptSubmit = () => {
    if (!promptText.trim()) return;
    const selNodes = flowNodes.filter(n => selectedNodes.includes(n.id));
    const baseNodes = selNodes.length > 0 ? selNodes : flowNodes;

    const avgX = baseNodes.reduce((s, n) => s + n.position.x, 0) / baseNodes.length;
    const avgY = baseNodes.reduce((s, n) => s + n.position.y, 0) / baseNodes.length;
    const position = findFreePosition(avgX + CARD_W + CARD_GAP, avgY, flowNodes);

    // Contextual title, not the prompt text
    const title = inferContextualTitle(selNodes, promptText);
    const methodLabel = promptText.trim().slice(0, 12);

    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      title,
      quantity: selNodes.length > 0
        ? `${selNodes.reduce((s, n) => s + (parseFloat(n.quantity) || 0), 0).toFixed(1)}kg`
        : '0.5kg',
      duration: '30m',
      process: 'Combining',
      chefs: ['Sous'],
      image: getImageForTerm(title),
      position,
    };

    // Prompt text becomes the connection method label
    const newConns: FlowConnection[] = selNodes.map(n => ({
      from: n.id, to: newNode.id, method: methodLabel,
    }));

    const nextNodes = [...flowNodes, newNode];
    const nextConns = [...connections, ...newConns];
    setFlowNodes(nextNodes);
    setConnections(nextConns);
    setSelectedNodes([newNode.id]);
    setPromptText('');
    syncToShared(nextNodes, nextConns, sharedDish.dishName);
  };

  /* ── Create / Extract (Fix #7 + #8) ── */
  const handleCreate = () => {
    const input = (inputMode === 'url' ? urlInput : transcriptInput).trim();
    if (!input) return;
    setIsExtracting(true);

    setTimeout(() => {
      let result;

      if (inputMode === 'transcript') {
        // Full NLP parse — always returns usable data
        result = parseTranscript(input);
      } else {
        // URL mode: keyword-match to preset dish
        const lower = input.toLowerCase();
        let key: keyof typeof DISH_DATA = 'biryani';
        if (lower.includes('butter') || lower.includes('makhani')) key = 'butterchicken';
        else if (lower.includes('tikka') || lower.includes('masala')) key = 'tikka';
        else if (lower.includes('biryani')) key = 'biryani';
        result = DISH_DATA[key];
      }

      setIngredients(result.ingredients);
      setFlowNodes(result.nodes);
      setConnections(result.connections);
      setSelectedNodes([]);
      setIsExtracting(false);
      syncToShared(result.nodes, result.connections, result.dishName);
    }, 1000);
  };

  /* ── Add ingredient manually ── */
  const handleAddIngredient = () => {
    if (!manualIngredient.trim()) return;
    const newIng: Ingredient = {
      id: `ing-${Date.now()}`,
      name: toTitleCase(manualIngredient),   // Title Case, not ALL CAPS
      quantity: '100g',
      image: getImageForTerm(manualIngredient),
    };
    setIngredients(prev => [...prev, newIng]);
    setManualIngredient('');
  };

  /* ── SVG connections ── */
  const getNodeCenter = (id: string) => {
    const n = flowNodes.find(n => n.id === id);
    return n ? { x: n.position.x + CARD_W / 2, y: n.position.y + CARD_H / 2 } : null;
  };

  const makeCurvePath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const cx = (from.x + to.x) / 2;
    return `M ${from.x} ${from.y} C ${cx} ${from.y}, ${cx} ${to.y}, ${to.x} ${to.y}`;
  };

  /* ─────────────────────────────────────────── RENDER ─── */

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#fff8f7]">
      <AIChatDrawer isOpen={showAIDrawer} onClose={() => setShowAIDrawer(false)} />
      <CommonHeader mainItem={sharedDish.dishName} title="Recipe Workflow Builder" />

      {/* ── Input strip ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setInputMode('url')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputMode === 'url' ? 'bg-white text-[#FE5D4D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Link className="size-3" /> URL
          </button>
          <button
            onClick={() => setInputMode('transcript')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputMode === 'transcript' ? 'bg-white text-[#FE5D4D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FileText className="size-3" /> Transcript
          </button>
        </div>

        {inputMode === 'url' ? (
          <input
            type="text"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Paste YouTube or recipe URL…"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D]"
          />
        ) : (
          <textarea
            value={transcriptInput}
            onChange={e => setTranscriptInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.ctrlKey && handleCreate()}
            placeholder="Paste recipe transcript… e.g. '1kg basmati rice, marinate chicken for 30 mins, boil rice for 20 mins…'"
            rows={2}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5D4D]/20 focus:border-[#FE5D4D] resize-none"
          />
        )}

        <button
          onClick={handleCreate}
          disabled={isExtracting}
          className="flex items-center gap-2 px-4 py-2 bg-[#FE5D4D] text-white text-xs font-bold rounded-lg hover:bg-[#e54d3d] transition-colors disabled:opacity-60 whitespace-nowrap self-start mt-0.5"
        >
          {isExtracting ? (
            <><Loader2 className="size-3.5 animate-spin" /> Analysing…</>
          ) : (
            <><Sparkles className="size-3.5" /> Create</>
          )}
        </button>
      </div>

      {/* ── Three-panel layout ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── LHS: Ingredients ── */}
        <div className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Ingredients</p>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{ingredients.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {ingredients.map(ing => (
              <div
                key={ing.id}
                draggable
                onDragStart={e => handleDragStart(e, ing)}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all border border-gray-100 hover:border-[#FE5D4D]/30 bg-white"
              >
                {/* Image — top section */}
                <div className="h-24 overflow-hidden relative">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Drag hint */}
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 rounded px-1.5 py-0.5 text-[8px] text-white font-medium">drag</div>
                  </div>
                </div>
                {/* Text — below image, like canvas cards */}
                <div className="px-2.5 py-2 space-y-1.5">
                  <p className="text-[11px] font-bold text-gray-900 leading-tight truncate">
                    {toTitleCase(ing.name)}
                  </p>
                  <div className="flex items-center gap-1 bg-gray-50 rounded-md px-1.5 py-1">
                    <Package className="size-2.5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={ing.quantity}
                      onChange={e => {
                        setIngredients(prev => prev.map(i => i.id === ing.id ? { ...i, quantity: e.target.value } : i));
                      }}
                      onClick={e => e.stopPropagation()}
                      onMouseDown={e => e.stopPropagation()}
                      className="w-full text-[10px] text-gray-600 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={manualIngredient}
                onChange={e => setManualIngredient(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddIngredient()}
                placeholder="Add ingredient…"
                className="flex-1 px-2 py-1.5 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FE5D4D]"
              />
              <button
                onClick={handleAddIngredient}
                className="p-1.5 bg-[#FE5D4D] text-white rounded-lg hover:bg-[#e54d3d] transition-colors"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Canvas ── */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Fix #12 — pan/zoom toolbar moved down */}
          <div className="absolute top-10 right-3 z-20 flex items-center gap-1.5 bg-white rounded-xl shadow-md border border-gray-100 px-2 py-1.5">
            <button
              onClick={() => setPanMode(p => !p)}
              className={`p-1.5 rounded-lg transition-colors ${panMode ? 'bg-[#FE5D4D]/10 text-[#FE5D4D]' : 'text-gray-400 hover:text-gray-700'}`}
              title="Pan mode"
            >
              <Hand className="size-3.5" />
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <button onClick={() => setZoomLevel(z => Math.min(z + 0.1, 2))} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"><ZoomIn className="size-3.5" /></button>
            <button onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.4))} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"><ZoomOut className="size-3.5" /></button>
            <span className="text-[10px] text-gray-400 font-mono w-9 text-center">{Math.round(zoomLevel * 100)}%</span>
          </div>

          {selectedNodes.length > 0 && (
            <div className="absolute top-3 left-3 z-20 bg-[#FE5D4D] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
              {selectedNodes.length} selected
            </div>
          )}

          {/* Canvas scroll area */}
          <div
            ref={canvasRef}
            className="flex-1 overflow-hidden relative"
            style={{ cursor: panMode ? (isPanning ? 'grabbing' : 'grab') : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={handleCanvasClick}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            data-canvas="true"
          >
            {/* Dotted grid */}
            <div
              data-canvas="true"
              className="absolute inset-0"
              style={{ backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
            />

            {/* Zoomable content */}
            <div
              data-canvas="true"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: '0 0',
                position: 'absolute',
                width: '3000px',
                height: '2000px',
              }}
            >
              {/* SVG connections */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#FE5D4D" opacity="0.7" />
                  </marker>
                </defs>
                {connections.map((conn, i) => {
                  const from = getNodeCenter(conn.from);
                  const to   = getNodeCenter(conn.to);
                  if (!from || !to) return null;
                  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
                  return (
                    <g key={i}>
                      <path d={makeCurvePath(from, to)} fill="none" stroke="#FE5D4D" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" markerEnd="url(#arrowhead)" />
                      <foreignObject x={mid.x - 30} y={mid.y - 11} width="60" height="22">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ background: 'white', border: '1px solid #FE5D4D', borderRadius: '99px', fontSize: '9px', color: '#FE5D4D', fontWeight: 700, padding: '1px 6px', whiteSpace: 'nowrap' }}>
                            {conn.method}
                          </span>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

              {/* Flow cards */}
              {flowNodes.map((node, index) => {
                const isSelected = selectedNodes.includes(node.id);
                return (
                  <div
                    key={node.id}
                    onClick={e => handleNodeClick(node.id, e)}
                    style={{ position: 'absolute', left: node.position.x, top: node.position.y, width: CARD_W }}
                    /* Fix #2 — outer div keeps overflow-visible for badges; inner wrapper clips */
                    className={`group overflow-visible cursor-pointer select-none transition-all duration-200 ${isSelected ? 'drop-shadow-[0_0_8px_rgba(254,93,77,0.4)]' : ''}`}
                  >
                    {/* Step number badge (outside inner wrapper) */}
                    <div className="absolute -top-3 -left-3 z-10 w-7 h-7 rounded-full bg-[#FE5D4D] text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                    {/* Selection checkmark */}
                    <div className={`absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#FE5D4D] border-[#FE5D4D]' : 'bg-white border-gray-300 opacity-0 group-hover:opacity-100'}`}>
                      {isSelected && <Check className="size-3.5 text-white" />}
                    </div>
                    {/* Remove button — only on the last card */}
                    {index === flowNodes.length - 1 && (
                      <button
                        onClick={e => { e.stopPropagation(); removeLastNode(); }}
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 w-5 h-5 bg-black/30 hover:bg-red-500 rounded-full flex items-center justify-center transition-all"
                      >
                        <X className="size-3 text-white" />
                      </button>
                    )}

                    {/* Fix #2 — inner wrapper clips image to rounded corners */}
                    <div className={`rounded-2xl overflow-hidden shadow-lg border-2 transition-all ${isSelected ? 'border-[#FE5D4D]' : 'border-white hover:border-[#FE5D4D]/40'}`}>
                      {/* Card image — Fix #3: no duration badge here */}
                      <div className="relative h-32 overflow-hidden">
                        <img src={node.image} alt={node.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      {/* Fix #9 — better spacing; Fix #10 — Title Case, not ALL CAPS */}
                      <div className="bg-white p-3 pt-3 space-y-3">
                        {/* Title */}
                        <input
                          type="text"
                          value={node.title}
                          onChange={e => updateNode(node.id, { title: e.target.value })}
                          onClick={e => e.stopPropagation()}
                          className="w-full text-xs font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#FE5D4D] focus:outline-none pb-0.5 transition-colors"
                        />

                        {/* Quantity & Duration */}
                        <div className="flex gap-2">
                          <div className="flex-1 flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5">
                            <Package className="size-3 text-gray-400 shrink-0" />
                            <input
                              type="text"
                              value={node.quantity}
                              onChange={e => updateNode(node.id, { quantity: e.target.value })}
                              onClick={e => e.stopPropagation()}
                              className="w-full text-[10px] text-gray-700 bg-transparent focus:outline-none"
                            />
                          </div>
                          <div className="flex-1 flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5">
                            <Clock className="size-3 text-gray-400 shrink-0" />
                            <input
                              type="text"
                              value={node.duration}
                              onChange={e => updateNode(node.id, { duration: e.target.value })}
                              onClick={e => e.stopPropagation()}
                              className="w-full text-[10px] text-gray-700 bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Process */}
                        <div onClick={e => e.stopPropagation()}>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-1.5">Process</p>
                          <ProcessSelector value={node.process} onChange={v => updateNode(node.id, { process: v })} />
                        </div>

                        {/* Chefs */}
                        <div onClick={e => e.stopPropagation()}>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-1.5">Assigned Chefs</p>
                          <ChefSelectorInline selected={node.chefs} onChange={v => updateNode(node.id, { chefs: v })} />
                          {node.chefs.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {node.chefs.map(chef => (
                                <span key={chef} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${CHEF_COLORS[chef] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                  {chef}
                                </span>
                              ))}
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

          {/* ── Always-visible Prompt Bar ── */}
          <div className={`px-4 py-3 border-t transition-colors ${selectedNodes.length > 0 ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${selectedNodes.length > 0 ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <Sparkles className={`size-4 shrink-0 ${selectedNodes.length > 0 ? 'text-[#FE5D4D]' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePromptSubmit()}
                  placeholder={selectedNodes.length > 0 ? `Describe the next step…` : 'Describe a step to add to the canvas…'}
                  className={`flex-1 text-sm bg-transparent focus:outline-none ${selectedNodes.length > 0 ? 'text-white placeholder-gray-400' : 'text-gray-700 placeholder-gray-400'}`}
                />
                {promptText && <button onClick={() => setPromptText('')} className="text-gray-400 hover:text-gray-300"><X className="size-3.5" /></button>}
              </div>
              <button
                onClick={handlePromptSubmit}
                disabled={!promptText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-[#FE5D4D] text-white text-xs font-bold rounded-xl hover:bg-[#e54d3d] disabled:opacity-40 transition-colors whitespace-nowrap"
              >
                <ArrowRight className="size-3.5" /> Generate
              </button>
            </div>
            {selectedNodes.length > 0 && (
              <p className="text-[10px] text-gray-400 mt-1.5 ml-1">
                {flowNodes.filter(n => selectedNodes.includes(n.id)).map(n => n.title).join(' + ')}
              </p>
            )}
          </div>
        </div>

        {/* ── RHS: Steps panel (Fix #11, #5, #13) ── */}
        <div className="w-64 shrink-0 bg-white border-l border-gray-200 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            {/* Fix #11 — renamed header, removed subtext */}
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Steps</p>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{methodology.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {methodology.map((step, i) => (
              <div key={step.id} className="bg-[#fff8f7] border border-[#FE5D4D]/10 rounded-xl p-3 space-y-2.5">
                {/* Step header */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FE5D4D] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 leading-tight">{step.title}</p>
                  </div>
                </div>

                {/* Fix #13 — editable qty & duration in RHS; uses step.processType for back-sync */}
                <div className="flex gap-2 pl-8">
                  <div className="flex-1 flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1.5 py-1">
                    <Clock className="size-2.5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={step.duration}
                      onChange={e => updateStepInNodes(step.processType, { duration: e.target.value })}
                      className="w-full text-[10px] text-gray-700 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1.5 py-1">
                    <Package className="size-2.5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={step.quantity}
                      onChange={e => updateStepInNodes(step.processType, { quantity: e.target.value })}
                      className="w-full text-[10px] text-gray-700 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Substeps */}
                {step.substeps.length > 0 && (
                  <div className="space-y-1 pl-8">
                    {step.substeps.map(sub => (
                      <div key={sub.label} className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-[#FE5D4D] w-4 shrink-0">{sub.label}</span>
                        <span className="text-[10px] text-gray-600">{sub.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fix #5 — ALL 4 chefs shown, clickable toggles; uses step.processType */}
                <div className="pl-8">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-1.5">Chefs</p>
                  <div className="flex flex-wrap gap-1">
                    {CHEF_ROLES.map(chef => {
                      const chefUpper = chef.toUpperCase() as 'SOUS' | 'STATION' | 'TRAINEE' | 'JUNIOR';
                      const isAssigned = step.chefs.includes(chefUpper);
                      return (
                        <button
                          key={chef}
                          onClick={() => {
                            const currentNames = step.chefs.map(c => c.charAt(0) + c.slice(1).toLowerCase());
                            const next = isAssigned
                              ? currentNames.filter(c => c !== chef)
                              : [...currentNames, chef];
                            updateStepChefs(step.processType, next);
                          }}
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border transition-all ${
                            isAssigned ? CHEF_COLORS[chef] : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {chef}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {methodology.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="size-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Drop ingredients or add steps to the canvas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RMINTFab onClick={() => setShowAIDrawer(true)} isVisible={!showAIDrawer} />
    </div>
  );
}
