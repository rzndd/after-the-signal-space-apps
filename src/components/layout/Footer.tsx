import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer id="about" className={styles.footer}>
     <div className={styles.wrap}>
      <p className={styles.statement}>The missions ended.<br /><em>The discoveries stayed.</em></p>
      <div className={styles.cols}>
        <section>
          <h2>NASA sources</h2>
          <ul>
            <li><a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noreferrer">NSSDCA spacecraft catalogue</a>: mission facts</li>
            <li><a href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf" target="_blank" rel="noreferrer">NASA Image and Video Library API</a>: images with individual credits</li>
            <li><a href="https://ssd-api.jpl.nasa.gov/doc/horizons.html" target="_blank" rel="noreferrer">NASA/JPL Horizons API</a>: Pioneer 10 trajectory estimate</li>
          </ul>
        </section>
        <section>
          <h2>How AI was used</h2>
          <p>
            Built with AI assistance from Claude by Anthropic and OpenAI Codex for code and writing. Voices are imagined narratives, not spacecraft transcripts.
            Scientific information references NASA sources. Maps use official mosaics with interactive flags; the distance diagram is drawn by code. We use no
            AI-generated images. The opening animation uses an artist-made 3D model, with attribution and licence beside it.
          </p>
          <p><a href="/ai-disclosure.json" target="_blank" rel="noreferrer">AI provenance metadata</a><br /><a href="/references.json" target="_blank" rel="noreferrer">Full source inventory</a></p>
        </section>
        <section>
          <h2>About this project</h2>
          <p>Created for NASA Space Apps Challenge 2026 at the virtual Itabira event.</p>
          <h3>Project team</h3>
          <ul className={styles.team}>
            <li>Enrico Gaspar Rezende Campos</li>
            <li>Alan Flávio de Albuquerque Ferreira</li>
            <li>Luis Otavio Coelho de Azevedo</li>
          </ul>
          <h3>University</h3>
          <div className={styles.university}>
            <img src="/media/unifei-logo.png" alt="UNIFEI logo" width="80" height="80" loading="lazy" decoding="async" />
            <p>Federal University of Itajubá<span>UNIFEI</span></p>
          </div>
          <p>Independent project, not endorsed by NASA. Verified images link to their original records.</p>
          <p><a href="https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=details" target="_blank" rel="noreferrer">Read the Space Apps challenge</a></p>
        </section>
      </div>
      <div className={styles.base}>
        <p className={styles.brand}>After the Signal <span>Abandoned but not forgotten</span></p>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            <li><a href="#machines">Machines</a></li>
            <li><a href="#explore">Map</a></li>
            <li><a href="#top">Back to top</a></li>
          </ul>
        </nav>
      </div>
     </div>
    </footer>
  )
}
