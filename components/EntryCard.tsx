import { useState, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/EntryCard.module.css'
import Link from 'next/link'
import { Entry } from '../types' // Import our main type

interface ScoreBarProps {
  label: string;
  score: number;
}

// This small component will render the "thermal" score bars
const ScoreBar = ({ label, score }: ScoreBarProps) => {
  const percentage = score * 10; // Score is 1-10
  // Thermal color gradient
  const getColor = (val: number) => {
    if (val < 5) return '#00A86B'; // Green
    if (val < 8) return '#FFA500'; // Orange
    return '#FF4500'; // Red
  };

  return (
    <div className={styles.scoreBarWrapper}>
      <span className={styles.scoreLabel}>{label}</span>
      <div className={styles.scoreBarBackground}>
        <motion.div
          className={styles.scoreBarFill}
          style={{ background: getColor(score) }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      <span className={styles.scoreValue}>{score}/10</span>
    </div>
  )
}

interface EntryCardProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const [view, setView] = useState<'summary' | 'data' | 'fact_check'>('summary'); 
  
  // A function to safely copy the link
  const copyLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const link = `https://trumpfiles.fun/entry/${entry.entry_number}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }, () => {
      alert('Failed to copy link.');
    });
  }

  return (
    <motion.div
      className={`glass-card ${styles.card}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className={styles.cardTitle}>
        <span className={styles.entryNumber}>#{entry.entry_number}</span>
        {entry.title}
      </h3>
      
      <div className={styles.viewTabs}>
        <button onClick={() => setView('summary')} className={view === 'summary' ? styles.activeTab : ''}>Summary</button>
        <button onClick={() => setView('data')} className={view === 'data' ? styles.activeTab : ''}>Data</button>
        <button onClick={() => setView('fact_check')} className={view === 'fact_check' ? styles.activeTab : ''}>Debunk</button>
      </div>

      <div className={styles.content}>
        {view === 'summary' && (
          <p className={styles.synopsis}>{entry.synopsis}</p>
        )}
        
        {view === 'data' && entry.scores && (
          <div>
            <ScoreBar label="Danger" score={entry.scores.danger} />
            <ScoreBar label="Authoritarianism" score={entry.scores.authoritarianism} />
            <ScoreBar label="Lawlessness" score={entry.scores.lawlessness} />
            <ScoreBar label="Insanity" score={entry.scores.insanity} />
            <ScoreBar label="Absurdity" score={entry.scores.absurdity} />
            <p className={styles.rationale}>{entry.scores.rationale_short}</p>
          </div>
        )}
        
        {view === 'fact_check' && (
          <div>
            <p className={styles.factCheck}>{entry.fact_check}</p>
            {entry.fact_check_sources && (
              <a href={entry.fact_check_sources[0]} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                View Fact-Check Source
              </a>
            )}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button onClick={copyLink} className={styles.shareBtn}>Copy Link</button>
        {/* We will create this page next */}
        <Link href={`/entry/${entry.entry_number}`} className={styles.detailsBtn}>
          Full Details →
        </Link>
      </div>
    </motion.div>
  )
}

export default EntryCard