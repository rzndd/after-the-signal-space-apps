import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { machines } from '../src/data/machines.ts'
import { sceneMedia } from '../src/data/sceneMedia.js'
import { lastRecords } from '../src/data/lastRecords.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const images = new Map()
function addImage(id, data) {
  if (!id) throw new Error('Missing NASA image ID')
  const current = images.get(id) ?? { nasaId: id, url: 'https://images.nasa.gov/details/' + id, localFiles: [], uses: [] }
  if (data.localFile && !current.localFiles.includes(data.localFile)) current.localFiles.push(data.localFile)
  current.uses.push({ mission: data.mission, role: data.role, label: data.label, credit: data.credit ?? null })
  images.set(id, current)
}
for (const m of machines) {
  addImage(m.cover.nasaId, {mission:m.id, role:'cover', label:m.cover.label, credit:m.cover.credit, localFile:m.cover.localSrc && 'public' + m.cover.localSrc})
  for (const photo of m.images) addImage(photo.nasaId, {mission:m.id,role:'gallery',label:photo.label,credit:photo.credit,localFile:photo.localSrc && 'public' + photo.localSrc})
  const scene = sceneMedia[m.id]
  if (scene) addImage(scene.source.split('/').pop(), {mission:m.id,role:'recovery scene',label:scene.caption,credit:scene.kind,localFile:'public'+scene.src})
  const record = lastRecords[m.id]
  if (record) addImage(record.image.source.split('/').pop(), {mission:m.id,role:'documentary record',label:record.image.caption,credit:record.image.credit,localFile:'public'+record.image.src})
}
addImage('0301627', {mission:'pioneer-10',role:'illustrative background',label:'Hubble N49 composite, not the surroundings of Pioneer 10',credit:'NASA/MSFC (NASA Library record 0301627)',localFile:'public/media/maps/deep-hubble.jpg'})

