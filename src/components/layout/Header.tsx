import styles from './Header.module.css'
import { ScrambleText } from '../ui/ScrambleText'

const links = [
  { href: '#machines', label: 'Machines' },
  { href: '#explore', label: 'Map' },
  { href: '#about', label: 'About' },
]

/** Slim sticky bar: who we are on the left, where to go on the right. */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="After the Signal, back to top">
          <svg className={styles.flag} viewBox="0 0 40 60" aria-hidden="true">
            <line x1="8" y1="58" x2="8" y2="6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M8 6 L36 15 L8 25 Z" fill="var(--accent)" />
          </svg>
          <span className={styles.name}>After the Signal<span className={styles.descriptor}>Real missions. Lasting discoveries.</span></span>
        </a>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            {links.map((l) => (
              <li key={l.href}><a href={l.href}><span className={styles.prompt} aria-hidden="true">&gt; </span><ScrambleText text={l.label} /></a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
