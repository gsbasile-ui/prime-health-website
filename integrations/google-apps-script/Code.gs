const CONTACT_EMAIL = "primexhealthgs@gmail.com";
const SHEET_NAME = "Website Leads";
const SPREADSHEET_TITLE = "Prime Health Website Leads";

function setup() {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty("PRIME_HEALTH_LEADS_SECRET")) {
    throw new Error("Add PRIME_HEALTH_LEADS_SECRET in Script properties before running setup.");
  }

  if (!properties.getProperty("LEAD_SPREADSHEET_ID")) {
    const spreadsheet = SpreadsheetApp.create(SPREADSHEET_TITLE);
    const sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_NAME);
    sheet.appendRow(["Fecha", "Nombre", "Correo", "Teléfono", "Idioma", "Fuente", "ID", "Consentimiento"]);
    sheet.setFrozenRows(1);
    properties.setProperty("LEAD_SPREADSHEET_ID", spreadsheet.getId());
  }

  People.People.get("people/me", { personFields: "names" });
  console.log("Setup complete. Remaining email quota: " + MailApp.getRemainingDailyQuota());
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(event.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("PRIME_HEALTH_LEADS_SECRET");
    if (!expectedSecret || data.secret !== expectedSecret) return respond_({ ok: false, error: "Unauthorized" });

    const lead = validateLead_(data);
    appendLead_(lead);
    const contact = createContact_(lead);
    sendNotification_(lead, contact.resourceName || "");
    return respond_({ ok: true });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return respond_({ ok: false, error: "Lead processing failed" });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validateLead_(data) {
  const lead = {
    submissionId: clean_(data.submissionId, 80),
    submittedAt: clean_(data.submittedAt, 40),
    source: clean_(data.source, 80),
    language: clean_(data.language, 5),
    name: clean_(data.name, 80),
    email: clean_(data.email, 160).toLowerCase(),
    phone: clean_(data.phone, 24),
    consent: data.consent === true
  };
  if (!lead.submissionId || !lead.name || !lead.email || !lead.phone || !lead.consent) {
    throw new Error("Invalid lead payload");
  }
  return lead;
}

function appendLead_(lead) {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty("LEAD_SPREADSHEET_ID");
  let spreadsheet;
  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_TITLE);
    properties.setProperty("LEAD_SPREADSHEET_ID", spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Fecha", "Nombre", "Correo", "Teléfono", "Idioma", "Fuente", "ID", "Consentimiento"]);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    lead.submittedAt || new Date().toISOString(),
    lead.name,
    lead.email,
    lead.phone,
    lead.language,
    lead.source,
    lead.submissionId,
    "Sí"
  ]);
}

function createContact_(lead) {
  const nameParts = lead.name.split(/\s+/);
  const givenName = nameParts.shift();
  const person = {
    names: [{ givenName: givenName, familyName: nameParts.join(" ") }],
    emailAddresses: [{ value: lead.email, type: "other" }],
    phoneNumbers: [{ value: lead.phone, type: "mobile" }],
    organizations: [{ name: "Prime Health", title: "Website Lead" }],
    userDefined: [
      { key: "Source", value: "Prime Health website" },
      { key: "Submission ID", value: lead.submissionId }
    ]
  };
  return People.People.createContact(person, {
    personFields: "names,emailAddresses,phoneNumbers,organizations,userDefined"
  });
}

function sendNotification_(lead, resourceName) {
  const subject = "Nuevo contacto desde Prime Health: " + lead.name;
  const body = [
    "Nuevo contacto desde la página de Prime Health.", "",
    "Nombre: " + lead.name,
    "Correo: " + lead.email,
    "Teléfono: " + lead.phone,
    "Idioma: " + lead.language.toUpperCase(),
    "Fecha: " + lead.submittedAt,
    "Google Contact: " + (resourceName || "Creado"), "",
    "El contacto también quedó registrado en Google Sheets."
  ].join("\n");
  const htmlBody = [
    "<h2>Nuevo contacto desde Prime Health</h2>",
    "<p><strong>Nombre:</strong> " + escapeHtml_(lead.name) + "</p>",
    "<p><strong>Correo:</strong> <a href=\"mailto:" + encodeURIComponent(lead.email) + "\">" + escapeHtml_(lead.email) + "</a></p>",
    "<p><strong>Teléfono:</strong> <a href=\"tel:" + escapeHtml_(lead.phone) + "\">" + escapeHtml_(lead.phone) + "</a></p>",
    "<p><strong>Idioma:</strong> " + escapeHtml_(lead.language.toUpperCase()) + "</p>",
    "<p><strong>Fecha:</strong> " + escapeHtml_(lead.submittedAt) + "</p>",
    "<p>El contacto fue guardado en Google Contacts y registrado en Google Sheets.</p>"
  ].join("");
  MailApp.sendEmail({
    to: CONTACT_EMAIL,
    replyTo: lead.email,
    subject: subject,
    body: body,
    htmlBody: htmlBody,
    name: "Prime Health Website"
  });
}

function clean_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function respond_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
