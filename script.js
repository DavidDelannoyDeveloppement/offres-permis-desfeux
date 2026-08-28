document.addEventListener("DOMContentLoaded", () => {
  const catalogue = window.DESFEUX_CATALOGUE;
  const body = document.body;
  const launchScreen = document.getElementById("launch-screen");
  const catalogueRoot = document.getElementById("catalogue-root");
  const catalogueStatus = document.getElementById("catalogue-status");
  const switchButtons = document.querySelectorAll(".transmission-switch__btn");
  const heroLogo = document.querySelector(".hero__logo-img");

  let currentMode = body.dataset.mode || "manuelle";

  const sections = [
    {
      id: "permis-b",
      title: "Permis B traditionnel",
      matches: (offer) =>
        offer.category === "B" &&
        offer.financing === "Classique" &&
        offer.journey === "Traditionnel" &&
        offer.formula !== "Sans formule"
    },
    {
      id: "permis-b-cs",
      title: "Permis B CS — conduite supervisée",
      matches: (offer) =>
        offer.category === "B" &&
        offer.financing === "Classique" &&
        offer.journey === "Conduite supervisée"
    },
    {
      id: "permis-b-aac",
      title: "Permis B AAC — conduite accompagnée",
      matches: (offer) =>
        offer.category === "B" &&
        offer.financing === "Classique" &&
        offer.journey === "AAC"
    },
    {
      id: "permis-b-cpf",
      title: "Permis B financés par CPF",
      matches: (offer) => offer.category === "B" && offer.financing === "CPF"
    },
    {
      id: "reprise-retour",
      title: "Reprise de dossier et retour au permis",
      matches: (offer) =>
        offer.category === "B" &&
        ["Reprise de dossier", "Retour au permis"].includes(offer.journey)
    },
    {
      id: "code",
      title: "Code de la route",
      matches: (offer) => offer.category === "Code"
    },
    {
      id: "permis-am",
      title: "Permis AM / BSR",
      matches: (offer) => offer.category.startsWith("AM ")
    },
    {
      id: "permis-a1",
      title: "Permis A1 — 125 cm³",
      matches: (offer) => offer.category === "A1"
    },
    {
      id: "permis-a2",
      title: "Permis A2",
      matches: (offer) => offer.category === "A2"
    },
    {
      id: "passerelles",
      title: "Passerelles et levée 78",
      matches: (offer) =>
        offer.category === "B78" || offer.category.startsWith("Passerelle ")
    },
    {
      id: "remorque",
      title: "Permis remorque — B96 et BE",
      matches: (offer) => ["B96", "BE"].includes(offer.category)
    }
  ];

  const specificDocuments = {
    "ELGEA-21": "PERMIS AM Cyclomoteur.pdf",
    "ELGEA-24": "PASSERELLE B VERS A1 (125 CC) 7 HEURES.pdf",
    "ELGEA-35": "PERMIS BE sans CODE.pdf",
    "ELGEA-56": "PERMIS A2 + CODE.pdf",
    "ELGEA-58": "PERMIS A2 sans CODE.pdf",
    "ELGEA-59": "PASSERELLE A2 VERS A.pdf",
    "ELGEA-60": "PERMIS BE + CODE.pdf",
    "ELGEA-61": "Forfait Formation B96.pdf",
    "ELGEA-76": "PERMIS AM Quadricycle.pdf",
    "ELGEA-81": "FORFAIT PERMIS B BASIQUE.pdf",
    "ELGEA-82": "FORFAIT PERMIS B ESSENTIEL.pdf",
    "ELGEA-83": "FORFAIT PERMIS B SERENITE.pdf",
    "ELGEA-84": "FORFAIT PERMIS B CS BASIQUE.pdf",
    "ELGEA-85": "FORFAIT PERMIS B CS ESSENTIEL.pdf",
    "ELGEA-86": "FORFAIT PERMIS B CS SERENITE.pdf",
    "ELGEA-87": "FORFAIT PERMIS B AAC BASIQUE.pdf",
    "ELGEA-88": "FORFAIT PERMIS B AAC ESSENTIEL.pdf",
    "ELGEA-89": "FORFAIT PERMIS B AAC SERENITE.pdf",
    "ELGEA-90": "PERMIS B boîte auto AAC FORFAIT BASIQUE.pdf",
    "ELGEA-91": "PERMIS B boîte auto AAC FORFAIT ESSENTIEL.pdf",
    "ELGEA-92": "PERMIS B boîte auto AAC FORFAIT SERENITE.pdf",
    "ELGEA-93": "PERMIS B CS boîte auto FORFAIT BASIQUE.pdf",
    "ELGEA-94": "PERMIS B CS boîte auto FORFAIT ESSENTIEL.pdf",
    "ELGEA-95": "PERMIS B CS boîte auto FORFAIT SERENITE.pdf",
    "ELGEA-96": "PERMIS B boîte auto FORFAIT BASIQUE.pdf",
    "ELGEA-97": "PERMIS B boîte auto FORFAIT ESSENTIEL.pdf",
    "ELGEA-98": "PERMIS B boîte auto FORFAIT SERENITE.pdf",
    "ELGEA-102": "Forfait levée code 78.pdf",
    "ELGEA-106": "Reprise de dossier PERMIS B.pdf",
    "CPF-BE-SANS-CODE": "PERMIS BE CPF.pdf",
    "CPF-BE-AVEC-CODE": "PERMIS BE CPF.pdf"
  };

  const linesByOffer = new Map();
  if (catalogue && Array.isArray(catalogue.lines)) {
    catalogue.lines.forEach((line) => {
      if (!linesByOffer.has(line.offerId)) linesByOffer.set(line.offerId, []);
      linesByOffer.get(line.offerId).push(line);
    });
    linesByOffer.forEach((lines) => lines.sort((a, b) => a.order - b.order));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function formatMoney(value) {
    const amount = Number(value || 0);
    const hasDecimals = Math.abs(amount - Math.round(amount)) > 0.001;
    return `${amount.toLocaleString("fr-FR", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2
    })} €`;
  }

  function pluralUnit(unit, quantity) {
    if (Number(quantity) <= 1) return unit;
    if (unit === "heure") return "heures";
    if (unit === "unité") return "unités";
    return unit;
  }

  function renderLine(line) {
    const quantity = Number(line.quantity || 0);
    const quantityText = quantity !== 1
      ? `${quantity.toLocaleString("fr-FR")} ${escapeHtml(pluralUnit(line.unit, quantity))} × `
      : "";
    const detail = line.detail
      ? ` <span class="offer-card__line-detail">— ${escapeHtml(line.detail)}</span>`
      : "";
    const note = line.note
      ? `<small class="offer-card__line-note">${escapeHtml(line.note)}</small>`
      : "";

    return `<li>${escapeHtml(line.label)}${detail} : ${quantityText}<span class="detail-price">${formatMoney(line.unitPriceTtc)}</span>${note}</li>`;
  }

  function isTransmissionFilterable(offer) {
    return (
      offer.category === "B" &&
      offer.financing === "Classique" &&
      ["Traditionnel", "Conduite supervisée", "AAC"].includes(offer.journey) &&
      offer.formula !== "Sans formule"
    );
  }

  function transmissionKey(offer) {
    if (!isTransmissionFilterable(offer)) return "always";
    return offer.transmission === "Automatique" ? "automatique" : "manuelle";
  }

  function formulaRank(offer) {
    const ranks = { "Sérénité": 0, "Essentiel": 1, "Basique": 2 };
    return ranks[offer.formula] ?? 10;
  }

  function sortOffers(a, b) {
    return (
      formulaRank(a) - formulaRank(b) ||
      a.financing.localeCompare(b.financing, "fr") ||
      a.title.localeCompare(b.title, "fr")
    );
  }

  function documentsFor(offer) {
    const documents = [];
    if (specificDocuments[offer.id]) {
      documents.push({ label: "Offre", file: specificDocuments[offer.id] });
    }

    if (offer.category !== "Code") {
      documents.push(
        { label: "Mandat majeur", file: "MANDAT_MAJEUR.pdf" },
        { label: "Mandat mineur", file: "MANDAT_MINEUR.pdf" }
      );
    }
    documents.push({ label: "Règlement intérieur", file: "REGLEMENT_INTERIEUR.pdf" });
    return documents;
  }

  function renderDocuments(offer) {
    const documents = documentsFor(offer);
    const targetId = `docs-${offer.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const buttons = documents
      .map((document) => `<button type="button" class="offer-docs__item js-print-pdf" data-pdf="${escapeAttr(document.file)}">${escapeHtml(document.label)}</button>`)
      .join("");

    return `
      <div class="offer-card__actions">
        <button
          type="button"
          class="btn btn--primary js-toggle-docs"
          aria-expanded="false"
          aria-controls="${targetId}"
        >
          Imprimer les documents
        </button>
        <div class="offer-docs" id="${targetId}">${buttons}</div>
      </div>`;
  }

  function renderOffer(offer, index) {
    const lines = linesByOffer.get(offer.id) || [];
    const filterable = isTransmissionFilterable(offer);
    const transmission = transmissionKey(offer);
    const isFeatured = offer.formula === "Sérénité" || (!filterable && index === 0);
    const badges = [
      offer.financing === "CPF" ? '<span class="offer-card__badge">CPF</span>' : "",
      offer.formula !== "Sans formule"
        ? `<span class="offer-card__badge offer-card__badge--soft">${escapeHtml(offer.formula)}</span>`
        : "",
      filterable
        ? `<span class="offer-card__badge offer-card__badge--soft">${escapeHtml(offer.transmission)}</span>`
        : ""
    ].join("");
    const note = offer.note
      ? `<p class="offer-card__note">${escapeHtml(offer.note)}</p>`
      : "";

    return `
      <article
        class="offer-card${isFeatured ? " offer-card--featured" : ""}"
        data-offer-id="${escapeAttr(offer.id)}"
        data-transmission="${transmission}"
      >
        ${badges ? `<div class="offer-card__meta">${badges}</div>` : ""}
        <h3>${escapeHtml(offer.title)}</h3>
        <p class="offer-card__price">${formatMoney(offer.totalTtc)}</p>
        <ul class="offer-card__list">${lines.map(renderLine).join("")}</ul>
        ${note}
        ${renderDocuments(offer)}
      </article>`;
  }

  function renderSection(section, offers) {
    const contentId = `content-${section.id}`;
    return `
      <section class="permit-section" id="${section.id}">
        <button
          type="button"
          class="permit-toggle"
          aria-expanded="false"
          aria-controls="${contentId}"
        >
          <span class="permit-toggle__title">${escapeHtml(section.title)}</span>
          <span class="permit-toggle__count">${offers.length} offre${offers.length > 1 ? "s" : ""}</span>
          <span class="permit-toggle__icon">+</span>
        </button>
        <div class="permit-content" id="${contentId}">
          <div class="offers-grid">${offers.map(renderOffer).join("")}</div>
        </div>
      </section>`;
  }

  function renderCatalogue() {
    if (!catalogue || !Array.isArray(catalogue.offers) || !Array.isArray(catalogue.lines)) {
      catalogueRoot.innerHTML = '<p class="catalogue-error">Le catalogue DESFEUX n’a pas pu être chargé.</p>';
      return;
    }

    const activeOffers = catalogue.offers.filter((offer) => offer.active !== false);
    const assignedIds = new Set();
    const html = sections.map((section) => {
      const offers = activeOffers.filter(section.matches).sort(sortOffers);
      offers.forEach((offer) => assignedIds.add(offer.id));
      return renderSection(section, offers);
    }).join("");

    const unassigned = activeOffers.filter((offer) => !assignedIds.has(offer.id));
    if (unassigned.length) {
      throw new Error(`Offres non classées : ${unassigned.map((offer) => offer.id).join(", ")}`);
    }

    catalogueRoot.innerHTML = html;
    refreshTransmissionFilter();
  }

  function refreshTransmissionFilter() {
    const cards = document.querySelectorAll(".offer-card");
    let visibleCount = 0;

    cards.forEach((card) => {
      const transmission = card.dataset.transmission || "always";
      const visible = transmission === "always" || transmission === currentMode;
      card.classList.toggle("is-mode-hidden", !visible);
      if (visible) visibleCount += 1;
    });

    body.dataset.mode = currentMode;
    switchButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === currentMode);
    });

    catalogueStatus.textContent = `${catalogue.offers.length} offres au catalogue • ${visibleCount} affichées • ${catalogue.lines.length} prestations`;
  }

  if (launchScreen) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      launchScreen.classList.add("launch-screen--hidden");
      launchScreen.setAttribute("aria-hidden", "true");
      window.setTimeout(() => launchScreen.remove(), reducedMotion ? 120 : 460);
    }, reducedMotion ? 250 : 1550);
  }

  if (heroLogo) {
    heroLogo.addEventListener("error", () => {
      heroLogo.hidden = true;
      const fallback = document.querySelector(".hero__logo-fallback");
      if (fallback) fallback.style.display = "grid";
    });
  }

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      refreshTransmissionFilter();
    });
  });

  document.addEventListener("click", (event) => {
    const permitToggle = event.target.closest(".permit-toggle");
    if (permitToggle) {
      const target = document.getElementById(permitToggle.getAttribute("aria-controls"));
      const wasOpen = permitToggle.classList.contains("is-open");

      document.querySelectorAll(".permit-toggle").forEach((toggle) => {
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
      document.querySelectorAll(".permit-content").forEach((content) => {
        content.classList.remove("is-open");
      });

      if (!wasOpen && target) {
        permitToggle.classList.add("is-open");
        permitToggle.setAttribute("aria-expanded", "true");
        target.classList.add("is-open");
      }
      return;
    }

    const docsToggle = event.target.closest(".js-toggle-docs");
    if (docsToggle) {
      event.preventDefault();
      event.stopPropagation();
      const docsBlock = document.getElementById(docsToggle.getAttribute("aria-controls"));
      const wasOpen = docsBlock && docsBlock.classList.contains("is-open");

      document.querySelectorAll(".offer-docs").forEach((block) => {
        block.classList.remove("is-open");
        block.style.display = "none";
      });
      document.querySelectorAll(".js-toggle-docs").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
      });

      if (docsBlock && !wasOpen) {
        docsBlock.classList.add("is-open");
        docsBlock.style.display = "grid";
        docsToggle.setAttribute("aria-expanded", "true");
      }
      return;
    }

    const pdfButton = event.target.closest(".js-print-pdf");
    if (pdfButton) {
      const fileName = pdfButton.dataset.pdf;
      if (fileName) window.open(`./pdf/${fileName}`, "_blank");
      return;
    }

    const lineItem = event.target.closest(".offer-card li");
    if (lineItem) {
      const list = lineItem.closest(".offer-card__list");
      const wasHighlighted = lineItem.classList.contains("is-highlighted");
      list.querySelectorAll("li").forEach((item) => item.classList.remove("is-highlighted"));
      if (!wasHighlighted) lineItem.classList.add("is-highlighted");
    }
  });

  try {
    renderCatalogue();
  } catch (error) {
    console.error(error);
    catalogueRoot.innerHTML = `<p class="catalogue-error">Impossible d’afficher le catalogue : ${escapeHtml(error.message)}</p>`;
  }
});
