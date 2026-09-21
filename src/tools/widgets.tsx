import type { ReactNode } from 'react';
export function Field({ label, value, onChange, width = 110 }: { label: string; value: string; onChange: (v: string) => void; width?: number }) {
  return (<label>{label}<br /><input type="text" inputMode="decimal" style={{ maxWidth: width }} value={value} onChange={(e) => onChange(e.target.value)} /></label>);
}
export function Result({ label, value }: { label: string; value: ReactNode }) {
  return <div className="tool-card"><h3>{value}</h3><p>{label}</p></div>;
}
export function num(v: string): number | null { const n = parseFloat(v); return v.trim() !== '' && !isNaN(n) ? n : null; }
