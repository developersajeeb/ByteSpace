# ByteSpace New

A course-marketplace website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. The site recreates the Figma file *"ByteSpace New Check website"* as closely as possible.

## Pages

| Route | Figma frame |
| --- | --- |
| `/` | Home (landing page) |
| `/login` | Login |
| `/register` | Register |
| `/courses` | Search Page (`?q=` search, `?page=` pagination) |
| `/courses/[slug]` | Course Details (About tab) |
| `/courses/[slug]/lessons` | Course Lessons |
| `/courses/[slug]/reviews` | Course Reviews |
| `/creators/[slug]` | Creator Profile |
| any unknown URL | 404 Not Found |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Project structure

```
src/
  app/
    (site)/            pages that share the header + footer
      courses/[slug]/  shared course layout (hero, video, sidebar) + tab pages
    (auth)/            login & register (logo-only header)
    not-found.tsx      404 page
    globals.css        design tokens (colors, text styles) from the Figma style guide
    fonts/             self-hosted Satoshi + Clash Display
  components/
    layout/            Header, Footer, Logo, NewsletterForm
    ui/                Button, SearchBar, CategoryPills, Pagination, AvatarStack, SectionHeading
    cards/             CourseCard, CategoryCard, TestimonialCard, floating stat cards
    decor/             grid lines, 3D ornaments, glow blobs, blue band
    home/ course/ auth/ courses/ creator/   page sections
    icons/             Icon component + generated Material icon paths
  data/                course, category, testimonial, creator content (copied from Figma)
  lib/                 cn() helper, form validation
tools/figma/           dev-only scripts used to read the Figma file (see below)
```

## How the design was matched

The Figma file could not be opened through the Figma API, so the exported `.fig` file was decoded locally with a small kiwi decoder in `tools/figma/`:

- `dump.mjs <nodeId>`: prints every layer's position, size, auto-layout gaps and padding, colors (with shared styles resolved), and typography.
- `assets.mjs`: exports photos as WebP, the colorized 3D shapes, logos as SVG, and Material icon paths (`src/components/icons/icon-data.ts`).
- `render.mjs` and `compare.js`: render each Figma frame as HTML, then compare the position, size, font and color of every text element on the live page against the design at 1440px.

All nine pages come out within a few pixels of the design on desktop. The design is desktop-only, so tablet and mobile layouts were added: sections stack, a mobile menu appears, and decorative elements are scaled down.

> The decoding scripts need the original `design/bytespace.fig` file, which is git-ignored because of its size. The generated assets are committed.

## Notes for the reviewer

- There is no backend. The login, register and newsletter forms validate input on the client and then show a success state.
- The course search filters the sample courses by title.
- A few places where the Figma file is inconsistent were normalised:
  - long course titles are truncated instead of overflowing onto the author line;
  - the rating breakdown shows the matching number of stars per row;
  - the creator bio's "[Creator's Name]" placeholder is filled in;
  - the active navigation link follows the current page.
