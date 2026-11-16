# After the Signal — current QA record

Current local source, 15 November 2026. This is a local readiness record, not evidence of a new public deployment or certification. The previous mixed QA log is retained in [docs/history/QA-SISTEMAS-previous.md](docs/history/QA-SISTEMAS-previous.md).

## Automated validation

Deep-space theme follow-up: computed browser backgrounds were `rgb(6, 9, 16)` with the shared radial-gradient field in boot, hero, footer/source/team panels, signal loss, recovered mission record and the Apollo 11 dialog. No visible element reported a pure-black or `#010101` background in those checks or in the Moon/Mars/deep-space exploration worlds. Apollo 11 at 320 px and footer/exploration at 1440 px had no document horizontal overflow. These are specific checks, not an exhaustive WCAG certification. Static checks cover the remaining fullscreen styles, including prompt, BIOS, epilogue and revoked-session states.

Re-run during the final documentation review:

- `npm run build`: TypeScript and Vite production build pass.
- `npm run lint`: ESLint, including the strict React hooks rules, passes.
- `npm test`: **58 tests pass, zero failures**.

The tests cover mission/chapter/image consistency, the complete journey and reward conditions, NASA image/proxy behaviour, Horizons units and parsing, optional telemetry deadlines/fallbacks, map bounds/touch separation, narrative progress, terminal typing/reveal/cancellation and ending/access recovery. The old generic battery arithmetic test uses an explicit sample interval; the production duration is separately tested as **15,000ms total**, not 15 seconds per percentage point.

## Browser checks completed in the implementation rounds

These observations were made in the integrated Chromium browser during the preceding implementation work. They are retained as actual results; the documentation-only pass does not claim to have repeated the entire manual suite.

- All 17 records opened in both Kids and Deep Dive, with different reading text. NASA images loaded locally and documentary records included credits/source links.
- The 17-chapter journey reached its epilogue and produced a report containing all 17 entries. Report copying was confirmed in a browser session.
- All 51 recovered scenes were checked at **320px width**: full text fit above the footer, without horizontal page overflow, in Safe Mode. Other manual checks used 375px and 1440px widths.
- Typewriter mode showed partial narrative text beside the photograph. Enter/click completed that same phrase without skipping it. Scientific passages appeared complete. Pause prevented automatic advancement. Autoplay waited for typing and the reading window.
- Safe Mode showed full text immediately, with no running scene animations; world transitions and the Pioneer pulse were also disabled. Normal mode showed world/scene transitions and an outbound illustrative pulse.
- Eight Mars equipment markers and five ALSEP sites were accessible; 44px map targets and their separation were checked. Mars shows its complete global mosaic.
- The ~15-second normal prologue was observed independently of the IGNITE result. A correct command did not recharge the reserve. Accelerated development servers were used for repeated journey checks and were not treated as production timing measurements.
- A browser previously blocked by an old stored ending opened the boot screen again. Y's ending offered RETURN TO SITE; that button and a reload both restored entry. A different tab was not blocked. Lowercase `n` confirmed the peaceful ending; after refresh, boot and all 17 cards remained available with unlimited energy.
- No console errors/warnings were captured in the final normal/Safe Mode and access-recovery browser sessions.
- Real local NASA/JPL requests previously returned an InSight archived sol and an Earth–Mars model delay. Labels retained their archive/model dates. Pure tests also cover network, HTTP and malformed-data failures.

## Scientific and editorial boundaries

- First-person narration, BIOS messages, battery emergencies and the epilogue clock are fiction. They are not spacecraft transmissions or NASA telemetry. There is no synthesized spoken narration.
- Pioneer 10 values are dated Sun-relative model calculations. The curved space illustration is not a plotted trajectory; its N49 background is unrelated to the probe's actual surroundings.
- The InSight weather panel is archival. Weather/delay fallbacks are labelled climate or historical references, not invented current observations.
- Dawn is at Ceres, NEAR on Eros and Kepler in a solar orbit; they are not placed on the Mars map or assigned Pioneer 10's distance.
- ALSEP groups five stations, and lunar rovers group three vehicles. The 17 records are not a count of 17 individual objects.
- Photographs/mosaics/maps and pre-mission/launch images are labelled; a context image is not claimed to be the final received image. The hero is a credited third-party diorama video.

## Not established by these checks

- No educational study with children or teachers has been run.
- No comprehensive screen-reader, physical-device, cross-browser or WCAG certification audit has been completed.
- No constant 60FPS, Lighthouse score or load-time guarantee is claimed.
- The newest source has not been published or verified at the public Vercel URL in this review. A deployed end-to-end check, official submission links and event/team confirmation remain outstanding.

See [README.md](README.md) for the current run instructions and [SUBMISSION.md](SUBMISSION.md) for the external submission items.
