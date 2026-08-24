# Prime Health lead automation

This Google Apps Script receives validated leads from the Vercel Function, stores them in Google Sheets, creates a Google Contact, and emails `primexhealthgs@gmail.com`.

## One-time Google setup

1. Sign in to `script.google.com` as `primexhealthgs@gmail.com` and create a standalone Apps Script project named `Prime Health Website Leads`.
2. Add `Code.gs` and replace the project manifest with `appsscript.json`.
3. In **Project Settings**, enable viewing `appsscript.json`. Confirm the People advanced service is present under **Services**.
4. In **Project Settings > Script properties**, add `PRIME_HEALTH_LEADS_SECRET` with a long random value.
5. Run a setup execution once to grant Contacts, Sheets, Drive, and Mail permissions.
6. Select **Deploy > New deployment > Web app**. Execute as the deploying user and allow access to anyone.
7. Copy the `/exec` deployment URL.

## Vercel variables

Add both values to Production, Preview, and Development:

- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`: the Apps Script `/exec` URL.
- `PRIME_HEALTH_LEADS_SECRET`: the same random value stored in Apps Script properties.

Never place either value in `index.html`, commit it to Git, or expose it in browser code.

## Phone synchronization

Google Contacts must be enabled in the phone account settings for `primexhealthgs@gmail.com`. New website leads will then appear in the phone's Contacts app.
