// Build-time search index utilities
// The actual search is handled by /app/api/search/route.ts
// This file provides types and helpers for the search index

export interface SearchDocument {
  id: string
  title: string
  description?: string
  content: string
  href: string
  section: string
}

export function buildSearchIndex(docs: SearchDocument[]): SearchDocument[] {
  return docs
}
