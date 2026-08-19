(function () {
  "use strict";

  var categories = [
    { id: "all", label: "Todos" },
    { id: "proteinas", label: "Proteínas" },
    { id: "grasas", label: "Grasas" },
    { id: "lacteos", label: "Lácteos" },
    { id: "vegetales", label: "Vegetales" },
    { id: "frutas", label: "Frutas" },
    { id: "frutos-secos", label: "Frutos secos y semillas" },
    { id: "otros", label: "Otros" }
  ];

  var icons = {
    "proteinas": "🥩",
    "grasas": "🥑",
    "lacteos": "🧀",
    "vegetales": "🥬",
    "frutas": "🍓",
    "frutos-secos": "🌰",
    "otros": "🍞"
  };

  function walmartSearch(query) {
    return "https://www.walmart.com/search?q=" + encodeURIComponent(query);
  }

  var products = [
    { category: "proteinas", name: "Marketside USDA Organic Grass-Fed Ground Beef", detail: "Carne molida orgánica, 100% grass-fed, sin hormonas ni antibióticos añadidos.", url: walmartSearch("Marketside Organic Grass-Fed Ground Beef") },
    { category: "proteinas", name: "Vital Farms Organic Pasture-Raised Eggs", detail: "Huevos USDA Organic y pasture-raised.", url: walmartSearch("Vital Farms Organic Pasture-Raised Eggs") },
    { category: "proteinas", name: "Happy Egg Co. Organic Free-Range Eggs", detail: "Alternativa orgánica y free-range.", url: walmartSearch("Happy Egg Co Organic Free-Range Eggs") },
    { category: "proteinas", name: "Perdue Harvestland Organic Chicken Breast", detail: "Pechuga de pollo orgánica, fresca y sin hueso.", url: walmartSearch("Perdue Harvestland Organic Fresh Boneless Chicken Breast") },
    { category: "proteinas", name: "Great Value Wild Caught Pink Salmon", detail: "Filetes congelados de salmón rosado salvaje.", url: walmartSearch("Great Value Wild Caught Pink Salmon Fillets") },
    { category: "proteinas", name: "Marketside Wild Caught Alaska Sockeye", detail: "Filetes de salmón sockeye salvaje de Alaska.", url: walmartSearch("Marketside Wild Caught Alaska Sockeye Salmon Fillets") },
    { category: "proteinas", name: "Wild Planet Alaska Wild Pink Salmon", detail: "Ingredientes simples: salmón salvaje, agua y sal marina.", url: walmartSearch("Wild Planet Alaska Wild Caught Pink Salmon") },
    { category: "proteinas", name: "Applegate No Sugar Uncured Bacon", detail: "Bacon sin curar y sin azúcar añadida. Revisa siempre la etiqueta.", url: walmartSearch("Applegate Naturals No Sugar Uncured Bacon"), prime: true },
    { category: "proteinas", name: "Marketside Uncured Thick Cut Bacon", detail: "Alternativa de bacon grueso sin curar.", url: walmartSearch("Marketside Uncured Thick Cut Bacon") },

    { category: "grasas", name: "Fresh Hass Organic Avocados", detail: "Aguacates Hass orgánicos frescos.", url: walmartSearch("Fresh Hass Organic Avocados") },
    { category: "grasas", name: "Partanna Castelvetrano Green Olives", detail: "Aceitunas verdes Castelvetrano sin hueso.", url: "https://www.walmart.com/ip/Partanna-Castelvetrano-Green-Pitted-Olives-9-oz/159674712?classType=REGULAR", direct: true },
    { category: "grasas", name: "Great Value Pitted Kalamata Olives", detail: "Aceitunas griegas Kalamata sin hueso.", url: "https://www.walmart.com/ip/Great-Value-Pitted-Kalamata-Greek-Olives-6-35oz-Jar/871158621?classType=REGULAR", direct: true },
    { category: "grasas", name: "Great Value Organic Extra Virgin Olive Oil", detail: "Aceite de oliva extra virgen orgánico de un solo ingrediente.", url: walmartSearch("Great Value Organic Extra Virgin Olive Oil") },
    { category: "grasas", name: "Sky Organics Greek Extra Virgin Olive Oil", detail: "Aceite de oliva extra virgen griego y orgánico.", url: walmartSearch("Sky Organics Organic Greek Extra Virgin Olive Oil") },
    { category: "grasas", name: "Terra Delyssa Organic Extra Virgin Olive Oil", detail: "Aceite de oliva extra virgen orgánico.", url: walmartSearch("Terra Delyssa Organic Extra Virgin Olive Oil 34 oz") },
    { category: "grasas", name: "Organic Unsweetened Coconut Chips", detail: "Chips de coco orgánico sin azúcar añadida.", url: walmartSearch("Organic Unsweetened Coconut Chips") },
    { category: "grasas", name: "It's Delish Raw Coconut Chips", detail: "Coco crudo sin azúcar añadida.", url: walmartSearch("It's Delish Raw Unsweetened Coconut Chips") },
    { category: "grasas", name: "Carrington Farms Organic Ghee", detail: "Mantequilla clarificada orgánica.", url: "https://www.walmart.com/ip/Carrington-Farms-Organic-Ghee-Clarified-Butter-12-Oz/599348862?classType=VARIANT", direct: true },
    { category: "grasas", name: "Servio Grass-Fed Traditional Ghee", detail: "Mantequilla clarificada grass-fed, tradicional y shelf-stable.", url: "https://www.walmart.com/ip/Servio-Grass-Fed-Non-GMO-Traditional-Ghee-Clarified-Butter-Shelf-Stable-10-58-oz-Jar/255011649", direct: true },
    { category: "grasas", name: "Organic Valley Salted Organic Butter", detail: "Mantequilla orgánica con sal de Organic Valley.", url: "https://www.walmart.com/ip/ORGANIC-VALLEY-Salted-Organic-Butter-8-oz/12247866658", direct: true },

    { category: "lacteos", name: "Stonyfield Organic Plain Greek Yogurt", detail: "Yogur griego natural orgánico con cultivos vivos.", url: walmartSearch("Stonyfield Organic Plain Greek Yogurt") },
    { category: "lacteos", name: "Nancy's Organic Probiotic Cottage Cheese", detail: "Queso cottage orgánico de leche entera con probióticos.", url: "https://www.walmart.com/ip/Nancys-Organic-Probiotic-Whole-Milk-Cottage-Cheese-Tub-4-Milk-Fat-14-g-Protein-16-oz-tub/524608806?classType=REGULAR", direct: true },
    { category: "lacteos", name: "Horizon Organic Mozzarella String Cheese", detail: "Mozzarella USDA Organic hecha con leche real.", url: "https://www.walmart.com/ip/Horizon-Organic-Mozzarella-String-Cheese-8-oz-Pack-8-Sticks/15070465046?classType=REGULAR", direct: true },
    { category: "lacteos", name: "Emmi Le Gruyère AOP", detail: "Queso Gruyère curado.", url: "https://www.walmart.com/ip/Emmi-Le-Gruy-re-AOP-Cheese-6-oz/37560425?classType=REGULAR", direct: true },
    { category: "lacteos", name: "Marketside Manchego 6 Month", detail: "Queso Manchego curado durante seis meses.", url: "https://www.walmart.com/ip/Marketside-Manchego-6-Month-5-3oz/17175416795?classType=REGULAR", direct: true },
    { category: "lacteos", name: "BelGioioso Asiago", detail: "Cuña de queso Asiago curado.", url: "https://www.walmart.com/ip/BelGioioso-Gluten-Free-Asiago-Specialty-Cheese-Wedge-8-oz/140051751?classType=REGULAR", direct: true },
    { category: "lacteos", name: "BelGioioso Mascarpone", detail: "Queso Mascarpone cremoso.", url: "https://www.walmart.com/ip/BelGioioso-Mascarpone-Cheese-Specialty-Spreadable-Cheese-8-oz-Refrigerated-Plastic-Cup/10535844?classType=REGULAR", direct: true },
    { category: "lacteos", name: "Leche cruda", detail: "Revisa disponibilidad, procedencia y normativa local antes de comprar.", url: walmartSearch("raw milk"), searchOnly: true },

    { category: "vegetales", name: "Marketside Organic Bell Peppers", detail: "Pimentones orgánicos frescos.", url: walmartSearch("Marketside Organic Bell Peppers") },
    { category: "vegetales", name: "Marketside Organic Yellow Onions", detail: "Cebollas amarillas orgánicas.", url: walmartSearch("Marketside Organic Yellow Onions 3 lb") },
    { category: "vegetales", name: "Organic Whole Fresh Garlic", detail: "Ajo entero orgánico fresco.", url: walmartSearch("Organic Whole Fresh Garlic 3 count") },
    { category: "vegetales", name: "Marketside Organic Whole Carrots", detail: "Zanahorias enteras orgánicas.", url: walmartSearch("Marketside Organic Fresh Whole Carrots 2 lb") },
    { category: "vegetales", name: "Marketside Organic Cucumbers", detail: "Pepinos orgánicos frescos.", url: walmartSearch("Marketside Organic Cucumbers 2 count") },
    { category: "vegetales", name: "Fresh Sweet Potatoes", detail: "Boniato fresco para combinar con proteína y vegetales.", url: "https://www.walmart.com/ip/Sweet-Potatoes-Whole-Fresh-Each-Batata-Mameya/44390964?classType=REGULAR", direct: true },
    { category: "vegetales", name: "Eden Foods Organic Sauerkraut", detail: "Vegetales orgánicos fermentados.", url: walmartSearch("Eden Foods Organic Sauerkraut") },
    { category: "vegetales", name: "Saverne Organic Fermented Sauerkraut", detail: "Chucrut orgánico y naturalmente fermentado.", url: walmartSearch("Saverne Organic Naturally Fermented Sauerkraut") },
    { category: "vegetales", name: "Brócoli", detail: "Vegetal fresco para acompañar tus fuentes de proteína.", url: walmartSearch("organic fresh broccoli"), searchOnly: true },
    { category: "vegetales", name: "Calabacín", detail: "Vegetal fresco fácil de cocinar y combinar.", url: walmartSearch("organic fresh zucchini"), searchOnly: true },

    { category: "frutas", name: "Marketside Fresh Organic Bananas", detail: "Plátano o cambur orgánico fresco.", url: walmartSearch("Marketside Fresh Organic Bananas") },
    { category: "frutas", name: "Arándanos orgánicos", detail: "Arándanos frescos para yogur o como fruta.", url: walmartSearch("organic fresh blueberries"), searchOnly: true },
    { category: "frutas", name: "Fresas orgánicas", detail: "Fresas frescas para combinar con yogur.", url: walmartSearch("organic fresh strawberries"), searchOnly: true },
    { category: "frutas", name: "Frambuesas orgánicas", detail: "Frambuesas frescas orgánicas.", url: walmartSearch("organic fresh raspberries"), searchOnly: true },
    { category: "frutas", name: "Kiwi", detail: "Kiwi fresco.", url: walmartSearch("fresh kiwi fruit"), searchOnly: true },
    { category: "frutas", name: "Sandía", detail: "Sandía fresca.", url: walmartSearch("fresh watermelon"), searchOnly: true },
    { category: "frutas", name: "Dátiles", detail: "Dátiles con una lista simple de ingredientes.", url: walmartSearch("organic dates no added sugar"), searchOnly: true },
    { category: "frutas", name: "Pera", detail: "Peras frescas.", url: walmartSearch("organic fresh pears"), searchOnly: true },
    { category: "frutas", name: "Limón", detail: "Limones frescos.", url: walmartSearch("organic fresh lemons"), searchOnly: true },
    { category: "frutas", name: "Piña", detail: "Piña fresca.", url: walmartSearch("fresh pineapple"), searchOnly: true },

    { category: "frutos-secos", name: "Great Value Organic Raw Cashews", detail: "Marañones orgánicos y crudos.", url: walmartSearch("Great Value Organic Raw Cashews") },
    { category: "frutos-secos", name: "Terrasoul Organic Raw Brazil Nuts", detail: "Nueces de Brasil orgánicas, crudas y sin sal.", url: walmartSearch("Terrasoul Organic Raw Brazil Nuts") },
    { category: "frutos-secos", name: "Terrasoul Organic Raw Walnuts", detail: "Nueces orgánicas y crudas.", url: walmartSearch("Terrasoul Organic Raw Walnuts") },
    { category: "frutos-secos", name: "Organic Deluxe Unsalted Nuts Mix", detail: "Mix orgánico de frutos secos sin sal añadida.", url: "https://www.walmart.com/ip/Organic-Deluxe-Unsalted-Nuts-Mix-8-Ounces-A-Blend-of-Dry-Roasted-Nuts-Non-GMO-Kosher/492984099?classType=VARIANT", direct: true },
    { category: "frutos-secos", name: "Semillas de calabaza", detail: "Busca una opción simple, sin aceites o azúcares añadidos.", url: walmartSearch("organic raw pumpkin seeds unsalted"), searchOnly: true },

    { category: "otros", name: "Pan de masa madre", detail: "Busca una lista de ingredientes sencilla y una fermentación real.", url: walmartSearch("sourdough bread simple ingredients"), searchOnly: true },
    { category: "otros", name: "Great Value Organic Unsweetened Cocoa", detail: "Cacao orgánico, fair trade, 100% cocoa y sin azúcar.", url: walmartSearch("Great Value Organic Fair Trade Unsweetened Baking Cocoa 100%") },
    { category: "otros", name: "Swanson Organic Cocoa Powder", detail: "Cacao en polvo 100% orgánico y sin azúcar.", url: walmartSearch("Swanson Certified Organic Cocoa Powder") },
    { category: "otros", name: "Viva Naturals Organic Cacao Powder", detail: "Cacao orgánico sin azúcar añadida.", url: walmartSearch("Viva Naturals Organic Cacao Powder unsweetened") },
    { category: "otros", name: "Miel cruda", detail: "Busca miel cruda de un solo ingrediente.", url: walmartSearch("raw honey one ingredient"), searchOnly: true }
  ];

  var breakfasts = [
    { title: "Huevos, cottage y aguacate", ingredients: ["Huevo", "Queso cottage", "Aguacate", "Pan de masa madre"] },
    { title: "Huevos, queso y bacon", ingredients: ["Huevo", "Queso curado", "Bacon", "Yogur"] },
    { title: "Yogur con fruta", ingredients: ["Yogur", "Miel cruda", "Frutas"] },
    { title: "Huevos con carne y vegetales", ingredients: ["Huevo", "Carne", "Pimentón", "Aguacate", "Zanahoria", "Pepino", "Pan de masa madre"] },
    { title: "Huevos con pollo", ingredients: ["Huevo", "Pollo", "Aguacate", "Queso al gusto"] }
  ];

  var rules = [
    { title: "Siempre prioriza la proteína", text: "En tus comidas debe haber una buena fuente de proteína: carne, pollo, pescado, huevo o queso. Varía y juega con los alimentos para que comer bien no se vuelva aburrido." },
    { title: "Aprende a armar tus platos", text: "No comas siempre exactamente lo mismo. Empieza con la proteína, combina los alimentos de tu lista y descubre cuáles combinaciones te gustan más." },
    { title: "Aprende qué estás comprando", text: "No compres algo solamente porque diga healthy, natural u organic. Lee los ingredientes. Mientras más simple sea la lista, mejor." },
    { title: "Por la noche, lentes bloqueadores", text: "Cuando entres en tu rutina para dormir, ponte los lentes bloqueadores de luz azul. La consistencia es lo que nos va a dar resultados." },
    { title: "Sal a buscar luz natural", text: "Busca luz por la mañana, sal durante el día y, cuando sea posible y seguro para tu piel, aprovecha el sol del mediodía y un poco del atardecer." },
    { title: "No cambiaremos toda tu vida en un día", text: "Este mes trabajamos comida real y proteína, lectura de ingredientes, sueño, luz natural y consistencia. Haz esta base bien y después seguimos construyendo." }
  ];

  var filterRoot = document.getElementById("foodFilters");
  var productRoot = document.getElementById("productGrid");
  var countRoot = document.getElementById("resultsCount");
  var activeCategory = "proteinas";

  function createFilter(category) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button" + (category.id === activeCategory ? " active" : "");
    button.textContent = category.label;
    button.setAttribute("aria-pressed", category.id === activeCategory ? "true" : "false");
    button.dataset.category = category.id;
    button.addEventListener("click", function () {
      activeCategory = category.id;
      renderFilters();
      renderProducts();
    });
    return button;
  }

  function renderFilters() {
    filterRoot.replaceChildren();
    categories.forEach(function (category) {
      filterRoot.appendChild(createFilter(category));
    });
  }

  function createProductCard(product) {
    var article = document.createElement("article");
    article.className = "product-card";

    var top = document.createElement("div");
    top.className = "product-top";
    var icon = document.createElement("span");
    icon.className = "category-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = icons[product.category];
    top.appendChild(icon);

    if (product.prime) {
      var badge = document.createElement("span");
      badge.className = "prime-badge";
      badge.textContent = "Elección PRIME";
      top.appendChild(badge);
    }

    var title = document.createElement("h3");
    title.textContent = product.name;
    var detail = document.createElement("p");
    detail.textContent = product.detail;
    var link = document.createElement("a");
    link.className = "buy-link" + (product.searchOnly ? " search-link" : "");
    link.href = product.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", (product.searchOnly ? "Buscar " : "Comprar ") + product.name + " en Walmart, abre en una pestaña nueva");
    link.innerHTML = (product.searchOnly ? "Ver opciones en Walmart" : "Comprar en Walmart") + "<span aria-hidden=\"true\">↗</span>";

    article.appendChild(top);
    article.appendChild(title);
    article.appendChild(detail);
    article.appendChild(link);
    return article;
  }

  function renderProducts() {
    var visibleProducts = products.filter(function (product) {
      return activeCategory === "all" || product.category === activeCategory;
    });
    productRoot.replaceChildren();
    visibleProducts.forEach(function (product) {
      productRoot.appendChild(createProductCard(product));
    });
    countRoot.textContent = visibleProducts.length + (visibleProducts.length === 1 ? " alimento" : " alimentos") + " en esta categoría";
  }

  var breakfastTabs = document.getElementById("breakfastTabs");
  var breakfastDetail = document.getElementById("breakfastDetail");
  var activeBreakfast = 0;

  function renderBreakfast() {
    var breakfast = breakfasts[activeBreakfast];
    breakfastTabs.querySelectorAll("button").forEach(function (button, index) {
      button.setAttribute("aria-selected", index === activeBreakfast ? "true" : "false");
      button.tabIndex = index === activeBreakfast ? 0 : -1;
    });
    breakfastDetail.setAttribute("aria-labelledby", "breakfast-tab-" + activeBreakfast);
    breakfastDetail.innerHTML = "";

    var number = document.createElement("span");
    number.className = "breakfast-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = "0" + (activeBreakfast + 1);
    var content = document.createElement("div");
    var title = document.createElement("h3");
    title.textContent = breakfast.title;
    var list = document.createElement("ul");
    list.className = "ingredient-list";
    breakfast.ingredients.forEach(function (ingredient) {
      var item = document.createElement("li");
      item.textContent = ingredient;
      list.appendChild(item);
    });
    content.appendChild(title);
    content.appendChild(list);
    breakfastDetail.appendChild(number);
    breakfastDetail.appendChild(content);
  }

  breakfasts.forEach(function (breakfast, index) {
    var tab = document.createElement("button");
    tab.type = "button";
    tab.id = "breakfast-tab-" + index;
    tab.className = "breakfast-tab";
    tab.role = "tab";
    tab.setAttribute("aria-controls", "breakfastDetail");
    tab.setAttribute("aria-label", "Desayuno " + (index + 1) + ": " + breakfast.title);
    tab.textContent = "Opción " + (index + 1);
    tab.addEventListener("click", function () {
      activeBreakfast = index;
      renderBreakfast();
      breakfastDetail.focus({ preventScroll: true });
    });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      var direction = event.key === "ArrowRight" ? 1 : -1;
      activeBreakfast = (index + direction + breakfasts.length) % breakfasts.length;
      renderBreakfast();
      breakfastTabs.children[activeBreakfast].focus();
    });
    breakfastTabs.appendChild(tab);
  });

  var rulesRoot = document.getElementById("rulesList");
  rules.forEach(function (rule) {
    var item = document.createElement("li");
    item.className = "rule-card reveal";
    var content = document.createElement("div");
    var title = document.createElement("h3");
    title.textContent = rule.title;
    var text = document.createElement("p");
    text.textContent = rule.text;
    content.appendChild(title);
    content.appendChild(text);
    item.appendChild(content);
    rulesRoot.appendChild(item);
  });

  function updateNavigation() {
    var sections = ["mi-guia", "alimentos", "desayunos", "reglas"];
    var current = sections[0];
    sections.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= 175) current = id;
    });
    document.querySelectorAll(".nav-item").forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  renderFilters();
  renderProducts();
  renderBreakfast();
  document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
  });
  window.setTimeout(function () {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("visible");
    });
  }, 900);
  var scrollTopLink = document.querySelector("[data-scroll-top]");
  if (scrollTopLink) {
    scrollTopLink.addEventListener("click", function (event) {
      event.preventDefault();
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  }
  window.addEventListener("scroll", updateNavigation, { passive: true });
  updateNavigation();
}());
