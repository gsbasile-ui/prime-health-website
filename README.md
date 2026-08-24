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

## Files

- `index.html` - full static landing page with EN/ES/DE language switching, program cards, scroll animations, active nav state, and the lead form.
- `api/leads.mjs` - same-origin Vercel Function that validates and securely forwards guide requests.
- `integrations/google-apps-script/` - Google automation that stores leads in Sheets and Contacts and emails Gianfranco.
- `tests/leads-api.test.mjs` - validation and forwarding tests for the lead endpoint.
- `sandro-rodriguez/` - public Spanish client guide with first-month instructions, food filters, five breakfast combinations, and Walmart purchase links.
- `assets/prime-health-logo.jpg` - approved Prime Health Co. logo.
- `assets/founder-field.jpg` - approved founder photo for hero/founder visuals.
- `assets/founder-sky.jpg` - approved founder photo for founder story visuals.
- `vercel.json` - static deployment config.
- `.gitignore` - excludes local Vercel metadata and environment files.

## Notes

- No medical or clinical claims are made.
- Booking CTAs currently route to Instagram because no dedicated booking link was provided.
- Prime Health coaching is presented as educational and habit-based, not medical advice, diagnosis, or treatment.
- If the two founder JPGs are not present locally, the page uses non-broken visual fallback panels until the files are added.

## Lead Capture

- The guide form collects name, email, phone number, and explicit contact consent.
- The browser sends submissions only to the same-origin `/api/leads` endpoint; Google credentials and webhook secrets never reach client-side code.
- Google Apps Script creates a Google Contact under `primexhealthgs@gmail.com`, records the lead in a private Google Sheet, and sends an email notification to the same account.
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
