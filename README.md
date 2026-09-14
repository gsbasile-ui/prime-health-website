# Prime Health Website

Static website for Prime Health, a health and habits coaching brand by Gianfranco Stracuzzi.

## Production Deployment

- Public URL: https://prime-health-co.vercel.app
- Vercel project: `giancarlo-soto-s-projects/prime-health-co`
- Git source: `gsbasile-ui/prime-health-website`
- Production branch: `main`
- Deployment: automatic through the Vercel Git integration on every push to `main`.
- Domain assignment: verified Vercel production domain attached directly to the project.
- GitHub Pages is disabled; GitHub remains the source repository only.

## Source Evidence

Public Instagram metadata verified on June 13, 2026:

- `@prime_health_co`: Gianfranco Stracuzzi / Health & Habits Coach. Positioning: more energy, better sleep, better health, real food, real habits, real results, the EUR 10 Real Food Challenge, and 1:1 work.
- `@gstracuzzi10`: Gianfranco Stracuzzi personal profile. It links attention back to `@prime_health_co` and includes soccer/personal-brand context.

## Public Routes

- `/` - conversion-focused overview, results, PRIME method, founder preview, and program preview.
- `/programas/` - accessible program comparison, expandable program details, process, and FAQ.
- `/gianfranco/` - Gianfranco's founder story, football journey, recovery, faith, and PRIME philosophy.
- `/recursos/` - guide request form and direct WhatsApp, Calendly, and email contact paths.
- `/privacidad/` - operational privacy notice in Spanish, English, and German.
- `/sandro-rodriguez/` - existing personalized client guide, intentionally separate from the marketing navigation.

## Files

- `index.html` and the route folders above - static multilingual pages.
- `assets/content.js` - shared translations, program data, comparison matrix, and FAQ content.
- `assets/site.css` - shared responsive design and motion system.
- `assets/site.js` - shared navigation, language state, program interactions, lead form, and analytics events.
- `api/leads.mjs` - same-origin Vercel Function that validates and securely forwards guide requests.
- `integrations/google-apps-script/` - Google automation that stores leads in Sheets and Contacts and emails Gianfranco.
- `tests/leads-api.test.mjs` - validation and forwarding tests for the lead endpoint.
- `sandro-rodriguez/` - public Spanish client guide with first-month instructions, food filters, five breakfast combinations, and Walmart purchase links.
- `assets/prime-health-logo.jpg` - approved Prime Health Co. logo.
- `vercel.json` - static deployment config.
- `.gitignore` - excludes local Vercel metadata and environment files.

## Notes

- No medical or clinical claims are made.
- Sales CTAs route to WhatsApp or the free 30-minute Calendly consultation; prices are intentionally not published.
- Prime Health coaching is presented as educational and habit-based, not medical advice, diagnosis, or treatment.
- Cookie-free Vercel Web Analytics records page views. Custom interaction events are queued only when the project's Vercel plan accepts them.

## Lead Capture

- The guide form collects name, email, phone number, optional program interest, and explicit contact consent.
- The browser sends submissions only to the same-origin `/api/leads` endpoint; Google credentials and webhook secrets never reach client-side code.
- Google Apps Script creates a Google Contact under `primexhealthgs@gmail.com`, records the lead and program interest in a private Google Sheet, and sends an email notification to the same account.
- Required Vercel variables: `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` and `PRIME_HEALTH_LEADS_SECRET`.
- One-time Google setup and phone-sync instructions are in `integrations/google-apps-script/README.md`.

## Personalized Client Guides

- Sandro Rodriguez: `https://prime-health-co.vercel.app/sandro-rodriguez`
- The Sandro guide is public by direct URL but is intentionally omitted from the marketing-site navigation.
- Product links open Walmart in a new tab. Product availability, price, pickup, and delivery depend on the shopper's location.
- The guide footer carries the official VTS mark and a linked `Powered by Visionary Technologies Systems` credit.

## Vault Connection

Parent client index: [[03 Clients/Client Records/Client Records Index|Client Records Index]]

Raw plan source: [[03 Clients/Client Records/Prime Health/Sources/Sandro Rodriguez Food and First Month Instructions.txt|Sandro Rodriguez Food and First Month Instructions]]
