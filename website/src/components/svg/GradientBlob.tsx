import type { ReactElement } from 'react';

export type GradientBlobProps = {
  className?: string;
  size?: number;
  color?: string;
  seed?: number;
};

export function GradientBlob({
  className,
  size = 480,
  color = '#FF6B35',
  seed = 1,
}: GradientBlobProps): ReactElement {
  const blobId = `gradient-blob-${seed}`;
  const path = buildBlobPath(seed);

  return (
    <svg
      className={className}
      role="presentation"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
      <defs>
        <radialGradient id={blobId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={0.55} />
          <stop offset="60%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={path} fill={`url(#${blobId})`} />
    </svg>
  );
}

function buildBlobPath(seed: number): string {
  // Six anchor points around a circle, radius wiggled per-seed.
  const center = 100;
  const baseR = 78;
  const points = 6;
  const path: string[] = [];

  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const wobble = pseudoRandom(seed * 17 + i * 31) * 18 - 9;
    const r = baseR + wobble;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    path.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  // Build smooth closed path using quadratic curves between midpoints.
  const segments: string[] = [];
  for (let i = 0; i < points; i += 1) {
    const [cx, cy] = path[i].split(' ').map(Number);
    const [nx, ny] = path[(i + 1) % points].split(' ').map(Number);
    const mx = (cx + nx) / 2;
    const my = (cy + ny) / 2;
    if (i === 0) {
      segments.push(`M ${mx.toFixed(2)} ${my.toFixed(2)}`);
    }
    const [nnx, nny] = path[(i + 1) % points].split(' ').map(Number);
    const [afterX, afterY] = path[(i + 2) % points].split(' ').map(Number);
    const nextMx = (nnx + afterX) / 2;
    const nextMy = (nny + afterY) / 2;
    segments.push(`Q ${nnx.toFixed(2)} ${nny.toFixed(2)}, ${nextMx.toFixed(2)} ${nextMy.toFixed(2)}`);
  }
  segments.push('Z');
  return segments.join(' ');
}

function pseudoRandom(n: number): number {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

export default GradientBlob;
