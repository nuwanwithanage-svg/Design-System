import { getDocsTree } from '@/lib/docs'
import { DocLayout } from '@/components/DocLayout'
import { InputPage } from '@/components/InputPage'

export const metadata = {
  title: 'Input',
  description: 'Single-line text input for forms, search, and data entry.',
}

export default function InputPageRoute() {
  const groups = getDocsTree()

  const breadcrumbs = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
    { label: 'Components' },
    { label: 'Input' },
  ]

  const toc = [
    { id: 'examples',   text: 'Examples',         level: 2 },
    { id: 'states',     text: 'States',            level: 2 },
    { id: 'anatomy',    text: 'Anatomy',           level: 2 },
    { id: 'tokens',     text: 'Design tokens',     level: 2 },
    { id: 'props',      text: 'Props',             level: 2 },
    { id: 'guidelines', text: 'Content guidelines', level: 2 },
  ]

  const allPages = groups.flatMap(g => g.pages)
  const currentIdx = allPages.findIndex(p => p.href === '/docs/components/input')
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
        title: 'Input',
        description: 'Single-line text input for forms, search, and data entry.',
        status: 'stable',
      }}
      breadcrumbs={breadcrumbs}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      <InputPage />
    </DocLayout>
  )
}
