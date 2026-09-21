// Pokemon type effectiveness chart (Gen VI+). Sparse: missing = 1x.
export const POKEMON_TYPES = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'] as const;
export type PokeType = typeof POKEMON_TYPES[number];
const C: Record<PokeType, Partial<Record<PokeType, number>>> = {
  normal: { rock: .5, ghost: 0, steel: .5 },
  fire: { fire: .5, water: .5, grass: 2, ice: 2, bug: 2, rock: .5, dragon: .5, steel: 2 },
  water: { fire: 2, water: .5, grass: .5, ground: 2, rock: 2, dragon: .5 },
  electric: { water: 2, electric: .5, grass: .5, ground: 0, flying: 2, dragon: .5 },
  grass: { fire: .5, water: 2, grass: .5, poison: .5, ground: 2, flying: .5, bug: .5, rock: 2, dragon: .5, steel: .5 },
  ice: { fire: .5, water: .5, grass: 2, ice: .5, ground: 2, flying: 2, dragon: 2, steel: .5 },
  fighting: { normal: 2, ice: 2, poison: .5, flying: .5, psychic: .5, bug: .5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: .5 },
  poison: { grass: 2, poison: .5, ground: .5, rock: .5, ghost: .5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: .5, poison: 2, flying: 0, bug: .5, rock: 2, steel: 2 },
  flying: { electric: .5, grass: 2, fighting: 2, bug: 2, rock: .5, steel: .5 },
  psychic: { fighting: 2, poison: 2, psychic: .5, dark: 0, steel: .5 },
  bug: { fire: .5, grass: 2, fighting: .5, poison: .5, flying: .5, psychic: 2, ghost: .5, dark: 2, steel: .5, fairy: .5 },
  rock: { fire: 2, ice: 2, fighting: .5, ground: .5, flying: 2, bug: 2, steel: .5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: .5 },
  dragon: { dragon: 2, steel: .5, fairy: 0 },
  dark: { fighting: .5, psychic: 2, ghost: 2, dark: .5, fairy: .5 },
  steel: { fire: .5, water: .5, electric: .5, ice: 2, rock: 2, steel: .5, fairy: 2 },
  fairy: { fire: .5, fighting: 2, poison: .5, dragon: 2, dark: 2, steel: .5 },
};
export function typeMultiplier(atk: PokeType, def: PokeType): number { return C[atk][def] ?? 1; }
export function offensiveMatchups(atk: PokeType): { t: PokeType; m: number }[] {
  return POKEMON_TYPES.map((t) => ({ t, m: typeMultiplier(atk, t) })).filter((r) => r.m !== 1);
}
export function defensiveMatchups(def1: PokeType, def2: PokeType | ''): { t: PokeType; m: number }[] {
  return POKEMON_TYPES.map((t) => ({ t, m: typeMultiplier(t, def1) * (def2 ? typeMultiplier(t, def2) : 1) })).filter((r) => r.m !== 1).sort((a, b) => b.m - a.m);
}
// Gen V+ damage formula
export function damageRange(level: number, power: number, atk: number, def: number, stab: boolean, typeMult: number): { min: number; max: number } {
  const base = Math.floor(Math.floor(Math.floor((2 * level) / 5 + 2) * power * atk / def) / 50) + 2;
  const mod = (stab ? 1.5 : 1) * typeMult;
  return { min: Math.floor(base * mod * 0.85), max: Math.floor(base * mod) };
}
// Minecraft anvil: prior work penalty = 2^uses - 1 levels per item
export function priorWorkPenalty(uses: number): number { return Math.pow(2, uses) - 1; }
export function anvilCost(uses1: number, uses2: number, enchantLevels: number): { cost: number; resultUses: number; tooExpensive: boolean } {
  const resultUses = Math.max(uses1, uses2) + 1;
  const cost = priorWorkPenalty(uses1) + priorWorkPenalty(uses2) + enchantLevels;
  return { cost, resultUses, tooExpensive: cost > 39 };
}
// Minecraft armor (Java): reduction = min(20, max(points/5, points - dmg/(2 + toughness/4))) / 25, min 20% damage always gets through
export function armorReduction(points: number, toughness: number, rawDamage: number): number {
  const capped = Math.min(20, Math.max(points / 5, points - rawDamage / (2 + toughness / 4)));
  return Math.min(0.8, capped / 25);
}
// Potion brewing chart
export const POTIONS: { base: string; ingredient: string; result: string; effect: string }[] = [
  { base: 'Water Bottle + Nether Wart', ingredient: 'Nether Wart', result: 'Awkward Potion', effect: 'Base for almost all effect potions' },
  { base: 'Awkward Potion', ingredient: 'Magma Cream', result: 'Potion of Fire Resistance', effect: 'Immunity to fire and lava (3:00)' },
  { base: 'Awkward Potion', ingredient: "Rabbit's Foot", result: 'Potion of Leaping', effect: 'Jump Boost (3:00)' },
  { base: 'Awkward Potion', ingredient: 'Sugar', result: 'Potion of Swiftness', effect: '+20% speed (3:00)' },
  { base: 'Awkward Potion', ingredient: 'Glistering Melon Slice', result: 'Potion of Healing', effect: 'Restores 4 HP instantly' },
  { base: 'Awkward Potion', ingredient: 'Spider Eye', result: 'Potion of Poison', effect: 'Poison damage (0:45)' },
  { base: 'Awkward Potion', ingredient: 'Pufferfish', result: 'Potion of Water Breathing', effect: 'Breathe underwater (3:00)' },
  { base: 'Awkward Potion', ingredient: 'Golden Carrot', result: 'Potion of Night Vision', effect: 'See in the dark (3:00)' },
  { base: 'Awkward Potion', ingredient: 'Blaze Powder', result: 'Potion of Strength', effect: '+3 attack damage (3:00)' },
  { base: 'Awkward Potion', ingredient: 'Ghast Tear', result: 'Potion of Regeneration', effect: 'Regen HP over time (0:45)' },
  { base: 'Awkward Potion', ingredient: 'Turtle Shell', result: 'Potion of the Turtle Master', effect: 'Slowness IV + Resistance III (0:20)' },
  { base: 'Awkward Potion', ingredient: 'Phantom Membrane', result: 'Potion of Slow Falling', effect: 'No fall damage (1:30)' },
  { base: 'Water Bottle + Fermented Spider Eye', ingredient: 'Fermented Spider Eye', result: 'Potion of Weakness', effect: '-4 attack damage (1:30); used to cure zombie villagers' },
  { base: 'Potion of Poison/Healing', ingredient: 'Fermented Spider Eye', result: 'Potion of Harming', effect: '6 damage instantly' },
  { base: 'Potion of Swiftness/Leaping', ingredient: 'Fermented Spider Eye', result: 'Potion of Slowness', effect: '-15% speed (1:30)' },
  { base: 'Potion of Night Vision', ingredient: 'Fermented Spider Eye', result: 'Potion of Invisibility', effect: 'Invisible (3:00)' },
];
export const POTION_MODIFIERS = [
  { ingredient: 'Redstone Dust', effect: 'Extends duration (e.g. 3:00 to 8:00)' },
  { ingredient: 'Glowstone Dust', effect: 'Upgrades to level II (shorter duration)' },
  { ingredient: 'Gunpowder', effect: 'Turns into Splash Potion (thrown)' },
  { ingredient: "Dragon's Breath", effect: 'Turns Splash into Lingering Potion (area cloud)' },
];
