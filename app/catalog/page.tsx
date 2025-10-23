import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from '@/styles/Catalog.module.css'
import { Entry } from '@/types'
import { Metadata } from 'next'
import CatalogClient from './CatalogClient'

export const metadata: Metadata = {
  title: 'Catalog | trumpfiles.fun',
}

export const revalidate = 60 // Re-fetch data every 60 seconds

async function getEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('trump_entries')
    .select('*')
    .order('entry_number', { ascending: true });

  if (error) {
    console.error('Error fetching entries:', error);
    return [];
  }

  return (data as Entry[]) || [];
}

export default async function Catalog() {
  const entries = await getEntries();

  return (
    <>
      <Navigation />
      <main className="main-container">
        <h1 className={styles.catalogTitle}>The Catalog</h1>
        <p className={styles.catalogSubtitle}>Browse all {entries.length} entries. Use the filter to search by title, keyword, or synopsis.</p>
        <CatalogClient entries={entries} />
      </main>
    </>
  )
}
