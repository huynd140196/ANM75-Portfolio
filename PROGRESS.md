# Progress — My Personal Portfolio

A running log of what's done and what's next. Start each Claude Code session by saying:
"Read PROGRESS.md and the current files, then let's continue from there."

---

## Day 1: Setup + first file ✅ (in progress)
- [x] Created `index.html` with name as heading + one-sentence bio
- [ ] Confirmed it displays correctly in the browser
- [ ] Practiced the ask → check → refine loop (changed bio via a prompt, not by hand)

**Notes for next session:**
- `index.html` has the "Phòng PA05" heading + bio, plus placeholder Header/About/Missions/Contact sections already stubbed in (structure only, no styling). Still need to open it in a browser to confirm it renders, and to practice revising the bio via a prompt.

---

## Day 2: HTML structure ✅
- [x] Add Header, About, Projects, Contact sections (placeholder content only)
- [x] Understand what each section tag is for

**Notes for next session:**
- `index.html` now has `<header>` + three `<section>` tags (about/projects/contact), each with a heading and descriptive placeholder text (e.g. "About content goes here"). Learned why semantic tags (`<header>`, `<section>`, `<footer>`) beat plain `<div>`s — they communicate structure/meaning to screen readers and search engines, not just visual grouping. Also covered that section order in the HTML source is the actual render/reading/tab order until CSS is added, which is why Header → About → Projects → Contact was chosen (intro → who → proof → action). Day 1's browser-check and bio-edit-via-prompt items are still open before Day 1 is fully closed out.

---

## Day 3: CSS styling ✅
- [x] Pick a visual direction (colors, font, overall feel)
- [x] Style the page to match

**Notes for next session:**
- Visual direction: dark navy background (`#0a192f`), light gray body text (`#d1d5db`), one light-green accent (`#8fd9a6`) used only on headings and links. Font is a modern sans-serif system stack (`-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`). Layout is a single centered column (`max-width: 700px`, `margin: 0 auto`) with `rem`-based padding/spacing so it scales with text size, and `3rem` margin-bottom between Header/About/Projects/Contact for breathing room. Styles live in a new `styles.css`, linked from `index.html` — no HTML content or structure changed.

---

## Day 4: Real content ✅ (structure only — see note)
- [x] Write real About text
- [x] Add 1–3 real projects

**Notes for next session:**
- ⚠️ About and Projects currently hold **lorem ipsum placeholder text**, not real content — this was done to preview realistic paragraph/card length, not as final copy. About has a 4-sentence placeholder paragraph; Projects has 3 cards ("Project One/Two/Three") each with 2 sentences of placeholder text and matching `.project-card` styling in `styles.css`. **Real About text and real project descriptions (name, one-sentence description, what was learned) still need to be written and swapped in before Day 11 (deployment).**

---

## Day 5: Responsive design ✅
- [x] Test on narrow/phone-width screen
- [x] Fix any layout issues

**Notes for next session:**
- Issues found at phone width: (1) Projects cards stayed in a horizontal row and overflowed sideways instead of stacking, and (2) the whole page appeared "zoomed out"/shrunk, including text. Root cause was a missing `<meta name="viewport" content="width=device-width, initial-scale=1">` tag — without it, mobile browsers fake a ~980px desktop viewport and scale the page down, so the CSS media query breakpoint never actually triggered at real phone width. Fixed by adding that one meta tag to `index.html`'s `<head>`. Also hardened against horizontal scroll in general: `box-sizing: border-box` reset (`html` + `*`/`::before`/`::after`) so padding never pushes elements wider than their container, and `overflow-wrap: break-word` on `body` so long text wraps instead of overflowing. Layout itself: `.project-list` is `flex-direction: column` by default (stacked, mobile-first) and switches to `flex-direction: row; flex-wrap: wrap` via `@media (min-width: 640px)` in `styles.css`, with cards using `flex: 1 1 0` and `min-width: 0` to share space evenly without forcing overflow.

---

## Day 6: Contact + polish ✅
- [x] Add contact method (email link or form)
- [x] Full consistency pass (spacing, fonts, colors)

