import { useEffect, useRef } from "react";
import PearMascot from "./PearMascot";

function Tree({
  x,
  y,
  scale = 1,
  shade = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  shade?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-3 0H3V-35H-3Z" fill="#60664b" />
      <path
        d="M-5-63H7V-59H14V-53H20V-42H24V-27H18V-20H8V-14H-9V-20H-20V-30H-24V-42H-18V-54H-5Z"
        fill={["#3f8059", "#568f5d", "#2e704f", "#72a06b"][shade % 4]}
      />
      <path
        d="M-18-42H-10V-52H-2V-57H7V-48H1V-37H-9V-27H-18Z"
        fill="#a1bb73"
        opacity=".23"
      />
      <path
        d="M6-42H13V-32H20V-26H12V-20H5V-15H-2V-30H6Z"
        fill="#205b49"
        opacity=".3"
      />
    </g>
  );
}

function Windows({
  xs,
  ys,
  color = "#42615d",
}: {
  xs: number[];
  ys: number[];
  color?: string;
}) {
  return (
    <g fill={color}>
      {ys.flatMap((y) =>
        xs.map((x) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="7" height="13" />
            <rect x={x + 3} y={y} width="1" height="13" fill="#d6c29c" />
          </g>
        )),
      )}
    </g>
  );
}

/* Simplified silhouettes based on the original buildings:
 * https://www.ev-kirche-rathenow.de/wir/kirchen/st-marien-andreas-kirche
 * https://www.nauen.de/media/4168/rathaus-nauen.jpg
 * https://www.falkensee.de/seite/387791/rathaus.html
 * https://www.visithavelland.de/poi/wasserturm
 */
function RathenowChurch() {
  return (
    <g
      className="town-landmark"
      data-town="Rathenow"
      transform="translate(170 180)"
    >
      <path fill="#c99269" d="M-58 0V-56H47V0Z" />
      <path
        fill="#b27156"
        d="M-66-56V-62H-58V-70H-50V-78H33V-70H41V-62H49V-56Z"
      />
      <path fill="#d4b381" d="M-20 0V-116H17V0Z" />
      <path fill="#b88e65" d="M4-113H17V0H4Z" />
      <path
        fill="#526e72"
        d="M-24-115H21V-123H15V-135H10V-143H6V-157H1V-168H-3V-157H-8V-143H-12V-135H-17V-123H-24Z"
      />
      <path fill="#7e9694" d="M-15-123H-7V-139H-2V-151H2V-134H7V-122H-15Z" />
      <Windows xs={[-13, 3]} ys={[-105, -80, -49]} />
      <Windows xs={[-50, -36, 27]} ys={[-39]} />
      <path fill="#667b66" d="M-7 0V-22H-3V-26H3V-22H7V0Z" />
      <path
        stroke="#a88160"
        strokeWidth="3"
        d="M-57-6H-22M-57-48H-22M18-6H45"
      />
    </g>
  );
}

function NauenTownHall() {
  return (
    <g
      className="town-landmark"
      data-town="Nauen"
      transform="translate(440 180)"
    >
      <path fill="#bd7859" d="M-62 0V-64H62V0Z" />
      <path
        fill="#ad624e"
        d="M-68-64V-70H-60V-78H-50V-87H45V-78H55V-70H66V-64Z"
      />
      <path fill="#d2956b" d="M-24 0V-77H-18V-88H-12V-96H12V-88H18V-77H24V0Z" />
      <path
        fill="#527a6b"
        d="M-8-95V-109H-5V-119H-2V-140H2V-119H5V-109H8V-95Z"
      />
      <path fill="#b47c59" d="M-11-96H11V-77H-11Z" />
      <rect x="-6" y="-91" width="12" height="12" fill="#eee3b9" />
      <path stroke="#4a6559" strokeWidth="2" d="M0-90V-84H4" />
      <Windows xs={[-54, -39, 32, 47]} ys={[-53, -27]} />
      <Windows xs={[-14, 7]} ys={[-59, -35]} />
      <path fill="#5e6354" d="M-10 0V-15H-6V-20H6V-15H10V0Z" />
      <path
        stroke="#e0aa7b"
        strokeWidth="3"
        d="M-62-33H-26M26-33H62M-62-4H-26M26-4H62"
      />
      <path fill="#dfaa79" d="M-65-69H-61V-83H-65ZM61-69H65V-83H61Z" />
    </g>
  );
}

