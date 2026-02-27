import { NextRequest, NextResponse } from 'next/server'
import { getDocsTree, getDocBySlug } from '@/lib/docs'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.toLowerCase() ?? ''
  if (!query || query.length < 2) return NextResponse.json({ results: [] })

  const groups = getDocsTree()
  const results: { title: string; href: string; description?: string }[] = []

  for (const group of groups) {
    for (const page of group.pages) {
      const doc = getDocBySlug(page.slug)
      if (!doc) continue
      const searchText = `${doc.frontmatter.title} ${doc.frontmatter.description ?? ''} ${doc.content}`.toLowerCase()
      if (searchText.includes(query)) {
        results.push({
          title: doc.frontmatter.title,
          href: page.href,
          description: doc.frontmatter.description,
        })
      }
    }
  }

  return NextResponse.json({ results: results.slice(0, 8) })
}
