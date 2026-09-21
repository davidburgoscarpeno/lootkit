export interface ToolFaq { q: string; a: string }
export interface ToolExample { title: string; input?: string; output?: string; note?: string }
export interface Tool {
  slug: string; name: string; category: string; description: string;
  seoTitle: string; metaDescription: string; intro: string;
  howTo: string[]; examples: ToolExample[]; faqs: ToolFaq[];
  related: string[]; component: string; mode?: string; implemented: boolean; popular?: boolean;
}
export const tools: Tool[] = [
  {
    slug: 'edpi-calculator',
    name: 'eDPI Calculator',
    category: 'FPS',
    description: 'Calculate your effective DPI (eDPI) from mouse DPI and in-game sensitivity.',
    seoTitle: 'eDPI Calculator - Effective DPI for FPS Games | LootKit',
    metaDescription: 'Free eDPI calculator. Multiply your mouse DPI by in-game sensitivity to get your effective DPI and compare sensitivities across setups.',
    intro: 'eDPI (effective DPI) is your mouse DPI multiplied by your in-game sensitivity - the number that lets you compare aim speed across different setups.',
    howTo: ['Enter your mouse DPI (from your mouse software).', 'Enter your in-game sensitivity.', 'Your eDPI appears instantly.'],
    examples: [{ title: 'Common Valorant setup', input: '800 DPI, 0.4 sens', output: 'eDPI = 320' }],
    faqs: [
      { q: 'What is a good eDPI?', a: 'It depends on the game. Tactical FPS players often land between 200-400 eDPI at 800 DPI, while faster games skew higher. Use eDPI to match a pro or a friend, then adjust by feel.' },
      { q: 'Is eDPI the same across games?', a: 'No. Each game scales sensitivity differently, so eDPI is only comparable within the same game.' }
    ],
    related: [],
    component: 'EdpiTool',
    implemented: true,
    popular: true
  },
  {
    slug: 'minecraft-nether-calculator',
    name: 'Minecraft Nether Calculator',
    category: 'Minecraft',
    description: 'Convert Overworld coordinates to Nether and back (8:1 ratio).',
    seoTitle: 'Minecraft Nether Calculator - Overworld to Nether Coords | LootKit',
    metaDescription: 'Free Minecraft nether calculator. Convert Overworld coordinates to Nether coordinates and back with the 8:1 ratio. Plan portals fast.',
    intro: 'Link portals without guessing: one block traveled in the Nether equals eight in the Overworld. Convert coordinates both ways.',
    howTo: ['Choose the direction (Overworld to Nether or back).', 'Enter X and Z.', 'Build your portal at the converted coordinates.'],
    examples: [{ title: 'Overworld base at 800, 64, -1600', output: 'Nether portal at 100, -200 (any safe Y).' }],
    faqs: [
      { q: 'Does Y change?', a: 'No. Only X and Z scale by 8. Build the Nether portal at a safe Y (ideally above the lava ocean, below the ceiling).' },
      { q: 'Java or Bedrock?', a: 'The 8:1 ratio is the same in both editions.' }
    ],
    related: ['minecraft-coordinate-calculator', 'minecraft-xp-calculator'],
    component: 'NetherTool', implemented: true, popular: true
  },
  {
    slug: 'minecraft-xp-calculator',
    name: 'Minecraft XP Calculator',
    category: 'Minecraft',
    description: 'How much XP you need for any enchantment level, using vanilla formulas.',
    seoTitle: 'Minecraft XP Calculator - XP Per Level (Java and Bedrock) | LootKit',
    metaDescription: 'Free Minecraft XP calculator. Total XP to reach any level and the cost of the next level, using the real vanilla formulas.',
    intro: 'How much XP do you actually need for level 30? Vanilla formulas make higher levels cost progressively more - this calculator does the math.',
    howTo: ['Enter the target level.', 'Read the total XP required and the cost of the next level.'],
    examples: [{ title: 'Level 30 (max enchanting)', output: '1,395 total XP; the jump from 29 to 30 alone costs 107.' }],
    faqs: [
      { q: 'Same in Java and Bedrock?', a: 'Yes, the XP curve is identical in both editions.' },
      { q: 'Why do later levels cost more?', a: 'The formula changes at levels 16 and 31: each next level costs 2L+7, then 5L-38, then 9L-158 XP.' }
    ],
    related: ['minecraft-nether-calculator', 'minecraft-time-calculator'],
    component: 'XpTool', implemented: true, popular: true
  },
  {
    slug: 'minecraft-coordinate-calculator',
    name: 'Minecraft Coordinate Calculator',
    category: 'Minecraft',
    description: 'Distance between two points in 3D (and horizontal) coordinates.',
    seoTitle: 'Minecraft Coordinate Calculator - Distance Between Points | LootKit',
    metaDescription: 'Free Minecraft coordinate calculator. Compute straight-line and horizontal distance between two sets of XYZ coordinates.',
    intro: 'How far apart are your base and that village? Enter both XYZ coordinates for straight-line and horizontal distances.',
    howTo: ['Enter point A and point B coordinates (press F3 in Java to see yours).', 'Read straight-line and X/Z-only distances.'],
    examples: [{ title: 'From 0,64,0 to 300,80,400', output: 'About 500 blocks horizontal, 500.3 straight-line.' }],
    faqs: [{ q: 'How do I see my coordinates?', a: 'Java: press F3. Bedrock: enable "Show Coordinates" in world settings.' }],
    related: ['minecraft-nether-calculator', 'minecraft-time-calculator'],
    component: 'CoordTool', implemented: true
  },
  {
    slug: 'minecraft-time-calculator',
    name: 'Minecraft Time Calculator',
    category: 'Minecraft',
    description: 'Convert game ticks to real time and back (20 ticks = 1 second).',
    seoTitle: 'Minecraft Time Calculator - Ticks to Real Time | LootKit',
    metaDescription: 'Free Minecraft time calculator. Convert game ticks to real minutes and seconds, or real time to ticks. 20 ticks = 1 second.',
    intro: 'Redstone clocks, farms and day length all run on ticks: 20 ticks per real second, 24,000 ticks per Minecraft day.',
    howTo: ['Enter ticks to see the real duration.', 'Or enter real minutes to get the tick count for command blocks and farms.'],
    examples: [{ title: 'A full Minecraft day', output: '24,000 ticks = 20 real minutes.' }],
    faqs: [{ q: 'Game ticks vs redstone ticks?', a: 'Redstone ticks are 2 game ticks (0.1 s). A repeater on 4 delay = 4 redstone ticks = 8 game ticks = 0.4 s.' }],
    related: ['minecraft-xp-calculator', 'minecraft-coordinate-calculator'],
    component: 'TimeToolMc', implemented: true
  },
  {
    slug: 'sensitivity-converter',
    name: 'Sensitivity Converter',
    category: 'FPS',
    description: 'Convert mouse sensitivity between CS2, Valorant, Overwatch 2 and Apex.',
    seoTitle: 'Sensitivity Converter - CS2, Valorant, Overwatch, Apex | LootKit',
    metaDescription: 'Free sensitivity converter. Convert your mouse sensitivity between CS2, Valorant, Overwatch 2 and Apex Legends, keeping the same cm/360.',
    intro: 'Keep the same muscle memory across games: convert your sensitivity using cm/360, the physical mouse distance for a full turn.',
    howTo: ['Enter your sensitivity and pick the source game.', 'Pick the target game.', 'Optionally add your DPI to see your cm/360.'],
    examples: [{ title: 'CS2 1.0 to Valorant', output: 'About 0.314 (CS2 and Apex share yaw; Valorant turns 3.18x faster per point).' }],
    faqs: [
      { q: 'Why not just copy the number?', a: 'Each game scales sensitivity differently (different yaw per count), so the same number feels completely different.' },
      { q: 'Where do the yaw values come from?', a: 'Community-documented values used by mouse-sensitivity converters: 0.022 for CS2/Source/Apex, 0.07 for Valorant, 0.0066 for Overwatch 2.' }
    ],
    related: ['edpi-calculator', 'dpi-calculator'],
    component: 'SensConverterTool', implemented: true, popular: true
  },
  {
    slug: 'dpi-calculator',
    name: 'DPI Calculator',
    category: 'FPS',
    description: 'Find the DPI for a target eDPI, or the sensitivity for a target cm/360.',
    seoTitle: 'DPI Calculator - Find DPI for Target eDPI | LootKit',
    metaDescription: 'Free DPI calculator. Compute the mouse DPI for a target eDPI, or the in-game sensitivity for a target cm/360.',
    intro: 'Two everyday aim questions: what DPI gives me my target eDPI, and what sensitivity gives me my target cm/360?',
    howTo: ['For DPI: enter target eDPI and your in-game sensitivity.', 'For sensitivity: enter target cm/360, your DPI and the game.', 'Read the setting to apply.'],
    examples: [{ title: 'Target eDPI 320 at 0.4 sens', output: '800 DPI.' }],
    faqs: [{ q: 'eDPI or cm/360 - which should I use?', a: 'cm/360 is universal (works across any game and DPI); eDPI is the quick comparison inside one game.' }],
    related: ['edpi-calculator', 'sensitivity-converter'],
    component: 'DpiTool', implemented: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
