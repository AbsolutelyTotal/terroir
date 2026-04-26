# terroir

Interactive grape-centric study map for the **WSET Level 2 Award in Wines**. Pick a grape variety to highlight every region in scope; pick a region to see what's grown there and how the grape expresses on that site. Built as a personal study tool to memorise grape ↔ region pairings (~62% of the L2 exam).

## Run locally

No build step. Static files only.

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Stack

- **Vanilla HTML / CSS / JS** in a single `index.html`.
- **Leaflet** for the map (loaded via CDN).
- **CartoDB Dark Matter** tiles for the basemap.
- **Hand-curated JSON** as the data store — no DB, no build, no framework.

## Data files

All under `data/`:

| File | Count | What it is |
| --- | --- | --- |
| `grapes.json` | 33 | Grape varieties in WSET L2 scope (LO3 principal, LO4 regional, LO5 sparkling) |
| `regions.json` | 125 | Countries, regions, sub-regions, and appellations in scope |
| `labelTerms.json` | 45 | Label-vocabulary terms (AOC, Riserva, Fino, Brut, etc.) |
| `types.ts` | — | TypeScript schema documenting the data shape |

`types.ts` is reference documentation, not compiled. The JSON files are the source of truth.

### Cross-references

- A grape's `regions[]` is the canonical list of GIs it's grown in.
- A region's `principalGrapes[]` / `regionalGrapes[]` lists grapes by syllabus category.
- A grape's `styleByRegion[<regionId>]` gives the per-pairing style note (e.g. Cabernet Sauvignon in Pauillac vs. in Coonawarra). This is where most of the exam-relevant content lives.
- A region's `labelTerms[]` references entries in `labelTerms.json`.

When adding a new grape or region, update **both sides** so the cross-links stay intact.

## Sources & caveats

- Primary source: WSET Level 2 official spec and lesson PDFs (L2E01–L2E07).
- Some self-study grapes (e.g. Gewürztraminer, Viognier, Pinotage) were drafted from <https://wset.luksow.com/> and verified against the textbook; minor corrections have been folded in.
- A few fortified regions (Sherry, Douro/Port) describe their grapes in `styleNotes` rather than seeding them as standalone grape entries, since Palomino / Touriga Nacional etc. aren't in the LO3/LO4 grape lists.

## Features

- **Filter composably** by grape *and* country — the map shows only regions matching both.
- **Climate-coloured pins**: cool / moderate / warm.
- **Right panel** shows full grape characteristics, primary aromas, ripeness ladder, winemaking notes, regions in scope, and per-region style notes.
- **Region detail** lists every grape grown there with the per-pairing style note.
- **Country detail** rolls up all regions in that country plus the principal/regional grapes.

## Status

Reference mode only — no quiz mode yet.