**Notes for next session:**
- Contact section now has a `mailto:` link ("Get in touch: your.email@example.com") in `index.html`, styled automatically by the existing `a` rule so it matches the accent color/font used everywhere else — address is still a placeholder (`your.email@example.com`), swap in the real one later.
- Consistency pass found spacing was inconsistent: the top intro block (`<h1>` + bio paragraph, sitting directly in `<body>` before the placeholder `<header>`) relied on default browser margins, while every other block used a deliberate `3rem` gap via the `header, section { margin-bottom: 3rem }` rule. Fixed by zeroing default margins on `h1, h2, h3, p` and reintroducing spacing explicitly on the same rem-based scale already in use (`1.25rem`/`1.5rem`/`3rem`): `0.75rem` between the `h1` and bio text, `3rem` after the bio to match section spacing, `1rem` under every `h2`, and `0.75rem` under each project card's `h3`. Colors and fonts were already consistent (all headings/links use the one accent color, one font stack inherited from `body`) — no changes needed there.
- ⚠️ Separate open question (not yet resolved): the page still has a literal `<h1>Phòng PA05</h1>` + bio directly in `<body>`, *and* a separate placeholder `<header><h2>Header</h2><p>Header content goes here</p></header>` right below it — these look like they should eventually be merged into one real header rather than staying as two disconnected blocks. Worth deciding before Day 11 deploy.

---

## Day 7: Review (not started)
- [ ] No new building — review what's built so far

---

## Day 8: Project detail page ✅
- [x] Create a detail page for one project
- [x] Link to it from the project card

**Notes for next session:**
- "Project One" got the detail page: new `project-1.html` has the project name as `<h1>`, a "What it does" section and a "What I learned" section, and a "← Back to home" link to `index.html`. It reuses `styles.css` as-is (no new CSS needed) so it matches the rest of the site automatically. On `index.html`, the first project card is now wrapped in a `.project-card-link` anchor pointing to `project-1.html` (whole card is clickable, with a subtle hover/focus background change); Project Two and Three cards are still plain, non-clickable placeholders.
- ⚠️ Note: Day 7 (Review — no new building) was skipped; we jumped straight from Day 6 to this detail-page work. Worth circling back to do an actual review pass before going further.

---

## Day 9: Small interactive touch ✅
- [x] Add a small interactive/motion touch
- [x] Keep it subtle, not flashy

**Notes for next session:**
- Two touches added, both in `styles.css`: (1) Card One (the only clickable project card) now lifts slightly and gains a soft shadow on hover/focus, via `.project-card-link:hover .project-card` / `:focus` with `transition: transform 0.2s ease, box-shadow 0.2s ease` on `.project-card` — Cards Two and Three intentionally stay static since they aren't clickable yet. (2) `scroll-behavior: smooth` added to `html`, and the Header's placeholder text was replaced with a real `<nav>` (Home/About/Projects/Contact linking to `#top`/`#about`/`#projects`/`#contact`) so clicking any of those now smoothly scrolls to the section instead of jumping — this also gives the smooth-scroll CSS something real to act on.
- This partially addresses the Day 6 open question about the placeholder `<header>`: it now holds real nav content instead of "Header content goes here," though the separate `<h1>`+bio intro block above it is still not merged into the `<header>` — still worth deciding before Day 11 deploy.

---

## Day 10: Accessibility + performance pass ✅
- [x] Accessibility audit (images, contrast, keyboard nav, heading order)
- [x] Performance check (images, unused CSS, load-blocking resources)

