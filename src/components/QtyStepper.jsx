export default function QtyStepper({ value, onChange, min = 1, max = 10, labelledBy, label }) {
  return (
    <div className="qty" role="group" aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label}>
      <button type="button" aria-label="Diminuer la quantité" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="Augmenter la quantité" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>
        +
      </button>
    </div>
  );
}