function FalkenseeTownHall() {
  return (
    <g
      className="town-landmark"
      data-town="Falkensee"
      transform="translate(845 182)"
    >
      <path fill="#e0c58e" d="M-65 0V-59H65V0Z" />
      <path
        fill="#ba805a"
        d="M-72-58V-64H-65V-72H-56V-80H56V-72H65V-64H72V-58Z"
      />
      <path fill="#eaddb0" d="M-22 0V-68H-17V-77H-10V-84H10V-77H17V-68H22V0Z" />
      <path
        fill="#54786c"
        d="M-10-83V-92H-7V-101H-3V-113H3V-101H7V-92H10V-83Z"
      />
      <path fill="#d6c18e" d="M-7-90H7V-80H-7Z" />
      <rect x="-6" y="-68" width="12" height="12" fill="#f8f1d3" />
      <path stroke="#586c58" strokeWidth="2" d="M0-66V-62H4" />
      <Windows xs={[-55, -39, 32, 48]} ys={[-47, -21]} />
      <Windows xs={[-13, 6]} ys={[-42]} />
      <path fill="#6e7961" d="M-7 0V-20H7V0Z" />
      <path stroke="#f1dfb4" strokeWidth="3" d="M-64-28H-24M24-28H64" />
    </g>
  );
}

function DallgowWaterTower() {
  return (
    <g
      className="town-landmark"
      data-town="Dallgow-Döberitz"
      transform="translate(1080 180)"
    >
      <path fill="#bf8566" d="M-21 0V-85H21V0Z" />
      <path fill="#a96d57" d="M8-85H21V0H8Z" />
      <path fill="#cf9672" d="M-29-83V-122H29V-83H24V-76H-24V-83Z" />
      <path fill="#b47a60" d="M10-121H29V-83H24V-76H10Z" />
      <path
        fill="#536d70"
        d="M-33-122V-128H-25V-135H-16V-142H-6V-150H6V-142H16V-135H25V-128H33V-122Z"
      />
      <path fill="#7c9693" d="M-23-128H-14V-135H-5V-142H1V-132H8V-126H-23Z" />
      <path
        fill="#46616a"
        d="M-2-151H2V-162H-2ZM-26-128H-22V-143H-26ZM22-128H26V-143H22Z"
      />
      <Windows xs={[-20, -4, 13]} ys={[-111]} />
      <Windows xs={[-4]} ys={[-65, -36]} />
      <path fill="#64705c" d="M-6 0V-13H6V0Z" />
      <path
        stroke="#dfad85"
        strokeWidth="3"
        d="M-28-85H28M-21-70H21M-21-10H21"
      />
      <path
        stroke="#a36f58"
        strokeWidth="2"
        d="M-19-49H-8M6-45H19M-18-24H-8M6-17H17"
      />
    </g>
  );
}

function TownSign({
  x,
  label,
  width = 98,
}: {
  x: number;
  label: string;
  width?: number;
}) {
  return (
    <g className="town-sign" transform={`translate(${x} 193)`}>
      <rect x="-3" y="22" width="6" height="15" fill="#526b4c" />
      <rect
        x={-width / 2}
        y="-5"
        width={width}
        height="30"
        fill="#faf3d8"
        stroke="#315c4c"
        strokeWidth="3"
      />
      <text
        textAnchor="middle"
        y="16"
        fill="#264f43"
        fontFamily="VT323, monospace"
        fontSize="20"
      >
        {label}
      </text>
    </g>
  );
}

const WIDTH = 1200;
const HEIGHT = 390;
const WATERLINE = 232;
const RIVER =
  "M0 232H1200V363H1180V371H1090V378H982V370H863V385H773V374H686V379H562V365H457V374H347V362H211V370H127V357H41V350H0Z";
