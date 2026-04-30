---
title: Markdown Kitchen Sink
date: 2026-04-30
description: A test post exercising every markdown feature — headings, code blocks, lists, blockquotes, tables, links, and inline formatting.
draft: false
---

This post exists to verify that the blog pipeline renders every markdown feature correctly. If something here looks broken, the styling needs work.

## Headings

# H1 — top of hierarchy
## H2 — section
### H3 — subsection
#### H4 — sub-sub
##### H5
###### H6

## Inline formatting

You can write **bold**, *italic*, ***bold italic***, ~~strikethrough~~, and `inline code`. Links go to places like [matthewtroke.com](https://matthewtroke.com) and footnoted phrases work too.

## Code blocks

A simple TypeScript example:

```ts
type Post = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  draft?: boolean;
};

export function sortPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
```

A bit of Svelte:

```svelte
<script lang="ts">
  let { data } = $props();
  const Content = $derived(data.Content);
</script>

<article>
  <h1>{data.meta.title}</h1>
  <Content />
</article>
```

A shell snippet:

```bash
git add -A
git commit -m "New post"
git push
```

And a JSON config:

```json
{
  "name": "matthewtroke-com",
  "scripts": {
    "build": "vite build"
  }
}
```

## Lists

Unordered:

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered:

1. Run `npm run build`
2. Verify the output in `build/`
3. Push to `main`
4. Watch the Actions tab

Task list:

- [x] Set up mdsvex
- [x] Wire up Pages CMS
- [ ] Write more posts

## Blockquote

> The best way to predict the future is to invent it.
>
> — Alan Kay

Nested:

> Outer quote.
>
> > Inner quote with **bold** inside.

## Table

| Tool        | Purpose            | Year |
| ----------- | ------------------ | ---- |
| SvelteKit   | App framework      | 2026 |
| mdsvex      | Markdown rendering | 2026 |
| Pages CMS   | Authoring UI       | 2026 |

## Horizontal rule

Above the rule.

---

Below the rule.

## Images

When you upload an image through Pages CMS it lands in `static/blog/` and you reference it as `![alt](/blog/your-file.png)`. Skipping a real example here so prerender doesn't choke on a 404 — add an image once you've uploaded one.

## Links

- Internal: [back to blog index](/blog)
- External: [SvelteKit docs](https://svelte.dev/docs/kit)

## Putting it together

Here's a paragraph mixing **bold**, *italic*, `code`, and a [link](https://example.com) to make sure inline elements all play nicely together within flowing prose without breaking the line height or spacing rhythm of the surrounding text.

That's the kitchen sink.
