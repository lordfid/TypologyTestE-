/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function formatPercent(value: number): string {
  return `${Math.min(100, Math.max(0, Math.round(value)))}%`;
}

export function getTopEntries<T extends string | number | symbol, V extends number>(
  obj: Record<T, V>,
  limit: number
): { key: T; value: V }[] {
  return (Object.entries(obj) as [T, V][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, value]) => ({ key, value }));
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export function getLevelLabel(score: number): 'Rendah' | 'Sedang' | 'Tinggi' {
  if (score < 35) return 'Rendah';
  if (score <= 65) return 'Sedang';
  return 'Tinggi';
}
