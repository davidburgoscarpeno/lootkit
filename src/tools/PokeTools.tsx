import { useState } from 'react';
import { POKEMON_TYPES, type PokeType, offensiveMatchups, defensiveMatchups, damageRange } from './gamedata';
import { Field, Result, num } from './widgets';

function TypeSelect({ label, value, onChange, allowNone = false }: { label: string; value: string; onChange: (v: string) => void; allowNone?: boolean }) {
  return (
    <label>{label}<br />
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: 'auto' }}>
        {allowNone && <option value="">(none)</option>}
        {POKEMON_TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
      </select>
    </label>
  );
}
function MultList({ rows }: { rows: { t: string; m: number }[] }) {
  if (!rows.length) return <p>No special matchups - everything hits for neutral (1x) damage.</p>;
  return (
    <div className="tool-grid">
      {rows.map((r) => <Result key={r.t} label={r.t[0].toUpperCase() + r.t.slice(1)} value={`${r.m}x`} />)}
    </div>
  );
}
export function TypeChartTool() {
  const [mode, setMode] = useState<'atk' | 'def'>('def');
  const [atk, setAtk] = useState<PokeType>('fire');
  const [def1, setDef1] = useState<PokeType>('grass');
  const [def2, setDef2] = useState('');
  return (
    <div className="panel">
      <div className="btn-row">
        <label>Mode<br />
          <select value={mode} onChange={(e) => setMode(e.target.value as any)} style={{ width: 'auto' }}>
            <option value="def">Defending (weaknesses and resistances)</option>
            <option value="atk">Attacking (what this type hits hard)</option>
          </select>
        </label>
        {mode === 'atk'
          ? <TypeSelect label="Attacking type" value={atk} onChange={(v) => setAtk(v as PokeType)} />
          : <>
              <TypeSelect label="Type 1" value={def1} onChange={(v) => setDef1(v as PokeType)} />
              <TypeSelect label="Type 2" value={def2} onChange={setDef2} allowNone />
            </>}
      </div>
      <div style={{ marginTop: 12 }}>
        {mode === 'atk'
          ? <MultList rows={offensiveMatchups(atk)} />
          : <MultList rows={defensiveMatchups(def1, def2 as PokeType | '')} />}
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Gen VI+ chart. 0x = immune, 0.25x/0.5x = resisted, 2x/4x = weak.</p>
    </div>
  );
}
export function DamageCalcTool() {
  const [level, setLevel] = useState('50'); const [power, setPower] = useState('90');
  const [atk, setAtk] = useState('120'); const [def, setDef] = useState('100');
  const [stab, setStab] = useState(true); const [mult, setMult] = useState('2');
  const L = num(level), P = num(power), A = num(atk), D = num(def), M = num(mult);
  const ok = L && P && A && D && M !== null && L > 0 && P > 0 && A > 0 && D > 0 && M >= 0;
  const r = ok ? damageRange(L!, P!, A!, D!, stab, M!) : null;
  return (
    <div className="panel">
      <div className="btn-row">
        <Field label="Attacker level" value={level} onChange={setLevel} width={80} />
        <Field label="Move power" value={power} onChange={setPower} width={80} />
        <Field label="Attack stat" value={atk} onChange={setAtk} width={80} />
        <Field label="Defense stat" value={def} onChange={setDef} width={80} />
        <Field label="Type multiplier" value={mult} onChange={setMult} width={80} />
        <label>STAB<br /><input type="checkbox" checked={stab} onChange={(e) => setStab(e.target.checked)} /></label>
      </div>
      {r && <div className="tool-grid" style={{ marginTop: 12 }}>
        <Result label="Minimum damage (85% roll)" value={r.min} />
        <Result label="Maximum damage" value={r.max} />
      </div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Gen V+ formula. Type multiplier: 0.25, 0.5, 1, 2 or 4 (check it with the type calculator). Excludes critical hits, weather, items and abilities.</p>
    </div>
  );
}
