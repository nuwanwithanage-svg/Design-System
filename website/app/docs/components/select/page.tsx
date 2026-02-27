import { getDocsTree } from '@/lib/docs'
import { DocLayout } from '@/components/DocLayout'
import { SelectPage } from '@/components/SelectPage'

export const metadata = {
  title: 'Select',
  description: 'Dropdown selector for choosing one option from a list.',
}

export default function SelectPageRoute() {
  const groups = getDocsTree()

  const breadcrumbs = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
    { label: 'Components' },
    { label: 'Select' },
  ]

  const toc = [
    { id: 'examples',   text: 'Examples',          level: 2 },
    { id: 'states',     text: 'States',             level: 2 },
    { id: 'anatomy',    text: 'Anatomy',            level: 2 },
    { id: 'tokens',     text: 'Design tokens',      level: 2 },
    { id: 'props',      text: 'Props',              level: 2 },
    { id: 'guidelines', text: 'Content guidelines', level: 2 },
  ]

  const allPages = groups.flatMap(g => g.pages)
  const currentIdx = allPages.findIndex(p => p.href === '/docs/components/select')
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
        title: 'Select',
        description: 'Dropdown selector for choosing one option from a list.',
        status: 'stable',
      }}
      breadcrumbs={breadcrumbs}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      <SelectPage />
    </DocLayout>
  )
}
