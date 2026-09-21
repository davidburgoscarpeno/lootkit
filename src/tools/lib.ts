// Minecraft XP: total XP required to reach a level (from level 0).
export function xpForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level <= 16) return level * level + 6 * level;
  if (level <= 31) return Math.round(2.5 * level * level - 40.5 * level + 360);
  return Math.round(4.5 * level * level - 162.5 * level + 2220);
}
// XP required to go from level L to level L+1
export function xpForNextLevel(level: number): number {
  if (level < 0) return 0;
  if (level < 16) return 2 * level + 7;
  if (level < 31) return 5 * level - 38;
  return 9 * level - 158;
}
export function netherToOverworld(x: number, z: number): { x: number; z: number } { return { x: x * 8, z: z * 8 }; }
export function overworldToNether(x: number, z: number): { x: number; z: number } { return { x: Math.round(x / 8), z: Math.round(z / 8) }; }
export function distance3d(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
export function ticksToReal(ticks: number): { minutes: number; seconds: number } {
  const totalSeconds = ticks / 20;
  return { minutes: Math.floor(totalSeconds / 60), seconds: Math.round(totalSeconds % 60) };
}
export function realToTicks(minutes: number): number { return Math.round(minutes * 60 * 20); }
// Sensitivity conversion: cm/360 model. yaw = degrees per count.
export const GAME_YAWS: Record<string, { yaw: number; label: string }> = {
  'CS2 / CS:GO': { yaw: 0.022, label: 'CS2 / CS:GO' },
  'Valorant': { yaw: 0.07, label: 'Valorant' },
  'Overwatch 2': { yaw: 0.0066, label: 'Overwatch 2' },
  'Apex Legends': { yaw: 0.022, label: 'Apex Legends' },
  'Quake / Source': { yaw: 0.022, label: 'Quake / Source' },
};
export function cm360(dpi: number, sens: number, yaw: number): number {
  if (dpi <= 0 || sens <= 0 || yaw <= 0) return 0;
  return (360 * 2.54) / (dpi * sens * yaw);
}
export function sensForCm360(targetCm: number, dpi: number, yaw: number): number {
  if (targetCm <= 0 || dpi <= 0) return 0;
  return (360 * 2.54) / (targetCm * dpi * yaw);
}
export function convertSens(sens: number, fromYaw: number, toYaw: number): number {
  if (fromYaw <= 0) return 0;
  return (sens * fromYaw) / toYaw;
}
