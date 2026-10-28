// Row of colour swatches. Each one is a real button with an accessible name,
// so it works with touch, mouse and keyboard alike.
export default function Swatches({ variants, selected, onSelect, size = 'sm', idPrefix }) {
  if (variants.length < 2 && size === 'sm') return null;
  return (
    <div className={`swatches swatches--${size}`} role="group" aria-label="Colours">
      {variants.map((v, i) => (
        <button
          key={v.name}
          id={idPrefix ? `${idPrefix}-${i}` : undefined}
          type="button"
          className="swatch"
          aria-label={v.name}
          aria-pressed={i === selected}
          title={v.name}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(i);
          }}
        >
          <span style={{ background: v.hex }} />
        </button>
      ))}
    </div>
  );
}
