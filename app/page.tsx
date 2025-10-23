import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import styles from '@/styles/Home.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'trumpfiles.fun - The Encyclopedia',
  description: 'A data-driven catalog of the Trump presidency.',
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Navigation />

      <main className="main-container">
        <Hero />
        
        <section className={styles.explainerSection}>
          <div className="glass-card">
            <h2>What Is This?</h2>
            <p>This is a complete, data-driven catalog. It is not a blog. It is not an opinion piece. It is an encyclopedia of 372+ documented entries, each scored, sourced, and fact-checked.</p>
            <p>Use the **Catalog** to browse all entries. Use the **Visualizer** to discover new relationships in the data.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
