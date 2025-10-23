import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from '@/styles/Visualizer.module.css'
import { Entry } from '@/types'
import { Metadata } from 'next'
import VisualizerClient from './VisualizerClient'

export const metadata: Metadata = {
  title: 'Visualizer | trumpfiles.fun',
}

export const revalidate = 60

type VisualizerEntry = Pick<Entry, 'entry_number' | 'title' | 'date_start' | 'scores'>;

async function getEntries(): Promise<VisualizerEntry[]> {
  const { data, error } = await supabase
    .from('trump_entries')
    .select('entry_number, title, date_start, scores');

  if (error) {
    console.error('Error fetching entries:', error);
    return [];
  }

  return data || [];
}

export default async function Visualizer() {
  const entries = await getEntries();

  return (
    <>
      <Navigation />
      <main className={`main-container ${styles.visualizerPage}`}>
        <h1 className={styles.pageTitle}>The Visualizer</h1>
        <p className={styles.pageSubtitle}>Discover new relationships in the data. This is your tool to analyze the full catalog.</p>
        <VisualizerClient entries={entries} />
      </main>
    </>
  )
}
