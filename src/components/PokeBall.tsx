type PokeBallProps = {
  className?: string;
  size?: number;
};

/**
 * Authentic Poké Ball SVG with correct orientation:
 * red upper half, white lower half, black center band, white center button.
 */
export function PokeBall({ className = '', size = 100 }: PokeBallProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* White base (full circle) */}
      <circle cx="50" cy="50" r="46" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="6" />
      {/* Red upper half */}
      <path d="M4 50 A46 46 0 0 1 96 50 Z" fill="#ee1515" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round" />
      {/* Black center band */}
      <rect x="4" y="46" width="92" height="8" fill="#0a0a0a" />
      {/* Center button — outer ring */}
      <circle cx="50" cy="50" r="13" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="6" />
      {/* Center button — inner dot */}
      <circle cx="50" cy="50" r="6" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="3" />
    </svg>
  );
}
