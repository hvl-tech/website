// Pear body as half-widths per row: row y spans columns [7 - w, 6 + w].
const BODY: Record<number, number> = {
  3: 2, 4: 3, 5: 3, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 7, 12: 7, 13: 7, 14: 7, 15: 6, 16: 6, 17: 5,
};

const inside = (x: number, y: number) => {
  const w = BODY[y];
  return w !== undefined && x >= 7 - w && x <= 6 + w;
};

const cells: { x: number; y: number; edge: boolean }[] = [];
for (const y of Object.keys(BODY).map(Number)) {
  for (let x = 7 - BODY[y]; x <= 6 + BODY[y]; x++) {
    const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !inside(x + dx, y + dy));
    cells.push({ x, y, edge });
  }
}

const px = (x: number, y: number, fill: string, w = 1, h = 1) => (
  <rect key={`${x}-${y}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} />
);

export default function PearMascot() {
  return (
    <svg className="pear-mascot" xmlns="http://www.w3.org/2000/svg" viewBox="-3 -1 20 22" shapeRendering="crispEdges">
      {/* stem + leaf */}
      {px(7, 0, "#6b4b3a", 1, 3)}
      {px(8, 0, "#3f8059", 3, 1)}
      {px(8, 1, "#3f8059", 2, 1)}
      {px(10, -1, "#3f8059", 2, 1)}
      {cells.map(({ x, y, edge }) => px(x, y, edge ? "#2e704f" : "#9cc55a"))}
      {/* highlight */}
      {px(4, 6, "#c7e08a", 1, 3)}
      {px(5, 5, "#c7e08a")}
      {/* face */}
      <g className="pear-eyes">
        {px(5, 10, "#1f3b33", 1, 2)}
        {px(8, 10, "#1f3b33", 1, 2)}
      </g>
      {px(4, 12, "#e9927a")}
      {px(9, 12, "#e9927a")}
      {px(6, 13, "#1f3b33", 2, 1)}
      {/* left arm resting, right arm waving */}
      {px(-1, 12, "#2e704f", 1, 3)}
      {px(-2, 14, "#2e704f")}
      <g className="pear-arm">
        {px(14, 10, "#2e704f")}
        {px(15, 9, "#2e704f")}
        {px(15, 8, "#2e704f")}
        {px(15, 6, "#2e704f", 2, 2)}
      </g>
      {/* legs */}
      {px(5, 18, "#2e704f", 1, 2)}
      {px(8, 18, "#2e704f", 1, 2)}
      {px(4, 19, "#2e704f")}
      {px(9, 19, "#2e704f")}
    </svg>
  );
}
