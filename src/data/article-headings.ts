import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { toString } from 'mdast-util-to-string'

const markdownParser = unified().use(remarkParse)
type MarkdownTree = ReturnType<typeof markdownParser.parse>

/** A section anchor derived from a Markdown heading, with its original hierarchy. */
export type ArticleHeading = {
  readonly id: string
  readonly title: string
  readonly depth: number
}

function collectHeadings(tree: MarkdownTree): ArticleHeading[] {
  const used = new Set<string>()
  return tree.children.flatMap((node) => {
    if (node.type !== 'heading') return []
    const title = toString(node)
    const base =
      title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-') || 'section'
    let id = base
    let suffix = 1
    while (used.has(id)) id = `${base}-${suffix++}`
    used.add(id)
    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
    return [{ id, title, depth: node.depth }]
  })
}

/** Extracts headings with the same anchors used by the article renderer; code blocks are ignored. */
export function getArticleHeadings(body: string): readonly ArticleHeading[] {
  return collectHeadings(markdownParser.parse(body))
}

/** Adds stable, unique section IDs before ReactMarkdown renders the heading elements. */
export function articleHeadingAnchors() {
  return (tree: MarkdownTree) => {
    collectHeadings(tree)
  }
}
