# After the Signal — current change summary

This is the current local version summary. It does not mean a production deployment has been made. The initial file-only change list is retained in [docs/history/CHANGES-previous.md](docs/history/CHANGES-previous.md).

## Content and NASA records

### Unified space surface

- Replaced residual near-black and pure-black interface surfaces with the shared `#060910` base. All viewport states and major sections use the same static white/amber radial-gradient star texture.
- Removed the hero's separate blue SVG backdrop and keyed/composited the old blue video background into the shared space colour, including both video sizes and the poster. Artist attribution remains intact.
- Unified footer/source/team panels, headers, map containers, loaders and modal readers. The override changes accent tokens instead of filtering the entire page and changing background/image colours.

- Expanded from six exploration records/seven recovered chapters to **17 records and 17 chapters / 51 scenes**.
- Added ALSEP, Surveyor 3, Sojourner, Spirit, Viking 2, Phoenix, InSight, Dawn, NEAR Shoemaker, Pioneer 11 and Kepler throughout cards, reading modes, documentary records, chronology and report generation.
- Downloaded/credited official NASA images for the expansion; curated primary images load locally. The submission contains the current 40-ID referenced inventory and source links.
- Expanded Mars to its full global mosaic and separated crowded touch targets with geographic leader lines. Represented five ALSEP locations. Kept small-body/solar-orbit destinations separate from Mars.

## Narrative and interaction

- Changed the identity to **After the Signal** and kept the interface in English.
- Implemented the approximately 15-second fictional power-loss prologue and chronological archive, with a non-recharging IGNITE command.
- Replaced the mandatory evidence checklist/quiz with readable NASA documentary records and scientific interpretation limits.
- Added terminal typing, punctuation pauses, reveal-before-next behaviour, reading-time gating, pause/manual controls, pixel-style photo recovery and short scene/world transitions.
- Preserved the Pioneer archive/photo composition and added an explicitly illustrative space line and outbound pulse. Retained dated JPL values separately.
- Removed speech synthesis. Terminal sound effects can still be muted separately.
- Added Safe Mode, reduced-motion handling and full screen-reader alternatives to typed text.
- Added a copyable 17-record mission report with manual-copy fallback.

## Access and engineering

- N preserves completion and unlimited exploration after refresh.
- The fictional 404 cannot permanently block entry. RETURN TO SITE and reload restore access, including migration of older stored dead endings. Y no longer clears a previous completed-archive achievement or blocks other tabs.
- Four API routes serve images, Pioneer 10 vectors, archived Mars temperatures and Earth–Mars model delay. Optional weather/delay calls have three-second deadlines and attributed fallbacks.
- The hero uses a pre-rendered artist-model video/poster, with smaller mobile media and reduced-motion/data-saving handling. No browser WebGL scene or Three.js dependency was added.
- Motion is implemented in React/CSS Modules; GSAP and Motion are reference inspirations, not installed dependencies.

## Documentation and validation

- Updated README, SUBMISSION, QA, media/map credits and the unexecuted pedagogical plan.
- Marked prior audits/stage reports as historical so their former counts and instructions cannot be mistaken for the current release.
- Current production build/TypeScript, ESLint and **58 tests pass**. Manual evidence and limitations are documented in QA-SISTEMAS.md.
- Public deployment, final demo/source links, a project-level licence and registration/eligibility confirmation remain external submission tasks.
