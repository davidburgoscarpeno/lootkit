import { useState } from 'react';
import { GAME_YAWS, cm360, convertSens, sensForCm360 } from './lib';
import { Field, Result, num } from './widgets';

export function SensConverterTool() {
  const games = Object.keys(GAME_YAWS);
  const [sens, setSens] = useState('1');
  const [from, setFrom] = useState('CS2 / CS:GO');
  const [to, setTo] = useState('Valorant');
  const [dpi, setDpi] = useState('800');
  const s = num(sens), d = num(dpi);
  const converted = s !== null ? convertSens(s, GAME_YAWS[from].yaw, GAME_YAWS[to].yaw) : null;
  const cm = s !== null && d !== null ? cm360(d, s, GAME_YAWS[from].yaw) : null;
  return (
    <div className="panel">
      <div className="btn-row" style={{ flexWrap: 'wrap' }}>
        <Field label="Sensitivity" value={sens} onChange={setSens} width={90} />
        <label>From<br /><select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: 'auto' }}>{games.map((g) => <option key={g}>{g}</option>)}</select></label>
        <label>To<br /><select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: 'auto' }}>{games.map((g) => <option key={g}>{g}</option>)}</select></label>
        <Field label="Mouse DPI (for cm/360)" value={dpi} onChange={setDpi} width={90} />
      </div>
      {converted !== null && <div className="tool-grid">
        <Result label={`Sensitivity in ${to}`} value={converted.toFixed(4)} />
        {cm !== null && <Result label="cm/360 (physical turn distance)" value={`${cm.toFixed(1)} cm`} />}
      </div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Conversion preserves your cm/360 using community-documented yaw values per game.</p>
    </div>
  );
}
export function DpiTool() {
  const [target, setTarget] = useState('320');
  const [sens, setSens] = useState('0.4');
  const t = num(target), s = num(sens);
  const dpi = t !== null && s !== null && s > 0 ? t / s : null;
  const [cm, setCm] = useState('');
  const [dpi2, setDpi2] = useState('800');
  const [game, setGame] = useState('CS2 / CS:GO');
  const c = num(cm), d2 = num(dpi2);
  const sensNeeded = c !== null && d2 !== null ? sensForCm360(c, d2, GAME_YAWS[game].yaw) : null;
  return (
    <div className="panel">
      <h3>DPI for a target eDPI</h3>
      <div className="btn-row">
        <Field label="Target eDPI" value={target} onChange={setTarget} width={90} />
        <Field label="In-game sens" value={sens} onChange={setSens} width={90} />
      </div>
      {dpi !== null && <div className="tool-grid"><Result label="DPI to set" value={Math.round(dpi)} /></div>}
      <h3 style={{ marginTop: 16 }}>Sensitivity for a target cm/360</h3>
      <div className="btn-row" style={{ flexWrap: 'wrap' }}>
        <Field label="Target cm/360" value={cm} onChange={setCm} width={90} />
        <Field label="Mouse DPI" value={dpi2} onChange={setDpi2} width={90} />
        <label>Game<br /><select value={game} onChange={(e) => setGame(e.target.value)} style={{ width: 'auto' }}>{Object.keys(GAME_YAWS).map((g) => <option key={g}>{g}</option>)}</select></label>
      </div>
      {sensNeeded !== null && sensNeeded > 0 && <div className="tool-grid"><Result label="Sensitivity to set" value={sensNeeded.toFixed(4)} /></div>}
    </div>
  );
}
