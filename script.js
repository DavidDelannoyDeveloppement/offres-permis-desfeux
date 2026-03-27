document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const switchButtons = document.querySelectorAll(".transmission-switch__btn");
  const priceElements = document.querySelectorAll(".offer-card__price");
  const detailLists = document.querySelectorAll(".js-details-list");
  const summaryElements = document.querySelectorAll(".js-summary");
  const pdfButtons = document.querySelectorAll(".js-print-pdf");
  const permitToggles = document.querySelectorAll(".permit-toggle");
  const docsToggleButtons = document.querySelectorAll(".js-toggle-docs");

  let currentMode = body.dataset.mode || "manuelle";

  function modeKey() {
    return currentMode === "automatique" ? "automatique" : "manuelle";
  }

  function updateSwitchState() {
    switchButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === currentMode);
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
    const hasManual = !!button.dataset.pdfManuelle;
    const hasAuto = !!button.dataset.pdfAutomatique;
    const hasSingle = !!button.dataset.pdf;

    if (hasManual || hasAuto) {
      return currentMode === "automatique"
        ? button.dataset.pdfAutomatique
        : button.dataset.pdfManuelle;
    }

    if (hasSingle) {
      return button.dataset.pdf;
    }

    return "";
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
    updatePdfButtons();
  }

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedMode = button.dataset.mode;
      if (!selectedMode) return;

      currentMode = selectedMode;
      refreshUI();
    });
  });

  pdfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fileName = getPdfFileName(button);

      if (!fileName || fileName.trim() === "") {
        alert("Aucun document disponible pour cette formule.");
        return;
      }

      const pdfUrl = `./pdf/${fileName}`;
      window.open(pdfUrl, "_blank");
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

      // ferme les autres listes de documents de la même page
      document.querySelectorAll(".offer-docs").forEach((block) => {
        if (block !== docsBlock) {
          block.classList.remove("is-open");
          block.style.display = "none";
        }
      });

      document.querySelectorAll(".js-toggle-docs").forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        docsBlock.classList.remove("is-open");
        docsBlock.style.display = "none";
        button.setAttribute("aria-expanded", "false");
      } else {
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
      if (!target) return;

      const isOpen = toggle.classList.contains("is-open");

      permitToggles.forEach((otherToggle) => {
        const otherId = otherToggle.getAttribute("aria-controls");
        const otherTarget = document.getElementById(otherId);

        otherToggle.classList.remove("is-open");
        otherToggle.setAttribute("aria-expanded", "false");

        if (otherTarget) {
          otherTarget.classList.remove("is-open");
        }

        const icon = otherToggle.querySelector(".permit-toggle__icon");
        if (icon) icon.textContent = "+";
      });

      // ferme toutes les listes de docs quand on change de section
      document.querySelectorAll(".offer-docs").forEach((block) => {
        block.classList.remove("is-open");
        block.style.display = "none";
      });

      document.querySelectorAll(".js-toggle-docs").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        toggle.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        target.classList.add("is-open");

        const icon = toggle.querySelector(".permit-toggle__icon");
        if (icon) icon.textContent = "−";
      }
    });
  });

  // état initial propre
  document.querySelectorAll(".offer-docs").forEach((block) => {
    block.classList.remove("is-open");
    block.style.display = "none";
  });

  document.querySelectorAll(".js-toggle-docs").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });

  refreshUI();
});