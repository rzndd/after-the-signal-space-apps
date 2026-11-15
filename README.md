# After the Signal

An English-language educational terminal experience about NASA equipment that stopped answering, stayed behind or completed its work. Built for NASA Space Apps Challenge 2026, **Abandoned but not Forgotten**. Independent project; not endorsed by NASA.

This README describes the current local source. The public address is [sol404.vercel.app](https://sol404.vercel.app/); the latest local changes have not been deployed or verified there during this review.

## Team

- Enrico Gaspar Rezende Campos
- Alan Flávio de Albuquerque Ferreira
- Luis Otavio Coelho de Azevedo

The project owner confirmed that all three team members are registered for the event.

The footer lists the complete team and references the Federal University of Itajubá (UNIFEI), using the university logo supplied by the project owner.

## What is implemented

- **17 mission/hardware records**, including grouped lunar rovers and five ALSEP stations; **17 chronological chapters and 51 short scenes**.
- A fictional boot and approximately **15-second total power reserve**. IGNITE does not recharge the battery. Power loss opens the recovered archive.
- Terminal-style narrative typing with punctuation pauses. Click/Enter reveals a phrase before advancing; autoplay waits for typing to finish. Scientific passages appear complete. Pause and manual navigation are available.
- Locally hosted, credited NASA imagery; a brief pixel-style recovery reveal; short chapter/world transitions and tactile command controls. Exploration imagery is coloured; recovered story imagery is monochrome, with original-image links.
- Kids and Deep Dive reading modes, source-linked documentary records, scientific explanations and limits on interpretation. No collection checklist or compulsory quiz.
- Official Moon and full-globe Mars mosaics with interactive flags and 44px touch targets. Five ALSEP sites are represented. Connectors retain geographic references when crowded targets are separated.
- Separate destinations for Dawn at Ceres, NEAR on Eros, Kepler in an Earth-trailing solar orbit and outbound Pioneer 11. Their positions are not fabricated on the Mars map.
- A dated NASA/JPL Horizons estimate for Pioneer 10. Its illustrated space curve and outbound pulse are not a measured flight path or a live communication signal.
- N preserves the archive and unlocks unlimited exploration. Y ends only the fictional session; **RETURN TO SITE or reload restores access**. Older persistent blocks are recovered on entry.
- A clipboard mission report with manual-copy fallback, reading progress stored on the device, and replay/restart controls.
- Safe Mode and reduced-motion handling. Safe Mode removes CRT/glitch effects and displays text immediately. Terminal sounds can be muted separately. **No speech synthesis.**

The 17 entries cover hardware families as well as individual spacecraft; they do not represent exactly 17 physical objects. The first-person voices and emergency events are imagined, not spacecraft transcripts or NASA telemetry.

## Run locally

The current checks used **Node.js 24** and npm. No NASA key is required by the current implementation; the optional InSight request uses NASA's DEMO_KEY and may fall back when unavailable.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Development serves the three calculation/archive handlers through Vite middleware and forwards `/api/nasa-images` to the NASA image search API.

```sh
npm run lint
npm test
npm run build
npm run preview
```

`build` runs TypeScript and produces `dist/`. `preview` serves the static production bundle: **it does not run the four Vercel functions**. Use `dev` for local integration checks; static preview can use the implemented direct-request/reference fallbacks for optional data.

`VITE_QA_FAST_PROLOGUE=true` is an optional development-only test flag. It accelerates the prologue on isolated QA servers; production builds use the normal approximately 15-second reserve. Do not use accelerated QA timings as evidence of production pacing.

## NASA integrations and fallbacks

AI assistance and asset provenance are disclosed in [AI-USE.md](AI-USE.md), [public/ai-disclosure.json](public/ai-disclosure.json) and the HTML metadata. The footer links to the deployed JSON disclosure and source inventory. The complete active references are in [REFERENCES.md](REFERENCES.md) and [public/references.json](public/references.json); public-request results are in [REFERENCES-CHECK.md](REFERENCES-CHECK.md). Regenerate and check them with `node --experimental-strip-types scripts/audit-references.mjs --online`.

| Route | Purpose | Interpretation |
|---|---|---|
| `/api/horizons` | Pioneer 10 solar range, speed and Sun–probe light time | Calculation at a stated epoch, not live radio tracking; stored estimate if unavailable. The client bounds the proxy/direct attempt to eight seconds. |
| `/api/nasa-images` | NASA Image and Video Library search | Curated local covers/recovery images avoid an initial API request. Additional gallery items can resolve through the API and keep retry/error states. |
| `/api/mars-weather` | Available archived InSight sol temperatures | Historical capture dates are shown; this is not today's weather. |
| `/api/comms-delay` | Earth–Mars one-way light-time model | Distinct from Pioneer 10 distance. |

The weather/delay client requests have a three-second deadline, including JSON decoding. Failures use labelled references: a Mars climate example and an InSight-landing-era communication-delay example. They are not presented as current measurements.

Mission parameters, dates and status explanations are curated from NSSDCA and NASA mission records. Individual references are linked in the UI and in [SUBMISSION.md](SUBMISSION.md).

## Build and deployment

The project uses React 19, Vite 8, TypeScript 6 and CSS Modules. Some existing components/data use JSX/JavaScript. The terminal uses system monospace fonts. Motion is implemented in React/CSS; **GSAP, Motion and Three.js are not installed**.

Vercel is the intended deployment target. Its `api/` directory contains four self-contained function routes. A deployment must include the repository source and these functions, rather than only uploading `dist/`. Confirm routing and all four endpoints in the actual deployed environment before submitting the public demo. No publication is performed by the documented local validation commands.

## Data, imagery and credits

- [NASA Image and Video Library](https://images.nasa.gov/): documentary images, mosaics and maps. Image classification, credit and original-record links are retained. Not every image is a photograph of the equipment in its final location.
- [NASA NSSDCA](https://nssdc.gsfc.nasa.gov/) and individual NASA mission pages: curated mission facts.
- [NASA/JPL Horizons](https://ssd-api.jpl.nasa.gov/doc/horizons.html): dated trajectory/light-time calculations.
- [Map provenance](public/media/maps/SOURCES.md) and [expansion-image download provenance](public/media/machines/expansion-sources.json).
- **Hero exception:** the lunar diorama is an artist-made model rendered to looping video/poster, not a NASA photograph or a browser-rendered 3D scene. [The Moon Landing V.2](https://sketchfab.com/3d-models/the-moon-landing-v2-7e310f6267e54c9da7a19b88d0b68fb1) by [MisterH](https://sketchfab.com/TGVMisterH), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Adapted through rendering, compression and compositing; attribution is visible beside it. See [CREDITS.txt](public/media/CREDITS.txt).
- Legacy bundled Baloo 2 and Atkinson Hyperlegible Next fonts have licence files in `public/fonts/`; they are not the current global terminal typefaces.
- AI assistance: **Claude by Anthropic and OpenAI Codex** for code, writing, debugging and revisions. Interface graphics/effects use AI-assisted code. Documentary NASA photos were not generated by an image model. No NASA endorsement is implied.

No project-level source licence has been selected. Do not describe the repository as open source until an appropriate licence is supplied. Third-party assets retain their own credits and terms.

## Local storage and access

The app stores reading progress, recovery progress, preferences and completion on the device when browser storage is available. No application account, analytics SDK or automatic report-posting service is implemented. Hosting and external NASA requests still have their own network/logging behaviour.

The fictional ending is never an authentication or access-control mechanism. A saved `dead` ending from an older build is cleared on entry, and its expired prologue clock is reset. Existing recovered records are retained. RETURN TO SITE also reopens the terminal. N's completed archive remains available after refresh.

## Validation and documentation

The current local build, TypeScript, ESLint and **58 automated tests pass**. Detailed evidence and limits are in [QA-SISTEMAS.md](QA-SISTEMAS.md). Browser checks from the implementation rounds covered both reading modes for all 17 records, the journey, endings/reload, and mobile/desktop layouts. All 51 scenes were checked for text fit at 320px width.

- [SUBMISSION.md](SUBMISSION.md): current submission draft, source inventory, AI/model credits, seven-slide outline and outstanding submission items.
- [CHANGES.md](CHANGES.md): current change summary.
- [PEDAGOGICAL-TEST-PLAN.md](PEDAGOGICAL-TEST-PLAN.md): proposed student/teacher evaluation, **not completed research**.
- `AUDIT.md`, `DESIGN-REVIEW.md` and `STAGES-*.md`: explicitly marked historical snapshots. They describe earlier iterations and must not be used as current setup instructions or acceptance evidence. Prior QA/file lists are retained in `docs/history/`.

Accessibility features and specific browser checks do not constitute WCAG certification. No student/teacher study or guaranteed frame-rate benchmark has been completed. Publication, demo/source links, project licence and final submission still need completion or confirmation; see the final section of SUBMISSION.md.
