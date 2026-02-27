import { getDocsTree } from '@/lib/docs'
import { DocLayout } from '@/components/DocLayout'
import { ButtonPage } from '@/components/ButtonPage'

export const metadata = {
  title: 'Button',
  description: 'Buttons trigger actions. Use them to submit forms, navigate, or initiate workflows.',
}

export default function ButtonPageRoute() {
  const groups = getDocsTree()

  const breadcrumbs = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
    { label: 'Components' },
    { label: 'Button' },
  ]

  const toc = [
    { id: 'examples',   text: 'Examples',         level: 2 },
    { id: 'anatomy',    text: 'Anatomy',           level: 2 },
    { id: 'states',     text: 'States',            level: 2 },
    { id: 'tokens',     text: 'Design tokens',     level: 2 },
    { id: 'props',      text: 'Props',             level: 2 },
    { id: 'guidelines', text: 'Content guidelines', level: 2 },
  ]

  const allPages = groups.flatMap(g => g.pages)
  const currentIdx = allPages.findIndex(p => p.href === '/docs/components/button')
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
        title: 'Button',
        description: 'Buttons trigger actions. Use them to submit forms, navigate, or initiate workflows.',
        status: 'stable',
      }}
      breadcrumbs={breadcrumbs}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      <ButtonPage />
    </DocLayout>
  )
}
