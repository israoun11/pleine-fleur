// Row of colour swatches. Each is a real button with an accessible name,
// so it works with touch, mouse and keyboard.
export default function Swatches({ variants, selected, onSelect, size = 'sm', label = 'Couleurs', showSingle = false }) {
  if (variants.length < 2 && size === 'sm' && !showSingle) return <div className="swatches swatches--empty" aria-hidden="true" />;
  return (
    <div className={`swatches swatches--${size}`} role="group" aria-label={label}>
      {variants.map((v, i) => (
        <button
          key={v.name}
          type="button"
          className="swatch"
          aria-label={v.name}
          aria-pressed={i === selected}
          title={v.name}
          onClick={(e) => {
            e.preventDefault();
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