const nasaResources = [
  {name:'NSSDCA',url:'https://nssdc.gsfc.nasa.gov/',use:'Curated spacecraft and mission history. A challenge-listed resource in the challenge text supplied by the project owner.'},
  {name:'NASA Image and Video Library API',url:'https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf',use:'Image selection, image identifiers, captions and attribution. Local documentary assets avoid initial API delays.'},
  {name:'JPL Horizons API',url:'https://ssd-api.jpl.nasa.gov/doc/horizons.html',use:'Dated trajectory and light-time model calculations. Not live radio telemetry.'},
  {name:'InSight weather API documentation',url:'https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf',use:'Optional archival Mars weather feed. Unavailability triggers labelled reference data.'},
  {name:'NASA SVS CGI Moon Kit',url:'https://svs.gsfc.nasa.gov/4720/',use:'LRO/LROC Moon mosaic behind interactive flags.'},
  {name:'NASA Mars Trek',url:'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars',use:'NASA/USGS Viking MDIM 2.1 global Mars mosaic.'},
  {name:'Mars map capabilities',url:'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/WMTSCapabilities.xml',use:'Provenance and geographic tile coverage of the Mars background.'},
  {name:'NASA images and media guidance',url:'https://www.nasa.gov/nasa-brand-center/images-and-media/',use:'Attribution and third-party rights guidance. NASA endorsement is not claimed.'},
]
const otherResources = [
  {name:'The Moon Landing V.2',url:'https://sketchfab.com/3d-models/the-moon-landing-v2-7e310f6267e54c9da7a19b88d0b68fb1',use:'Artist-made hero model by MisterH, rendered into looping video and poster. CC BY 4.0.'},
  {name:'MisterH',url:'https://sketchfab.com/TGVMisterH',use:'Hero model author attribution.'},
  {name:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',use:'Hero model licence. Adaptations disclosed in CREDITS.txt and beside the hero.'},
  {name:'React and React DOM',url:'https://react.dev/',use:'UI runtime.'},
  {name:'Vite',url:'https://vite.dev/',use:'Build and local development tooling.'},
  {name:'TypeScript',url:'https://www.typescriptlang.org/',use:'Static type checking.'},
  {name:'CSS Modules',url:'https://github.com/css-modules/css-modules',use:'Scoped component styles.'},
  {name:'Node.js',url:'https://nodejs.org/',use:'Development runtime and native test runner.'},
  {name:'ESLint',url:'https://eslint.org/',use:'Code linting.'},
  {name:'typescript-eslint',url:'https://typescript-eslint.io/',use:'TypeScript linting integration.'},
  {name:'React Hooks ESLint plugin',url:'https://react.dev/reference/eslint-plugin-react-hooks',use:'React hooks rules.'},
  {name:'DefinitelyTyped',url:'https://github.com/DefinitelyTyped/DefinitelyTyped',use:'Development type declarations for React, React DOM and Node.'},
  {name:'Vercel',url:'https://vercel.com/docs',use:'Deployment target and function routes. The reviewed local build has not been published by this audit.'},
  {name:'Baloo 2',url:'https://fontsource.org/fonts/baloo-2',use:'Legacy bundled font. SIL OFL 1.1 licence retained under public/fonts. Current terminal uses system monospace.'},
  {name:'Atkinson Hyperlegible Next',url:'https://fontsource.org/fonts/atkinson-hyperlegible-next',use:'Legacy bundled font. SIL OFL 1.1 licence retained under public/fonts.'},
  {name:'SIL Open Font License',url:'https://openfontlicense.org/',use:'Bundled font licence terms; the exact licence files remain in the project.'},
  {name:'Claude',url:'https://www.anthropic.com/claude',use:'AI assistance with code, writing and revision. Exact model versions were not recorded.'},
  {name:'OpenAI Codex',url:'https://openai.com/codex/',use:'AI assistance with implementation, writing, source selection and debugging. Exact model versions were not recorded.'},
  ...[
    ['GSAP','https://gsap.com/'],['Motion','https://motion.dev/'],['React Bits','https://reactbits.dev/'],['Uiverse','https://uiverse.io/'],['Refero','https://styles.refero.design/'],
  ].map(([name,url])=>({name,url,use:'Design reference only. No package or component copied into the current animation implementation.'})),
]
const inventory = {
  schemaVersion:1,project:'After the Signal',reviewDate:'2026-11-15',
  nasaResources,
  missions:machines.map(m=>({id:m.id,name:m.name,sources:m.sources,documentarySource:lastRecords[m.id]?.source})),
  nasaImages:[...images.values()].sort((a,b)=>a.nasaId.localeCompare(b.nasaId)),
  otherResources,
  suppliedAssets:[{path:'public/media/unifei-logo.png',description:'UNIFEI logo supplied by the project owner, displayed unchanged. University reference does not assert sponsorship or endorsement.'}],
  notes:['Tool model versions are unknown and are not invented.','A working link is not proof of scientific validity or hackathon eligibility.','Historical NASA photographs may include original insignia. No NASA logo is used as the project identity.'],
}
for(const image of inventory.nasaImages) for(const file of image.localFiles) await fs.access(path.join(root,file))
await fs.writeFile(path.join(root,'public/references.json'),JSON.stringify(inventory,null,2)+'\n')
const md=['# References — After the Signal','','Reviewed local source: 2026-11-15. Public link availability is recorded separately in REFERENCES-CHECK.md. This inventory records actual uses, not a claim of NASA endorsement or global eligibility.','','## NASA datasets and tools','',...nasaResources.map(r=>`- [${r.name}](${r.url}): ${r.use}`),'','## Mission sources','',...inventory.missions.flatMap(m=>[`### ${m.name}`,'',...Array.from(new Map([...m.sources,...(m.documentarySource?[m.documentarySource]:[])].map(r=>[r.url,r])).values()).map(s=>`- [${s.label}](${s.url})`),'']),'## NASA image records','',`The current interface data references ${images.size} unique NASA image IDs. Labels distinguish photographs, pre-mission photos, mosaics, planning maps and illustrative backgrounds. A local file exists for every referenced local asset. Gallery-only IDs can load through the NASA API.`,'',...inventory.nasaImages.map(i=>`- [${i.nasaId}](${i.url}): ${i.uses.map(u=>`${u.mission} / ${u.role}`).join('; ')}.`),'','## Other resources and tools','',...otherResources.map(r=>`- [${r.name}](${r.url}): ${r.use}`),'','## Supplied logo and licences','','The project owner supplied the UNIFEI logo. The footer identifies the Federal University of Itajubá without asserting institutional sponsorship or endorsement. The university retains rights to its mark.','','The source package does not yet declare a project-wide open-source licence. NASA credit requirements, partner rights, the hero model licence and bundled font licences remain applicable.','','## AI provenance','','See [AI-USE.md](AI-USE.md) and [machine-readable disclosure](public/ai-disclosure.json). First-person stories are imagined editorial writing. Mission observations and documentary photographs are not AI-generated scientific evidence.','','## Scope of this check','','This inventory covers the active data model, the referenced media, bundled fonts, implementation tooling and documented design references. Older unreferenced assets can remain in the repository; this inventory does not relabel them as verified NASA photographs. A network status check does not replace checking the underlying mission claim.',''].join('\n')
await fs.writeFile(path.join(root,'REFERENCES.md'),md)
console.log(`Inventory: ${machines.length} mission records, ${images.size} NASA image IDs; local referenced files exist.`)

if(process.argv.includes('--online')){
  const urls=new Set([...nasaResources,...otherResources,...inventory.missions.flatMap(m=>[...m.sources,...(m.documentarySource?[m.documentarySource]:[])])].map(r=>r.url))
  const queue=[...urls],checks=[]
  async function worker(){for(;;){const url=queue.shift();if(!url)return;try{const response=await fetch(url,{signal:AbortSignal.timeout(10000),redirect:'follow',headers:{'User-Agent':'AfterTheSignal-ReferenceCheck/1.0'}});const row={url,status:response.status,finalUrl:response.url};await response.body?.cancel();checks.push(row)}catch(e){checks.push({url,status:null,error:e.name})}}}
  await Promise.all(Array.from({length:5},()=>worker()))
  const imageQueue=[...images.keys()],imageChecks=[]
  async function imageWorker(){for(;;){const id=imageQueue.shift();if(!id)return;try{const response=await fetch('https://images-api.nasa.gov/search?nasa_id='+encodeURIComponent(id)+'&media_type=image',{signal:AbortSignal.timeout(10000)});if(!response.ok){imageChecks.push({id,status:response.status,exactMatch:false});await response.body?.cancel();continue}const json=await response.json();const match=json.collection?.items?.find(i=>i.data?.some(d=>d.nasa_id===id));imageChecks.push({id,status:response.status,exactMatch:Boolean(match),title:match?.data?.[0]?.title})}catch(e){imageChecks.push({id,status:null,error:e.name,exactMatch:false})}}}
  await Promise.all(Array.from({length:5},()=>imageWorker()))
  const webReaderChecks=[
    'https://openai.com/codex/',
    'https://uiverse.io/',
    'https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/',
  ].map(url=>({url,reviewDate:'2026-11-15',result:'Page content separately retrieved through the web reader. That reader may use cached content; this does not change the direct-request HTTP status.'}))
  const report={checkedAt:new Date().toISOString(),scope:'Public GET status and exact NASA Library identifiers. Does not certify facts or eligibility.',links:checks,nasaImages:imageChecks,webReaderChecks}
  await fs.writeFile(path.join(root,'reference-check.json'),JSON.stringify(report,null,2)+'\n')
  const failed=checks.filter(r=>!r.status||r.status>=400)
  await fs.writeFile(path.join(root,'REFERENCES-CHECK.md'),['# Reference check','','Public requests performed: '+report.checkedAt+'. A 403, timeout or failed fetch is recorded as unverified access, not proof that a citation is invalid. A 404/410 requires follow-up.','','## Summary','',`- ${checks.length} unique resource/source links requested.`,`- ${checks.length-failed.length} returned a successful HTTP status.`,`- ${failed.length} have restricted or unverified direct access.`,`- ${imageChecks.filter(r=>r.exactMatch).length}/${imageChecks.length} NASA image IDs matched the exact NASA Library search result.`,'','## Supplementary source review','','On 2026-11-15, the web reader separately retrieved page content for these three direct-request 403 results. The reader can use cached content, so the HTTP results below remain unchanged:',...webReaderChecks.map(r=>`- ${r.url}`),'','The challenge Resources page returned a retrieval error in the web reader. NSSDCA appears in the official challenge text supplied by the project owner and is actually used; the final portal resource selection still needs confirmation.','','## Resource link results','','| URL | HTTP status |','|---|---|',...checks.sort((a,b)=>a.url.localeCompare(b.url)).map(r=>`| ${r.url} | ${r.status??r.error} |`),'','## NASA identifier results','','| NASA ID | Exact match | HTTP status |','|---|---|---|',...imageChecks.sort((a,b)=>a.id.localeCompare(b.id)).map(r=>`| ${r.id} | ${r.exactMatch?'yes':'not confirmed'} | ${r.status??r.error} |`),''].join('\n'))
  console.log(JSON.stringify({links:checks.length,unverified:failed,images:imageChecks.length,imageIssues:imageChecks.filter(r=>!r.exactMatch)},null,2))
}
