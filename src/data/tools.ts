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
  },
  {
    slug: 'pokemon-type-calculator',
    name: 'Pokemon Type Calculator',
    category: 'Pokemon',
    description: 'Weaknesses, resistances and immunities for any type or dual type.',
    seoTitle: 'Pokemon Type Calculator - Weaknesses and Resistances | LootKit',
    metaDescription: 'Free Pokemon type calculator. Check weaknesses, resistances and immunities for any type combination with the Gen VI+ chart.',
    intro: 'What beats a Water/Flying type? Pick a defending type combo for its weaknesses, or an attacking type to see what it hits super effectively.',
    howTo: ['Choose defending or attacking mode.', 'Pick the type (and second type for dual defenders).', 'Read the multipliers: 0x immune, 0.25-0.5x resisted, 2-4x weak.'],
    examples: [{ title: 'Defending Water/Flying', output: 'Electric hits for 4x, Rock for 2x; Ground does nothing.' }],
    faqs: [
      { q: 'Which games does this chart cover?', a: 'Every mainline game from X and Y onward (Gen VI+), including Scarlet and Violet. Fairy type included.' },
      { q: 'What about Terastallization?', a: 'A Terastallized Pokemon defends as its Tera type only - enter that type (or combo) here.' }
    ],
    related: ['pokemon-damage-calculator', 'sensitivity-converter'],
    component: 'TypeChartTool', implemented: true, popular: true
  },
  {
    slug: 'pokemon-damage-calculator',
    name: 'Pokemon Damage Calculator',
    category: 'Pokemon',
    description: 'Damage range for any move with the official Gen V+ formula.',
    seoTitle: 'Pokemon Damage Calculator - Move Damage Range | LootKit',
    metaDescription: 'Free Pokemon damage calculator. Enter level, power, Attack and Defense for the exact min-max damage range using the official formula.',
    intro: 'Will that move knock out the opponent? Compute the exact damage range with the official Gen V+ formula, including STAB and type effectiveness.',
    howTo: ['Enter attacker level, move power and both stats.', 'Set the type multiplier (use the type calculator if unsure).', 'Tick STAB if the move matches the attacker type.'],
    examples: [{ title: 'Level 50, power 90, 120 Atk vs 100 Def, STAB, 2x', output: 'About 154-181 damage.' }],
    faqs: [{ q: 'What is not included?', a: 'Critical hits, weather, held items, abilities and screens. It is the base formula with STAB and type multipliers.' }],
    related: ['pokemon-type-calculator', 'edpi-calculator'],
    component: 'DamageCalcTool', implemented: true, popular: true
  },
  {
    slug: 'minecraft-anvil-calculator',
    name: 'Minecraft Anvil Calculator',
    category: 'Minecraft',
    description: 'Anvil combination cost and the "Too Expensive" check before you spend levels.',
    seoTitle: 'Minecraft Anvil Calculator - Combine Cost and Too Expensive | LootKit',
    metaDescription: 'Free Minecraft anvil calculator. Compute prior work penalties and total level cost for combining items, with the 39-level survival cap.',
    intro: 'Anvil costs double with every prior use. Check the real cost before combining so your god gear never hits the "Too Expensive" wall.',
    howTo: ['Enter prior anvil uses for both items (F3+H tooltips show them).', 'Add the enchantment level cost of the combination.', 'Read the total and the survival feasibility.'],
    examples: [{ title: 'Item used twice + fresh book, cost 4', output: '3 + 0 + 4 = 7 levels; result counts as 3 prior uses.' }],
    faqs: [
      { q: 'Why does cost double each use?', a: 'Prior work penalty is 2^uses - 1 levels per item: 0, 1, 3, 7, 15, 31. It is why enchantment order matters.' },
      { q: 'What is the survival cap?', a: 'Anything over 39 levels shows "Too Expensive" in survival, no matter how many levels you have.' }
    ],
    related: ['minecraft-xp-calculator', 'minecraft-potion-calculator'],
    component: 'AnvilTool', implemented: true
  },
  {
    slug: 'minecraft-command-generator',
    name: 'Minecraft Command Generator',
    category: 'Minecraft',
    description: 'Build /give, /summon, /effect, /time and /weather commands without memorizing syntax.',
    seoTitle: 'Minecraft Command Generator - Give, Summon, Effect | LootKit',
    metaDescription: 'Free Minecraft command generator. Build /give, /summon, /effect, /time and /weather commands with correct Java Edition syntax and copy them in one click.',
    intro: 'No syntax memorizing: pick the command, choose options, copy the result into chat or a command block.',
    howTo: ['Pick the command type.', 'Choose target and options.', 'Copy the generated command (Java Edition 1.20+).'],
    examples: [{ title: 'Speed II for 5 minutes on the nearest player', output: '/effect give @p minecraft:speed 300 1' }],
    faqs: [{ q: 'Bedrock?', a: 'Most generated commands also work in Bedrock, but syntax targets Java Edition 1.20+.' }],
    related: ['minecraft-time-calculator', 'minecraft-anvil-calculator'],
    component: 'CommandTool', implemented: true
  },
  {
    slug: 'minecraft-potion-calculator',
    name: 'Minecraft Potion Calculator',
    category: 'Minecraft',
    description: 'Full brewing chart: every potion, its ingredients, effects and modifiers.',
    seoTitle: 'Minecraft Potion Calculator - Brewing Chart and Recipes | LootKit',
    metaDescription: 'Free Minecraft potion calculator. Search the complete brewing chart: base, ingredient, result and effect for every potion, plus redstone and glowstone modifiers.',
    intro: 'The full brewing chart, searchable: what to add to an Awkward Potion, what each result does, and how redstone, glowstone and gunpowder modify it.',
    howTo: ['Search by ingredient, potion name or effect.', 'Read base, ingredient, result and effect.', 'Apply modifiers: redstone extends, glowstone strengthens, gunpowder makes splash.'],
    examples: [{ title: 'Awkward Potion + Blaze Powder', output: 'Potion of Strength (+3 attack damage, 3:00); add redstone for 8:00.' }],
    faqs: [{ q: 'How do I get an Awkward Potion?', a: 'Brew a Water Bottle with Nether Wart. It has no effect itself but is the base for almost every effect potion.' }],
    related: ['minecraft-anvil-calculator', 'minecraft-xp-calculator'],
    component: 'PotionTool', implemented: true
  },
  {
    slug: 'minecraft-armor-calculator',
    name: 'Minecraft Armor Calculator',
    category: 'Minecraft',
    description: 'Exact damage reduction from armor points and toughness (Java formula).',
    seoTitle: 'Minecraft Armor Calculator - Damage Reduction Formula | LootKit',
    metaDescription: 'Free Minecraft armor calculator. Compute exact damage reduction from armor points, toughness and incoming damage using the Java Edition formula.',
    intro: 'Full netherite does not reduce every hit by the same amount. The Java formula scales with incoming damage - see exactly how much you block.',
    howTo: ['Enter armor points (each icon = 2 points, full bar = 20).', 'Add toughness (netherite = 12, diamond = 8).', 'Enter the raw incoming damage.'],
    examples: [{ title: 'Full netherite vs a 10-damage hit', output: 'About 68% reduced: you take roughly 3.2 damage.' }],
    faqs: [
      { q: 'Why do stronger hits hurt more through armor?', a: 'Each 2 damage removes the effect of 1 armor point unless toughness compensates: reduction = min(20, max(points/5, points - damage/(2 + toughness/4))) / 25.' },
      { q: 'Bedrock differences?', a: 'Bedrock uses a simpler flat 4% per point (80% max) with no damage scaling. This calculator uses the Java formula.' }
    ],
    related: ['minecraft-anvil-calculator', 'minecraft-nether-calculator'],
    component: 'ArmorTool', implemented: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
