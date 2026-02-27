import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface DocFrontmatter {
  title: string
  description?: string
  status?: 'stable' | 'beta' | 'deprecated'
  tags?: string[]
  order?: number
}

export interface DocPage {
  slug: string[]
  href: string
  frontmatter: DocFrontmatter
  filePath: string
}

export interface DocGroup {
  title: string
  slug: string
  pages: DocPage[]
}

const CONTENT_DIR = path.join(process.cwd(), 'content/docs')

const GROUP_LABELS: Record<string, string> = {
  'getting-started': 'Getting Started',
  'foundations': 'Foundations',
  'components': 'Components',
  'patterns': 'Patterns',
  'resources': 'Resources',
}

const GROUP_ORDER = ['getting-started', 'foundations', 'components', 'patterns', 'resources']

export function getDocsTree(): DocGroup[] {
  const groups: DocGroup[] = []

  const dirs = fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )

  const sortedDirs = dirs.sort((a, b) => {
    const ai = GROUP_ORDER.indexOf(a)
    const bi = GROUP_ORDER.indexOf(b)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })

  for (const dir of sortedDirs) {
    const dirPath = path.join(CONTENT_DIR, dir)
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'))
    const pages: DocPage[] = []

    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      const slug = file.replace('.mdx', '')
      pages.push({
        slug: [dir, slug],
        href: `/docs/${dir}/${slug}`,
        frontmatter: data as DocFrontmatter,
        filePath,
      })
    }

    pages.sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))

    groups.push({
      title: GROUP_LABELS[dir] ?? dir,
      slug: dir,
      pages,
    })
  }

  return groups
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = []
  const dirs = fs.readdirSync(CONTENT_DIR)
  for (const dir of dirs) {
    const dirPath = path.join(CONTENT_DIR, dir)
    if (!fs.statSync(dirPath).isDirectory()) continue
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'))
    for (const file of files) {
      slugs.push([dir, file.replace('.mdx', '')])
    }
  }
  return slugs
}

export function getDocBySlug(slugArr: string[]): { frontmatter: DocFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, ...slugArr) + '.mdx'
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as DocFrontmatter, content }
}
