export const TOTAL_FRAMES = 240;

export interface SceneBeat {
  id: string;
  startPct: number;
  endPct: number;
  tagline: string;
  title: string;
  subtitle: string;
  alignment: 'left' | 'right';
  badge: string;
  overlayGradient: string;
  hasCta?: boolean;
}

export const SCENE_BEATS: SceneBeat[] = [
  {
    id: 'scene-1',
    startPct: 0.0,
    endPct: 0.15,
    tagline: 'ORIGIN ZERO // PHASE 01',
    title: 'BUILT FROM NOTHING.',
    subtitle: 'Every great stride starts as raw material. Molecular compounds suspended in zero-drag stasis.',
    alignment: 'left',
    badge: 'RAW COMPOUND PHASE',
    overlayGradient: 'radial-gradient(ellipse at 20% 50%, rgba(255, 85, 0, 0.12) 0%, transparent 65%)',
  },
  {
    id: 'scene-2',
    startPct: 0.15,
    endPct: 0.35,
    tagline: 'AEROWEAVE // PHASE 02',
    title: 'WOVEN FOR FREEDOM.',
    subtitle: 'Tensile micro-strands interlock under adaptive tension to mold seamlessly against your foot.',
    alignment: 'right',
    badge: 'MONOFILAMENT MATRIX',
    overlayGradient: 'radial-gradient(ellipse at 80% 45%, rgba(255, 120, 0, 0.14) 0%, transparent 65%)',
  },
  {
    id: 'scene-3',
    startPct: 0.35,
    endPct: 0.55,
    tagline: 'PROPULSION CHASSIS // PHASE 03',
    title: 'ENGINEERED UNDERFOOT.',
    subtitle: 'Full-length spoon-curved carbon fiber propulsion plate sandwiched within NitroFoam™ supercritical matrix.',
    alignment: 'left',
    badge: 'CARBON PROPULSION WING',
    overlayGradient: 'radial-gradient(ellipse at 25% 60%, rgba(255, 70, 0, 0.16) 0%, transparent 60%)',
  },
  {
    id: 'scene-4',
    startPct: 0.55,
    endPct: 0.75,
    tagline: 'THERMAL FORGE // PHASE 04',
    title: 'FUSED BY FIRE.',
    subtitle: 'High-temperature thermal sonic fusion binds upper to chassis without a single millimeter of dead weight.',
    alignment: 'right',
    badge: 'THERMO-SONIC FUSION',
    overlayGradient: 'radial-gradient(ellipse at 75% 55%, rgba(255, 50, 0, 0.22) 0%, transparent 60%)',
  },
  {
    id: 'scene-5',
    startPct: 0.75,
    endPct: 1.0,
    tagline: 'FINAL SPECIFICATION // PHASE 05',
    title: 'MACH-X.\nBREAK THE SPEED LIMIT.',
    subtitle: '198 grams of aerodynamic propulsion. Engineered for podium finishes and sub-2 marathon dreams.',
    alignment: 'left',
    badge: 'READY FOR FLIGHT',
    overlayGradient: 'radial-gradient(ellipse at 30% 50%, rgba(255, 85, 0, 0.25) 0%, transparent 70%)',
    hasCta: true,
  },
];

export interface Colorway {
  id: string;
  name: string;
  hex: string;
  badge: string;
  description: string;
  filterStyle: string; // CSS filter for tinting poster image
  accentColor: string;
}

export const COLORWAYS: Colorway[] = [
  {
    id: 'inferno-orange',
    name: 'Inferno Orange',
    hex: '#FF5500',
    badge: 'OG RACEWAY LAUNCH',
    description: 'Electric racing orange with high-contrast obsidian carbon inserts.',
    filterStyle: 'none',
    accentColor: '#FF5500',
  },
  {
    id: 'stealth-onyx',
    name: 'Stealth Onyx',
    hex: '#18181b',
    badge: 'MIDNIGHT PRO EDITION',
    description: 'Triple black matte aerodynamic matrix with reflective carbon grain.',
    filterStyle: 'grayscale(100%) brightness(0.75) contrast(1.3)',
    accentColor: '#52525b',
  },
  {
    id: 'cyber-volt',
    name: 'Cyber Volt',
    hex: '#CCFF00',
    badge: 'FASTEST SPLIT LAB',
    description: 'High-visibility bio-volt accents calibrated for low-light marathon visibility.',
    filterStyle: 'hue-rotate(65deg) saturate(1.4) brightness(1.05)',
    accentColor: '#CCFF00',
  },
  {
    id: 'hyper-ice',
    name: 'Hyper Ice',
    hex: '#00E5FF',
    badge: 'WIND-TUNNEL ZERO',
    description: 'Glacial cyan tone honoring aerodynamic flow lines and sonic speed.',
    filterStyle: 'hue-rotate(185deg) saturate(1.3) brightness(1.1)',
    accentColor: '#00E5FF',
  },
];

