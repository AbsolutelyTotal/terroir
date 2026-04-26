// WSET Level 2 Award in Wines — data schema
// Sources of truth (in ~/Downloads/WSET Level 2/):
//   • WSET_L2wines_specification.pdf — authoritative scope (which grapes, which regions)
//   • L2E01_ED2.pdf … L2E07_ED2.pdf — WSET's exact wording for characteristics/style
// Rule: never add scope or wording not present in those documents.

export type GrapeKind = "black" | "white";

export type Climate = "cool" | "moderate" | "warm";

export type Body =
  | "light-bodied"
  | "light- to medium-bodied"
  | "medium-bodied"
  | "medium- to full-bodied"
  | "light- to full-bodied"
  | "full-bodied";

export type Level =
  | "low"
  | "medium"
  | "high"
  | "low to medium"
  | "medium to high";

export type Sweetness = "dry" | "off-dry" | "medium" | "sweet";

// 1=vineyard 2=winemaking 3=principal grapes 4=regional grapes 5=sparkling/fortified 6=service
export type LearningOutcome = 1 | 2 | 3 | 4 | 5 | 6;

export interface Grape {
  id: string;                            // slug, e.g. "cabernet-sauvignon"
  name: string;                          // display, e.g. "Cabernet Sauvignon"
  alternateName?: string;                // e.g. "Shiraz" for Syrah, "Pinot Gris" for Pinot Grigio
  kind: GrapeKind;

  syllabus: {
    chapter: string;                     // WSET textbook chapter, e.g. "15"
    session: number;                     // 1..7
    learningOutcome: LearningOutcome;    // 3 = principal (19 q), 4 = regional (12 q), 5 = sparkling/fortified
    category: "principal" | "regional" | "sparkling" | "fortified";
  };

  characteristics: {
    acidity?: Level;
    tannin?: Level;                      // black grapes only
    body?: Body;
    sweetness?: Sweetness;
    skin?: "thin" | "medium" | "thick";
  };

  climate: Climate[];                    // climates where it's typically grown (WSET's "Moderate / Warm" badges)

  ripenessLadder?: string[];             // least-ripe → most-ripe fruit progression (from WSET diagrams)
  primaryAromas: string[];               // verbatim WSET descriptors, e.g. "black fruit", "herbaceous"
  primaryAromasNote?: string;            // context for fruit progression, e.g. "varies with ripeness" or climate-driven shifts
  agedAromas?: string[];                 // tertiary aromas after bottle ageing, e.g. "dried fruit", "earth"
  agingNote?: string;                    // verbatim, e.g. "Very good or outstanding examples can age"

  winemaking?: string[];                 // bullet points, verbatim from WSET notes
  blendingNotes?: string;                // common blending partners + reasons

  regions: string[];                     // ordered list of region ids — every GI in scope for this grape (per spec)

  // Per-pairing style note: how *this* grape expresses in *that* region.
  // This is where the bulk of the exam answers live (e.g. Cab in Pauillac vs Cab in Coonawarra).
  // Keys must match an id in regions[]. Values are 1-3 sentences in WSET vocabulary.
  styleByRegion?: Record<string, string>;
}

export type RegionType =
  | "country"
  | "region"            // e.g. Bordeaux, Burgundy, Napa Valley
  | "sub-region"        // e.g. Médoc, Côte d'Or
  | "appellation"       // e.g. Pauillac, Sancerre
  | "village"           // e.g. Tain l'Hermitage (rare in L2)
  | "pgi-zone";         // e.g. Pays d'Oc, South of France

export type GIClass =
  | "AOC" | "AOP" | "PDO"
  | "IGP" | "PGI" | "VdP"
  | "DOCG" | "DOC" | "IGT"
  | "DOCa" | "DO" | "VdlT"
  | "Qualitätswein" | "Prädikatswein" | "Landwein"
  | "GI"                // generic / non-EU GIs
  | "none";

export interface Region {
  id: string;                            // slug
  name: string;                          // display name
  country: string;                       // e.g. "France"
  parent?: string;                       // id of parent region; null for countries
  type: RegionType;
  giClass?: GIClass;

  center?: [number, number];             // [lng, lat] — for map pin placement before polygons exist
  climate?: Climate;

  principalGrapes: string[];             // grape ids — LO3 grapes grown here per spec
  regionalGrapes: string[];              // grape ids — LO4 grapes grown here per spec

  labelTerms?: string[];                 // ids of label terms relevant to this region
  styleNotes?: string;                   // optional 1-2 sentence summary of the region's signature style (WSET phrasing where possible)
  geoJsonRef?: string;                   // path under /geojson, if a polygon is available
}

export interface LabelTerm {
  id: string;
  name: string;
  scope: { country?: string; region?: string };
  meaning: string;                       // verbatim or paraphrased from WSET
  examples?: string[];                   // example regions where it appears
}
