# Design QA

## Visual target

- Selected direction: option 1, Korean editorial split hero
- Intentional deviation: the production header is 54 to 56px tall, smaller than the concept header at the user's request
- Production portrait: the selected real profile photograph, not an AI-generated substitute

## Comparison passes

| Pass | Viewport | Finding | Resolution |
| --- | --- | --- | --- |
| 1 | 1136 x 1024 | Hero actions were less faithful to the selected vertical composition | Stacked both actions and matched their visual width |
| 1 | 390 x 844 | Mobile menu inherited the sticky header's containing block and did not fill the viewport | Set an explicit viewport-relative height, solid paper surface, and start alignment |
| 1 | 372 x 1024 | Mobile hero copy occupied a full viewport and delayed the portrait too far below the fold | Removed the mobile minimum height and tightened the title scale |
| 1 | 320 to 1440 | Portrait entrance transform temporarily created 2 to 3px of horizontal overflow | Replaced horizontal translation with a clipped image reveal |
| 2 | 1136 x 1024 | Desktop composition matched the selected hierarchy with the requested smaller header | Passed |
| 2 | 372 x 1024 | Mobile title, actions, and portrait followed the selected sequence without excess empty space | Passed |
| 3 | 1440 x 900 | Text-only works and oversized lesson steps left too much unused desktop space | Added a four-cover editorial shelf and fit all six lesson steps into one viewport |
| 3 | 1440 x 900 | The standalone expertise and collaboration sections added low-density screens | Removed the requested expertise section and combined collaboration with contact |
| 3 | 1440 x 900 | A partial wheel movement could leave the next topic between sections | Added desktop-only mandatory scroll snapping with one topic per viewport |
| 3 | 320 to 768 | Full-screen snapping would make touch scrolling feel constrained | Kept natural mobile and tablet scrolling with a two-column book shelf |
| 4 | 320 to 768 | Each mobile lesson step occupied 72% of the viewport and felt excessively tall | Reduced steps to compact content-driven rows with 32px vertical padding |
| 4 | 320 to 1440 | Book information links shifted vertically with title and description length | Reserved a two-line title block and pinned links to the bottom of each grid row |
| 4 | 320 to 1440 | The original warm paper surface appeared yellowed on screen | Shifted the base to neutral warm white `#F8F7F2` with lighter supporting surfaces |
| 5 | 16 to 180 | The profile-photo favicon overemphasized the person and lost recognition at tab size | Replaced it with a dedicated open-book and walking-path brand symbol |

## Responsive and interaction checks

- Checked at 1440, 1024, 768, 390, and 320px
- Horizontal overflow: 0px at every checked viewport
- Mobile navigation fills the available viewport, locks background scrolling, closes cleanly, and exposes the primary Instagram action
- Desktop lesson steps reveal in a short stagger and remain together in one viewport; mobile steps activate progressively while scrolling
- Mobile lesson rows now show roughly two to three steps per viewport instead of one oversized step
- At 1440 x 900 the 56px header and 844px hero fill the first viewport exactly; the next section begins at 900px
- Desktop scroll snapping lands the next topic at 56px below the sticky header and is disabled for reduced motion
- Four self-hosted AVIF/WebP covers load at their verified 500px source width
- Book titles and information links share consistent baselines across the desktop row and both mobile rows
- Brand icon remains recognizable at 16px and uses the same forest and warm-white tokens as the site
- Education-area controls expose `aria-expanded` and `aria-hidden` state
- Instagram and telephone links retain their intended destinations
- Focus-visible and reduced-motion rules are present
- Core content remains visible without JavaScript; JavaScript only adds progressive reveals and interactions

## Build evidence

- Astro typecheck: passed with zero errors, warnings, or hints
- Public-content audit: passed
- Static build and internal link check: passed
- Browser console: no application errors

final result: passed
