import { describe, it, expect } from 'vitest';
import { xpForLevel, xpForNextLevel, overworldToNether, netherToOverworld, distance3d, ticksToReal, realToTicks, cm360, convertSens, sensForCm360 } from '../src/tools/lib';
describe('minecraft', () => {
  it('xp to level 16', () => expect(xpForLevel(16)).toBe(352));
  it('xp to level 30', () => expect(xpForLevel(30)).toBe(1395));
  it('next level cost at 0', () => expect(xpForNextLevel(0)).toBe(7));
  it('nether conversion', () => expect(overworldToNether(800, -1600)).toEqual({ x: 100, z: -200 }));
  it('nether back', () => expect(netherToOverworld(100, -200)).toEqual({ x: 800, z: -1600 }));
  it('distance', () => expect(distance3d(0, 0, 0, 3, 4, 0)).toBe(5));
  it('ticks', () => expect(ticksToReal(24000).minutes).toBe(20));
  it('real to ticks', () => expect(realToTicks(1)).toBe(1200));
});
describe('fps', () => {
  it('cm360', () => expect(cm360(800, 1, 0.022)).toBeCloseTo(51.95, 1));
  it('convert cs2 to valorant', () => expect(convertSens(1, 0.022, 0.07)).toBeCloseTo(0.3143, 3));
  it('sens for cm', () => expect(sensForCm360(51.95, 800, 0.022)).toBeCloseTo(1, 1));
});
import { typeMultiplier, defensiveMatchups, damageRange, priorWorkPenalty, anvilCost, armorReduction } from '../src/tools/gamedata';
describe('pokemon', () => {
  it('electric vs water 2x', () => expect(typeMultiplier('electric', 'water')).toBe(2));
  it('electric vs ground 0x', () => expect(typeMultiplier('electric', 'ground')).toBe(0));
  it('neutral missing entry', () => expect(typeMultiplier('normal', 'fire')).toBe(1));
  it('water/flying weak 4x to electric', () => {
    const m = defensiveMatchups('water', 'flying').find((r) => r.t === 'electric');
    expect(m?.m).toBe(4);
  });
  it('damage formula range', () => {
    const r = damageRange(50, 90, 120, 100, true, 2);
    expect(r.min).toBeLessThan(r.max);
    expect(r.max).toBeGreaterThan(140);
  });
});
describe('minecraft batch 2', () => {
  it('prior work penalties', () => expect([0, 1, 2, 3, 4].map(priorWorkPenalty)).toEqual([0, 1, 3, 7, 15]));
  it('anvil cost and cap', () => {
    const r = anvilCost(2, 0, 4);
    expect(r.cost).toBe(7); expect(r.resultUses).toBe(3); expect(r.tooExpensive).toBe(false);
    expect(anvilCost(5, 5, 10).tooExpensive).toBe(true);
  });
  it('armor reduction caps at 80%', () => expect(armorReduction(20, 12, 10)).toBeLessThanOrEqual(0.8));
  it('no armor reduces nothing', () => expect(armorReduction(0, 0, 10)).toBe(0));
});
