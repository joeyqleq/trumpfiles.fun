import Link from 'next/link'
import styles from '../styles/Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo}>
          trumpfiles.fun
        </Link>
        <div className={styles.navLinks}>
          <Link href="/catalog" className={styles.navLink}>Catalog</Link>
          <Link href="/visualizer" className={styles.navLink}>Visualizer</Link>
          {/* Add more links here later, e.g., "About" */}
        </div>
      </div>
    </nav>
  )
}

export default Navigation