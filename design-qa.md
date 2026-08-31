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

## Responsive and interaction checks

- Checked at 1440, 1024, 768, 390, and 320px
- Horizontal overflow: 0px at every checked viewport
- Mobile navigation fills the available viewport, locks background scrolling, closes cleanly, and exposes the primary Instagram action
- Lesson steps activate one at a time and update the progress indicator while scrolling
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