**Notes for next session:**
- Accessibility audit passed: no images (nothing to alt-text), color contrast measured at 9.5:1–11.95:1 across every text/background combo in use (well above the 4.5:1 WCAG AA minimum), heading order is clean on both pages (h1 → h2 → h3, no skipped levels), and keyboard navigation now works fully including nav links and Card One's link. One real gap was found and fixed: no "skip to main content" link existed, so keyboard users had to tab through all 4 nav links every time — added a `.skip-link` (visually hidden until focused) in `styles.css`, plus `id="main-content"` on `index.html`'s `<main>`. Also added `<main>` landmarks (missing on both pages), `aria-label="Primary"` on the nav, and made the back-link arrow decorative (`aria-hidden`) on `project-1.html`.
- Performance check: no issues found. No images, no JS, no web fonts (system font stack), one small `styles.css` file, and every CSS selector in the file is actually used (checked each one against both HTML pages) — nothing to trim or optimize. Flagged for later (not acted on now): once real project images are added, give them explicit `width`/`height` and a compressed format like WebP.
- ⚠️ Still open from earlier days: Day 1's browser-check + bio-edit-via-prompt practice, Day 7's skipped review pass, the header/intro merge question, and About/Projects still being lorem ipsum placeholder (needs real copy before Day 11 deploy).

---

## Day 11: Deploy to GitHub Pages ✅ 🎉 Milestone reached
- [x] Site deployed live

**Notes for next session:**
- Live at https://huynd140196.github.io/ANM75-Portfolio/ — first public deployment milestone.
- The header/intro merge question (flagged since Day 6) is now resolved: `<h1>` + bio + nav were merged into one `<header>` block before this deploy.
- ⚠️ Important: the site went live **with known placeholder content still in place** — About and Projects text are still lorem ipsum, and the Contact section's mailto link is still the fake `your.email@example.com` address. These are now visible to real visitors and should be swapped for real content/email as the very next priority.
- Also still open: Day 1's browser-check + bio-edit-via-prompt practice (never closed out), and Day 7's review pass (skipped, never circled back to).

---

## Day 12: Get feedback ✅
- [x] Share draft with others
- [x] Collect feedback

**Notes for next session:**
- Shared the structural draft with Phòng PA05 colleagues. Feedback: make it feel "more sophisticated/creative," and keep the section names (Header/About/Projects/Contact) as-is.
- Acted on the feedback with a full visual + layout redesign:
  - **Design direction** (inspired by a reference site, no text/images/exact colors copied): dark charcoal theme (`#0b0e12`) with a sharp cyan accent (`#00e5ff`), monospace font for headings/nav/labels + sans-serif for body text, animated stat counters (Years of Operation / Systems Protected / Team Members — placeholder numbers), and project cards restyled as bold numbered cards (01/02/03) with outlined borders and an accent glow on hover. Added a small `script.js` for the counter count-up animation, respecting `prefers-reduced-motion`. Re-verified color contrast on the new palette (~9.5:1–12.6:1 across all combos) and confirmed no unused CSS crept in.
  - **Layout fix**: content had been stuck in one narrow centered column (`body` capped at `max-width: 700px`) even on wide desktop screens. Redistributed it: `header`/`main` now get their own `max-width: 1100px` container (decoupled from `body`), the hero splits into a two-column grid (name/tagline left, stats right) on `≥768px`, Projects switched from a flex row to a responsive CSS grid (`repeat(auto-fit, minmax(240px, 1fr))`, naturally 2–3 per row), and About got a two-column split (text + a CSS-only decorative "radar" visual, since no real image assets exist yet). Paragraph widths are explicitly clamped (`60ch`/`40em`) so text stays readable even in the wider layout. Everything still collapses to a single mobile column via the same mobile-first breakpoint pattern from Day 5.
  - Caught and fixed a bug during this work: `project-1.html`'s `<h1>` and back-link live directly in `<body>` (no `<header>` wrapper), so removing `body`'s width cap would have left them stretched full-width/misaligned against the now-centered 1100px `<main>` — added a `body > h1, body > p` rule to keep them aligned.
- ⚠️ Content is still placeholder and blocking real launch-readiness: About/Projects text is lorem ipsum, and the Contact mailto address is still `your.email@example.com`. Waiting on final copy from the office. Also still open: Day 1's browser-check + bio-edit-via-prompt practice, and Day 7's skipped review pass.

---

## Day 13: Iterate on feedback (not started)
## Day 14: Final polish + reflection (not started)

---

## How to update this file
At the end of each session, ask Claude Code:
```
Update PROGRESS.md: check off what we finished today and add a short
note about where we left off.
```
