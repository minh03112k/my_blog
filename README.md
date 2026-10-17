# Dev Notes

A personal blog built with Vite+, React, TypeScript, Tailwind CSS, and Zustand. Articles are Markdown files bundled into a static site. No backend, database, or CMS is required.

## Run locally

Use Node.js 22.21.1, pinned in `.node-version`, and pnpm 11.12.0, pinned in `package.json`. Vite+ runs through the project scripts; a global `vp` installation is optional.

```sh
pnpm install
pnpm dev
```

## Publish an article

Create `src/content/<topic>/your-article-slug.md`. Begin with a JSON metadata object, then a line containing `---`, then the Markdown body:

```markdown
{
"slug": "your-article-slug",
"title": "Your article title",
"description": "A short preview for the article list.",
"category": "Frontend",
"tags": ["React"],
"date": "2026-10-13",
"art": "layers"
}
---

## Your first section

Write your article here.
```

Categories: `Frontend` or `Backend & Data`. Dates use YYYY-MM-DD. Slugs must be unique. Metadata is validated when the app loads. Articles are sorted newest first. Invalid metadata stops loading with a diagnostic in the console.

The included articles are examples, not the owner's original writing. Replace them with your source documents converted to Markdown. Remove the reader notice in `src/pages/ArticlePage.tsx` when publishing original content. Edit the About text in `src/pages/AboutPage.tsx`.

## Verify and build

```sh
pnpm check
pnpm build
pnpm preview
```

Deploy `dist/` to any static hosting service. Hash-based article links work without server rewrite configuration. Relative asset paths support GitHub Pages repository URLs.

## Deploy to GitHub Pages

In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source. Push this project to the `main` branch. The **Deploy to GitHub Pages** workflow installs the pinned pnpm version, runs `pnpm check`, builds the site, and publishes `dist/`.

Every push to `main` deploys an update. You can also run the workflow from the **Actions** tab. The deployment URL appears in the workflow's `github-pages` environment.

## Content architecture

Start with Markdown in Git for a single author. Add a Git-backed CMS if browser editing or draft previews become necessary. A custom backend is useful only when the product needs features such as authenticated users, private content, or server-side workflows.

Search, category filtering, a dark theme, article reading, and the About page work locally. Filters reset on a full reload. There are no accounts, comments, analytics, or document upload processing.

This is a client-rendered first version. Before investing in search-engine discovery and per-article social previews, add static prerendering or move the content layer to a static publishing framework. Source documents are still needed to publish personal content.

## Code quality

Vite+ provides Oxfmt for formatting and Oxlint for React hooks, accessibility, imports, and TypeScript correctness. Their configuration lives in the `fmt` and `lint` blocks in `vite.config.ts`. Warnings and unused lint suppressions fail checks. TypeScript uses strict mode, checked array indexing, and exact optional properties.

```sh
pnpm format        # Format source and config files
pnpm format:check  # Check formatting without changes
pnpm lint          # Check code; warnings fail
pnpm lint:fix      # Apply safe lint fixes
pnpm typecheck    # Check TypeScript
pnpm check         # Run vp check, then tsc -b for both TypeScript projects
```

Use pnpm for dependency installation and all project scripts. The package manager version is pinned in `package.json`; commit `pnpm-lock.yaml` with dependency changes. Use `pnpm install --frozen-lockfile` in CI. Run `check` and `build` before sharing changes. `.editorconfig` defines shared indentation and line endings. In your editor, select Oxfmt as the formatter and enable format on save if desired.

`pnpm check` uses Vite+'s type-aware checks and also runs `tsc -b` to validate both the application and build configuration projects. `pnpm build` runs `tsc -b` before the Vite+ production build. Direct `pnpm exec vp build` runs only the bundler. This project has no automated test suite configured yet.

Generated output, dependencies, lockfiles, and article source files are excluded from formatting through `fmt.ignorePatterns` in `vite.config.ts`. Articles use a custom JSON-metadata/Markdown format that a Markdown formatter can reinterpret; edit them directly.

## Atomic Design structure

```text
src/
  components/
    atoms/       # Button, CategoryBadge, Tag
    molecules/   # ArticleCard, ArticleMetadata, ArticleSearch, CategoryFilters
    organisms/   # SiteHeader, SiteFooter, ArticleNotebook
    templates/   # BlogLayout: shared navigation, main region, footer
  pages/         # HomePage, ArticlePage, AboutPage, NotFoundPage
  router/        # React Router route table, layout, and article resolution
  data/          # Validated Markdown article loading
  stores/        # Zustand discovery state
  content/       # Article source documents
  styles/        # Shared reading styles and responsive composition
```

Atoms are UI primitives. Molecules compose primitives into reusable controls and previews. Organisms assemble full sections. Templates define the shared page shell; pages connect content and state to those sections. Component styles live beside their TSX files; shared reading styles and responsive overrides live in `styles/blog.css`. Import components directly from their files. Presentational components receive props rather than importing the store or article collection. `App.tsx` mounts React Router. `router/router.tsx` defines nested routes, `RootRoute.tsx` connects the shared layout and manages titles and scroll position, and `ArticleRoute.tsx` resolves article slugs. Internal navigation uses `Link` and `NavLink`. Unknown paths and missing articles render the Not Found page. Hash URLs keep static hosting simple.

The homepage uses a text-first, single-column article index. Titles, summaries, dates, and categories replace cover previews. The index and its controls use Tailwind utilities; Markdown reading styles remain in `styles/blog.css`. Articles do not require cover images or illustration metadata.

## Data Structures and Algorithms chapters

`src/content/data-structures-and-algorithms/index.md` is the main outline. Its table of contents is generated from chapter metadata and grouped by section. Only the main outline appears in the article index; each chapter links back to it and to its previous and next chapters.

The six chapter files currently have empty bodies. Add your Markdown after `---` and change `"kind": "placeholder"` to `"kind": "article"` when the chapter is ready. Placeholder pages show “Content coming later.” without a reading-time estimate or sample-article notice. Existing example articles are retained.

Chapter metadata uses `"chapter": { "parent": "data-structures-and-algorithms", "order": 1, "section": "Understanding Big O" }`. Orders must be unique within an outline. Use `"kind": "outline"` for a main table-of-contents page and `"kind": "article"` for your completed writing.

## Organizing Markdown files

Group related articles in a topic folder. Use `index.md` for its main outline and subfolders for chapter groups. Keep sample posts in `examples/` so they are easy to distinguish from your writing.

```text
src/content/
  data-structures-and-algorithms/
    index.md
    understanding-big-o.md
    sorting/
      insertion-sort.md
      merge-sort.md
      quick-sort.md
    data-structures/
      introduction.md
      python-lists.md
  examples/
    css-layout.md
    messy-data.md
    react-components.md
    rest-api.md
    zustand-state.md
```

The loader discovers Markdown recursively. File paths organize the workspace; metadata controls URLs (`slug`), chapter order (`chapter.order`), and Contents grouping (`chapter.section`). Moving a file does not change its URL. Keep slugs unique across all folders. Only article files belong under `src/content/`; keep supporting notes elsewhere because every `.md` file here is loaded as an article.

To fill a chapter, edit its body after `---` and change `kind` from `placeholder` to `article`. To add a chapter, copy a nearby chapter file and update its slug, title, description, section, and order. Run `pnpm check` and `pnpm build` afterward.
