document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const launchScreen = document.getElementById("launch-screen");
  const switchButtons = document.querySelectorAll(".transmission-switch__btn");
  const priceElements = document.querySelectorAll(".offer-card__price");
  const detailLists = document.querySelectorAll(".js-details-list");
  const summaryElements = document.querySelectorAll(".js-summary");
  const pdfButtons = document.querySelectorAll(".js-print-pdf");
  const permitToggles = document.querySelectorAll(".permit-toggle");
  const docsToggleButtons = document.querySelectorAll(".js-toggle-docs");
  const paymentOfferCards = document.querySelectorAll(
    "#permis-b .offer-card, #permis-b-cs .offer-card, #permis-b-aac .offer-card, #permis-a2-passerelle-a .offer-card[data-payment-count]",
  );
  const finderPermitButtons = document.querySelectorAll("[data-filter-permit]");
  const finderTransmissionButtons = document.querySelectorAll("[data-filter-transmission]");
  const finderFinancingButtons = document.querySelectorAll("[data-filter-financing]");
  const finderTransmissionStep = document.getElementById("finder-transmission-step");
  const finderFinancingStep = document.getElementById("finder-financing-step");
  const finderFinancingNumber = document.getElementById("finder-financing-number");
  const finderStatus = document.getElementById("finder-status");
  const finderEmpty = document.getElementById("finder-empty");
  const finderReset = document.getElementById("finder-reset");
  const finderShowAll = document.getElementById("finder-show-all");

  const finderState = {
    permit: "",
    transmission: "",
    financing: "",
    showAll: false,
  };

  let currentMode = body.dataset.mode || "manuelle";

  function addPersonalBadge(card, withTransmission = false) {
    if (card.querySelector(".offer-card__meta")) return;

    const meta = document.createElement("div");
    meta.className = "offer-card__meta";
    meta.innerHTML =
      '<span class="offer-card__badge offer-card__badge--personal">Financement personnel</span>' +
      (withTransmission
        ? '<span class="offer-card__badge offer-card__badge--soft js-transmission-badge">Boîte manuelle</span>'
        : "");
    card.insertBefore(meta, card.querySelector("h3"));
  }

  function setCardMetadata(card, family, financing = "personnel", transmission = "none") {
    card.dataset.permitFamily = family;
    card.dataset.financing = financing;
    card.dataset.transmission = transmission;
    addPersonalBadge(card, transmission === "both");
  }

  function annotateStaticCards() {
    ["permis-b", "permis-b-cs", "permis-b-aac"].forEach((sectionId) => {
      document.querySelectorAll(`#${sectionId} .offer-card`).forEach((card) => {
        setCardMetadata(card, "b", "personnel", "both");
      });
    });

    document.querySelectorAll("#permis-am-levee-78 .offer-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      setCardMetadata(card, title.includes("Levée 78") ? "b" : "am", "personnel", title.includes("Levée 78") ? "automatique" : "none");
    });

    document.querySelectorAll("#permis-remorque-reprise .offer-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      setCardMetadata(card, title.includes("Reprise") ? "other" : "remorque");
    });

    document.querySelectorAll("#permis-a2-passerelle-a .offer-card").forEach((card) => {
      setCardMetadata(card, "moto");
    });
  }

  function allOfferCards() {
    return Array.from(document.querySelectorAll(".offer-card"));
  }

  function matchesPartialSelection(card) {
    if (finderState.permit && card.dataset.permitFamily !== finderState.permit) return false;
    if (finderState.financing && card.dataset.financing !== finderState.financing) return false;
    if (finderState.transmission) {
      const cardTransmission = card.dataset.transmission;
      if (cardTransmission !== "both" && cardTransmission !== finderState.transmission) return false;
    }
    return true;
  }

  function finderIsReady() {
    return Boolean(
      finderState.permit &&
      finderState.financing &&
      (finderState.permit !== "b" || finderState.transmission),
    );
  }

  function updateFinderAvailability() {
    finderFinancingButtons.forEach((button) => {
      const financing = button.dataset.filterFinancing;
      const available = allOfferCards().some((card) => {
        if (finderState.permit && card.dataset.permitFamily !== finderState.permit) return false;
        if (finderState.transmission) {
          const value = card.dataset.transmission;
          if (value !== "both" && value !== finderState.transmission) return false;
        }
        return card.dataset.financing === financing;
      });
      button.disabled = !available;
      if (!available && finderState.financing === financing) finderState.financing = "";
    });
  }

  function updateFinderButtons() {
    finderPermitButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.filterPermit === finderState.permit);
    });
    finderTransmissionButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.filterTransmission === finderState.transmission);
    });
    finderFinancingButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.filterFinancing === finderState.financing);
    });
  }

  function openVisibleSections(shouldOpen) {
    document.querySelectorAll(".permit-section").forEach((section) => {
      const toggle = section.querySelector(".permit-toggle");
      const content = section.querySelector(".permit-content");
      if (!toggle || !content) return;
      const open = shouldOpen && !section.classList.contains("is-filtered-out");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      content.classList.toggle("is-open", open);
    });
  }

  function hideCatalogueUntilReady(message) {
    body.classList.remove("finder-active");
    allOfferCards().forEach((card) => card.classList.add("is-filtered-out"));
    document.querySelectorAll(".permit-section").forEach((section) => section.classList.add("is-filtered-out"));
    openVisibleSections(false);
    finderEmpty.hidden = false;
    finderEmpty.querySelector("strong").textContent = message;
    finderEmpty.querySelector("span").textContent = "Les prestations, échéances et documents apparaîtront après votre sélection.";
  }

  function applyFinder() {
    const isB = finderState.permit === "b";
    finderTransmissionStep.hidden = !isB || finderState.showAll;
    finderFinancingStep.hidden = !finderState.permit || finderState.showAll;
    finderFinancingNumber.textContent = isB ? "3" : "2";
    finderReset.hidden = !finderState.permit && !finderState.showAll;

    updateFinderAvailability();
    updateFinderButtons();

    if (finderState.showAll) {
      allOfferCards().forEach((card) => card.classList.remove("is-filtered-out"));
      document.querySelectorAll(".permit-section").forEach((section) => section.classList.remove("is-filtered-out"));
      openVisibleSections(false);
      finderEmpty.hidden = true;
      finderStatus.textContent = "Catalogue complet affiché — utilisez les rubriques pour parcourir les offres.";
      body.classList.add("finder-active");
      return;
    }

    if (!finderState.permit) {
      finderStatus.textContent = "Commencez par choisir le type de permis.";
      hideCatalogueUntilReady("Commencez par choisir le type de permis.");
      return;
    }

    if (isB && !finderState.transmission) {
      finderStatus.textContent = "Choisissez ensuite le type de boîte et le financement.";
      hideCatalogueUntilReady("Quel type de boîte souhaitez-vous ?");
      return;
    }

    if (!finderState.financing) {
      finderStatus.textContent = "Choisissez le mode de financement pour afficher les offres.";
      hideCatalogueUntilReady("Comment souhaitez-vous financer la formation ?");
      return;
    }

    const cards = allOfferCards();
    cards.forEach((card) => card.classList.toggle("is-filtered-out", !matchesPartialSelection(card)));
    document.querySelectorAll(".permit-section").forEach((section) => {
      const hasVisibleCard = Array.from(section.querySelectorAll(".offer-card")).some((card) => !card.classList.contains("is-filtered-out"));
      section.classList.toggle("is-filtered-out", !hasVisibleCard);
    });

    const count = cards.filter((card) => !card.classList.contains("is-filtered-out")).length;
    finderEmpty.hidden = count > 0;
    finderStatus.textContent = count > 1 ? `${count} formules correspondent à vos choix.` : `${count} formule correspond à vos choix.`;
    body.classList.add("finder-active");
    openVisibleSections(true);
    document.getElementById("catalogue-sections")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (launchScreen) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.setTimeout(() => {
      launchScreen.classList.add("launch-screen--hidden");
      launchScreen.setAttribute("aria-hidden", "true");

      window.setTimeout(
        () => launchScreen.remove(),
        reducedMotion ? 120 : 460,
      );
    }, reducedMotion ? 250 : 1450);
  }

  function modeKey() {
    return currentMode === "automatique" ? "automatique" : "manuelle";
  }

  function updateSwitchState() {
    switchButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === currentMode);
    });
    document.querySelectorAll(".js-transmission-badge").forEach((badge) => {
      badge.textContent = currentMode === "automatique" ? "Boîte automatique" : "Boîte manuelle";
    });
  }

  function updatePrices() {
    const key = modeKey();

    priceElements.forEach((priceEl) => {
      const value =
        key === "automatique"
          ? priceEl.dataset.priceAutomatique
          : priceEl.dataset.priceManuelle;

      if (value && value.trim() !== "") {
        priceEl.textContent = value;
      }
    });
  }

  function parsePrice(value) {
    const normalized = value
      .replace(/[\s\u00a0\u202f]/g, "")
      .replace("€", "")
      .replace(",", ".");

    const amount = Number.parseFloat(normalized);
    return Number.isFinite(amount) ? amount : 0;
  }

  function formatPaymentAmount(amountInCents) {
    return (
      new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountInCents / 100) + "\u00a0€"
    );
  }

  function paymentCountFor(card) {
    const title = card.querySelector("h3")?.textContent.trim().toLocaleLowerCase("fr-FR");
    const sectionId = card.closest(".permit-section")?.id;

    if (title === "sérénité") return 6;
    if (sectionId === "permis-b" && title === "basique") return 3;
    return 4;
  }

  function paymentAmountsFor(card, totalInCents) {
    const configuredCount = Number.parseInt(card.dataset.paymentCount, 10);
    const count = Number.isInteger(configuredCount) && configuredCount > 0
      ? configuredCount
      : paymentCountFor(card);
    // Toutes les échéances précédant la dernière sont arrondies à l'euro
    // supérieur. Les arrhes prennent donc toujours l'arrondi supérieur et la
    // dernière échéance absorbe l'écart pour conserver exactement le total.
    const regularAmount = Math.ceil(totalInCents / count / 100) * 100;
    const lastAmount = totalInCents - regularAmount * (count - 1);

    return Array.from({ length: count }, (_, index) =>
      index === count - 1 ? lastAmount : regularAmount,
    );
  }

  function paymentLabel(card, index, count, isSerenity) {
    if (isSerenity && index === count - 1) {
      return "Avant examen, suivant besoins réels";
    }

    if (index === 0) {
      return "1re échéance (arrhes à l'inscription)";
    }

    return `${index + 1}e échéance`;
  }

  function createPaymentSchedules() {
    paymentOfferCards.forEach((card) => {
      if (card.querySelector(".offer-card__payments")) return;

      const details = card.querySelector(".offer-card__list");
      if (!details) return;

      const paymentBlock = document.createElement("section");
      const permitSectionId = card.closest(".permit-section")?.id;
      const showCicReminder = ["permis-b", "permis-b-cs", "permis-b-aac"].includes(
        permitSectionId,
      );
      paymentBlock.className = "offer-card__payments";
      paymentBlock.setAttribute("aria-label", "Modalités de paiement");
      paymentBlock.innerHTML =
        '<h4>Modalités de paiement</h4><ol class="offer-card__payment-list"></ol>' +
        (showCicReminder
          ? '<div class="offer-card__cic-reminder" role="note"><img src="./logo-cic.svg" alt="Logo CIC">Partenariat CIC</div>'
          : "");
      details.insertAdjacentElement("afterend", paymentBlock);
    });
  }

  function updatePaymentSchedules() {
    paymentOfferCards.forEach((card) => {
      const price = card.querySelector(".offer-card__price");
      const paymentList = card.querySelector(".offer-card__payment-list");
      if (!price || !paymentList) return;

      const totalInCents = Math.round(parsePrice(price.textContent) * 100);
      const paymentAmounts = paymentAmountsFor(card, totalInCents);
      const count = paymentAmounts.length;
      const isSerenity =
        card.querySelector("h3")?.textContent.trim().toLocaleLowerCase("fr-FR") ===
        "sérénité";

      paymentList.innerHTML = paymentAmounts.map((amount, index) => {
        return (
          "<li><span>" +
          paymentLabel(card, index, count, isSerenity) +
          '</span><strong class="payment-amount">' +
          formatPaymentAmount(amount) +
          "</strong></li>"
        );
      }).join("");
    });
  }

  function keepEuroSymbolsWithAmounts(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      node.nodeValue = node.nodeValue.replace(/[ \t]+€/g, "\u00a0€");
      node = walker.nextNode();
    }
  }

  function updateDetails() {
    const key = modeKey();

    detailLists.forEach((listEl) => {
      const raw =
        key === "automatique"
          ? listEl.dataset.detailsAutomatique
          : listEl.dataset.detailsManuelle;

      if (!raw || raw.trim() === "") return;

      const items = raw
        .split("|")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      listEl.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    });
  }

  function updateSummaries() {
    const key = modeKey();

    summaryElements.forEach((summaryEl) => {
      const value =
        key === "automatique"
          ? summaryEl.dataset.summaryAutomatique
          : summaryEl.dataset.summaryManuelle;

      if (value && value.trim() !== "") {
        summaryEl.textContent = value;
      }
    });
  }

  function getPdfFileName(button) {
    if (button.dataset.pdfManuelle || button.dataset.pdfAutomatique) {
      return currentMode === "automatique"
        ? button.dataset.pdfAutomatique
        : button.dataset.pdfManuelle;
    }

    return button.dataset.pdf || "";
  }

  function updatePdfButtons() {
    pdfButtons.forEach((button) => {
      const fileName = getPdfFileName(button);
      const available = fileName && fileName.trim() !== "";

      button.disabled = !available;
      button.classList.toggle("is-disabled", !available);
    });
  }

  function refreshUI() {
    body.dataset.mode = currentMode;
    updateSwitchState();
    updatePrices();
    updateDetails();
    updateSummaries();
    updatePaymentSchedules();
    updatePdfButtons();
    keepEuroSymbolsWithAmounts();
  }

  // ============================
  // 🔥 NOUVEAU : HIGHLIGHT CLICK
  // ============================
  document.addEventListener("click", (e) => {
    const li = e.target.closest(".offer-card__list li");
    if (!li) return;

    const list = li.closest(".offer-card__list");
    const wasHighlighted = li.classList.contains("is-highlighted");

    list.querySelectorAll("li").forEach((el) => {
      el.classList.remove("is-highlighted");
    });

    if (!wasHighlighted) {
      li.classList.add("is-highlighted");
    }
  });

  // ============================

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      refreshUI();
    });
  });

  finderPermitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      finderState.showAll = false;
      finderState.permit = button.dataset.filterPermit;
      finderState.transmission = "";
      finderState.financing = "";
      applyFinder();
    });
  });

  finderTransmissionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      finderState.showAll = false;
      finderState.transmission = button.dataset.filterTransmission;
      currentMode = finderState.transmission;
      refreshUI();
      applyFinder();
    });
  });

  finderFinancingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      finderState.showAll = false;
      finderState.financing = button.dataset.filterFinancing;
      applyFinder();
    });
  });

  finderReset?.addEventListener("click", () => {
    finderState.permit = "";
    finderState.transmission = "";
    finderState.financing = "";
    finderState.showAll = false;
    applyFinder();
    document.getElementById("offer-finder-title")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  finderShowAll?.addEventListener("click", () => {
    finderState.permit = "";
    finderState.transmission = "";
    finderState.financing = "";
    finderState.showAll = true;
    applyFinder();
  });

  pdfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fileName = getPdfFileName(button);

      if (!fileName) {
        alert("Aucun document disponible.");
        return;
      }

      window.open(`./pdf/${fileName}`, "_blank");
    });
  });

  docsToggleButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const targetId = button.getAttribute("aria-controls");
      const docsBlock = document.getElementById(targetId);
      if (!docsBlock) return;

      const isOpen = docsBlock.classList.contains("is-open");

      document.querySelectorAll(".offer-docs").forEach((block) => {
        block.classList.remove("is-open");
        block.style.display = "none";
      });

      document.querySelectorAll(".js-toggle-docs").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        docsBlock.classList.add("is-open");
        docsBlock.style.display = "grid";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  permitToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("aria-controls");
      const target = document.getElementById(targetId);

      const isOpen = target.classList.contains("is-open");
      toggle.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      target.classList.toggle("is-open", !isOpen);
    });
  });

  annotateStaticCards();
  createPaymentSchedules();
  refreshUI();
  applyFinder();
});
