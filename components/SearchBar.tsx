"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { GEWERKE, ORTE } from "@/lib/data";

type Option = { value: string; label: string; hint?: string };

function norm(s: string) {
  return s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  options,
  icon,
  big,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  icon: React.ReactNode;
  big: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = norm(value.trim());
    if (!q) return options;
    return options.filter((o) => norm(o.label).includes(q) || (o.hint && norm(o.hint).includes(q)));
  }, [value, options]);

  return (
    <div className="relative flex-1">
      <label
        className={`flex cursor-text items-center gap-3 ${big ? "px-5 py-3.5 sm:py-4" : "px-4 py-2.5"}`}
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-forest/60">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
          <input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
              setActive(0);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={(e) => {
              if (!open || filtered.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && value.trim() !== filtered[active]?.label) {
                e.preventDefault();
                onChange(filtered[active].label);
                setOpen(false);
              }
            }}
            className={`w-full bg-transparent font-medium text-ink outline-none placeholder:font-normal placeholder:text-muted/70 ${
              big ? "text-base sm:text-lg" : "text-sm"
            }`}
            autoComplete="off"
          />
        </span>
      </label>
      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-40 mt-2 max-h-72 overflow-auto rounded-2xl border border-line bg-white p-1.5 text-left shadow-xl shadow-forest/10">
          {filtered.slice(0, 8).map((o, i) => (
            <li key={o.value}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(o.label);
                  setOpen(false);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full flex-col rounded-xl px-3.5 py-2.5 text-left text-sm ${
                  i === active ? "bg-mint text-forest" : "text-ink"
                }`}
              >
                <span className="font-medium">{o.label}</span>
                {o.hint && <span className="mt-0.5 truncate text-xs text-muted">{o.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const IconSearch = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const IconPin = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function SearchBar({
  big = false,
  initialWas = "",
  initialWo = "",
}: {
  big?: boolean;
  initialWas?: string;
  initialWo?: string;
}) {
  const router = useRouter();
  const [was, setWas] = useState(initialWas);
  const [wo, setWo] = useState(initialWo);

  const gewerkOptions: Option[] = GEWERKE.map((g) => ({ value: g.slug, label: g.name, hint: g.kurz }));
  const ortOptions: Option[] = ORTE.map((o) => ({ value: o.plz, label: o.name, hint: o.plz }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const p = new URLSearchParams();
        if (was.trim()) p.set("was", was.trim());
        if (wo.trim()) p.set("wo", wo.trim());
        router.push(`/suche${p.toString() ? `?${p}` : ""}`);
      }}
      className={`relative flex w-full flex-col rounded-[1.75rem] bg-white text-left shadow-2xl shadow-forest-deep/20 ring-1 ring-black/5 sm:flex-row sm:items-center ${
        big ? "p-1.5 sm:rounded-full" : "p-1 sm:rounded-full"
      }`}
    >
      <Field label="Was" placeholder="Gewerk oder Leistung" value={was} onChange={setWas} options={gewerkOptions} icon={IconSearch} big={big} />
      <div className="mx-5 h-px bg-line sm:mx-0 sm:h-10 sm:w-px" />
      <Field label="Wo" placeholder="PLZ oder Ort" value={wo} onChange={setWo} options={ortOptions} icon={IconPin} big={big} />
      <button
        type="submit"
        className={`m-1 flex items-center justify-center gap-2 rounded-full bg-forest font-semibold text-white transition hover:bg-forest-soft ${
          big ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
        }`}
      >
        {IconSearch}
        <span>Suchen</span>
      </button>
    </form>
  );
}
