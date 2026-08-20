const CANVAS_W = 320;
const CANVAS_H = 200;
// Calibrated so fútbol 11 (105 x 68m) fills the shared canvas height with margin —
// every other type is drawn at this same px-per-meter scale, so relative
// court size between types is real, not each normalized to its own frame.
const SCALE = 2.647;

// Ratios below mirror real 11-a-side proportions (16.5m box / 105m length,
// 9.15m circle radius / 105m length, 11m penalty spot / 105m length,
// 7.32m goal / 68m width), applied to each pitch's own dimensions so the
// markings scale down with the court instead of looking pasted on.
const BOX_DEPTH_RATIO = 16.5 / 105;
const BOX_WIDTH_RATIO = 40.32 / 68;
const CIRCLE_RATIO = 9.15 / 105;
const PENALTY_SPOT_RATIO = 11 / 105;
const GOAL_WIDTH_RATIO = 7.32 / 68;

function penaltyArc(spotX: number, spotY: number, r: number, edgeX: number, bulgeRight: boolean) {
  const dx = Math.abs(edgeX - spotX);
  const halfChord = Math.sqrt(Math.max(r * r - dx * dx, 0));
  const y1 = spotY - halfChord;
  const y2 = spotY + halfChord;
  const sweep = bulgeRight ? 1 : 0;
  return `M ${edgeX},${y1} A ${r},${r} 0 0,${sweep} ${edgeX},${y2}`;
}

export default function PitchDiagram({
  lengthM,
  widthM,
  className = "",
}: {
  lengthM: number;
  widthM: number;
  className?: string;
}) {
  const w = lengthM * SCALE;
  const h = widthM * SCALE;
  const x0 = (CANVAS_W - w) / 2;
  const y0 = (CANVAS_H - h) / 2;
  const cx = x0 + w / 2;
  const cy = y0 + h / 2;

  const circleR = lengthM * CIRCLE_RATIO * SCALE;
  const boxDepth = lengthM * BOX_DEPTH_RATIO * SCALE;
  const boxWidth = widthM * BOX_WIDTH_RATIO * SCALE;
  const penaltyDist = lengthM * PENALTY_SPOT_RATIO * SCALE;
  const goalWidth = widthM * GOAL_WIDTH_RATIO * SCALE;

  const line = "#ffffff";

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="#050505" />

      <g stroke={line} strokeOpacity="0.35" strokeWidth="1.4" fill="none">
        <rect x={x0} y={y0} width={w} height={h} />
        <line x1={cx} y1={y0} x2={cx} y2={y0 + h} />
        <circle cx={cx} cy={cy} r={circleR} />

        <rect x={x0} y={cy - boxWidth / 2} width={boxDepth} height={boxWidth} />
        <path d={penaltyArc(x0 + penaltyDist, cy, circleR, x0 + boxDepth, true)} />

        <rect x={x0 + w - boxDepth} y={cy - boxWidth / 2} width={boxDepth} height={boxWidth} />
        <path d={penaltyArc(x0 + w - penaltyDist, cy, circleR, x0 + w - boxDepth, false)} />
      </g>

      <g fill={line} fillOpacity="0.35">
        <circle cx={cx} cy={cy} r="1.6" />
        <circle cx={x0 + penaltyDist} cy={cy} r="1.6" />
        <circle cx={x0 + w - penaltyDist} cy={cy} r="1.6" />
      </g>

      <g stroke="#9d4edd" strokeOpacity="0.55" strokeWidth="2.4">
        <line x1={x0} y1={cy - goalWidth / 2} x2={x0} y2={cy + goalWidth / 2} />
        <line x1={x0 + w} y1={cy - goalWidth / 2} x2={x0 + w} y2={cy + goalWidth / 2} />
      </g>
    </svg>
  );
}
