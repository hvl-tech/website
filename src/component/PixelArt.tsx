/* Tiny pixel-art sprites drawn from text grids — one character per pixel,
 * "." is transparent. Used for the FAQ illustrations. */

// Colours come from CSS custom properties so sprites follow the light/dark theme.
const PALETTE: Record<string, string> = {
  k: "var(--px-ink)", // ink
  g: "var(--green)", // green
  l: "#9cc55a", // pear green
  w: "var(--px-paper)", // paper white
  s: "var(--px-screen)", // screen
  o: "var(--px-rim)", // plate rim
  p: "var(--px-plate)", // plate
  a: "var(--accent)", // accent
  r: "#7fb6bb", // water
  b: "#6b4b3a", // brown
};

export const sprites = {
  code: [
    "..gggggggggggggg..",
    "..gssssssssssssg..",
    "..gssssskkkssssg..",
    "..gssssksssksssg..",
    "..gsssssssskkssg..",
    "..gssssssskssssg..",
    "..gsssssskssssg...",
    "..gssssssssssssg..",
    "..gsssssskssssssg.",
    "..gggggggggggggg..",
    ".kkkkkkkkkkkkkkkk.",
    "kkkkkkkkkkkkkkkkkk",
  ],
  dinner: [
    "f.f.f...oooo....k.",
    "f.f.f..oppppo..kk.",
    "f.f.f.oppllppo.kk.",
    "fffff.opllllpo.kk.",
    ".fff..oppllppo.kk.",
    "..f...oppppppo..k.",
    "..f....oppppo...k.",
    "..f.....oooo....k.",
    "..f.............k.",
    "..f.............k.",
  ],
  language: [
    "ggggggggg.........",
    "gwwwwwwwg.........",
    "gwgggggwg.........",
    "gwwwwwwwg.........",
    "gwgggwwwg.........",
    "ggggggggg.aaaaaaaa",
    ".gg.......awwwwwwa",
    ".g........awaaaawa",
    "..........awwwwwwa",
    "..........awaawwwa",
    "..........aaaaaaaa",
    "..............aa..",
    "...............a..",
  ],
  pin: [
    "......aaaaa.......",
    ".....aaaaaaa......",
    "....aaawwwaaa.....",
    "....aawwwwwaa.....",
    "....aaawwwaaa.....",
    ".....aaaaaaa......",
    "......aaaaa.......",
    ".......aaa........",
    "........a.........",
    "..llllllllllllll..",
    ".lllrrllllllrrlll.",
    "lllllllrrrrlllllll",
  ],
  talk: [
    ".......kkkk.......",
    "......kwkwkk......",
    "......kkwkwk......",
    "......kwkwkk......",
    "......kkkkkk......",
    "....g.kkkkkk.g....",
    "....g..kkkk..g....",
    ".....g......g.....",
    "......gggggg......",
    "........gg........",
    "........gg........",
    "......gggggg......",
  ],
  bolt: [
    "..........aaaa....",
    ".........aaaa.....",
    "........aaaa......",
    ".......aaaa.......",
    "......aaaaaaaa....",
    ".....aaaaaaaa.....",
    "........aaaa......",
    ".......aaaa.......",
    "......aaa.........",
    ".....aa...........",
    "....a.............",
    "..................",
  ],
  wrench: [
    ".............kk...",
    "............k..k..",
    "...........k..k...",
    "..........kkkk....",
    ".........kkk......",
    "........kkk.......",
    ".......kkk........",
    "..gg..kkk.........",
    ".gggggkk..........",
    ".ggwwgg...........",
    ".ggwwgg...........",
    "..gggg............",
  ],
  kids: [
    "........a.........",
    "........a.........",
    "....gggggggggg....",
    "....gwwwwwwwwg....",
    "....gwkkwwkkwg....",
    "....gwkkwwkkwg....",
    "....gwwwwwwwwg....",
    "....gwwaaaawwg....",
    "....gggggggggg....",
    "..gg..gggggg..gg..",
    "......gg..gg......",
    "......gg..gg......",
  ],
};

export type SpriteName = keyof typeof sprites;

export default function PixelArt({ name, className }: { name: SpriteName; className?: string }) {
  const rows = sprites[name];
  const width = Math.max(...rows.map((row) => row.length));
  const rects: React.JSX.Element[] = [];
  rows.forEach((row, y) => {
    // Merge horizontal runs of one colour into a single rect.
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      let end = x;
      while (end < row.length && row[end] === char) end++;
      const fill = char === "f" ? PALETTE.k : PALETTE[char];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} style={{ fill }} />);
      x = end;
    }
  });
  return (
    <svg
      className={className}
      viewBox={`-1 -1 ${width + 2} ${rows.length + 2}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}
