import { notFound } from 'next/navigation'
import { getDocBySlug, getAllDocSlugs, getDocsTree } from '@/lib/docs'
import { extractToc } from '@/lib/toc'
import { renderMDX } from '@/lib/mdx'
import { DocLayout } from '@/components/DocLayout'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) return {}
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const groups = getDocsTree()
  const toc = extractToc(doc.content)
  const content = await renderMDX(doc.content)

  // Compute breadcrumbs
  const [section] = slug
  const groupLabel = groups.find(g => g.slug === section)?.title ?? section
  const breadcrumbs = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
    { label: groupLabel },
    { label: doc.frontmatter.title },
  ]

  // Compute prev/next
  const allPages = groups.flatMap(g => g.pages)
  const currentIdx = allPages.findIndex(p => p.href === `/docs/${slug.join('/')}`)
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
      frontmatter={doc.frontmatter}
      breadcrumbs={breadcrumbs}
      editPath={`content/docs/${slug.join('/')}.mdx`}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      {content}
    </DocLayout>
  )
}
