export interface TocEntry {
  id: string
  text: string
  level: number
}

export function extractToc(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocEntry[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/`/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    toc.push({ id, text, level })
  }
  return toc
}
