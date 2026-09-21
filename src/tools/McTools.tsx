import { useState } from 'react';
import { xpForLevel, xpForNextLevel, overworldToNether, netherToOverworld, distance3d, ticksToReal, realToTicks } from './lib';
import { Field, Result, num } from './widgets';

export function NetherTool() {
  const [x, setX] = useState(''); const [z, setZ] = useState(''); const [dir, setDir] = useState<'o2n' | 'n2o'>('o2n');
  const X = num(x), Z = num(z);
  const res = X !== null && Z !== null ? (dir === 'o2n' ? overworldToNether(X, Z) : netherToOverworld(X, Z)) : null;
  return (
    <div className="panel">
      <div className="btn-row">
        <label>Direction<br />
          <select value={dir} onChange={(e) => setDir(e.target.value as any)} style={{ width: 'auto' }}>
            <option value="o2n">Overworld to Nether</option>
            <option value="n2o">Nether to Overworld</option>
          </select>
        </label>
        <Field label="X" value={x} onChange={setX} width={90} />
        <Field label="Z" value={z} onChange={setZ} width={90} />
      </div>
      {res && <div className="tool-grid">
        <Result label={dir === 'o2n' ? 'Nether X' : 'Overworld X'} value={res.x} />
        <Result label={dir === 'o2n' ? 'Nether Z' : 'Overworld Z'} value={res.z} />
      </div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>1 block in the Nether = 8 blocks in the Overworld (horizontal only; Y stays the same).</p>
    </div>
  );
}
export function XpTool() {
  const [lvl, setLvl] = useState('30');
  const L = num(lvl);
  return (
    <div className="panel">
      <Field label="Target level" value={lvl} onChange={setLvl} width={90} />
      {L !== null && L >= 0 && (
        <div className="tool-grid" style={{ marginTop: 12 }}>
          <Result label={`Total XP to reach level ${L}`} value={xpForLevel(Math.floor(L)).toLocaleString()} />
          <Result label={`XP from level ${Math.floor(L)} to ${Math.floor(L) + 1}`} value={xpForNextLevel(Math.floor(L)).toLocaleString()} />
        </div>
      )}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Vanilla Java and Bedrock formulas. Levels get progressively more expensive after 16 and 31.</p>
    </div>
  );
}
export function CoordTool() {
  const [x1, setX1] = useState('0'); const [y1, setY1] = useState('64'); const [z1, setZ1] = useState('0');
  const [x2, setX2] = useState(''); const [y2, setY2] = useState(''); const [z2, setZ2] = useState('');
  const vals = [x1, y1, z1, x2, y2, z2].map(num);
  const valid = vals.every((v) => v !== null);
  const d = valid ? distance3d(...(vals as number[])) : null;
  const flat = valid ? Math.sqrt((vals[3]! - vals[0]!) ** 2 + (vals[5]! - vals[2]!) ** 2) : null;
  return (
    <div className="panel">
      <p>Point A</p>
      <div className="btn-row">
        <Field label="X" value={x1} onChange={setX1} width={80} /><Field label="Y" value={y1} onChange={setY1} width={80} /><Field label="Z" value={z1} onChange={setZ1} width={80} />
      </div>
      <p>Point B</p>
      <div className="btn-row">
        <Field label="X" value={x2} onChange={setX2} width={80} /><Field label="Y" value={y2} onChange={setY2} width={80} /><Field label="Z" value={z2} onChange={setZ2} width={80} />
      </div>
      {d !== null && <div className="tool-grid">
        <Result label="Straight-line distance" value={`${d.toFixed(1)} blocks`} />
        <Result label="Horizontal (X/Z) distance" value={`${flat!.toFixed(1)} blocks`} />
      </div>}
    </div>
  );
}
export function TimeToolMc() {
  const [ticks, setTicks] = useState('24000');
  const [mins, setMins] = useState('');
  const t = num(ticks);
  const r = t !== null ? ticksToReal(t) : null;
  const m = num(mins);
  return (
    <div className="panel">
      <h3>Ticks to real time</h3>
      <div className="btn-row"><Field label="Ticks" value={ticks} onChange={setTicks} width={110} /></div>
      {r && <div className="tool-grid"><Result label="Real time" value={`${r.minutes}m ${r.seconds}s`} /></div>}
      <h3 style={{ marginTop: 16 }}>Real minutes to ticks</h3>
      <div className="btn-row"><Field label="Minutes" value={mins} onChange={setMins} width={90} /></div>
      {m !== null && <div className="tool-grid"><Result label="Ticks" value={realToTicks(m).toLocaleString()} /></div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>20 ticks = 1 real second. A full Minecraft day (24,000 ticks) = 20 real minutes.</p>
    </div>
  );
}
