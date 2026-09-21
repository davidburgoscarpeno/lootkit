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
  it('cm360', () => expect(cm360(800, 1, 0.022)).toBeCloseTo(52.39, 1));
  it('convert cs2 to valorant', () => expect(convertSens(1, 0.022, 0.07)).toBeCloseTo(0.3143, 3));
  it('sens for cm', () => expect(sensForCm360(52.39, 800, 0.022)).toBeCloseTo(1, 1));
});
