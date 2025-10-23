'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '@/styles/Visualizer.module.css'
import { Entry } from '@/types'

const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false })
const Timeline = dynamic(() => import('@/components/charts/Timeline'), { ssr: false })

type VisualizerEntry = Pick<Entry, 'entry_number' | 'title' | 'date_start' | 'scores'>;

export default function VisualizerClient({ entries }: { entries: VisualizerEntry[] }) {
  const [chartType, setChartType] = useState('timeline');

  // Data for the Bar Chart: Average Scores
  const avgScores = {
    danger: entries.reduce((acc, e) => acc + e.scores.danger, 0) / entries.length,
    authoritarianism: entries.reduce((acc, e) => acc + e.scores.authoritarianism, 0) / entries.length,
    lawlessness: entries.reduce((acc, e) => acc + e.scores.lawlessness, 0) / entries.length,
    insanity: entries.reduce((acc, e) => acc + e.scores.insanity, 0) / entries.length,
    absurdity: entries.reduce((acc, e) => acc + e.scores.absurdity, 0) / entries.length,
  };
  const barChartData = Object.entries(avgScores).map(([key, value]) => ({
    label: key,
    value: parseFloat(value.toFixed(1)),
  }));

  // Data for the Timeline Chart
  const timelineData = entries.map(e => ({
    date: new Date(e.date_start),
    score: e.scores.danger,
    label: e.title,
  }));

  return (
    <div className={`glass-card ${styles.toolContainer}`}>
      
      {/* This is the CUSTOM TOOL you requested */}
      <div className={styles.customTool}>
        <h3>Build Your Own Chart</h3>
        <p>This tool will allow you to plot any data point against another. (Functionality in development)</p>
        <div className={styles.dropdowns}>
          <label>
            Plot (Y-Axis):
            <select>
              <option>Danger Score</option>
              <option>Authoritarianism Score</option>
              <option>Financial Cost</option>
            </select>
          </label>
          <label>
            Against (X-Axis):
            <select>
              <option>Timeline (Date)</option>
              <option>Category</option>
              <option>Phase of Life</option>
            </select>
          </label>
          <button className={styles.generateBtn}>Generate</button>
        </div>
      </div>

      {/* This section shows the pre-built charts */}
      <div className={styles.chartGallery}>
        <h3>Data Gallery</h3>
        <div className={styles.chartTabs}>
          <button onClick={() => setChartType('timeline')} className={chartType === 'timeline' ? styles.activeTab : ''}>Danger Over Time</button>
          <button onClick={() => setChartType('scores')} className={chartType === 'scores' ? styles.activeTab : ''}>Average Scores</button>
        </div>
        
        <div className={styles.chartWrapper}>
          {chartType === 'timeline' && <Timeline data={timelineData} />}
          {chartType === 'scores' && <BarChart data={barChartData} />}
        </div>
      </div>

    </div>
  )
}
