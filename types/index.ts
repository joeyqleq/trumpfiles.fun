// This file defines the structure of your data for TypeScript

export interface Scores {
  insanity: number;
  absurdity: number;
  danger: number;
  authoritarianism: number;
  lawlessness: number;
  credibility_risk: number;
  recency_intensity: number;
  impact_scope: number;
  rationale_short: string;
  rationale_detail: string;
}

export interface Source {
  url: string;
  title: string;
  publisher: string;
  date_published: string;
  source_type: string;
}

export interface EntryLink {
  to_entry_number: number;
  relation_type: string;
  note: string;
  source_url: string | null;
}

export interface PublicReaction {
  social_sentiment: string;
  notable_public_responses: {
    entity: string;
    reaction: string;
    date: string;
    source_url: string | null;
  }[];
  viral_moments: string[];
  public_outcry_score: number;
}

// This is the main data type for a single entry
export interface Entry {
  entry_number: number;
  title: string;
  date_start: string;
  date_end: string;
  synopsis: string;
  rationale: string;
  category: string;
  subcategory: string;
  keywords: string[];
  age: number;
  phase: string;
  scores: Scores;
  fact_check: string;
  fact_check_sources: string[];
  sources: Source[];
  suggested_source_query: string;
  entry_links: EntryLink[];
  impressions: number | null;
  reach_estimate: number | null;
  financial_cost_usd: number | null;
  public_reaction: PublicReaction | null;
}