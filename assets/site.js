(() => {
  "use strict";

  const content = window.PrimeHealthContent;
  if (!content) return;

  const routes = {
    home: "/",
    programs: "/programas/",
    gianfranco: "/gianfranco/",
    resources: "/recursos/"
  };
  const page = document.body.dataset.page || "home";
  const storageKey = "primeHealthLanguageV3";
  const legacyStorageKey = "primeHealthLanguageV2";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const whatsappNumber = "393533233841";
  const calendlyUrl = "https://calendly.com/gstracuzzi1213/30min";
  let language = getStartingLanguage();
  let revealObserver;

  function getStartingLanguage() {
    const saved = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
    return content.languages.includes(saved) ? saved : content.defaultLanguage;
  }

  function t(key) {
    return content.strings[language][key] || content.strings.es[key] || key;
  }

  function getPrograms() {
    return content.programs[language] || content.programs.es;
  }

  function getProgram(id) {
    return getPrograms().find((program) => program.id === id);
  }

  function selectedProgramFromUrl() {
    const query = new URLSearchParams(window.location.search).get("program");
    const hash = window.location.hash.replace(/^#/, "");
    return [query, hash].find((value) => getProgram(value)) || "general";
  }

  function programTitle(id) {
    return getProgram(id)?.title || t("form.programGeneral");
  }

  function whatsappUrl(programId = "general") {
    const title = programId === "general" ? "" : programTitle(programId);
    const messages = {
      es: title
        ? `Hola Gianfranco, estoy listo para dejar las excusas atrás y empezar a construir mi mejor versión contigo. Me interesa el programa ${title}.`
        : "Hola Gianfranco, estoy listo para dejar las excusas atrás y empezar a construir mi mejor versión contigo.",
      en: title
        ? `Hi Gianfranco, I am ready to leave excuses behind and start building my best version with you. I am interested in the ${title} program.`
        : "Hi Gianfranco, I am ready to leave excuses behind and start building my best version with you.",
      de: title
        ? `Hallo Gianfranco, ich bin bereit, Ausreden hinter mir zu lassen und mit dir meine beste Version aufzubauen. Ich interessiere mich für das Programm ${title}.`
        : "Hallo Gianfranco, ich bin bereit, Ausreden hinter mir zu lassen und mit dir meine beste Version aufzubauen."
    };
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messages[language])}`;
  }

  function renderHeader() {
    const header = document.querySelector("#siteHeader");
    if (!header) return;
    header.innerHTML = `
      <a class="skip-link" href="#main" data-i18n="nav.skip"></a>
      <div class="scroll-progress" aria-hidden="true"><span id="scrollProgress"></span></div>
      <div class="site-header">
        <div class="shell nav-shell">
          <a class="brand" href="/" data-transition-link aria-label="Prime Health">
            <span class="brand-mark"><img src="/assets/prime-health-logo.jpg" alt=""></span>
            <span><span class="brand-name">Prime Health</span><span class="brand-tagline" data-i18n="brand.tagline"></span></span>
          </a>
          <nav class="nav-main" id="mainNav" aria-label="Primary navigation">
            ${Object.entries(routes).map(([key, href]) => `<a class="nav-link" href="${href}" data-page-link="${key}" data-transition-link data-i18n="nav.${key}"></a>`).join("")}
          </nav>
          <div class="nav-tools">
            <div class="language-switch" aria-label="Language">
              ${content.languages.map((lang) => `<button class="lang-btn" type="button" data-lang="${lang}" aria-pressed="${lang === language}">${lang.toUpperCase()}</button>`).join("")}
            </div>
            <button class="menu-toggle" id="menuToggle" type="button" aria-controls="mainNav" aria-expanded="false" aria-label="${t("nav.open")}"><span></span></button>
          </div>
        </div>
      </div>`;
    const current = header.querySelector(`[data-page-link="${page}"]`);
    if (current) current.setAttribute("aria-current", "page");
  }

  function renderFooter() {
    const footer = document.querySelector("#siteFooter");
    if (!footer) return;
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="shell footer-main">
        <div>
          <a class="brand" href="/" data-transition-link aria-label="Prime Health">
            <span class="brand-mark"><img src="/assets/prime-health-logo.jpg" alt=""></span>
            <span><span class="brand-name">Prime Health</span><span class="brand-tagline" data-i18n="brand.tagline"></span></span>
          </a>
          <p class="footer-copy" data-i18n="footer.copy"></p>
        </div>
        <div class="footer-links">
          <a href="/programas/" data-transition-link data-i18n="nav.programs"></a>
          <a href="/gianfranco/" data-transition-link data-i18n="nav.gianfranco"></a>
          <a href="/recursos/" data-transition-link data-i18n="nav.resources"></a>
          <a href="/privacidad/" data-transition-link data-i18n="footer.privacy"></a>
          <a href="https://www.instagram.com/prime_health_co/" target="_blank" rel="noopener noreferrer" data-i18n="footer.instagram"></a>
        </div>
      </div>
      <div class="vts-credit">
        <a class="vts-powered" href="https://visionary-technologies-system-websi.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit Visionary Technologies Systems">
          <img src="/assets/vts-powered-by.png" alt=""><span data-i18n="footer.vts"></span>
        </a>
      </div>`;
  }

  function applyTranslations() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });
    const menuToggle = document.querySelector("#menuToggle");
    if (menuToggle) menuToggle.setAttribute("aria-label", t("nav.open"));
    updateContactLinks();
  }

  function renderProgramPreviews() {
    const target = document.querySelector("#programPreviewGrid");
    if (!target) return;
    target.innerHTML = getPrograms().map((program) => `
      <a class="program-preview reveal ${program.elite ? "elite" : ""}" href="/programas/#${program.id}" data-program-link="${program.id}" data-transition-link>
        <img src="${program.image}" alt="" loading="lazy">
        <div class="program-preview-content">
          <span class="eyebrow">${program.label}</span>
          <h3>${program.title}</h3>
          <div class="duration">${program.duration}</div>
          <p>${program.summary}</p>
        </div>
      </a>`).join("");
  }

  function cellMarkup(value) {
    if (value === true) return `<span class="check" aria-label="${t("common.included")}">✓</span>`;
    if (value === false) return `<span class="dash" aria-label="${t("common.notIncluded")}">—</span>`;
    return value;
  }

  function renderComparison(activeId = selectedProgramFromUrl() === "general" ? "prime-elite" : selectedProgramFromUrl()) {
    const tableTarget = document.querySelector("#comparisonTable");
    const selectorTarget = document.querySelector("#programSelector");
    if (!tableTarget || !selectorTarget) return;
    const programs = getPrograms();
    const rows = content.comparison[language];
    selectorTarget.innerHTML = programs.map((program) => `
      <button class="program-select-btn" type="button" data-select-program="${program.id}" aria-pressed="${program.id === activeId}">${program.title}</button>`).join("");
    tableTarget.innerHTML = `
      <thead><tr>
        <th scope="col">${t("programs.feature")}</th>
        ${programs.map((program) => `<th scope="col" class="${program.elite ? "elite-column" : ""} ${program.id === activeId ? "active-column" : ""}" data-column="${program.id}">
          <button class="comparison-head" type="button" data-select-program="${program.id}">
            <small>${program.label}</small><strong>${program.title}</strong><span>${program.duration}</span>
          </button>
        </th>`).join("")}
      </tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${row[0]}</td>${row.slice(1).map((value, index) => {
        const program = programs[index];
        return `<td class="${program.elite ? "elite-column" : ""} ${program.id === activeId ? "active-column" : ""}" data-column="${program.id}">${cellMarkup(value)}</td>`;
      }).join("")}</tr>`).join("")}</tbody>`;
    bindProgramSelection();
  }

  function renderProgramDetails(openId = selectedProgramFromUrl()) {
    const target = document.querySelector("#programDetails");
    if (!target) return;
    const programs = getPrograms();
    target.innerHTML = programs.map((program, index) => `
      <details class="program-detail reveal ${program.elite ? "elite-detail" : ""}" id="${program.id}" data-program-detail="${program.id}" ${program.id === openId ? "open" : ""}>
        <summary>
          <span class="program-number">0${index + 1}</span>
          <span class="program-summary-title"><strong>${program.title}</strong><span>${program.label}</span></span>
          <span class="duration">${program.duration}</span>
          <span class="expand-icon" aria-hidden="true">+</span>
        </summary>
        <div class="program-detail-body">
          <div class="detail-block"><h4>${t("programs.ideal")}</h4><p>${program.ideal}</p></div>
          <div class="detail-block"><h4>${t("programs.support")}</h4><p>${program.support}</p></div>
          <div class="detail-block"><h4>${t("programs.focus")}</h4><ul>${program.focus.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          <div class="detail-block"><h4>${t("programs.takeaways")}</h4><ul>${program.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          <div class="program-detail-actions">
            <a class="button whatsapp-link" href="${whatsappUrl(program.id)}" data-program="${program.id}" target="_blank" rel="noopener noreferrer">${t("cta.whatsapp")}</a>
            <a class="button secondary calendly-link" href="${calendlyUrl}" data-program="${program.id}" target="_blank" rel="noopener noreferrer">${t("cta.call")}</a>
          </div>
        </div>
      </details>`).join("");
    target.querySelectorAll("details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        target.querySelectorAll("details[open]").forEach((other) => {
          if (other !== detail) other.open = false;
        });
        const id = detail.dataset.programDetail;
        history.replaceState(null, "", `#${id}`);
        highlightProgram(id);
        track("Program viewed", { program: id });
      });
    });
  }

  function bindProgramSelection() {
    document.querySelectorAll("[data-select-program]").forEach((button) => {
      button.addEventListener("click", () => openProgram(button.dataset.selectProgram, true));
    });
  }

  function openProgram(id, scrollToDetails) {
    const detail = document.querySelector(`[data-program-detail="${id}"]`);
    if (detail) {
      detail.open = true;
      if (scrollToDetails) detail.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
    }
    history.replaceState(null, "", `#${id}`);
    highlightProgram(id);
  }

  function highlightProgram(id) {
    document.querySelectorAll("[data-column]").forEach((cell) => cell.classList.toggle("active-column", cell.dataset.column === id));
    document.querySelectorAll("[data-select-program]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.selectProgram === id)));
  }

  function renderFaq(type) {
    const target = document.querySelector("#faqList");
    if (!target || !content.faq[type]) return;
    target.innerHTML = content.faq[type][language].map(([question, answer]) => `
      <details class="faq-item reveal"><summary>${question}</summary><p>${answer}</p></details>`).join("");
  }

  function renderProgramOptions() {
    const select = document.querySelector("#guideProgram");
    if (!select) return;
    const current = select.value || selectedProgramFromUrl();
    select.innerHTML = `<option value="general">${t("form.programGeneral")}</option>${getPrograms().map((program) => `<option value="${program.id}">${program.title} · ${program.duration}</option>`).join("")}`;
    select.value = [...select.options].some((option) => option.value === current) ? current : "general";
  }

  function updateContactLinks() {
    document.querySelectorAll(".whatsapp-link").forEach((link) => {
      link.href = whatsappUrl(link.dataset.program || selectedProgramFromUrl());
    });
    document.querySelectorAll(".calendly-link").forEach((link) => { link.href = calendlyUrl; });
  }

  function renderDynamicContent() {
    renderProgramPreviews();
    if (page === "programs") {
      const active = selectedProgramFromUrl() === "general" ? "prime-elite" : selectedProgramFromUrl();
      renderComparison(active);
      renderProgramDetails(selectedProgramFromUrl());
      renderFaq("programs");
    }
    if (page === "resources") {
      renderProgramOptions();
      renderFaq("resources");
    }
    applyTranslations();
    observeReveals();
  }

  function setLanguage(nextLanguage) {
    if (!content.languages.includes(nextLanguage)) return;
    language = nextLanguage;
    localStorage.setItem(storageKey, language);
    renderDynamicContent();
  }

  function setupNavigation() {
    const toggle = document.querySelector("#menuToggle");
    const nav = document.querySelector("#mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", t(open ? "nav.close" : "nav.open"));
        nav.classList.toggle("is-open", open);
      });
      nav.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }
    document.querySelectorAll(".lang-btn").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -44px" });
    }
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(item);
    });
  }

  function setupImageMotion() {
    if (prefersReducedMotion.matches || window.matchMedia("(max-width: 760px)").matches) return;
    document.querySelectorAll("[data-motion-image]").forEach((frame) => {
      frame.addEventListener("pointermove", (event) => {
        const box = frame.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width - 0.5) * 12;
        const y = ((event.clientY - box.top) / box.height - 0.5) * 12;
        frame.style.setProperty("--mx", `${x}px`);
        frame.style.setProperty("--my", `${y}px`);
      });
      frame.addEventListener("pointerleave", () => {
        frame.style.setProperty("--mx", "0px");
        frame.style.setProperty("--my", "0px");
      });
    });
  }

  function setupScrollProgress() {
    const bar = document.querySelector("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function setupPageTransitions() {
    if (prefersReducedMotion.matches) return;
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-transition-link]");
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      document.body.classList.add("page-leave");
      window.setTimeout(() => { window.location.href = url.href; }, 170);
    });
  }

  function track(name, data = {}) {
    if (typeof window.va !== "function") return;
    window.va("event", { name, data });
  }

  function setupTrackedLinks() {
    document.addEventListener("click", (event) => {
      const whatsapp = event.target.closest(".whatsapp-link");
      const calendly = event.target.closest(".calendly-link");
      if (whatsapp) track("WhatsApp clicked", { program: whatsapp.dataset.program || selectedProgramFromUrl() });
      if (calendly) track("Calendly clicked", { program: calendly.dataset.program || selectedProgramFromUrl() });
    });
  }

  function setupLeadForm() {
    const form = document.querySelector("#guideForm");
    if (!form) return;
    const status = document.querySelector("#formStatus");
    const submit = document.querySelector("#guideSubmit");
    form.dataset.startedAt = String(Date.now());
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = t("form.invalid");
        status.dataset.state = "error";
        form.querySelector(":invalid")?.focus();
        return;
      }
      const data = new FormData(form);
      const payload = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        program: String(data.get("program") || "general"),
        consent: data.get("consent") === "on",
        website: String(data.get("website") || ""),
        language,
        startedAt: Number(form.dataset.startedAt)
      };
      submit.disabled = true;
      form.setAttribute("aria-busy", "true");
      submit.textContent = t("form.submitting");
      status.textContent = t("form.submitting");
      status.dataset.state = "pending";
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Lead request failed");
        status.textContent = t("form.success");
        status.dataset.state = "success";
        track("Guide request sent", { program: payload.program });
        form.reset();
        renderProgramOptions();
        form.dataset.startedAt = String(Date.now());
      } catch {
        status.textContent = t("form.error");
        status.dataset.state = "error";
      } finally {
        submit.disabled = false;
        form.removeAttribute("aria-busy");
        submit.textContent = t("form.submit");
      }
    });
  }

  document.body.classList.add("page-enter");
  renderHeader();
  renderFooter();
  renderDynamicContent();
  setupNavigation();
  setupImageMotion();
  setupScrollProgress();
  setupPageTransitions();
  setupTrackedLinks();
  setupLeadForm();
})();
