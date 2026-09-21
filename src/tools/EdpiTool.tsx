import { useState } from 'react';

export default function EdpiTool() {
  const [dpi, setDpi] = useState('800');
  const [sens, setSens] = useState('0.4');
  const d = parseFloat(dpi) || 0;
  const s = parseFloat(sens) || 0;
  const edpi = d * s;
  return (
    <div className="panel">
      <div className="btn-row" style={{ flexWrap: 'wrap' }}>
        <label>Mouse DPI<br /><input type="text" inputMode="decimal" style={{maxWidth:110}} value={dpi} onChange={(e) => setDpi(e.target.value)} /></label>
        <label>In-game sensitivity<br /><input type="text" inputMode="decimal" style={{maxWidth:110}} value={sens} onChange={(e) => setSens(e.target.value)} /></label>
      </div>
      <div className="tool-grid">
        <div className="tool-card"><h3>{Math.round(edpi * 100) / 100}</h3><p>Your eDPI</p></div>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Formula: eDPI = DPI x in-game sensitivity</p>
    </div>
  );
}
