/* Havelland geography for the pixel map. The heavy lifting (boundary, water,
 * forests, railways, town positions from OpenStreetMap) is precomputed by
 * `npm run build-map` into havelland-map.json. */
import map from "./havelland-map.json";

export type TownId =
  | "falkensee"
  | "dallgow"
  | "schoenwalde"
  | "brieselang"
  | "wustermark"
  | "nauen"
  | "ketzin"
  | "premnitz"
  | "rathenow";

export type Town = {
  id: TownId;
  name: string;
  /** Label offset from the marker in map units, plus text anchor. */
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
  /** Lower-case fragments used to spot the town in a Meetup event text. */
  match: string[];
  /** Label hidden on phones, where the towns around Falkensee crowd together. */
  minor?: boolean;
};

export const HQ: TownId = "falkensee";

export const towns: Town[] = [
  { id: "falkensee", name: "Falkensee", label: { dx: 20, dy: 2, anchor: "start" }, match: ["falkensee"] },
  { id: "dallgow", name: "Dallgow-Döberitz", label: { dx: 4, dy: 22, anchor: "middle" }, match: ["dallgow"], minor: true },
  { id: "nauen", name: "Nauen", label: { dx: 0, dy: -12, anchor: "middle" }, match: ["nauen"] },
  { id: "brieselang", name: "Brieselang", label: { dx: -12, dy: 5, anchor: "end" }, match: ["brieselang"], minor: true },
  { id: "rathenow", name: "Rathenow", label: { dx: 12, dy: 5, anchor: "start" }, match: ["rathenow"] },
  { id: "wustermark", name: "Wustermark", label: { dx: -10, dy: 17, anchor: "end" }, match: ["wustermark", "elstal"], minor: true },
  { id: "ketzin", name: "Ketzin/Havel", label: { dx: 0, dy: 22, anchor: "middle" }, match: ["ketzin"] },
  { id: "schoenwalde", name: "Schönwalde-Glien", label: { dx: 0, dy: -12, anchor: "middle" }, match: ["schönwalde", "schoenwalde"], minor: true },
  { id: "premnitz", name: "Premnitz", label: { dx: 12, dy: 5, anchor: "start" }, match: ["premnitz"] },
];

/* Tour de Havelland: a dinner every month, each in a different town,
 * starting at home in Falkensee. No dinner in December — that month belongs
 * to Christmas. Months after the first are the plan, not booked venues. */
export const tour: { town: TownId; month: string }[] = [
  { town: "falkensee", month: "2026-10" },
  { town: "nauen", month: "2026-11" },
  { town: "rathenow", month: "2027-01" },
  { town: "ketzin", month: "2027-02" },
  { town: "dallgow", month: "2027-03" },
  { town: "brieselang", month: "2027-04" },
  { town: "schoenwalde", month: "2027-05" },
  { town: "wustermark", month: "2027-06" },
  { town: "premnitz", month: "2027-07" },
];

export const MAP_WIDTH = map.width;
export const MAP_HEIGHT = map.height;
export const mapPaths = map.paths;
export const MAP_ATTRIBUTION = map.attribution;

export function project([lon, lat]: [number, number]): [number, number] {
  const { lonMin, latMax, scale, lonFactor } = map.projection;
  return [(lon - lonMin) * lonFactor * scale, (latMax - lat) * scale];
}

export function townPoint(id: TownId): [number, number] {
  return map.towns[id] as [number, number];
}

/** The tour as one path through every stop, each leg gently arched. */
export function tourPath(): string {
  const points = tour.map((stop) => townPoint(stop.town));
  return points.reduce((d, [x2, y2], i) => {
    if (i === 0) return `M${x2} ${y2}`;
    const [x1, y1] = points[i - 1];
    const length = Math.hypot(x2 - x1, y2 - y1);
    // Bow every leg the same way round, so return legs don't sit on top of outbound ones.
    const cx = (x1 + x2) / 2 + ((y2 - y1) / length) * length * 0.16;
    const cy = (y1 + y2) / 2 - ((x2 - x1) / length) * length * 0.16;
    return `${d}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
  }, "");
}

/** Finds which Havelland town a Meetup event mentions, if any. */
export function findTown(text: string): Town | undefined {
  const haystack = text.toLowerCase();
  return towns.find((town) => town.match.some((m) => haystack.includes(m)));
}
