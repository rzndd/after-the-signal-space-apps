# Submission — After the Signal

> **NASA Space Apps Challenge 2026**  
> Challenge: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*  
> Team: Enrico Gaspar Rezende Campos; Alan Flávio de Albuquerque Ferreira; Luis Otavio Coelho de Azevedo  
> Event: Itabira, virtual participation. The project owner confirmed that all three listed team members are registered.

University reference: Federal University of Itajubá (UNIFEI). The footer displays the team and the university logo supplied by the project owner; this reference does not assert institutional sponsorship or endorsement.

This document describes the current **local source build**, not a verified deployment. The latest changes have not been published as part of this review.

## Submission fields

- **Project name:** After the Signal
- **Subtitle:** Stories of NASA's Silent Explorers
- **Existing demo address:** [sol404.vercel.app](https://sol404.vercel.app/) — verify/update the public deployment before submitting.
- **Challenge:** [Official challenge page](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=details).
- **Final source/repository URL:** not supplied or verified in this draft.
- **Slide-deck URL:** public hosting is still pending. A finished seven-slide English presentation exists locally as `After-the-Signal-Refined.pdf` and editable `After-the-Signal-Refined.pptx`; upload one publicly accessible demonstration and paste its link into the portal.

## Summary for the submission form

What remains after a spacecraft stops answering? After the Signal is an English-language educational web experience built around 17 NASA mission and hardware records. Visitors enter a fictional recovery terminal, explore documented equipment and encounter a simulated power failure after about 15 seconds. That interruption opens a chronological archive: short first-person scenes, terminal-style typing, official NASA imagery and a readable scientific record for each chapter.

The stories explain what the equipment did, why it stayed or stopped, and which discoveries remain useful. Imagined narration is clearly separated from mission facts. Free exploration offers Kids and Deep Dive reading modes, lunar and Martian maps, and destination records for asteroids and solar orbits. NASA/JPL Horizons supplies a dated trajectory estimate for Pioneer 10, not live spacecraft telemetry. Safe Mode removes visual effects. After preserving the archive, visitors can explore with unlimited energy and copy a mission report.

## Detailed description

### Educational purpose

The experience introduces school-age and casual space enthusiasts to the engineering and science behind equipment NASA left behind. It distinguishes planned disposal, completed experiments, power loss, damaged hardware and loss of communication. An inactive machine is not necessarily a failed mission.

First-person passages are imagined writing based on mission records, not spacecraft transcripts. Each mission combines those passages with facts, a documentary image, an explanation, explicit limits on interpretation and source links. Kids and Deep Dive offer different reading levels; their educational effectiveness has not yet been tested with students or teachers.

### The current experience

1. **Enter the terminal.** Boot offers Safe Mode before the experience starts. Audio consists of synthesized terminal effects, with a mute control; there is no speech-synthesis narration.
2. **Explore briefly.** The fictional power reserve expires after approximately 15 seconds. The IGNITE command protects a fictional local archive but cannot recharge the reserve. This battery and emergency are not NASA telemetry.
3. **Recover the stories.** Power loss leads to a chronological archive of **17 chapters / 51 short scenes**, ordered by the event described rather than launch date, from Surveyor 3 in 1967 to Ingenuity in 2024. Narrative text types onto the screen; click or Enter completes the current phrase. Automatic reading time begins after typing finishes, and users can pause or advance manually. Scientific passages appear complete. Photographs stay visible during reading; the recovered archive uses a monochrome display, with original-image links available.
4. **Read the evidence.** Each chapter has a documentary record explaining what the image and mission data support and what they cannot establish. There is no evidence-collection checklist or mandatory quiz.
5. **Choose the ending.** N preserves the archive and unlocks unlimited exploration. Y ends only the fictional session: a return button or reload restores access. Old persistent access blocks are recovered automatically. Progress is stored locally when browser storage is available.
6. **Explore or share.** Visitors can revisit all records, switch Kids/Deep Dive, use the surface flags and space-destination records, replay the recovered journey and copy an ASCII mission report. A manual-copy fallback is available if clipboard access fails. No report is posted or transmitted automatically.

### Mission and hardware coverage

There are **17 editorial records**, not a claim of exactly 17 individual physical objects: the lunar rover entry groups three vehicles, and ALSEP groups five stations.

| Record | Destination | Documented state shown in the app |
|---|---|---|
| Eagle (Apollo 11 descent stage) | The Moon | Parked on the Moon since July 1969 |
| Lunar Roving Vehicles (Apollo 15, 16, 17) | The Moon | Three rovers parked on the Moon since 1971–72 |
| Viking 1 Lander | Mars | Silent since November 1982, Chryse Planitia |
| Opportunity (MER-B) | Mars | Silent since June 10, 2018, Perseverance Valley |
| Ingenuity Mars Helicopter | Mars | Grounded since January 2024, Jezero Crater |
| Pioneer 10 | Outbound solar trajectory | Silent since 2003, drifting out of the solar system |
| Surveyor 3 | The Moon | Oceanus Procellarum · inactive |
| ALSEP scientific stations | The Moon | Apollo 12, 14, 15, 16 and 17 sites · inactive |
| Viking 2 Lander | Mars | Utopia Planitia · inactive |
| Pioneer 11 | Outbound solar-system trajectory | Outbound trajectory after Jupiter and Saturn flybys · inactive |
| Sojourner rover | Mars | Ares Vallis / Pathfinder site · inactive |
| NEAR Shoemaker | 433 Eros · asteroid surface | Surface of asteroid 433 Eros · inactive |
| Phoenix Mars Lander | Mars | Northern plains / Green Valley · inactive |
| Spirit rover | Mars | Gusev Crater / Home Plate · inactive |
| Kepler Space Telescope | Earth-trailing heliocentric orbit | Orbit around the Sun, trailing Earth · inactive |
| Dawn spacecraft | Ceres · unpowered orbit | Orbit around dwarf planet Ceres, in the asteroid belt · inactive |
| InSight Lander | Mars | Elysium Planitia · inactive |

Moon and Mars use official NASA surface mosaics with interactive flags. Mars displays the full longitude range, including the eastern sites of Viking 2, InSight and Spirit. Five ALSEP locations are represented. On narrow maps, displaced touch targets use connector lines to retain their geographic references.

Dawn, NEAR, Kepler and Pioneer 11 have destination records rather than invented current coordinates. Dawn is at Ceres, NEAR is on Eros, Kepler follows an Earth-trailing heliocentric orbit, and Pioneer 11 is outbound. Only Pioneer 10 receives the displayed Pioneer 10 Horizons calculation. The curved line in its space illustration is explicitly not a plotted trajectory or scale map; the N49 background is not the probe's actual surroundings.

## NASA data and its use

| Resource | Actual use | Important limitation |
|---|---|---|
| [NSSDCA spacecraft catalog](https://nssdc.gsfc.nasa.gov/) and individual NASA mission pages | Curated mission parameters, dates, operational histories, destinations and interpretation of why hardware remained. These inform cards, stories and technical records. | This is curated reference research, not a live NSSDCA feed or a claim that every mission was checked exclusively in that catalog. |
| [NASA Image and Video Library API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) | Selection and attribution of documentary images. Curated covers and recovery images are downloaded into the project so they load without an initial API round trip. Additional gallery requests can use the image API/proxy. | Not every image loads live from NASA. Photographs, mosaics, maps, launch images and pre-mission images are labelled according to their roles. |
| [NASA/JPL Horizons](https://ssd-api.jpl.nasa.gov/doc/horizons.html) | Pioneer 10 vectors are parsed into Sun-relative range, speed and one-way Sun–probe light time, with a model reference date/time. The interface also calculates an Earth–Mars light-time context value. | These are model results for a stated epoch, not received radio signals. The Pioneer display does not extrapolate an endlessly ticking distance from a measured velocity. |
| [NASA InSight weather API documentation](https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf) | Archived available sol temperature and capture date in the optional Mars context panel. | This is an archive, not present-day weather. The three-second client deadline falls back to a labelled Mars climate reference; the delay fallback is a labelled historical InSight example. |
| [NASA SVS CGI Moon Kit](https://svs.gsfc.nasa.gov/4720/) and [NASA Mars Trek](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars) | Official Moon/LRO and Mars/Viking mosaics behind the interactive flags. | Mosaics are not current close-up photographs of every piece of equipment. |

The NSSDCA catalog is named in the challenge resource material supplied for this project. Demonstrate its use in the mission records and identify the qualifying resource explicitly in the submission's NASA Data field; do not claim that a bibliography by itself guarantees eligibility. The official Resources tab could not be fully retrieved during this review, so the final resource selection should be checked on the submission portal.

### Mission references

Each record also exposes its sources inside the application.

- **Eagle (Apollo 11 descent stage):** [NSSDCA – Apollo 11 Lunar Module](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C).
- **Lunar Roving Vehicles (Apollo 15, 16, 17):** [NASA – Apollo Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html).
- **Viking 1 Lander:** [NASA Science – Viking 1](https://science.nasa.gov/mission/viking-1/).
- **Opportunity (MER-B):** [NSSDCA – Mars Exploration Rover B](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A).
- **Ingenuity Mars Helicopter:** [NASA – Ingenuity Mars Helicopter](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/).
- **Pioneer 10:** [NSSDCA – Pioneer 10](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A).
- **Surveyor 3:** [NASA mission record](https://science.nasa.gov/mission/surveyor-3/).
- **ALSEP scientific stations:** [NASA mission record](https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html).
- **Viking 2 Lander:** [NASA mission record](https://science.nasa.gov/mission/viking-2/).
- **Pioneer 11:** [NASA mission record](https://science.nasa.gov/mission/pioneer-11/).
- **Sojourner rover:** [NASA mission record](https://science.nasa.gov/mission/mars-pathfinder/).
- **NEAR Shoemaker:** [NASA mission record](https://science.nasa.gov/mission/near-shoemaker/).
- **Phoenix Mars Lander:** [NASA mission record](https://science.nasa.gov/mission/mars-phoenix/).
- **Spirit rover:** [NASA mission record](https://science.nasa.gov/mission/mer-spirit/).
- **Kepler Space Telescope:** [NASA mission record](https://science.nasa.gov/mission/kepler/).
- **Dawn spacecraft:** [NASA mission record](https://science.nasa.gov/mission/dawn/toolkit/end-of-mission/).
- **InSight Lander:** [NASA mission record](https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/).

## Images, maps and third-party credits

### Main cover and recovered document for each record

| Record | Cover NASA ID | Recovered document NASA ID |
|---|---|---|
| Eagle (Apollo 11 descent stage) | [as11-40-5902](https://images.nasa.gov/details/as11-40-5902) | [PIA12909](https://images.nasa.gov/details/PIA12909) |
| Lunar Roving Vehicles (Apollo 15, 16, 17) | [as15-85-11451](https://images.nasa.gov/details/as15-85-11451) | [S72-00147](https://images.nasa.gov/details/S72-00147) |
| Viking 1 Lander | [PIA09703](https://images.nasa.gov/details/PIA09703) | [PIA00381](https://images.nasa.gov/details/PIA00381) |
| Opportunity (MER-B) | [PIA17759](https://images.nasa.gov/details/PIA17759) | [PIA22929](https://images.nasa.gov/details/PIA22929) |
| Ingenuity Mars Helicopter | [PIA23882](https://images.nasa.gov/details/PIA23882) | [PIA26243](https://images.nasa.gov/details/PIA26243) |
| Pioneer 10 | [ARC-1973-AC73-9019](https://images.nasa.gov/details/ARC-1973-AC73-9019) | [ARC-1972-AC72-1338](https://images.nasa.gov/details/ARC-1972-AC72-1338) |
| Surveyor 3 | [as12-48-7121](https://images.nasa.gov/details/as12-48-7121) | [as12-48-7110](https://images.nasa.gov/details/as12-48-7110) |
| ALSEP scientific stations | [as12-47-6918](https://images.nasa.gov/details/as12-47-6918) | [as12-46-6813](https://images.nasa.gov/details/as12-46-6813) |
| Viking 2 Lander | [PIA00573](https://images.nasa.gov/details/PIA00573) | [PIA00396](https://images.nasa.gov/details/PIA00396) |
| Pioneer 11 | [9139575](https://images.nasa.gov/details/9139575) | [ARC-1972-AC72-1338](https://images.nasa.gov/details/ARC-1972-AC72-1338) |
| Sojourner rover | [PIA01551](https://images.nasa.gov/details/PIA01551) | [PIA01121](https://images.nasa.gov/details/PIA01121) |
| NEAR Shoemaker | [9701593](https://images.nasa.gov/details/9701593) | [PIA02900](https://images.nasa.gov/details/PIA02900) |
| Phoenix Mars Lander | [KSC-07PD-1090](https://images.nasa.gov/details/KSC-07PD-1090) | [PIA11379](https://images.nasa.gov/details/PIA11379) |
| Spirit rover | [PIA16442](https://images.nasa.gov/details/PIA16442) | [PIA05581](https://images.nasa.gov/details/PIA05581) |
| Kepler Space Telescope | [PIA11733](https://images.nasa.gov/details/PIA11733) | [PIA11188](https://images.nasa.gov/details/PIA11188) |
| Dawn spacecraft | [KSC-07PD-0864](https://images.nasa.gov/details/KSC-07PD-0864) | [PIA20309](https://images.nasa.gov/details/PIA20309) |
| InSight Lander | [PIA22876](https://images.nasa.gov/details/PIA22876) | [PIA25287](https://images.nasa.gov/details/PIA25287) |

Additional gallery/supporting image IDs used by the current data model are included in the full inventory below. An ID appearing in the interface does not imply that its image depicts the final signal or shows the spacecraft at its present location.

**Current referenced NASA image-ID inventory (40 unique IDs, including the illustrative N49 background):**

`0301627`, `9139575`, `9701593`, `ARC-1972-AC72-1338`, `ARC-1972-AC72-2135`, `ARC-1973-AC73-9019`, `KSC-07PD-0864`, `KSC-07PD-1090`, `PIA00381`, `PIA00396`, `PIA00573`, `PIA01121`, `PIA01551`, `PIA02900`, `PIA05581`, `PIA09703`, `PIA11188`, `PIA11379`, `PIA11733`, `PIA12909`, `PIA16442`, `PIA17759`, `PIA20285`, `PIA20309`, `PIA22876`, `PIA22929`, `PIA23178`, `PIA23882`, `PIA25080`, `PIA25287`, `PIA26243`, `PIA26311`, `S72-00147`, `as11-40-5902`, `as12-46-6813`, `as12-47-6918`, `as12-48-7110`, `as12-48-7121`, `as15-85-11451`, `as17-137-20979`.

The main image catalog is in `src/data/imageCatalog.ts`, supporting media in `src/data/sceneMedia.js`, and recovered documents in `src/data/lastRecords.ts`. Download provenance for the expansion is in `public/media/machines/expansion-sources.json`; map provenance is in `public/media/maps/SOURCES.md`.

### Hero asset — not a NASA photograph

The rotating lunar diorama is an artist-made model rendered into a looping video with a static poster and a smaller mobile video. It is illustrative, not to scale, and it does not run a Three.js/WebGL scene in the visitor's browser.

Required credit: This work is based on [The Moon Landing V.2](https://sketchfab.com/3d-models/the-moon-landing-v2-7e310f6267e54c9da7a19b88d0b68fb1) by [MisterH](https://sketchfab.com/TGVMisterH), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Adaptation: rendered into compressed looping video and composited with the page background. The credit is shown beside the hero and recorded in `public/media/CREDITS.txt`.

No generative image model was used to create the NASA documentary photographs. Some interface artwork, flags, curves and visual effects are implemented in AI-assisted code; they are not NASA scientific products. No NASA logo is used as the project's identity. Historical insignia or flags can naturally appear inside credited documentary photographs. The project is independent and is not endorsed by NASA.

## Technical implementation

- **React 19, Vite 8 and TypeScript 6**, with existing JSX/JavaScript modules alongside typed components.
- **CSS Modules**, a black/amber CRT terminal identity and system monospace typography. Legacy bundled Baloo 2 and Atkinson font assets remain in the repository; they are not the current global terminal typefaces.
- **Native browser APIs** for fetch/cancellation, terminal sound synthesis, clipboard, visibility and media preferences. Speech synthesis was removed.
- **Four Vercel function routes:** `/api/horizons`, `/api/nasa-images`, `/api/mars-weather` and `/api/comms-delay`. Vite development middleware serves the calculation/archive handlers locally and proxies the image search route to NASA. Static Vite preview does not execute the Vercel functions. Core reading uses local assets; optional NASA requests have fallbacks.
- **Motion implemented with React/CSS**, without adding GSAP, Motion or Three.js dependencies. Pixel-style image recovery, typewriter text, short scene/world transitions and tactile command states support the narrative. Safe Mode and reduced-motion preferences suppress effects; Safe Mode also displays text immediately.
- **Device-local persistence** via localStorage/sessionStorage for reading progress, recovered chapters and preferences. No application account, analytics SDK or user-posting service is implemented. Hosting and external NASA requests have their own network behavior; this is not a claim that no server logs exist.

## AI disclosure and human contribution

The source archive and production build now include structured [AI provenance](public/ai-disclosure.json) and a [reference inventory](public/references.json), linked from the HTML metadata and visible footer. [AI-USE.md](AI-USE.md) includes the complete English text to paste into the official AI-use field. The metadata covers AI-assisted code, curated/editorial data and synthesized terminal audio, and distinguishes original NASA imagery, the artist-made hero and the supplied UNIFEI logo. Exact model versions were not consistently recorded.

### Other resources field

Use the links and actual-use descriptions in [REFERENCES.md](REFERENCES.md), including framework/tooling, bundled fonts and licences, the hero model and author, AI tools, and design references. The referenced design sites inspired the implementation; the project does not claim to have installed or copied their animation packages. Public request outcomes are recorded in [REFERENCES-CHECK.md](REFERENCES-CHECK.md). A timeout or access restriction is not proof that a citation is invalid.

**AI tools used:** Claude by Anthropic and OpenAI Codex for code, CSS, narrative drafting, source/image selection assistance, debugging and revision. AI assistance also produced interface graphics and animation code. First-person narratives and terminal events are fictional editorial devices, not authentic spacecraft messages. Terminal sound effects are synthesized, not recordings received from spacecraft.

The human creator supplied project direction, assets, preferences and iterative feedback. AI-assisted implementation was iterated through code checks and source-based revisions. Mission facts reference NASA catalog, mission and image records; the app distinguishes evidence, interpretation and uncertainty. This does not constitute independent expert validation. The third-party hero model has its own author and licence, separate from the AI coding assistance.

## Validation and limits

The production build (including TypeScript), ESLint and **58 automated tests passed again in the final documentation review**. Browser checks from the implementation rounds covered the 17 records in Kids/Deep Dive, the full recovered journey, report generation, ending/reload recovery, keyboard interaction and mobile/desktop layouts; those manual checks were not repeated wholesale in the documentation-only pass. All 51 recovered scenes were checked for text fit at 320 px width; manual checks also used 375 px and 1440 px widths. Current validation evidence is recorded in [QA-SISTEMAS.md](QA-SISTEMAS.md).

Accessibility features include semantic controls, image descriptions, keyboard navigation, focus management, at least 44 px map controls, Safe Mode, reduced-motion handling and a complete screen-reader text alternative to typing. These are implemented features and specific checks, **not a WCAG certification or a claim of exhaustive assistive-technology testing**. No educational study with students or teachers has been completed, and no constant frame-rate guarantee is claimed.

The public deployment was not updated or successfully verified during this review. Missing network data must be presented as a stored estimate, archive or reference example, as labelled in the interface.

## Seven-slide presentation outline

1. **Title:** After the Signal — Stories of NASA's Silent Explorers. List all three team members and the virtual Itabira event.
2. **Problem:** When equipment falls silent, its engineering choices and scientific records can disappear from public attention.
3. **Experience:** Show boot, the clearly fictional power failure, terminal typing and a NASA photo. Explain the short chronological stories and optional reading controls.
4. **Coverage:** Show 17 records, the Moon/Mars flags and the separate small-body/solar-orbit destinations. Mention Kids and Deep Dive.
5. **NASA data:** Demonstrate a mission source, a documentary record and the dated Pioneer 10 Horizons calculation. Distinguish measured observations, archives and models.
6. **Implementation and inclusion:** React/Vite/CSS Modules, locally hosted imagery, Safe Mode, keyboard controls and reload recovery. Credit the hero model and disclose Claude/OpenAI Codex assistance.
7. **Try it:** Verified public demo URL and source URL, plus project takeaway: the hardware stopped answering; its discoveries remain.

The finished refined presentation has seven slides including cover and closing slide, using an English summary, NASA imagery, the current archive scene, source use, Kids/Deep Dive excerpts and team/UNIFEI credits. The outline above is background planning. The local PDF/PowerPoint are complete; their public sharing link is still pending. The supplied participant guide limits the demonstration to seven slides or a 30-second video.

## Items to finish before submitting

- Publish the reviewed local build and verify the actual public demo. Do not submit the previous build while describing features it does not contain.
- Supply a working demo video/deck link and a final source/project link. List NASA Data, other resources, the model licence and AI/SI use in the portal's designated fields; see the [GO Team submission clarification](https://github.com/nasa/spaceapps/discussions/1858).
- All three listed team members are registered, as confirmed by the project owner. The supplied Itabira participant guide permits teams of one to six people. Registration does not itself confirm final project submission; no eligibility outcome is claimed here.
- Confirm the qualifying challenge-listed NASA resource in the live portal; the official challenge pages returned retrieval errors in this review.
- Decide and publish a source licence before describing the project as open source. No project-level licence file was found in the local root; third-party assets retain their own terms.