const BOAT = {
  hull: "M-40 7H40V14H32V22H-27V17H-35Z",
  deck: "M-36 7H38V11H-36Z",
  mast: "M-2-74H2V8H-2Z",
  mainsail: "M-7-65V-5H-42V-10H-37V-20H-32V-30H-27V-40H-22V-48H-17V-56H-12V-65Z",
  jib: "M7-53V-5H31V-12H27V-24H21V-35H16V-45H12V-53Z",
};
const BOAT_WATERLINE = 22;
const BOAT_SPRITE_HEIGHT = 100;
const SIGNS = [
  { x: 170, label: "Rathenow", width: 98 },
  { x: 440, label: "Nauen", width: 76 },
  { x: 845, label: "Falkensee", width: 105 },
  { x: 1080, label: "Dallgow-Döberitz", width: 155 },
];
const SIGN_BASELINE = 209; // TownSign sits at y=193, its text baseline 16 below
// The waving pear stands on the shore next to the Falkensee sign.
const MASCOT = { x: 906, width: 55, feet: 226 };
const MASCOT_HEIGHT = (MASCOT.width * 22) / 20; // PearMascot's viewBox is 20×22
// Fixed sparkle positions so the shimmer is stable between frames.
const SPARKLES = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 137) % WIDTH,
  y: WATERLINE + 8 + ((i * 29) % 128),
  w: 8 + (i % 5) * 7,
  phase: i * 1.7,
  speed: 0.6 + (i % 4) * 0.35,
  color: ["#f9f6e9", "#d4ebe6", "#ffffff"][i % 3],
}));

/** A vertically mirrored copy, so reflections read upside down like real water. */
function flipped(source: HTMLCanvasElement) {
  const out = document.createElement("canvas");
  out.width = source.width;
  out.height = source.height;
  const ctx = out.getContext("2d")!;
  ctx.translate(0, out.height);
  ctx.scale(1, -1);
  ctx.drawImage(source, 0, 0);
  return out;
}

/* Kingdom-Two-Crowns style water: the (pre-flipped) shore is copied into the
 * river in thin horizontal bands, each nudged sideways by a slow wave, so the
 * reflection wobbles in chunky pixel steps. */
function drawReflection(
  ctx: CanvasRenderingContext2D,
  mirror: HTMLCanvasElement,
  k: number,
  t: number,
  opts: { height: number; axis: number; top: number; depth: number; squash: number; alpha: number; sx: number; sw: number; dx: number },
) {
  const band = 3;
  for (let d = 0; d < opts.depth; d += band) {
    const y = opts.top + d;
    // In the flipped image, the row just above the axis sits at height - axis.
    const srcY = opts.height - opts.axis + d / opts.squash;
    if (srcY + band / opts.squash > opts.height) break;
    const falloff = d / opts.depth;
    const wave =
      Math.sin(y * 0.33 + t * 2.1) * 1.8 + Math.sin(y * 0.09 - t * 1.2) * 2.4;
    const shift = Math.round((wave * (0.35 + falloff * 1.4)) / 2) * 2;
    ctx.globalAlpha = opts.alpha * (1 - falloff * 0.85);
    ctx.drawImage(
      mirror,
      opts.sx * k,
      srcY * k,
      opts.sw * k,
      (band / opts.squash) * k,
      (opts.dx + shift) * k,
      y * k,
      opts.sw * k,
      band * k,
    );
  }
  ctx.globalAlpha = 1;
}

function makeBoat(k: number) {
  const sprite = document.createElement("canvas");
  sprite.width = Math.ceil(90 * k);
  sprite.height = Math.ceil(BOAT_SPRITE_HEIGHT * k);
  const ctx = sprite.getContext("2d")!;
  ctx.setTransform(k, 0, 0, k, 45 * k, 76 * k);
  const fills: [keyof typeof BOAT, string][] = [
    ["hull", "#2e5860"],
    ["deck", "#f3efe0"],
    ["mast", "#325b5b"],
    ["mainsail", "#fffdf1"],
    ["jib", "#f5efd9"],
  ];
  // The sail paths leave a gap around the mast; pull them in so they attach.
  const offsets: Partial<Record<keyof typeof BOAT, number>> = { mainsail: 5, jib: -5 };
  for (const [part, color] of fills) {
    ctx.save();
    ctx.translate(offsets[part] ?? 0, 0);
    ctx.fillStyle = color;
    ctx.fill(new Path2D(BOAT[part]));
    ctx.restore();
  }
  return sprite;
}

type HavellandSceneProps = { motion: boolean; mascotLabel: string };