export interface TechFeature {
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  iconName: 'Zap' | 'Shield' | 'Wind' | 'Flame' | 'Gauge' | 'Compass';
}

export const TECH_FEATURES: TechFeature[] = [
  {
    title: 'NitroFoam™ Supercritical Core',
    subtitle: 'ENERGY RETURN CHASSIS',
    metric: '89.4%',
    metricLabel: 'DYNAMIC ENERGY REBOUND',
    description: 'Nitrogen-infused supercritical polyether block foam delivers resilient, cloud-density damping with zero mechanical breakdown over 800+ kilometers.',
    iconName: 'Zap',
  },
  {
    title: '3D Sculpted Carbon Wing',
    subtitle: 'PROPULSION LEVERAGE',
    metric: '1.2mm',
    metricLabel: 'VARIABLE-THICKNESS RIGIDITY',
    description: 'Custom spoon-geometry carbon composite plate acts as a biomechanical springboard, propelling your stride through the toe-off phase.',
    iconName: 'Compass',
  },
  {
    title: 'Aeroweave™ Monofilament',
    subtitle: 'DYNAMIC UPPER VENTILATION',
    metric: '38g',
    metricLabel: 'TOTAL UPPERWEIGHT',
    description: 'Precision variable-weave engineering delivers structural midfoot lockdown while venting heat at 3.4x the rate of traditional engineered meshes.',
    iconName: 'Wind',
  },
  {
    title: 'Vibram® Apex Grip Outsole',
    subtitle: 'ALL-WEATHER TRACTION',
    metric: '0.85',
    metricLabel: 'WET ASPHALT FRICTION COEFF.',
    description: 'Laser-siped micro-lugs grab rain-slicked asphalt and steep descents with zero slippage, keeping cornering razor sharp at max velocity.',
    iconName: 'Shield',
  },
];

export const SPECS = [
  { label: 'WEIGHT', value: 198, unit: 'g', sub: 'Size 9 US (Men)', desc: 'Ultra-lightweight composite build' },
  { label: 'HEEL DROP', value: 8, unit: 'mm', sub: 'Offset Geometry', desc: 'Optimized forward cadence balance' },
  { label: 'STACK HEIGHT', value: 38, unit: 'mm', sub: '38mm Heel / 30mm Forefoot', desc: 'World Athletics regulation compliant' },
  { label: 'ENERGY RETURN', value: 89, unit: '%', sub: 'Dynamic Stride Boost', desc: 'Validated by human performance lab' },
];

export const TESTIMONIALS = [
  {
    quote: "The forward roll on the MACH-X is surreal. At 180 cadence, you feel like the road is being pulled underneath you. A true game changer.",
    author: "MARCUS VANCE",
    role: "Olympic Marathon Qualifier (2:08:14)",
    location: "Berlin, DE",
    rating: 5,
  },
  {
    quote: "Usually high-stack carbon racers feel unstable on turns. MACH-X solved this with the lateral carbon wing geometry. Unrivaled confidence.",
    author: "ELENA ROSTOVA",
    role: "Ultra-Trail & Road Champion",
    location: "Geneva, CH",
    rating: 5,
  },
  {
    quote: "Tested in wind tunnels and race day asphalt. The 198-gram weight is unheard of for a shoe packing this much nitrogen-cushion response.",
    author: "DR. KAI TANAKA",
    role: "Lead Biomechanics Researcher, Tokyo Sports Lab",
    location: "Tokyo, JP",
    rating: 5,
  },
];
