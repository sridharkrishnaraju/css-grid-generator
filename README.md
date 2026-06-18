# CSS Grid Generator

A visual CSS Grid generator: set columns, rows and gap, preview live, and copy the CSS. Zero dependencies — works in plain HTML, React, Vue, Svelte or Astro.

**▶ [Live demo](https://sgbp.tech/tools/css-grid-generator)**

```html
<script src="grid-generator.js"></script>
<grid-generator></grid-generator>
```

## What it does

CSS Grid is a two-dimensional layout system — rows and columns together — that makes complex layouts simple without floats or hacks. This generator uses `repeat(N, 1fr)`, where `1fr` means one fraction of the free space, so columns share the row fluidly with no media queries.

## Install

```bash
npm install @sgbp/grid-generator
```

or copy `grid-generator.js` into your project.

## Further reading

Maintained by [SGBP — Singapore Build Partners](https://sgbp.tech), a studio building fast,
accessible websites for Singapore SMEs, as one of a set of free developer tools.

## License

MIT © SGBP. Contributions welcome.
