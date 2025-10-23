'use client'

import { useState } from 'react'
import EntryCard from '@/components/EntryCard'
import styles from '@/styles/Catalog.module.css'
import { Entry } from '@/types'

export default function CatalogClient({ entries }: { entries: Entry[] }) {
  const [filter, setFilter] = useState('');

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(filter.toLowerCase()) ||
    entry.synopsis.toLowerCase().includes(filter.toLowerCase()) ||
    (entry.keywords && entry.keywords.some(k => k.toLowerCase().includes(filter.toLowerCase())))
  );

  return (
    <>
      <input 
        type="text"
        placeholder="Filter entries..."
        className={styles.filterInput}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className={styles.grid}>
        {filteredEntries.map((entry) => (
          <EntryCard key={entry.entry_number} entry={entry} />
        ))}
      </div>
    </>
  )
}
