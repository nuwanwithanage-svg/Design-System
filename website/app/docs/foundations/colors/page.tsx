import { getDocsTree } from '@/lib/docs'
import { DocLayout } from '@/components/DocLayout'
import { ColorsPage } from '@/components/ColorsPage'

export const metadata = {
  title: 'Colors',
  description: 'A two-layer colour system — raw primitives and purpose-driven semantic tokens.',
}

export default function ColorsPageRoute() {
  const groups = getDocsTree()

  const breadcrumbs = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
    { label: 'Foundations' },
    { label: 'Colors' },
  ]

  const toc = [
    { id: 'two-layers',      text: 'Two layers',              level: 2 },
    { id: 'semantic-tokens', text: 'Semantic tokens',         level: 2 },
    { id: 'in-practice',     text: 'States in practice',      level: 2 },
    { id: 'primitives',      text: 'Primitive palettes',      level: 2 },
  ]

  const allPages = groups.flatMap(g => g.pages)
  const currentIdx = allPages.findIndex(p => p.href === '/docs/foundations/colors')
  const prevPage = currentIdx > 0
    ? { title: allPages[currentIdx - 1].frontmatter.title, href: allPages[currentIdx - 1].href }
    : undefined
  const nextPage = currentIdx < allPages.length - 1
    ? { title: allPages[currentIdx + 1].frontmatter.title, href: allPages[currentIdx + 1].href }
    : undefined

  return (
    <DocLayout
      groups={groups}
      toc={toc}
      frontmatter={{
        title: 'Colors',
        description: 'A two-layer colour system — raw primitives and purpose-driven semantic tokens.',
        status: 'stable',
      }}
      breadcrumbs={breadcrumbs}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      <ColorsPage />
    </DocLayout>
  )
}
