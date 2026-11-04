# Real World Electric website

Static source for https://realworldelectric.com. The calculator remains a separate application at https://loadcalculation.realworldelectric.com/.

## Pages

- `/`: residential electrical load planning, CEC Section 8 context, services and guides.
- `/single-line-diagrams/`: qualified diagram service and email-draft request flow.
- `/load-calculation-sign-off/`: existing online and in-home review options.
- `/homeowner-consultations/`: $150 CAD / 60-minute video consultations, currently requested by email.
- `/guides/`: five guides covering residential load planning and homeowner consultations.

This is plain HTML, CSS and small progressive JavaScript enhancements. There is no build step, framework, remote font or required external runtime dependency. Serve the repository root as the static site. Shared navigation remains usable without JavaScript.

## Consultation and request behavior

The consultation links currently open an email draft. They do not reserve a time, charge a card or create a meeting. Cal.com/Stripe activation is separate work; only replace these links after a real paid booking URL and its behavior have been verified. Keep the $150 CAD / 60-minute terms consistent across the service page, guide and metadata.

The SLD form validates input, presents an editable draft and offers an email link plus copy fallback. It never claims to submit or upload files. No customer test messages should be sent during verification.

## Public indexing

Production pages use self-referencing realworldelectric.com canonicals and permit indexing. `robots.txt` allows crawling and points to `sitemap.xml`, which contains all ten public content routes. Keep sitemap modification dates tied to meaningful page changes. The original four guide bodies are preserved, so their prior content dates remain.

The separate owner-private review site has noindex/Disallow settings. Never copy those restrictions into this production tree. Search Console property or Change of Address settings do not need to change for a redesign on the same domain. An optional request to recrawl important updated/new pages does not guarantee indexing.

After release, check public HTTP responses, canonical URLs, the sitemap and the absence of hosting-level X-Robots-Tag: noindex. A successful Git push alone does not prove that hosting has finished deployment.

## Maintenance and validation

- `assets/site.css` and `assets/site.js`: shared design/navigation.
- Page styles and the SLD request script are separate files.
- Keep shared headers and footers consistent across all ten HTML pages.
- `DESIGN_RESOURCES.md` and `assets/licenses/` retain source attribution and licenses.

Run `python scripts/check_site.py`, `node --check assets/site.js`, `node --check assets/sld-request.js`, and `git diff --check`. Browser verification should cover narrow and desktop layouts, keyboard navigation, email-draft review/edit/copy, and no-JavaScript contact links. Automated checks do not replace screen-reader testing.

The calculator application, its backend and the separate migration repository are outside this website release. No calculator compliance or inspection-approval guarantee is made.
