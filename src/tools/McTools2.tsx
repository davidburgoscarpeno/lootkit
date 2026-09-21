import { useState } from 'react';
import { priorWorkPenalty, anvilCost, armorReduction, POTIONS, POTION_MODIFIERS } from './gamedata';
import { Field, Result, num } from './widgets';

export function AnvilTool() {
  const [u1, setU1] = useState('0'); const [u2, setU2] = useState('0'); const [ench, setEnch] = useState('4');
  const a = num(u1), b = num(u2), e = num(ench);
  const ok = a !== null && b !== null && e !== null && a >= 0 && b >= 0 && e >= 0;
  const r = ok ? anvilCost(Math.floor(a!), Math.floor(b!), e!) : null;
  return (
    <div className="panel">
      <div className="btn-row">
        <Field label="Prior anvil uses - item 1" value={u1} onChange={setU1} width={90} />
        <Field label="Prior anvil uses - item 2" value={u2} onChange={setU2} width={90} />
        <Field label="Enchantment level cost" value={ench} onChange={setEnch} width={90} />
      </div>
      {r && <div className="tool-grid" style={{ marginTop: 12 }}>
        <Result label="Total cost (levels)" value={r.cost} />
        <Result label="Penalty item 1 / item 2" value={`${priorWorkPenalty(Math.floor(a!))} / ${priorWorkPenalty(Math.floor(b!))}`} />
        <Result label="Result prior uses" value={r.resultUses} />
      </div>}
      {r && r.tooExpensive && <p className="notice">Too expensive for survival mode (over 39 levels). Reorder combinations or use fewer prior anvil uses.</p>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Prior work penalty doubles each anvil use: 0, 1, 3, 7, 15, 31 levels. Combine cheap-to-expensive to keep costs under 39.</p>
    </div>
  );
}
const CMD_ITEMS = ['diamond_sword','diamond_pickaxe','netherite_chestplate','elytra','golden_apple','ender_pearl','totem_of_undying','arrow'];
export function CommandTool() {
  const [kind, setKind] = useState<'give' | 'summon' | 'effect' | 'time' | 'weather'>('give');
  const [target, setTarget] = useState('@p');
  const [item, setItem] = useState('diamond_sword'); const [count, setCount] = useState('1');
  const [mob, setMob] = useState('zombie'); const [effect, setEffect] = useState('speed');
  const [dur, setDur] = useState('60'); const [amp, setAmp] = useState('0');
  const [time, setTime] = useState('day'); const [weather, setWeather] = useState('clear');
  const c = num(count), d = num(dur), a = num(amp);
  let cmd = '';
  if (kind === 'give') cmd = `/give ${target} minecraft:${item} ${c && c > 0 ? Math.floor(c) : 1}`;
  if (kind === 'summon') cmd = `/summon minecraft:${mob} ~ ~ ~`;
  if (kind === 'effect') cmd = `/effect give ${target} minecraft:${effect} ${d && d > 0 ? Math.floor(d) : 60} ${a !== null && a >= 0 ? Math.floor(a) : 0}`;
  if (kind === 'time') cmd = `/time set ${time}`;
  if (kind === 'weather') cmd = `/weather ${weather}`;
  return (
    <div className="panel">
      <div className="btn-row">
        <label>Command<br />
          <select value={kind} onChange={(e) => setKind(e.target.value as any)} style={{ width: 'auto' }}>
            <option value="give">/give</option><option value="summon">/summon</option><option value="effect">/effect</option><option value="time">/time</option><option value="weather">/weather</option>
          </select>
        </label>
        {(kind === 'give' || kind === 'effect') && <label>Target<br />
          <select value={target} onChange={(e) => setTarget(e.target.value)} style={{ width: 'auto' }}>
            <option>@p</option><option>@a</option><option>@r</option><option>@s</option>
          </select></label>}
        {kind === 'give' && <>
          <label>Item<br /><select value={item} onChange={(e) => setItem(e.target.value)} style={{ width: 'auto' }}>{CMD_ITEMS.map((i) => <option key={i}>{i}</option>)}</select></label>
          <Field label="Count" value={count} onChange={setCount} width={60} /></>}
        {kind === 'summon' && <label>Mob<br /><select value={mob} onChange={(e) => setMob(e.target.value)} style={{ width: 'auto' }}>{['zombie','skeleton','creeper','villager','iron_golem','ender_dragon'].map((m) => <option key={m}>{m}</option>)}</select></label>}
        {kind === 'effect' && <>
          <label>Effect<br /><select value={effect} onChange={(e) => setEffect(e.target.value)} style={{ width: 'auto' }}>{['speed','strength','regeneration','resistance','fire_resistance','night_vision','invisibility','jump_boost'].map((m) => <option key={m}>{m}</option>)}</select></label>
          <Field label="Seconds" value={dur} onChange={setDur} width={60} />
          <Field label="Amplifier (0 = level I)" value={amp} onChange={setAmp} width={110} /></>}
        {kind === 'time' && <label>Time<br /><select value={time} onChange={(e) => setTime(e.target.value)} style={{ width: 'auto' }}>{['day','noon','night','midnight','sunrise','sunset'].map((m) => <option key={m}>{m}</option>)}</select></label>}
        {kind === 'weather' && <label>Weather<br /><select value={weather} onChange={(e) => setWeather(e.target.value)} style={{ width: 'auto' }}>{['clear','rain','thunder'].map((m) => <option key={m}>{m}</option>)}</select></label>}
      </div>
      <div className="tool-card" style={{ marginTop: 12 }}>
        <code style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{cmd}</code>
        <p><button type="button" onClick={() => navigator.clipboard.writeText(cmd)}>Copy</button></p>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Java Edition 1.20+ syntax. Cheats or operator permissions required.</p>
    </div>
  );
}
export function PotionTool() {
  const [q, setQ] = useState('');
  const ql = q.trim().toLowerCase();
  const rows = POTIONS.filter((p) => !ql || (p.base + ' ' + p.ingredient + ' ' + p.result + ' ' + p.effect).toLowerCase().includes(ql));
  return (
    <div className="panel">
      <Field label="Search (ingredient, potion or effect)" value={q} onChange={setQ} width={280} />
      <div className="table-wrap" style={{ marginTop: 12 }}>
        <table>
          <thead><tr><th>Base</th><th>Add</th><th>Result</th><th>Effect</th></tr></thead>
          <tbody>{rows.map((p) => <tr key={p.result}><td>{p.base}</td><td>{p.ingredient}</td><td>{p.result}</td><td>{p.effect}</td></tr>)}</tbody>
        </table>
      </div>
      <h3 style={{ marginTop: 16 }}>Modifiers</h3>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Add</th><th>Effect</th></tr></thead>
          <tbody>{POTION_MODIFIERS.map((m) => <tr key={m.ingredient}><td>{m.ingredient}</td><td>{m.effect}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
export function ArmorTool() {
  const [pts, setPts] = useState('20'); const [tough, setTough] = useState('8'); const [dmg, setDmg] = useState('10');
  const p = num(pts), t = num(tough), d = num(dmg);
  const ok = p !== null && t !== null && d !== null && p >= 0 && t >= 0 && d > 0;
  const red = ok ? armorReduction(p!, t!, d!) : null;
  return (
    <div className="panel">
      <div className="btn-row">
        <Field label="Armor points (full bar = 20)" value={pts} onChange={setPts} width={120} />
        <Field label="Armor toughness (netherite = 12)" value={tough} onChange={setTough} width={140} />
        <Field label="Incoming raw damage" value={dmg} onChange={setDmg} width={110} />
      </div>
      {red !== null && <div className="tool-grid" style={{ marginTop: 12 }}>
        <Result label="Damage reduced" value={`${Math.round(red * 100)}%`} />
        <Result label="Damage taken" value={(d! * (1 - red)).toFixed(1)} />
      </div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Java formula: reduction = min(20, max(points/5, points - damage/(2 + toughness/4))) / 25, capped at 80%. Stronger hits pierce armor unless toughness compensates.</p>
    </div>
  );
}
