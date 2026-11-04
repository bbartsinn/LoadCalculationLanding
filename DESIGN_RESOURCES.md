# Design resource attribution

Reviewed 3 November 2026 for this Real World Electric redesign. This document records the selected sources and how they inform the implementation. It is not a claim that every service in the original reference list was integrated.

## Selected resources

### Magic UI — schematic trace

The homepage house illustration uses an adaptation of the paired-path approach in [Animated Beam](https://magicui.design/docs/components/animated-beam): a neutral SVG connection with a colored trace following the same geometry. The cutaway home, equipment illustration and layout are original SVG artwork created for this site. The service path is conceptual, not a wiring diagram. The source pattern is reduced to native SVG/CSS so the static website does not acquire a React or Motion dependency. The illustration carries no equipment ratings or approval marks. Animation must remain nonessential and respect reduced motion.

- Official registry source: https://magicui.design/r/animated-beam.json
- Readable upstream source: https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/animated-beam.tsx
- Official license: https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE.md
- License: MIT; copyright (c) Magic UI.
- Full license downloaded from the official repository and retained in `dist/assets/licenses/magicui.txt`.

### Lucide — navigation and controls

Mail and copy geometry is retained for the existing request actions. The redesign adds arrow-right and arrow-up-right geometry to directional links and calculator geometry where the calculator is identified. The guide index uses right arrows on all four whole-row links and an up-right arrow on the calculator link. Visible labels remain the accessible names; accompanying SVGs are hidden from assistive technology and cannot receive focus. Geometry is inline and contains no script, event handlers, foreign objects or external references. Dimensions, stroke width and accessibility attributes may differ from upstream.

- Icons: https://lucide.dev/icons/
- License and Feather-derived notices: https://lucide.dev/license
- Accessibility guidance: https://lucide.dev/how-to/accessibility
- Pinned source commit: `1980e3d59b0fa1a2aeb566d5902b25ee98204001`.
- Complete license retained in `dist/assets/licenses/lucide.txt`.
- Exact source URLs, original byte counts and SHA-256 hashes retained in `dist/assets/licenses/lucide-sources.json`.

Lucide uses the ISC license. Feather-derived icons, including the arrows, also retain the upstream MIT notice. Both notices are distributed with this website. No icon CDN, font or JavaScript package is required.

### Uiverse — service-link border response

Service links retain a restrained adaptation of [Alex Ruiz's card](https://uiverse.io/alexruix/cowardly-ape-35). Its responsive border is applied to a native link rather than a container with a hidden button. The redesigned layout, spacing, content and hierarchy are original. Hover and keyboard focus should give equivalent feedback; essential actions remain visible without hovering.

- Selected component and author license: https://uiverse.io/alexruix/cowardly-ape-35
- License: MIT; copyright 2026 alexruix (Alex Ruiz).
- Full author notice retained in `dist/assets/licenses/uiverse-alexruix-card.txt`.
- No Uiverse design pack, account-gated asset or runtime dependency is included.

## Other references

[Realtime Colors](https://www.realtimecolors.com/) was reviewed for palette roles and contrast guidance. This redesign uses warm white `#f8f8f4`, charcoal `#20241f`, muted text `#60665f`, line `#dedfd7`, and yellow `#f4cf53`. The service permits commercial use of generated colors; its own website code has a separate license and is not copied. Contrast must be assessed against the actual rendered combinations rather than inferred from a palette alone.

[Fontjoy](https://fontjoy.com/) was reviewed for typographic pairing. No Fontjoy code, downloaded font, or account-only feature is included. The site retains a native system-font stack.

21st.dev, React Bits, Mobbin, Haikei, unDraw and LottieFiles are not dependencies or asset sources in this implementation. No paid templates, animations or third-party screenshots are used. In particular, a component marketplace account does not by itself grant a license to every component. No attempt was made to bypass Mobbin's access restriction.

## Maintenance

The site remains static HTML, CSS and small progressive JavaScript enhancements. Existing useful guide substance and calculator destinations are preserved. Source attribution stays with the code; visitors do not need a tools-used section to understand or use the service.

No customer data was sent to a design resource. This work added no paid plan, subscription, design-service credential, tracking script, remote font, or third-party runtime.

## Homepage information revision

The homepage now explains audience, property inputs, equipment loads, watts/amps outputs and City form exports before a visitor starts the calculator. Its original cutaway-home graphic shows the loads in context. CEC Section 8 is explained as code context, with official Calgary and Alberta references. No edition-specific calculator compliance or certification claim is made.

## Homeowner consultation addition

The consultation service uses the established palette, typography, shared navigation and licensed arrow icons. `consultation-plan.svg` is an original vector illustration of a planning conversation: a room plan, video window and checklist. It is illustrative, not an installation drawing. No third-party photos, fabricated testimonials or new runtime packages were added.
