"use client";

import { useState } from "react";

/** Ring size / chain length chips. In phase 2 the chosen value is passed to "Add to bag". */
export function OptionPicker({ label, values }: { label: string; values: string[] }) {
  const [v, setV] = useState<string | null>(null);
  return (
    <div style={{ marginTop: 24 }}>
      <div className="flabel" style={{ marginBottom: 8 }} id="opt-label">
        {label}
      </div>
      <div className="chips" role="radiogroup" aria-labelledby="opt-label">
        {values.map((x) => (
          <button key={x} type="button" role="radio" aria-checked={v === x} className={`chip${v === x ? " on" : ""}`} onClick={() => setV(x)}>
            {x.trim()}
          </button>
        ))}
      </div>
      <input type="hidden" name="option" value={v ?? ""} />
    </div>
  );
}
