/**
 * The GreeLogix GL mark, redrawn as clean vector geometry (same proportions
 * as the 3D mark) — fully transparent, no baked-in black background.
 * The orange G is brand-fixed; the L uses currentColor so it renders cream
 * on dark headers and ink on the light portfolio header automatically.
 */
export default function LogoMark({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 300 230" fill="none" className={`logo-draw ${className}`} role="img" aria-label="GreeLogix logo" style={{ overflow: "visible" }}>
      {/* Orange G — outer stroke */}
      <path pathLength="1" d="M211 29 H27 L123 209" stroke="#FF4D1C" strokeWidth="19" strokeLinejoin="miter" strokeLinecap="butt" />
      {/* Orange G — inner stroke */}
      <path pathLength="1" d="M85 83 H183 L129 165" stroke="#FF4D1C" strokeWidth="15" strokeLinejoin="miter" strokeLinecap="butt" />
      {/* L — adapts to the header theme via currentColor */}
      <path pathLength="1" d="M237 29 L149 205 H277" stroke="currentColor" strokeWidth="17" strokeLinejoin="miter" strokeLinecap="butt" />
    </svg>
  );
}