export default function HavellandScene({ motion, mascotLabel }: HavellandSceneProps) {
  const stage = useRef<HTMLDivElement>(null);
  const shore = useRef<SVGSVGElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mascot = useRef<HTMLDivElement>(null);
  const motionRef = useRef(motion);
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    motionRef.current = motion;
    redraw.current();
  }, [motion]);

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const river = new Path2D(RIVER);
    let k = 1;
    let shoreMirror: HTMLCanvasElement | null = null;
    let boat: HTMLCanvasElement | null = null;
    let boatMirror: HTMLCanvasElement | null = null;
    let frame = 0;
    let visible = true;
    let last = 0;
    const started = performance.now();

    const draw = (now: number) => {
      const t = motionRef.current ? (now - started) / 1000 : 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.imageSmoothingEnabled = false;

      ctx.save();
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.clip(river);
      const gradient = ctx.createLinearGradient(0, WATERLINE, 0, HEIGHT);
      gradient.addColorStop(0, "#8dbcbc");
      gradient.addColorStop(1, "#d9e8df");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, WATERLINE, WIDTH, HEIGHT - WATERLINE);
      ctx.restore();

      const bx = Math.round(640 + Math.sin(t * 0.045) * 170);
      const by = 254 + Math.round(Math.sin(t * 1.1));

      ctx.save();
      ctx.scale(k, k);
      ctx.clip(river);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (shoreMirror) {
        drawReflection(ctx, shoreMirror, k, t, {
          height: HEIGHT,
          axis: WATERLINE,
          top: WATERLINE,
          depth: HEIGHT - WATERLINE,
          squash: 0.7,
          alpha: 0.6,
          sx: 0,
          sw: WIDTH,
          dx: 0,
        });
      }
      if (boatMirror) {
        drawReflection(ctx, boatMirror, k, t, {
          height: BOAT_SPRITE_HEIGHT,
          axis: 76 + BOAT_WATERLINE,
          top: by + BOAT_WATERLINE,
          depth: 80,
          squash: 0.75,
          alpha: 0.45,
          sx: 0,
          sw: 90,
          dx: bx - 45,
        });
      }
      // Wash the reflections toward the water colour, then add the shimmer.
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.fillStyle = "rgba(160, 200, 198, 0.28)";
      ctx.fillRect(0, WATERLINE, WIDTH, HEIGHT - WATERLINE);
      for (const s of SPARKLES) {
        const glow = Math.sin(t * s.speed + s.phase);
        if (motionRef.current ? glow < 0.15 : s.phase % 3 > 1.2) continue;
        ctx.globalAlpha = motionRef.current ? Math.min(1, (glow - 0.15) * 2) * 0.8 : 0.6;
        ctx.fillStyle = s.color;
        const drift = Math.round(Math.sin(t * 0.4 + s.phase) * 3) * 2;
        ctx.fillRect(s.x + drift, s.y, s.w, 2);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#5f8f78";
      ctx.fillRect(0, WATERLINE, WIDTH, 2);
      ctx.restore();

      if (boat) {
        ctx.drawImage(boat, (bx - 45) * k, (by - 76) * k);
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      // ~20fps keeps the motion chunky and cheap, like the pixel art it mirrors.
      if (now - last < 50) return;
      last = now;
      draw(now);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => {
      if (motionRef.current && visible) {
        if (!frame) frame = requestAnimationFrame(loop);
      } else {
        stop();
        draw(performance.now());
      }
    };
    redraw.current = sync;

    // The pear is HTML on top of the scene, so paint a still copy of it into
    // the reflection source as well.
    const drawMascot = (octx: CanvasRenderingContext2D) =>
      new Promise<void>((done) => {
        const svg = mascot.current?.querySelector("svg");
        if (!svg) return done();
        const url = URL.createObjectURL(
          new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" }),
        );
        const img = new Image();
        img.onload = img.onerror = () => {
          if (img.naturalWidth) {
            octx.drawImage(img, MASCOT.x * k, (MASCOT.feet - MASCOT_HEIGHT) * k, MASCOT.width * k, MASCOT_HEIGHT * k);
          }
          URL.revokeObjectURL(url);
          done();
        };
        img.src = url;
      });

    const rasterizeShore = () => {
      const svg = shore.current!.cloneNode(true) as SVGSVGElement;
      svg.querySelectorAll("text").forEach((node) => node.remove());
      svg.setAttribute("width", String(WIDTH * k));
      svg.setAttribute("height", String(HEIGHT * k));
      const url = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(svg)], {
          type: "image/svg+xml",
        }),
      );
      const img = new Image();
      img.onload = async () => {
        const off = document.createElement("canvas");
        off.width = Math.ceil(WIDTH * k);
        off.height = Math.ceil(HEIGHT * k);
        const octx = off.getContext("2d")!;
        octx.drawImage(img, 0, 0, off.width, off.height);
        URL.revokeObjectURL(url);
        // An SVG drawn as an image can't use the page's web fonts, so the sign
        // labels are painted onto the canvas once VT323 is ready.
        await drawMascot(octx);
        await document.fonts.load("20px VT323").catch(() => undefined);
        octx.setTransform(k, 0, 0, k, 0, 0);
        octx.font = "20px VT323, monospace";
        octx.textAlign = "center";
        octx.fillStyle = "#264f43";
        for (const sign of SIGNS) octx.fillText(sign.label, sign.x, SIGN_BASELINE);
        shoreMirror = flipped(off);
        draw(performance.now());
      };
      img.src = url;
    };

    const resize = () => {
      const width = stage.current!.clientWidth;
      if (!width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      k = (width * dpr) / WIDTH;
      el.width = Math.round(WIDTH * k);
      el.height = Math.round(HEIGHT * k);
      boat = makeBoat(k);
      boatMirror = flipped(boat);
      rasterizeShore();
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage.current!);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(stage.current!);
    resize();
    sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      redraw.current = () => {};
    };
  }, []);

  return (
    <div className="havel-landscape" ref={stage} aria-hidden="true">
      <svg
        ref={shore}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        shapeRendering="crispEdges"
      >
        <path
          fill="#8dae75"
          d="M0 117H26V107H52V121H89V132H124V139H170V128H215V138H264V128H310V146H360V140H416V125H457V140H500V150H546V137H588V147H647V131H697V140H745V128H785V142H829V123H876V139H929V117H970V126H1017V104H1060V120H1102V101H1150V115H1200V232H0Z"
        />
        {Array.from({ length: 36 }, (_, i) => (
          <Tree
            key={i}
            x={i * 36 - 15}
            y={188 + (i % 3) * 7}
            scale={0.7 + (i % 5) * 0.13}
            shade={i % 4}
          />
        ))}
        <RathenowChurch />
        <NauenTownHall />
        <FalkenseeTownHall />
        <DallgowWaterTower />
        <path
          fill="#a5bc75"
          d="M0 190H90V182H175V193H281V179H375V191H443V180H500V197H603V186H699V176H788V190H853V178H942V193H1050V180H1140V185H1200V228H0Z"
        />
        {Array.from({ length: 15 }, (_, i) => (
          <Tree
            key={i}
            x={i * 91 + 15}
            y={214 + (i % 2) * 5}
            scale={0.4 + (i % 3) * 0.09}
            shade={i % 3}
          />
        ))}
        {Array.from({ length: 100 }, (_, i) => (
          <rect
            key={i}
            x={(i * 73) % 1200}
            y={199 + ((i * 7) % 22)}
            width={4 + (i % 4) * 3}
            height={6 + (i % 11)}
            fill={["#729956", "#8eaf65", "#b5c57c", "#527f57"][i % 4]}
            opacity=".7"
          />
        ))}
        {SIGNS.map((sign) => (
          <TownSign key={sign.label} {...sign} />
        ))}
        <path fill="#63927a" d="M0 226H1200V232H0Z" />
      </svg>
      <canvas ref={canvas} />
      <div
        className="mascot"
        ref={mascot}
        style={{
          left: `${(MASCOT.x / WIDTH) * 100}%`,
          top: `${((MASCOT.feet - MASCOT_HEIGHT) / HEIGHT) * 100}%`,
          width: `${(MASCOT.width / WIDTH) * 100}%`,
        }}
      >
        <p className="speech">{mascotLabel}</p>
        <PearMascot />
      </div>
    </div>
  );
}
