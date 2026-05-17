import type { ReactElement } from 'react';

export type ResultChartMetric = 'roas-curve' | 'cac-bars' | 'revenue-line';

export type ResultChartProps = {
  metric: ResultChartMetric;
  data: number[];
  accentColor: string;
  label?: string;
  className?: string;
};

const VIEW_W = 480;
const VIEW_H = 240;
const PAD_LEFT = 24;
const PAD_RIGHT = 16;
const PAD_TOP = 24;
const PAD_BOTTOM = 40;
const CHART_W = VIEW_W - PAD_LEFT - PAD_RIGHT;
const CHART_H = VIEW_H - PAD_TOP - PAD_BOTTOM;
const GRID_LINES = 4;
const GRID_COLOR = 'rgba(140, 138, 130, 0.25)';
const MUTED = 'rgba(140, 138, 130, 0.6)';

export function ResultChart({
  metric,
  data,
  accentColor,
  label,
  className,
}: ResultChartProps): ReactElement {
  const safeData = data.length >= 2 ? data : [0, 0];
  const min = Math.min(...safeData);
  const max = Math.max(...safeData);
  const range = max - min || 1;

  const points: Array<{ x: number; y: number }> = safeData.map((v, i) => {
    const x = PAD_LEFT + (i / (safeData.length - 1)) * CHART_W;
    const y = PAD_TOP + CHART_H - ((v - min) / range) * CHART_H;
    return { x, y };
  });

  const titleText = label ?? `${metric} chart`;
  const ariaDescription = `${metric} chart with ${safeData.length} data points${label ? `: ${label}` : ''}`;

  return (
    <svg
      className={className}
      role="img"
      aria-label={ariaDescription}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      height="auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{titleText}</title>
      <Grid />
      {metric === 'cac-bars' ? (
        <Bars points={points} accentColor={accentColor} dataLength={safeData.length} />
      ) : metric === 'revenue-line' ? (
        <AreaPath points={points} accentColor={accentColor} />
      ) : (
        <CurvePath points={points} accentColor={accentColor} />
      )}
      <Axis />
      {label ? <Label text={label} /> : null}
    </svg>
  );
}

function Grid(): ReactElement {
  const lines: ReactElement[] = [];
  for (let i = 0; i <= GRID_LINES; i += 1) {
    const y = PAD_TOP + (i / GRID_LINES) * CHART_H;
    lines.push(
      <line
        key={`g-${i}`}
        x1={PAD_LEFT}
        x2={PAD_LEFT + CHART_W}
        y1={y}
        y2={y}
        stroke={GRID_COLOR}
        strokeWidth={1}
        strokeDasharray="2 4"
      />,
    );
  }
  return <g aria-hidden="true">{lines}</g>;
}

function Axis(): ReactElement {
  return (
    <g aria-hidden="true">
      <line
        x1={PAD_LEFT}
        x2={PAD_LEFT + CHART_W}
        y1={PAD_TOP + CHART_H}
        y2={PAD_TOP + CHART_H}
        stroke={MUTED}
        strokeWidth={1}
      />
    </g>
  );
}

type PointSet = Array<{ x: number; y: number }>;

function Bars({
  points,
  accentColor,
  dataLength,
}: {
  points: PointSet;
  accentColor: string;
  dataLength: number;
}): ReactElement {
  const slotWidth = CHART_W / dataLength;
  const barWidth = Math.max(6, slotWidth * 0.55);
  const baseY = PAD_TOP + CHART_H;

  return (
    <g>
      {points.map((p, i) => {
        const x = PAD_LEFT + i * slotWidth + (slotWidth - barWidth) / 2;
        const height = baseY - p.y;
        return (
          <rect
            key={`bar-${i}`}
            x={x}
            y={p.y}
            width={barWidth}
            height={height}
            rx={2}
            fill={accentColor}
            fillOpacity={0.85}
          />
        );
      })}
    </g>
  );
}

function CurvePath({
  points,
  accentColor,
}: {
  points: PointSet;
  accentColor: string;
}): ReactElement {
  const d = buildSmoothPath(points);
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={accentColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle key={`pt-${i}`} cx={p.x} cy={p.y} r={3} fill={accentColor} />
      ))}
    </g>
  );
}

function AreaPath({
  points,
  accentColor,
}: {
  points: PointSet;
  accentColor: string;
}): ReactElement {
  const linePath = buildSmoothPath(points);
  const baseY = PAD_TOP + CHART_H;
  const firstX = points[0]?.x ?? PAD_LEFT;
  const lastX = points[points.length - 1]?.x ?? PAD_LEFT + CHART_W;
  const areaPath = `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
  const fillId = `area-fill-${accentColor.replace('#', '').toLowerCase()}`;

  return (
    <g>
      <defs>
        <linearGradient id={fillId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
          <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={accentColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

// Monotone cubic-ish interpolation: builds a smooth path using mirrored
// control points based on neighbouring slopes. Implementation is intentionally
// small and dependency-free.
function buildSmoothPath(points: PointSet): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x} ${p.y}`;
  }

  const segments: string[] = [`M ${points[0].x} ${points[0].y}`];
  const tension = 0.2;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    segments.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    );
  }

  return segments.join(' ');
}

function Label({ text }: { text: string }): ReactElement {
  return (
    <text
      x={PAD_LEFT}
      y={VIEW_H - 14}
      fill={MUTED}
      fontFamily="var(--font-body), ui-sans-serif, system-ui"
      fontWeight={500}
      fontSize={13}
      letterSpacing="0.01em"
    >
      {text}
    </text>
  );
}

export default ResultChart;
