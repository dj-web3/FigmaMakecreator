/* ─── Shared types ───────────────────────────────────────────────────────── */

export interface GuideStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  resolution: string;
  assignedTo: string | null;
  ingredients: {
    major: { name: string; image: string }[];
    minor: { name: string; image: string }[];
  };
}

export interface DiscoveryMenuItem {
  id: string;
  name: string;
  prepWindow: number;
  unitMargin: number;
  demand: number;
  riskScore: number;
}

export interface DishPairing {
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

export interface DishRecord {
  dishName: string;
  subtitle: string;
  guideSteps: GuideStep[];
  discoveryItems: DiscoveryMenuItem[];
  pairings: DishPairing[];
}

/* ─── Image helpers ──────────────────────────────────────────────────────── */

const U = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

const IMG = {
  biryani:    U('1563379091339-03b21ab4a4f8'),
  marinat:    U('1606491956689-2ea866880c84'),
  rice:       U('1516684732162-798a0062be99'),
  onion:      U('1582515073490-39981397c445'),
  spice:      U('1596040033229-a9821ebd058d'),
  layer:      U('1563379091339-03b21ab4a4f8'),
  yogurt:     U('1541544537156-7627a7a4aa1c'),
  ginger:     U('1615484477778-ca3b77940c25'),
  chicken:    U('1606491956689-2ea866880c84'),
  tikka:      U('1599487488170-d11ec9c172f0'),
  makhani:    U('1631452180519-c014fe946bc7'),
  cream:      U('1628088062854-d1870b4553da'),
  butter:     U('1589985270826-4b7bb135bc9d'),
  tomato:     U('1546548970-71785318a17b'),
  gravy:      U('1631452180519-c014fe946bc7'),
  masala:     U('1601050690597-df0568f70950'),
  grill:      U('1555939594-58d7cb561ad1'),
  milk:       U('1550583724-b2692b85b150'),
  ghee:       U('1589985270826-4b7bb135bc9d'),
  jaggery:    U('1596040033229-a9821ebd058d'),
  cardamom:   U('1596040033229-a9821ebd058d'),
  saffron:    U('1596040033229-a9821ebd058d'),
  nuts:       U('1574570435-6b44d8da8903'),
  payasam:    U('1563805042-7684c019e1cb'),
  chocolate:  U('1578985545062-69928b1d9587'),
  cake:       U('1578985545062-69928b1d9587'),
  flour:      U('1509440159596-0249088772ff'),
  egg:        U('1518569656558-1f25e69d2491'),
  pasta:      U('1563379926898-05f4575a45d8'),
  pizza:      U('1565299624946-b28f40a0ae38'),
  dal:        U('1585937421612-70a008356fbe'),
  paneer:     U('1631452180519-c014fe946bc7'),
  bread:      U('1509440159596-0249088772ff'),
  kheer:      U('1563805042-7684c019e1cb'),
  default:    U('1490645935967-10de6ba17061'),
};

/* ─── Dish database ──────────────────────────────────────────────────────── */

export const DISH_DB: Record<string, DishRecord> = {

  biryani: {
    dishName: 'Chicken Biryani',
    subtitle: 'A step-by-step guide to the best rice dish ever',
    guideSteps: [
      { id: 1, title: 'Marinating the Chicken', duration: '45mins.', assignedTo: null, resolution: '720p',
        description: 'Combine chicken pieces with yogurt, ginger-garlic paste, biryani spices, red chilli and salt. Coat every piece well and rest for at least 2 hours—or overnight for deeper flavour. The yogurt tenderises the meat while spices penetrate to the bone.',
        thumbnail: IMG.marinat,
        ingredients: { major: [{ name: 'Chicken', image: IMG.chicken }, { name: 'Yogurt', image: IMG.yogurt }, { name: 'Ginger Garlic', image: IMG.ginger }], minor: [{ name: 'Cardamom', image: IMG.cardamom }, { name: 'Biryani Spice', image: IMG.spice }] } },
      { id: 2, title: 'Parboiling the Basmati Rice', duration: '20mins.', assignedTo: null, resolution: '720p',
        description: 'Rinse basmati rice until water runs clear. Boil with whole spices and salt until 70% cooked—grains should still have a firm bite. Drain immediately and spread to stop cooking. Over-cooked rice at this stage will turn mushy during dum.',
        thumbnail: IMG.rice,
        ingredients: { major: [{ name: 'Basmati Rice', image: IMG.rice }], minor: [{ name: 'Bay Leaf', image: IMG.spice }, { name: 'Cardamom', image: IMG.cardamom }] } },
      { id: 3, title: 'Frying Onions Until Golden', duration: '20mins.', assignedTo: null, resolution: '720p',
        description: 'Thinly slice onions and deep-fry in hot oil until deep golden and crispy. Patience is key—remove too early and they stay soft. These crispy onions (birista) add a sweet caramelised depth and are used both in layers and as garnish.',
        thumbnail: IMG.onion,
        ingredients: { major: [{ name: 'Onions', image: IMG.onion }], minor: [] } },
      { id: 4, title: 'Cooking the Spice Chicken', duration: '25mins.', assignedTo: null, resolution: '720p',
        description: 'Heat ghee, bloom whole spices, then add the marinated chicken. Seal on high heat first, then reduce and cook until 80% done. Fold in half the fried onions and fresh herbs. This masala layer is the soul of the biryani.',
        thumbnail: IMG.masala,
        ingredients: { major: [{ name: 'Ghee', image: IMG.ghee }, { name: 'Marinated Chicken', image: IMG.marinat }], minor: [{ name: 'Spice Mix', image: IMG.spice }, { name: 'Mint', image: IMG.default }] } },
      { id: 5, title: 'Layering Rice & Chicken', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Alternate layers of partially-cooked rice and spiced chicken in a heavy pot. Finish with a rice layer, sprinkle saffron milk, fried onions and a knob of ghee. Every layer carries its own flavour that will merge during the dum.',
        thumbnail: IMG.layer,
        ingredients: { major: [{ name: 'Parboiled Rice', image: IMG.rice }, { name: 'Spice Chicken', image: IMG.masala }], minor: [{ name: 'Saffron Milk', image: IMG.saffron }, { name: 'Fried Onions', image: IMG.onion }] } },
      { id: 6, title: 'Dum Cooking – Sealed Steam', duration: '60mins.', assignedTo: null, resolution: '720p',
        description: 'Seal the pot tightly with dough or foil, cook on high for 5 minutes then reduce to very low for 45 minutes. The trapped steam cooks rice fully while marrying all the layers. Rest for 10 minutes before opening and gently fluffing from the bottom.',
        thumbnail: IMG.biryani,
        ingredients: { major: [{ name: 'Assembled Biryani', image: IMG.biryani }], minor: [{ name: 'Kewra Water', image: IMG.default }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'CHICKEN BIRYANI',  prepWindow: 120, unitMargin: 22.0, demand: 158, riskScore: 12 },
      { id: '2', name: 'RAITA',            prepWindow: 5,   unitMargin: 3.0,  demand: 141, riskScore: 8  },
      { id: '3', name: 'MIRCHI KA SALAN',  prepWindow: 30,  unitMargin: 7.0,  demand: 94,  riskScore: 34 },
      { id: '4', name: 'SHAHI TUKDA',      prepWindow: 25,  unitMargin: 9.0,  demand: 87,  riskScore: 41 },
      { id: '5', name: 'MUTTON BIRYANI',   prepWindow: 150, unitMargin: 28.0, demand: 112, riskScore: 22 },
      { id: '6', name: 'VEG BIRYANI',      prepWindow: 60,  unitMargin: 14.0, demand: 76,  riskScore: 55 },
    ],
    pairings: [
      { id: '1',  name: 'Raita',           angle: 20,  distance: 220, color: '#ef4444', image: IMG.yogurt,    duration: '5m',  demand: 92, description: 'Cool yogurt side' },
      { id: '2',  name: 'Mint Chutney',    angle: 45,  distance: 210, color: '#22c55e', image: IMG.default,   duration: '8m',  demand: 85, description: 'Fresh herb dip' },
      { id: '3',  name: 'Fried Onions',    angle: 70,  distance: 200, color: '#f59e0b', image: IMG.onion,     duration: '20m', demand: 78, description: 'Crispy birista garnish' },
      { id: '4',  name: 'Saffron Milk',    angle: 100, distance: 220, color: '#fbbf24', image: IMG.saffron,   duration: '3m',  demand: 88, description: 'Fragrant saffron drizzle' },
      { id: '5',  name: 'Kachumber',       angle: 130, distance: 215, color: '#10b981', image: IMG.tomato,    duration: '10m', demand: 72, description: 'Fresh diced salad' },
      { id: '6',  name: 'Pappad',          angle: 160, distance: 200, color: '#6366f1', image: IMG.default,   duration: '4m',  demand: 81, description: 'Crisp lentil wafer' },
      { id: '7',  name: 'Rose Sharbat',    angle: 200, distance: 220, color: '#ec4899', image: IMG.default,   duration: '2m',  demand: 67, description: 'Sweet floral drink' },
      { id: '8',  name: 'Cardamom Tea',    angle: 240, distance: 210, color: '#8b5cf6', image: IMG.cardamom,  duration: '10m', demand: 74, description: 'Aromatic chai finish' },
      { id: '9',  name: 'Ghee',            angle: 280, distance: 195, color: '#f97316', image: IMG.ghee,      duration: '1m',  demand: 95, description: 'Clarified butter drizzle' },
      { id: '10', name: 'Pickled Lemon',   angle: 320, distance: 210, color: '#eab308', image: IMG.default,   duration: '—',   demand: 69, description: 'Tangy citrus pickle' },
    ],
  },

  butterchicken: {
    dishName: 'Butter Chicken',
    subtitle: 'Silky makhani gravy meets tender grilled chicken',
    guideSteps: [
      { id: 1, title: 'Marinate & Grill Chicken Tikka', duration: '40mins.', assignedTo: null, resolution: '720p',
        description: 'Marinate chicken in yogurt, spices and lemon. Thread on skewers and char-grill or oven-broil until lightly charred. The charring creates flavour depth that the buttery gravy cannot replicate on its own.',
        thumbnail: IMG.tikka,
        ingredients: { major: [{ name: 'Chicken Breast', image: IMG.chicken }, { name: 'Yogurt', image: IMG.yogurt }], minor: [{ name: 'Tandoori Spice', image: IMG.spice }] } },
      { id: 2, title: 'Build the Makhani Gravy', duration: '30mins.', assignedTo: null, resolution: '720p',
        description: 'Sauté onions, ginger-garlic, tomatoes and cashews until soft. Blend to a smooth purée, pass through a sieve, then cook in butter with spices until the oil separates and the sauce is deep orange-red.',
        thumbnail: IMG.makhani,
        ingredients: { major: [{ name: 'Tomatoes', image: IMG.tomato }, { name: 'Cashews', image: IMG.nuts }, { name: 'Butter', image: IMG.butter }], minor: [{ name: 'Kashmiri Chilli', image: IMG.spice }] } },
      { id: 3, title: 'Fold in Cream', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Reduce heat to low and stir in heavy cream in a circular motion. Never boil after adding cream. A small knob of cold butter swirled in at the end gives the signature gloss.',
        thumbnail: IMG.cream,
        ingredients: { major: [{ name: 'Heavy Cream', image: IMG.cream }, { name: 'Butter', image: IMG.butter }], minor: [{ name: 'Kasuri Methi', image: IMG.spice }] } },
      { id: 4, title: 'Add Chicken & Simmer', duration: '15mins.', assignedTo: null, resolution: '720p',
        description: 'Add the grilled tikka pieces to the gravy. Simmer on low for 10-12 minutes so the chicken absorbs the sauce. Finish with crushed kasuri methi—this is the signature aroma of authentic butter chicken.',
        thumbnail: IMG.gravy,
        ingredients: { major: [{ name: 'Tikka Chicken', image: IMG.tikka }, { name: 'Makhani Sauce', image: IMG.makhani }], minor: [] } },
      { id: 5, title: 'Plate & Garnish', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Ladle into a warm bowl, swirl a teaspoon of cream on top and dust with mild chilli. Serve immediately with naan or steamed basmati.',
        thumbnail: IMG.makhani,
        ingredients: { major: [{ name: 'Butter Chicken', image: IMG.makhani }], minor: [{ name: 'Cream', image: IMG.cream }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'BUTTER CHICKEN',   prepWindow: 45,  unitMargin: 20.0, demand: 162, riskScore: 10 },
      { id: '2', name: 'GARLIC NAAN',      prepWindow: 12,  unitMargin: 4.0,  demand: 148, riskScore: 14 },
      { id: '3', name: 'LASSI',            prepWindow: 5,   unitMargin: 5.0,  demand: 121, riskScore: 18 },
      { id: '4', name: 'DAL MAKHANI',      prepWindow: 90,  unitMargin: 14.0, demand: 97,  riskScore: 28 },
      { id: '5', name: 'PANEER TIKKA',     prepWindow: 30,  unitMargin: 16.0, demand: 88,  riskScore: 32 },
      { id: '6', name: 'KULFI',            prepWindow: 240, unitMargin: 6.0,  demand: 75,  riskScore: 44 },
    ],
    pairings: [
      { id: '1',  name: 'Garlic Naan',     angle: 15,  distance: 220, color: '#ef4444', image: IMG.bread,    duration: '12m', demand: 96, description: 'Pillowy leavened bread' },
      { id: '2',  name: 'Basmati Rice',    angle: 50,  distance: 210, color: '#f97316', image: IMG.rice,     duration: '20m', demand: 88, description: 'Fluffy long grain rice' },
      { id: '3',  name: 'Kasuri Methi',    angle: 85,  distance: 195, color: '#22c55e', image: IMG.spice,    duration: '1m',  demand: 91, description: 'Dried fenugreek herb' },
      { id: '4',  name: 'Mango Lassi',     angle: 120, distance: 220, color: '#fbbf24', image: IMG.default,  duration: '5m',  demand: 84, description: 'Sweet mango yogurt drink' },
      { id: '5',  name: 'Raita',           angle: 150, distance: 210, color: '#10b981', image: IMG.yogurt,   duration: '5m',  demand: 79, description: 'Cooling cucumber yogurt' },
      { id: '6',  name: 'Pickled Onion',   angle: 185, distance: 205, color: '#6366f1', image: IMG.onion,    duration: '—',   demand: 72, description: 'Tangy quick pickle' },
      { id: '7',  name: 'Saffron',         angle: 220, distance: 215, color: '#f59e0b', image: IMG.saffron,  duration: '1m',  demand: 68, description: 'Golden floral spice' },
      { id: '8',  name: 'Cardamom',        angle: 260, distance: 200, color: '#8b5cf6', image: IMG.cardamom, duration: '1m',  demand: 74, description: 'Warm aromatic pod' },
      { id: '9',  name: 'Tomato Chutney',  angle: 300, distance: 215, color: '#ec4899', image: IMG.tomato,   duration: '15m', demand: 65, description: 'Spiced tomato relish' },
      { id: '10', name: 'Masala Chai',     angle: 340, distance: 205, color: '#dc2626', image: IMG.default,  duration: '8m',  demand: 80, description: 'Spiced Indian tea' },
    ],
  },

  tikka: {
    dishName: 'Chicken Tikka Masala',
    subtitle: 'Chargrilled tikka in a rich, aromatic masala sauce',
    guideSteps: [
      { id: 1, title: 'Spice Marination', duration: '240mins.', assignedTo: null, resolution: '720p',
        description: 'Double marination is the secret—first with lemon and salt, then with yogurt and tandoori spices. At least 4 hours gives an intense depth. The acid from yogurt and lemon breaks down the protein fibres creating a tender, juicy bite.',
        thumbnail: IMG.marinat,
        ingredients: { major: [{ name: 'Chicken', image: IMG.chicken }, { name: 'Yogurt', image: IMG.yogurt }], minor: [{ name: 'Tandoori Spice', image: IMG.spice }, { name: 'Lemon', image: IMG.default }] } },
      { id: 2, title: 'Char Grill the Tikka', duration: '30mins.', assignedTo: null, resolution: '720p',
        description: 'Cook on high direct heat—grill, tandoor or broiler—turning every 2-3 minutes until charred spots appear and juices run clear. The char is not burned; it is caramelisation that adds smokiness the masala sauce will amplify.',
        thumbnail: IMG.grill,
        ingredients: { major: [{ name: 'Marinated Chicken', image: IMG.marinat }], minor: [] } },
      { id: 3, title: 'Tikka Masala Sauce', duration: '40mins.', assignedTo: null, resolution: '720p',
        description: 'Blooming cumin in oil, add onions until golden, then tomatoes, ginger-garlic and ground spices. Cook until oil separates. Blend smooth. Return to pan and cook further until the colour deepens to a dark rust-orange.',
        thumbnail: IMG.masala,
        ingredients: { major: [{ name: 'Tomatoes', image: IMG.tomato }, { name: 'Onions', image: IMG.onion }], minor: [{ name: 'Masala Spices', image: IMG.spice }, { name: 'Ginger Garlic', image: IMG.ginger }] } },
      { id: 4, title: 'Combine & Simmer', duration: '20mins.', assignedTo: null, resolution: '720p',
        description: 'Add tikka to the sauce and simmer on medium-low for 15 minutes. Stir in cream and adjust salt. The chicken continues to cook gently, pulling flavour from the sauce while releasing its own charred juices back in.',
        thumbnail: IMG.gravy,
        ingredients: { major: [{ name: 'Tikka Chicken', image: IMG.tikka }, { name: 'Masala Sauce', image: IMG.masala }, { name: 'Cream', image: IMG.cream }], minor: [] } },
      { id: 5, title: 'Plate & Finish', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Plate in a wide bowl, garnish with a cream swirl, fresh coriander and a light dusting of garam masala. Serve with butter naan for the full restaurant experience.',
        thumbnail: IMG.tikka,
        ingredients: { major: [{ name: 'Tikka Masala', image: IMG.masala }], minor: [{ name: 'Coriander', image: IMG.default }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'CHICKEN TIKKA MASALA', prepWindow: 50, unitMargin: 21.0, demand: 155, riskScore: 11 },
      { id: '2', name: 'BUTTER NAAN',          prepWindow: 10, unitMargin: 3.5,  demand: 144, riskScore: 13 },
      { id: '3', name: 'ONION BHAJI',          prepWindow: 15, unitMargin: 7.0,  demand: 118, riskScore: 24 },
      { id: '4', name: 'MANGO CHUTNEY',        prepWindow: 5,  unitMargin: 2.0,  demand: 132, riskScore: 9  },
      { id: '5', name: 'SAAG PANEER',          prepWindow: 35, unitMargin: 13.0, demand: 86,  riskScore: 38 },
      { id: '6', name: 'KHEER',               prepWindow: 45, unitMargin: 8.0,  demand: 79,  riskScore: 47 },
    ],
    pairings: [
      { id: '1',  name: 'Butter Naan',     angle: 20,  distance: 220, color: '#ef4444', image: IMG.bread,    duration: '10m', demand: 95, description: 'Soft buttered flatbread' },
      { id: '2',  name: 'Raita',           angle: 55,  distance: 210, color: '#22c55e', image: IMG.yogurt,   duration: '5m',  demand: 83, description: 'Cooling yogurt dip' },
      { id: '3',  name: 'Mango Chutney',   angle: 90,  distance: 200, color: '#fbbf24', image: IMG.default,  duration: '—',   demand: 88, description: 'Sweet mango condiment' },
      { id: '4',  name: 'Basmati Rice',    angle: 130, distance: 215, color: '#f97316', image: IMG.rice,     duration: '20m', demand: 76, description: 'Fragrant long-grain rice' },
      { id: '5',  name: 'Garam Masala',    angle: 165, distance: 195, color: '#8b5cf6', image: IMG.spice,    duration: '1m',  demand: 91, description: 'Warming spice blend' },
      { id: '6',  name: 'Onion Bhaji',     angle: 200, distance: 220, color: '#6366f1', image: IMG.onion,    duration: '15m', demand: 74, description: 'Crispy fried onion snack' },
      { id: '7',  name: 'Lime Pickle',     angle: 240, distance: 205, color: '#10b981', image: IMG.default,  duration: '—',   demand: 69, description: 'Preserved citrus condiment' },
      { id: '8',  name: 'Cardamom Lassi',  angle: 280, distance: 210, color: '#ec4899', image: IMG.cardamom, duration: '5m',  demand: 81, description: 'Spiced yogurt drink' },
      { id: '9',  name: 'Coriander',       angle: 320, distance: 200, color: '#16a34a', image: IMG.default,  duration: '1m',  demand: 87, description: 'Fresh herb garnish' },
      { id: '10', name: 'Kasuri Methi',    angle: 355, distance: 215, color: '#dc2626', image: IMG.spice,    duration: '1m',  demand: 92, description: 'Dried fenugreek leaf' },
    ],
  },

  payasam: {
    dishName: 'Payasam',
    subtitle: 'A fragrant South Indian rice pudding with saffron and nuts',
    guideSteps: [
      { id: 1, title: 'Toast Rice in Ghee', duration: '3mins.', assignedTo: null, resolution: '720p',
        description: 'Heat ghee in a heavy pan on medium. Add short-grain or raw rice and toast, stirring constantly, until the grains turn opaque and emit a nutty fragrance. This toasting step develops flavour and prevents the rice from becoming gluey later.',
        thumbnail: IMG.rice,
        ingredients: { major: [{ name: 'Rice', image: IMG.rice }, { name: 'Ghee', image: IMG.ghee }], minor: [] } },
      { id: 2, title: 'Bring Milk to Boil', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Pour full-fat milk into the pan with the toasted rice. Bring to a rolling boil on high heat, stirring to prevent a skin forming. Use full-fat milk—reduced fat milk will give a watery, flat-tasting payasam.',
        thumbnail: IMG.milk,
        ingredients: { major: [{ name: 'Full Fat Milk', image: IMG.milk }], minor: [] } },
      { id: 3, title: 'Simmer Rice in Milk', duration: '20mins.', assignedTo: null, resolution: '720p',
        description: 'Reduce to medium-low and simmer, stirring every 3-4 minutes to prevent sticking. The rice should break down slightly and the milk thicken and reduce by about 30%. Patience here is what separates a good payasam from a great one.',
        thumbnail: IMG.payasam,
        ingredients: { major: [{ name: 'Rice in Milk', image: IMG.payasam }], minor: [] } },
      { id: 4, title: 'Add Jaggery & Stir', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Remove from direct heat before adding jaggery—adding it while boiling can cause the milk to split. Stir until fully dissolved, then return to low heat for 2 minutes. Taste and adjust sweetness. Jaggery gives a richer, more complex sweetness than sugar.',
        thumbnail: IMG.jaggery,
        ingredients: { major: [{ name: 'Jaggery', image: IMG.jaggery }], minor: [] } },
      { id: 5, title: 'Infuse Saffron & Cardamom', duration: '2mins.', assignedTo: null, resolution: '720p',
        description: 'Crush green cardamom pods and add seeds. Bloom saffron strands in a tablespoon of warm milk and pour in. These two aromatics define the payasam\'s identity—cardamom for warmth, saffron for golden colour and floral depth.',
        thumbnail: IMG.cardamom,
        ingredients: { major: [{ name: 'Green Cardamom', image: IMG.cardamom }, { name: 'Saffron', image: IMG.saffron }], minor: [] } },
      { id: 6, title: 'Toast Nuts & Garnish', duration: '4mins.', assignedTo: null, resolution: '720p',
        description: 'In a separate pan, heat ghee and fry cashews until golden, add almonds, then golden raisins (they puff up quickly). Scatter over the payasam just before serving. The contrast of creamy pudding with crunchy, buttery nuts is essential.',
        thumbnail: IMG.nuts,
        ingredients: { major: [{ name: 'Cashew Nuts', image: IMG.nuts }, { name: 'Almonds', image: IMG.nuts }, { name: 'Golden Raisins', image: IMG.nuts }], minor: [{ name: 'Ghee', image: IMG.ghee }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'PAYASAM',         prepWindow: 35,  unitMargin: 9.0,  demand: 118, riskScore: 22 },
      { id: '2', name: 'GULAB JAMUN',     prepWindow: 40,  unitMargin: 7.0,  demand: 134, riskScore: 18 },
      { id: '3', name: 'HALWA',           prepWindow: 30,  unitMargin: 8.0,  demand: 96,  riskScore: 31 },
      { id: '4', name: 'RASGULLA',        prepWindow: 60,  unitMargin: 6.0,  demand: 88,  riskScore: 38 },
      { id: '5', name: 'KESARI BATH',     prepWindow: 20,  unitMargin: 5.0,  demand: 74,  riskScore: 49 },
      { id: '6', name: 'KHEER',          prepWindow: 45,  unitMargin: 8.0,  demand: 82,  riskScore: 42 },
    ],
    pairings: [
      { id: '1',  name: 'Cashew Nuts',    angle: 15,  distance: 220, color: '#f59e0b', image: IMG.nuts,     duration: '4m',  demand: 92, description: 'Butter-fried nut garnish' },
      { id: '2',  name: 'Golden Raisins', angle: 50,  distance: 205, color: '#eab308', image: IMG.nuts,     duration: '2m',  demand: 85, description: 'Sweet plump dried fruit' },
      { id: '3',  name: 'Saffron',        angle: 85,  distance: 215, color: '#fbbf24', image: IMG.saffron,  duration: '1m',  demand: 88, description: 'Floral golden spice' },
      { id: '4',  name: 'Green Cardamom', angle: 120, distance: 200, color: '#22c55e', image: IMG.cardamom, duration: '1m',  demand: 94, description: 'Warm aromatic spice' },
      { id: '5',  name: 'Jaggery',        angle: 155, distance: 220, color: '#d97706', image: IMG.jaggery,  duration: '—',   demand: 90, description: 'Unrefined cane sweetener' },
      { id: '6',  name: 'Rose Water',     angle: 190, distance: 210, color: '#ec4899', image: IMG.default,  duration: '1m',  demand: 76, description: 'Delicate floral essence' },
      { id: '7',  name: 'Almonds',        angle: 225, distance: 200, color: '#a16207', image: IMG.nuts,     duration: '3m',  demand: 83, description: 'Toasted nut garnish' },
      { id: '8',  name: 'Coconut Milk',   angle: 260, distance: 215, color: '#6ee7b7', image: IMG.milk,     duration: '—',   demand: 69, description: 'Creamy tropical base' },
      { id: '9',  name: 'Vanilla',        angle: 300, distance: 205, color: '#8b5cf6', image: IMG.default,  duration: '1m',  demand: 72, description: 'Sweet floral note' },
      { id: '10', name: 'Pistachio',      angle: 340, distance: 210, color: '#16a34a', image: IMG.nuts,     duration: '2m',  demand: 80, description: 'Crunchy green nut' },
    ],
  },

  kheer: {
    dishName: 'Rice Kheer',
    subtitle: 'Slow-cooked creamy rice pudding with saffron and pistachios',
    guideSteps: [
      { id: 1, title: 'Soak Basmati Rice', duration: '30mins.', assignedTo: null, resolution: '720p',
        description: 'Rinse basmati rice and soak in cold water for 30 minutes. This shortens cooking time and keeps grains intact—you want texture in kheer, not a smooth porridge. Drain well before using.',
        thumbnail: IMG.rice,
        ingredients: { major: [{ name: 'Basmati Rice', image: IMG.rice }], minor: [] } },
      { id: 2, title: 'Boil Full-Cream Milk', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Bring full-cream milk to a boil in a heavy-bottomed pan, stirring to prevent scorching. The milk will rise—keep the heat at medium-high and watch closely. Never use low-fat milk for kheer.',
        thumbnail: IMG.milk,
        ingredients: { major: [{ name: 'Full Cream Milk', image: IMG.milk }], minor: [] } },
      { id: 3, title: 'Cook Rice in Milk', duration: '25mins.', assignedTo: null, resolution: '720p',
        description: 'Add drained rice to boiling milk. Simmer on medium, stirring frequently. As rice cooks it releases starch that naturally thickens the milk. The kheer is ready when a spoon drawn across the surface leaves a trail.',
        thumbnail: IMG.kheer,
        ingredients: { major: [{ name: 'Rice', image: IMG.rice }, { name: 'Milk', image: IMG.milk }], minor: [] } },
      { id: 4, title: 'Sweeten & Add Flavour', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Stir in sugar and bloom saffron in warm milk then add. Crush cardamom pods and add seeds. Stir for 2 minutes on low heat. The saffron turns the kheer golden; cardamom is the signature aroma.',
        thumbnail: IMG.cardamom,
        ingredients: { major: [{ name: 'Sugar', image: IMG.default }, { name: 'Saffron', image: IMG.saffron }, { name: 'Cardamom', image: IMG.cardamom }], minor: [] } },
      { id: 5, title: 'Chill & Garnish', duration: '15mins.', assignedTo: null, resolution: '720p',
        description: 'Cool to room temperature then refrigerate for at least 30 minutes—kheer thickens further as it chills. Top with slivered pistachios and a few saffron strands before serving cold.',
        thumbnail: IMG.kheer,
        ingredients: { major: [{ name: 'Chilled Kheer', image: IMG.kheer }], minor: [{ name: 'Pistachios', image: IMG.nuts }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'RICE KHEER',      prepWindow: 45, unitMargin: 8.0,  demand: 108, riskScore: 28 },
      { id: '2', name: 'GULAB JAMUN',     prepWindow: 40, unitMargin: 7.0,  demand: 122, riskScore: 22 },
      { id: '3', name: 'RASMALAI',        prepWindow: 90, unitMargin: 11.0, demand: 94,  riskScore: 35 },
      { id: '4', name: 'HALWA',           prepWindow: 30, unitMargin: 8.0,  demand: 87,  riskScore: 40 },
      { id: '5', name: 'PAYASAM',         prepWindow: 35, unitMargin: 9.0,  demand: 79,  riskScore: 44 },
      { id: '6', name: 'JALEBI',          prepWindow: 20, unitMargin: 5.0,  demand: 115, riskScore: 18 },
    ],
    pairings: [
      { id: '1',  name: 'Pistachios',     angle: 20,  distance: 210, color: '#16a34a', image: IMG.nuts,     duration: '2m',  demand: 90, description: 'Crunchy green garnish' },
      { id: '2',  name: 'Saffron',        angle: 60,  distance: 220, color: '#fbbf24', image: IMG.saffron,  duration: '1m',  demand: 86, description: 'Golden floral spice' },
      { id: '3',  name: 'Rose Water',     angle: 100, distance: 205, color: '#ec4899', image: IMG.default,  duration: '1m',  demand: 78, description: 'Floral essence' },
      { id: '4',  name: 'Cardamom',       angle: 140, distance: 215, color: '#22c55e', image: IMG.cardamom, duration: '1m',  demand: 92, description: 'Warming seed spice' },
      { id: '5',  name: 'Almonds',        angle: 180, distance: 200, color: '#d97706', image: IMG.nuts,     duration: '3m',  demand: 82, description: 'Toasted sliced nut' },
      { id: '6',  name: 'Vanilla',        angle: 220, distance: 215, color: '#8b5cf6', image: IMG.default,  duration: '1m',  demand: 74, description: 'Sweet floral pod' },
      { id: '7',  name: 'Condensed Milk', angle: 260, distance: 205, color: '#f97316', image: IMG.milk,     duration: '—',   demand: 68, description: 'Extra sweetness layer' },
      { id: '8',  name: 'Cinnamon',       angle: 300, distance: 210, color: '#dc2626', image: IMG.spice,    duration: '1m',  demand: 72, description: 'Warm baking spice' },
      { id: '9',  name: 'Dried Rose',     angle: 340, distance: 200, color: '#db2777', image: IMG.default,  duration: '—',   demand: 65, description: 'Fragrant petal garnish' },
    ],
  },

  chocolate_cake: {
    dishName: 'Chocolate Cake',
    subtitle: 'Rich dark chocolate cake with silky ganache frosting',
    guideSteps: [
      { id: 1, title: 'Cream Butter & Sugar', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Beat room-temperature butter and caster sugar together on high speed until pale, fluffy and roughly doubled in volume—about 4 minutes. This traps air that leavens the cake. Cold butter will not cream properly.',
        thumbnail: IMG.butter,
        ingredients: { major: [{ name: 'Butter', image: IMG.butter }, { name: 'Caster Sugar', image: IMG.default }], minor: [] } },
      { id: 2, title: 'Add Eggs One at a Time', duration: '3mins.', assignedTo: null, resolution: '720p',
        description: 'Beat in eggs one at a time, waiting until each is fully incorporated. If the mixture starts to curdle, add a tablespoon of flour. Room-temperature eggs emulsify more easily than cold ones.',
        thumbnail: IMG.egg,
        ingredients: { major: [{ name: 'Eggs', image: IMG.egg }], minor: [{ name: 'Vanilla Extract', image: IMG.default }] } },
      { id: 3, title: 'Sift & Fold Dry Ingredients', duration: '5mins.', assignedTo: null, resolution: '720p',
        description: 'Sift together flour, cocoa powder, baking powder and a pinch of salt. Fold into the wet mixture in three additions, alternating with milk. Stop as soon as no dry streaks remain—over-mixing develops gluten and makes the cake tough.',
        thumbnail: IMG.chocolate,
        ingredients: { major: [{ name: 'Flour', image: IMG.flour }, { name: 'Cocoa Powder', image: IMG.chocolate }], minor: [{ name: 'Baking Powder', image: IMG.flour }, { name: 'Salt', image: IMG.default }] } },
      { id: 4, title: 'Bake at 175°C', duration: '35mins.', assignedTo: null, resolution: '720p',
        description: 'Divide batter between two lined 20cm tins. Bake at 175°C fan for 30-35 minutes. A skewer inserted in the centre should come out with moist crumbs—not wet batter. Cool in tins for 10 minutes, then turn out onto a wire rack completely before frosting.',
        thumbnail: IMG.cake,
        ingredients: { major: [{ name: 'Cake Batter', image: IMG.chocolate }], minor: [] } },
      { id: 5, title: 'Make Chocolate Ganache', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Heat cream until steaming, pour over chopped dark chocolate. Leave 2 minutes, then stir from the centre outward until smooth and glossy. Let cool to a spreadable consistency—roughly 30 minutes at room temperature.',
        thumbnail: IMG.cream,
        ingredients: { major: [{ name: 'Dark Chocolate', image: IMG.chocolate }, { name: 'Heavy Cream', image: IMG.cream }], minor: [] } },
      { id: 6, title: 'Layer, Frost & Finish', duration: '15mins.', assignedTo: null, resolution: '720p',
        description: 'Level cake tops, sandwich with ganache, crumb-coat the outside and refrigerate 15 minutes. Apply final ganache coat. Finish with a ganache drip over the top edge for a professional look.',
        thumbnail: IMG.cake,
        ingredients: { major: [{ name: 'Baked Cake', image: IMG.cake }, { name: 'Ganache', image: IMG.chocolate }], minor: [{ name: 'Chocolate Shavings', image: IMG.chocolate }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'CHOCOLATE CAKE',  prepWindow: 60, unitMargin: 18.0, demand: 144, riskScore: 14 },
      { id: '2', name: 'BROWNIE',         prepWindow: 40, unitMargin: 12.0, demand: 138, riskScore: 16 },
      { id: '3', name: 'TIRAMISU',        prepWindow: 30, unitMargin: 14.0, demand: 121, riskScore: 21 },
      { id: '4', name: 'ICE CREAM',       prepWindow: 5,  unitMargin: 8.0,  demand: 156, riskScore: 9  },
      { id: '5', name: 'CHEESECAKE',      prepWindow: 90, unitMargin: 16.0, demand: 105, riskScore: 28 },
      { id: '6', name: 'MOUSSE',          prepWindow: 20, unitMargin: 11.0, demand: 89,  riskScore: 37 },
    ],
    pairings: [
      { id: '1',  name: 'Vanilla Ice Cream', angle: 15, distance: 220, color: '#8b5cf6', image: IMG.cream,     duration: '—',   demand: 94, description: 'Classic cold contrast' },
      { id: '2',  name: 'Raspberries',       angle: 50, distance: 210, color: '#ec4899', image: IMG.default,   duration: '—',   demand: 88, description: 'Tart fruit accent' },
      { id: '3',  name: 'Coffee',            angle: 85, distance: 200, color: '#78350f', image: IMG.default,   duration: '5m',  demand: 91, description: 'Bitter espresso pairing' },
      { id: '4',  name: 'Salted Caramel',    angle: 120, distance: 215, color: '#f59e0b', image: IMG.default,  duration: '10m', demand: 82, description: 'Sweet-salt sauce' },
      { id: '5',  name: 'Whipped Cream',     angle: 155, distance: 205, color: '#e2e8f0', image: IMG.cream,    duration: '5m',  demand: 86, description: 'Light dairy topping' },
      { id: '6',  name: 'Hazelnut',          angle: 190, distance: 220, color: '#a16207', image: IMG.nuts,     duration: '3m',  demand: 79, description: 'Nutty praline note' },
      { id: '7',  name: 'Sea Salt',          angle: 230, distance: 200, color: '#64748b', image: IMG.default,  duration: '—',   demand: 74, description: 'Flaky mineral finish' },
      { id: '8',  name: 'Rum',              angle: 270, distance: 210, color: '#dc2626', image: IMG.default,   duration: '—',   demand: 68, description: 'Dark rum soak' },
      { id: '9',  name: 'Orange Zest',      angle: 310, distance: 200, color: '#f97316', image: IMG.default,   duration: '2m',  demand: 72, description: 'Citrus brightness' },
      { id: '10', name: 'Mint',             angle: 350, distance: 215, color: '#22c55e', image: IMG.default,   duration: '1m',  demand: 65, description: 'Fresh herb contrast' },
    ],
  },

  pasta: {
    dishName: 'Pasta Carbonara',
    subtitle: 'Classic Roman pasta with guanciale, egg and pecorino',
    guideSteps: [
      { id: 1, title: 'Render the Pancetta', duration: '8mins.', assignedTo: null, resolution: '720p',
        description: 'Cook diced pancetta or guanciale in a cold pan—starting cold renders fat slowly and evenly. Medium heat only. Once golden and slightly crisp, remove from heat and reserve the rendered fat. The fat is the cooking medium for the sauce.',
        thumbnail: IMG.grill,
        ingredients: { major: [{ name: 'Pancetta', image: IMG.chicken }], minor: [{ name: 'Black Pepper', image: IMG.spice }] } },
      { id: 2, title: 'Boil Pasta in Salted Water', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Boil spaghetti in heavily salted water (it should taste like the sea) for 1 minute less than the packet instruction. Reserve a large mugful of starchy pasta water before draining—this is the emulsifier that makes the sauce silky.',
        thumbnail: IMG.pasta,
        ingredients: { major: [{ name: 'Spaghetti', image: IMG.pasta }], minor: [{ name: 'Salt', image: IMG.default }] } },
      { id: 3, title: 'Make the Egg & Cheese Sauce', duration: '3mins.', assignedTo: null, resolution: '720p',
        description: 'Whisk eggs with finely grated pecorino romano and lots of cracked black pepper. The mixture should be thick and pale yellow. Do not add salt—the cheese and pancetta provide plenty. This sauce is never cooked directly; it only sets from the residual heat of the pasta.',
        thumbnail: IMG.egg,
        ingredients: { major: [{ name: 'Eggs', image: IMG.egg }, { name: 'Pecorino Romano', image: IMG.cream }], minor: [{ name: 'Black Pepper', image: IMG.spice }] } },
      { id: 4, title: 'Toss & Emulsify', duration: '4mins.', assignedTo: null, resolution: '720p',
        description: 'Add hot drained pasta to the pan with pancetta fat off the heat. Add egg mixture and toss vigorously, adding pasta water a splash at a time until the sauce is creamy and clings to every strand. The temperature must stay below 70°C or the eggs will scramble.',
        thumbnail: IMG.pasta,
        ingredients: { major: [{ name: 'Pasta', image: IMG.pasta }, { name: 'Egg Sauce', image: IMG.egg }, { name: 'Pancetta', image: IMG.grill }], minor: [{ name: 'Pasta Water', image: IMG.default }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'CARBONARA',       prepWindow: 20,  unitMargin: 16.0, demand: 138, riskScore: 17 },
      { id: '2', name: 'GARLIC BREAD',    prepWindow: 10,  unitMargin: 4.0,  demand: 145, riskScore: 10 },
      { id: '3', name: 'CAESAR SALAD',    prepWindow: 12,  unitMargin: 9.0,  demand: 121, riskScore: 22 },
      { id: '4', name: 'TIRAMISU',        prepWindow: 30,  unitMargin: 14.0, demand: 112, riskScore: 26 },
      { id: '5', name: 'BRUSCHETTA',      prepWindow: 8,   unitMargin: 7.0,  demand: 104, riskScore: 29 },
      { id: '6', name: 'MINESTRONE',      prepWindow: 35,  unitMargin: 10.0, demand: 88,  riskScore: 38 },
    ],
    pairings: [
      { id: '1',  name: 'Pecorino Romano', angle: 20,  distance: 215, color: '#f97316', image: IMG.cream,   duration: '—',   demand: 93, description: 'Sharp salted cheese' },
      { id: '2',  name: 'Guanciale',       angle: 55,  distance: 220, color: '#dc2626', image: IMG.grill,   duration: '8m',  demand: 88, description: 'Cured pork cheek' },
      { id: '3',  name: 'Black Pepper',    angle: 90,  distance: 200, color: '#1f2937', image: IMG.spice,   duration: '1m',  demand: 95, description: 'Cracked Roman spice' },
      { id: '4',  name: 'White Wine',      angle: 130, distance: 215, color: '#fbbf24', image: IMG.default, duration: '—',   demand: 82, description: 'Crisp Italian white' },
      { id: '5',  name: 'Garlic Bread',    angle: 165, distance: 205, color: '#a16207', image: IMG.bread,   duration: '10m', demand: 91, description: 'Crusty herb bread' },
      { id: '6',  name: 'Arugula Salad',   angle: 200, distance: 210, color: '#16a34a', image: IMG.default, duration: '5m',  demand: 74, description: 'Peppery green salad' },
      { id: '7',  name: 'Parmesan',        angle: 240, distance: 200, color: '#d97706', image: IMG.cream,   duration: '—',   demand: 86, description: 'Aged hard cheese' },
      { id: '8',  name: 'Lemon Zest',      angle: 280, distance: 215, color: '#eab308', image: IMG.default, duration: '1m',  demand: 70, description: 'Bright citrus note' },
      { id: '9',  name: 'Truffle Oil',     angle: 320, distance: 205, color: '#6b7280', image: IMG.default, duration: '1m',  demand: 77, description: 'Earthy finishing oil' },
      { id: '10', name: 'Espresso',        angle: 355, distance: 215, color: '#78350f', image: IMG.default, duration: '3m',  demand: 65, description: 'Post-meal Italian coffee' },
    ],
  },

  pizza: {
    dishName: 'Margherita Pizza',
    subtitle: 'Neapolitan-style pizza with San Marzano tomato and mozzarella',
    guideSteps: [
      { id: 1, title: 'Prove the Dough', duration: '60mins.', assignedTo: null, resolution: '720p',
        description: 'Combine flour, yeast, salt and olive oil with water. Knead 8-10 minutes until elastic. Ball up and prove in an oiled bowl under a damp cloth for 1 hour at room temperature, or overnight cold-prove in the fridge for better flavour and more manageable dough.',
        thumbnail: IMG.bread,
        ingredients: { major: [{ name: 'Pizza Flour', image: IMG.flour }, { name: 'Yeast', image: IMG.default }], minor: [{ name: 'Olive Oil', image: IMG.default }, { name: 'Salt', image: IMG.default }] } },
      { id: 2, title: 'Crush San Marzano Tomatoes', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Crush whole San Marzano tomatoes by hand—never blend, blending makes the sauce too smooth and sweet. Season with salt and a drizzle of olive oil only. No cooking needed; the raw sauce cooks on the pizza in the oven.',
        thumbnail: IMG.tomato,
        ingredients: { major: [{ name: 'San Marzano Tomatoes', image: IMG.tomato }], minor: [{ name: 'Olive Oil', image: IMG.default }, { name: 'Salt', image: IMG.default }] } },
      { id: 3, title: 'Shape & Top the Pizza', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Stretch dough by hand—never roll with a rolling pin (it expels the gas bubbles). Aim for an even 3-4mm base with a thicker crust rim. Spoon sauce leaving 1cm border, tear fresh mozzarella evenly, and drizzle olive oil.',
        thumbnail: IMG.pizza,
        ingredients: { major: [{ name: 'Stretched Dough', image: IMG.bread }, { name: 'Tomato Sauce', image: IMG.tomato }, { name: 'Mozzarella', image: IMG.cream }], minor: [{ name: 'Olive Oil', image: IMG.default }] } },
      { id: 4, title: 'High Heat Bake', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Bake on a preheated stone or steel at maximum oven temperature (250°C+) for 8-10 minutes until crust is charred in spots and cheese is bubbling. A pizza stone pre-heated for 45 minutes mimics a wood-fired floor.',
        thumbnail: IMG.grill,
        ingredients: { major: [{ name: 'Topped Pizza', image: IMG.pizza }], minor: [] } },
      { id: 5, title: 'Garnish & Serve', duration: '3mins.', assignedTo: null, resolution: '720p',
        description: 'Tear fresh basil and scatter immediately out of the oven—the heat wilts it without cooking it. Finish with a drizzle of extra-virgin olive oil. Slice and serve within 90 seconds for the best crust texture.',
        thumbnail: IMG.pizza,
        ingredients: { major: [{ name: 'Baked Pizza', image: IMG.pizza }], minor: [{ name: 'Fresh Basil', image: IMG.default }, { name: 'Extra Virgin Olive Oil', image: IMG.default }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'MARGHERITA PIZZA', prepWindow: 80,  unitMargin: 14.0, demand: 148, riskScore: 15 },
      { id: '2', name: 'GARLIC DOUGH BALLS', prepWindow: 15, unitMargin: 5.0, demand: 132, riskScore: 19 },
      { id: '3', name: 'CAPRESE SALAD',    prepWindow: 8,   unitMargin: 9.0,  demand: 114, riskScore: 24 },
      { id: '4', name: 'TIRAMISU',         prepWindow: 30,  unitMargin: 14.0, demand: 108, riskScore: 28 },
      { id: '5', name: 'PEPPERONI PIZZA',  prepWindow: 80,  unitMargin: 16.0, demand: 162, riskScore: 10 },
      { id: '6', name: 'PANNA COTTA',      prepWindow: 120, unitMargin: 11.0, demand: 88,  riskScore: 36 },
    ],
    pairings: [
      { id: '1',  name: 'Fresh Basil',     angle: 15,  distance: 215, color: '#16a34a', image: IMG.default,  duration: '—',   demand: 96, description: 'Essential herb garnish' },
      { id: '2',  name: 'Mozzarella',      angle: 50,  distance: 220, color: '#e2e8f0', image: IMG.cream,    duration: '—',   demand: 93, description: 'Creamy fresh cheese' },
      { id: '3',  name: 'Olive Oil',       angle: 85,  distance: 200, color: '#a3e635', image: IMG.default,  duration: '1m',  demand: 91, description: 'Fruity finishing oil' },
      { id: '4',  name: 'Chianti Wine',    angle: 125, distance: 215, color: '#dc2626', image: IMG.default,  duration: '—',   demand: 82, description: 'Tuscan red wine' },
      { id: '5',  name: 'Chilli Flakes',   angle: 160, distance: 205, color: '#ef4444', image: IMG.spice,    duration: '—',   demand: 78, description: 'Spicy heat accent' },
      { id: '6',  name: 'Oregano',         angle: 195, distance: 210, color: '#65a30d', image: IMG.default,  duration: '—',   demand: 88, description: 'Dried herb seasoning' },
      { id: '7',  name: 'Burrata',         angle: 235, distance: 200, color: '#f8fafc', image: IMG.cream,    duration: '—',   demand: 74, description: 'Creamy cheese centre' },
      { id: '8',  name: 'Prosciutto',      angle: 275, distance: 215, color: '#f97316', image: IMG.grill,    duration: '—',   demand: 68, description: 'Cured Italian ham' },
      { id: '9',  name: 'Limoncello',      angle: 315, distance: 205, color: '#fef08a', image: IMG.default,  duration: '5m',  demand: 65, description: 'Italian lemon liqueur' },
      { id: '10', name: 'Arugula',         angle: 355, distance: 210, color: '#22c55e', image: IMG.default,  duration: '—',   demand: 72, description: 'Peppery salad green' },
    ],
  },

  dal_makhani: {
    dishName: 'Dal Makhani',
    subtitle: 'Slow-simmered black lentils in a rich buttery tomato gravy',
    guideSteps: [
      { id: 1, title: 'Soak Lentils Overnight', duration: '480mins.', assignedTo: null, resolution: '720p',
        description: 'Rinse whole urad dal (black lentils) and kidney beans and soak in cold water overnight or at least 8 hours. Soaking reduces cooking time, improves texture and removes some hard-to-digest oligosaccharides.',
        thumbnail: IMG.dal,
        ingredients: { major: [{ name: 'Black Lentils', image: IMG.dal }, { name: 'Kidney Beans', image: IMG.dal }], minor: [] } },
      { id: 2, title: 'Pressure Cook Lentils', duration: '45mins.', assignedTo: null, resolution: '720p',
        description: 'Drain and pressure cook the soaked lentils in fresh water with salt and a pinch of turmeric for 20-25 minutes until completely soft and creamy. Lentils should crush easily between your fingers. If using a pot, this takes 45-60 minutes.',
        thumbnail: IMG.dal,
        ingredients: { major: [{ name: 'Soaked Lentils', image: IMG.dal }], minor: [{ name: 'Turmeric', image: IMG.spice }, { name: 'Salt', image: IMG.default }] } },
      { id: 3, title: 'Build the Makhani Tadka', duration: '15mins.', assignedTo: null, resolution: '720p',
        description: 'Heat butter and oil. Add onions and fry until deep golden. Add ginger-garlic paste, fry 2 minutes. Add tomato purée and all spices—cook until the oil separates and the masala is dark and fragrant. This is the flavour foundation.',
        thumbnail: IMG.makhani,
        ingredients: { major: [{ name: 'Tomato Purée', image: IMG.tomato }, { name: 'Butter', image: IMG.butter }, { name: 'Onion', image: IMG.onion }], minor: [{ name: 'Ginger Garlic', image: IMG.ginger }, { name: 'Spice Mix', image: IMG.spice }] } },
      { id: 4, title: 'Slow Simmer – Low & Long', duration: '60mins.', assignedTo: null, resolution: '720p',
        description: 'Combine cooked lentils with the tadka and simmer on very low heat for at least 45-60 minutes, stirring every 10 minutes to prevent sticking. The lentils should break down further, making the dal thick and velvety. Restaurant dal makhani sometimes simmers 8-12 hours.',
        thumbnail: IMG.gravy,
        ingredients: { major: [{ name: 'Cooked Lentils', image: IMG.dal }, { name: 'Makhani Tadka', image: IMG.makhani }], minor: [] } },
      { id: 5, title: 'Cream Finish & Serve', duration: '10mins.', assignedTo: null, resolution: '720p',
        description: 'Stir in heavy cream off the heat. Taste and adjust salt. A final knob of cold butter swirled in gives extra richness and gloss. Garnish with a cream swirl and serve with butter naan.',
        thumbnail: IMG.cream,
        ingredients: { major: [{ name: 'Dal', image: IMG.dal }, { name: 'Heavy Cream', image: IMG.cream }], minor: [{ name: 'Butter', image: IMG.butter }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'DAL MAKHANI',     prepWindow: 120, unitMargin: 14.0, demand: 124, riskScore: 19 },
      { id: '2', name: 'BUTTER NAAN',     prepWindow: 10,  unitMargin: 3.5,  demand: 148, riskScore: 12 },
      { id: '3', name: 'BASMATI RICE',    prepWindow: 20,  unitMargin: 4.0,  demand: 135, riskScore: 10 },
      { id: '4', name: 'PANEER TIKKA',    prepWindow: 30,  unitMargin: 16.0, demand: 108, riskScore: 26 },
      { id: '5', name: 'LASSI',           prepWindow: 5,   unitMargin: 5.0,  demand: 121, riskScore: 18 },
      { id: '6', name: 'GULAB JAMUN',     prepWindow: 40,  unitMargin: 7.0,  demand: 95,  riskScore: 34 },
    ],
    pairings: [
      { id: '1',  name: 'Butter Naan',    angle: 15,  distance: 220, color: '#f97316', image: IMG.bread,    duration: '10m', demand: 96, description: 'Soft buttered bread' },
      { id: '2',  name: 'Basmati Rice',   angle: 55,  distance: 210, color: '#fbbf24', image: IMG.rice,     duration: '20m', demand: 88, description: 'Fragrant long grain' },
      { id: '3',  name: 'Butter',         angle: 90,  distance: 200, color: '#fef08a', image: IMG.butter,   duration: '—',   demand: 92, description: 'Rich dairy fat' },
      { id: '4',  name: 'Heavy Cream',    angle: 130, distance: 215, color: '#e2e8f0', image: IMG.cream,    duration: '—',   demand: 86, description: 'Silky dairy finish' },
      { id: '5',  name: 'Kashmiri Chilli',angle: 165, distance: 205, color: '#dc2626', image: IMG.spice,    duration: '—',   demand: 79, description: 'Mild fruity red chilli' },
      { id: '6',  name: 'Mango Lassi',    angle: 200, distance: 220, color: '#d97706', image: IMG.default,  duration: '5m',  demand: 74, description: 'Sweet yogurt drink' },
      { id: '7',  name: 'Garam Masala',   angle: 240, distance: 200, color: '#78350f', image: IMG.spice,    duration: '—',   demand: 84, description: 'Warming spice blend' },
      { id: '8',  name: 'Coriander',      angle: 280, distance: 210, color: '#16a34a', image: IMG.default,  duration: '—',   demand: 81, description: 'Fresh herb garnish' },
      { id: '9',  name: 'Pickle',         angle: 320, distance: 205, color: '#22c55e', image: IMG.default,  duration: '—',   demand: 68, description: 'Tangy Indian condiment' },
      { id: '10', name: 'Onion Rings',    angle: 355, distance: 215, color: '#a16207', image: IMG.onion,    duration: '—',   demand: 72, description: 'Raw garnish salad' },
    ],
  },

  paneer: {
    dishName: 'Paneer Butter Masala',
    subtitle: 'Cottage cheese cubes in a velvety tomato-cashew sauce',
    guideSteps: [
      { id: 1, title: 'Pan Fry the Paneer', duration: '8mins.', assignedTo: null, resolution: '720p',
        description: 'Cut paneer into 2cm cubes. Shallow fry in 1 tablespoon butter on medium-high until golden on all sides. Remove and immediately soak in warm salted water for 5 minutes—this keeps the paneer soft inside while it retains a golden exterior.',
        thumbnail: IMG.paneer,
        ingredients: { major: [{ name: 'Paneer', image: IMG.paneer }], minor: [{ name: 'Butter', image: IMG.butter }] } },
      { id: 2, title: 'Tomato Cashew Base', duration: '20mins.', assignedTo: null, resolution: '720p',
        description: 'Sauté onions, ginger-garlic and whole spices until golden. Add tomatoes and soaked cashews. Cook covered until tomatoes break down completely—about 15 minutes. Cool and blend to a very smooth purée; strain for a restaurant-quality result.',
        thumbnail: IMG.tomato,
        ingredients: { major: [{ name: 'Tomatoes', image: IMG.tomato }, { name: 'Cashews', image: IMG.nuts }, { name: 'Onion', image: IMG.onion }], minor: [{ name: 'Ginger Garlic', image: IMG.ginger }] } },
      { id: 3, title: 'Build the Masala Sauce', duration: '15mins.', assignedTo: null, resolution: '720p',
        description: 'Melt butter in a pan, fry kashmiri chilli powder, coriander and garam masala for 30 seconds. Add the strained tomato-cashew purée and cook on medium until the oil separates—about 10 minutes. The sauce will deepen in colour and flavour significantly.',
        thumbnail: IMG.makhani,
        ingredients: { major: [{ name: 'Tomato Cashew Purée', image: IMG.tomato }, { name: 'Butter', image: IMG.butter }], minor: [{ name: 'Kashmiri Chilli', image: IMG.spice }, { name: 'Garam Masala', image: IMG.spice }] } },
      { id: 4, title: 'Add Paneer, Cream & Serve', duration: '8mins.', assignedTo: null, resolution: '720p',
        description: 'Add the fried paneer cubes and heavy cream to the masala sauce. Simmer gently for 3-4 minutes—do not boil aggressively or the cream will split and the paneer will turn rubbery. Finish with crushed kasuri methi and butter naan.',
        thumbnail: IMG.paneer,
        ingredients: { major: [{ name: 'Fried Paneer', image: IMG.paneer }, { name: 'Masala Sauce', image: IMG.makhani }, { name: 'Cream', image: IMG.cream }], minor: [{ name: 'Kasuri Methi', image: IMG.spice }] } },
    ],
    discoveryItems: [
      { id: '1', name: 'PANEER BUTTER MASALA', prepWindow: 40, unitMargin: 18.0, demand: 131, riskScore: 16 },
      { id: '2', name: 'GARLIC NAAN',          prepWindow: 10, unitMargin: 3.5,  demand: 148, riskScore: 11 },
      { id: '3', name: 'JEERA RICE',           prepWindow: 15, unitMargin: 5.0,  demand: 122, riskScore: 18 },
      { id: '4', name: 'DAL TADKA',            prepWindow: 30, unitMargin: 11.0, demand: 108, riskScore: 24 },
      { id: '5', name: 'MANGO LASSI',          prepWindow: 5,  unitMargin: 6.0,  demand: 117, riskScore: 21 },
      { id: '6', name: 'GULAB JAMUN',          prepWindow: 40, unitMargin: 7.0,  demand: 94,  riskScore: 33 },
    ],
    pairings: [
      { id: '1',  name: 'Butter Naan',    angle: 20,  distance: 220, color: '#f97316', image: IMG.bread,    duration: '10m', demand: 95, description: 'Soft buttered bread' },
      { id: '2',  name: 'Kasuri Methi',   angle: 55,  distance: 210, color: '#16a34a', image: IMG.spice,    duration: '—',   demand: 91, description: 'Dried fenugreek aroma' },
      { id: '3',  name: 'Cashews',        angle: 90,  distance: 200, color: '#d97706', image: IMG.nuts,     duration: '3m',  demand: 85, description: 'Creamy nut base' },
      { id: '4',  name: 'Mango Lassi',    angle: 130, distance: 215, color: '#fbbf24', image: IMG.default,  duration: '5m',  demand: 80, description: 'Sweet mango drink' },
      { id: '5',  name: 'Heavy Cream',    angle: 165, distance: 205, color: '#e2e8f0', image: IMG.cream,    duration: '—',   demand: 88, description: 'Silky dairy enricher' },
      { id: '6',  name: 'Coriander',      angle: 200, distance: 215, color: '#22c55e', image: IMG.default,  duration: '—',   demand: 82, description: 'Fresh herb garnish' },
      { id: '7',  name: 'Jeera Rice',     angle: 240, distance: 200, color: '#78350f', image: IMG.rice,     duration: '15m', demand: 76, description: 'Cumin-tempered rice' },
      { id: '8',  name: 'Garam Masala',   angle: 280, distance: 210, color: '#dc2626', image: IMG.spice,    duration: '—',   demand: 84, description: 'Finishing spice blend' },
      { id: '9',  name: 'Onion Salad',    angle: 320, distance: 205, color: '#6366f1', image: IMG.onion,    duration: '—',   demand: 70, description: 'Raw red onion rings' },
      { id: '10', name: 'Lime',           angle: 355, distance: 215, color: '#84cc16', image: IMG.default,  duration: '—',   demand: 67, description: 'Bright citrus squeeze' },
    ],
  },
};

/* ─── Lookup helpers ─────────────────────────────────────────────────────── */

export const DISH_KEYWORDS_TO_KEY: [string, string][] = [
  ['dal makhani', 'dal_makhani'], ['dal tadka', 'dal_makhani'],
  ['butter chicken', 'butterchicken'], ['murgh makhani', 'butterchicken'],
  ['tikka masala', 'tikka'], ['chicken tikka', 'tikka'],
  ['chocolate cake', 'chocolate_cake'], ['choco cake', 'chocolate_cake'],
  ['paneer butter', 'paneer'], ['shahi paneer', 'paneer'], ['paneer makhani', 'paneer'],
  ['biryani', 'biryani'], ['biriyani', 'biryani'],
  ['payasam', 'payasam'], ['paysam', 'payasam'],
  ['kheer', 'kheer'], ['rice pudding', 'kheer'],
  ['halwa', 'kheer'],
  ['carbonara', 'pasta'], ['pasta', 'pasta'], ['spaghetti', 'pasta'],
  ['margherita', 'pizza'], ['pizza', 'pizza'],
  ['paneer', 'paneer'],
  ['makhani', 'butterchicken'],
  ['cake', 'chocolate_cake'], ['chocolate', 'chocolate_cake'],
  ['dal', 'dal_makhani'],
  ['tikka', 'tikka'],
];

export function getDishKey(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [kw, key] of DISH_KEYWORDS_TO_KEY) {
    if (lower.includes(kw)) return key;
  }
  return null;
}
