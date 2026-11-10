# Islah 2.0 — orange reference-direction redesign

## Reference and scope

The request describes an attached reference, but no image attachment is available in the conversation/tool inputs. Implementation therefore follows the written composition specification; direct image similarity is **unverified**, not claimed. The previous green split-hero design is superseded in the isolated Astro app only. Production Next.js files, original content and current URLs are not rewritten by this design pass.

## Design foundation

- Ink `#111111`, background `#F8F8F6`, surfaces `#FFFFFF`, accent `#FF4D1C`, secondary text `#666666`, border `#E5E5E5`.
- Orange buttons use dark text for contrast; small orange-toned text uses darker `#A72B09`, not the bright accent on white.
- System-resolved Inter / Segoe UI / Arial stack: no external font connections or new font dependency. This does not claim Inter is installed on every device.
- Centered large hero, pill badge, orange/outlined CTAs, black pill desktop navigation, rounded white floating frame, fine surrounding grid and warm radial gradients.
- Original HTML/CSS/SVG dashboard, not a product screenshot. Sidebar, metric cards, trend lines, preparation bars, activity chart and floating opportunity card. No chart library or new runtime dependency.
- Responsive typography with clamp; 1240px content width; 18–36px radii; section spacing scales from 56–112px.
- Desktop dashboard has mild perspective. Tablet removes most depth; mobile stacks readable cards rather than shrinking an entire desktop screenshot. No horizontal-scroll-only dashboard.
- One-shot entrance/progress motion and subtle hover elevation; reduced-motion disables animations and transforms. No heavy parallax or sending interaction.

## Implemented composition

`src/components/SiteHeader.astro`: requested seven navigation links and Book a Call CTA; native details mobile menu.

`src/pages/index.astro`: requested headline/subheading/CTAs, two service journeys, eight capabilities, four process steps, Why Islah, four homepage industry cards, four custom-quoted packages, honest case-study migration state, separate research/managed FAQs and final CTA.

`src/components/OutreachDashboard.astro`: fictional illustrative counts, no percentages represented as business results, adjacent disclosure and `data-md-exclude` for future machine extraction. Decorative charts are hidden from assistive technology; descriptive text communicates their purpose. The dashboard is not interactive navigation or an email platform.

`src/styles/global.css`: shared design tokens and responsive components, including secondary pages/forms. Homepage content is editable in `src/data/homepage.ts`; services and packages remain in their typed data files. Live Sanity content integration remains a separate unfinished migration item.

`SiteFooter.astro`: consistent logo, original service/industry/legal links and the founder's LinkedIn/Upwork URLs verified against `lib/author.ts`. No ratings or external-profile results are asserted.

## Safety/content decisions

- Fully managed services remain explicitly approval-required. The requested headline is used as positioning, not accompanied by a sales guarantee.
- Every illustrative dashboard number is labeled as fictional/illustrative. No client names, prospect records, fabricated testimonials or numerical prices are added.
- Marketing Agencies is a homepage scoping card linking to Contact, not an automatically generated industry landing page. Existing recruitment/property URLs remain available.
- Case Studies links to the retained `/portfolio` path; Book a Call uses `/free-consultation`. No duplicate keyword routes or unnecessary redirects.
- Existing blog and portfolio content was not deleted. Preview indexes retain migration-pending states until DB/file/publication/evidence reconciliation is approved.
- Existing local mock validation, fail-closed hosted submissions, noindex protection and migration maps are retained. No credentials, deployment, CRM enrollment or campaign operations were added.
- Metadata includes canonical, Open Graph and Twitter title/description. Production sitemap and machine-readable parity remain migration release gates; no incomplete/noindex route set is advertised as a production sitemap.

## QA and visual review

Commands: `npm run lint`, `npm run check`, `npm test`, `npm run build`, `npm run qa:build`, then separately `npm run qa:browser`.

Build check asserts new exact headline and adjacent dashboard disclosure. Browser checks cover 320/375/768/1024/1440 widths, 35 route/viewport pairs, navigation, FAQ, fictional mock submission, 404, sampled axe WCAG A/AA checks and reduced-motion behavior. All checks are local; external browser requests are blocked.

Screenshots generated under ignored `artifacts/`:
- `home-desktop.png` and `hero-desktop.png` — 1440px viewport
- `home-tablet.png` and `hero-tablet.png` — 768px viewport
- `home-mobile.png` and `hero-mobile.png` — 375px viewport

Initial capture review identified a gray pseudo-layer covering the white hero surface; corrected to a transparent bordered layer with an offset shadow. Mobile fictional-data disclosure and progress labels were enlarged. Full-page mobile imagery is intentionally tall because requested sections and dashboard panels stack rather than clip.

A repeated four-H1 browser failure was diagnosed with actual heading texts: the page H1 plus Astro toolbar headings “Audit”, “No accessibility or performance issues detected.” and “Settings”. The test harness disables devToolbar, preserving the strict page-heading assertion and removing development-only screenshot clutter. This supplies evidence for the previously unexplained intermittent count; it is not a production heading defect.

Final validation: lint PASS; Astro check PASS (0 errors, 0 warnings, four existing deprecation hints); 36 unit tests PASS; Vercel build PASS; 24-page generated metadata/link checks PASS; 35 route/viewport browser checks PASS, four sampled axe checks PASS, reduced-motion assertions PASS. The combined command reached its 180-second limit after the successful build checks and while starting browser QA. Browser QA was then run separately and passed within its original 100-second bound. Desktop, tablet and mobile hero captures were inspected after the white-frame/mobile-legibility corrections.

Direct comparison to the unavailable reference, screen-reader/manual keyboard certification, live integrations, complete CMS migration and production performance remain unverified. No Lighthouse score or production readiness claim is made.
