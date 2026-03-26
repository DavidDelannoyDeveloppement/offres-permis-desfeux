document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const switchButtons = document.querySelectorAll(".transmission-switch__btn");
  const priceElements = document.querySelectorAll(".offer-card__price");
  const detailLists = document.querySelectorAll(".js-details-list");
  const summaryElements = document.querySelectorAll(".js-summary");
  const pdfButtons = document.querySelectorAll(".js-print-pdf");
  const permitToggles = document.querySelectorAll(".permit-toggle");

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

  function updatePdfButtons() {
    const key = modeKey();

    pdfButtons.forEach((button) => {
      const fileName =
        key === "automatique"
          ? button.dataset.pdfAutomatique
          : button.dataset.pdfManuelle;

      const available = fileName && fileName.trim() !== "";

      button.disabled = !available;
      button.classList.toggle("is-disabled", !available);
      button.textContent = available ? "Imprimer le PDF" : "PDF indisponible";
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
      const key = modeKey();
      const fileName =
        key === "automatique"
          ? button.dataset.pdfAutomatique
          : button.dataset.pdfManuelle;

      if (!fileName || fileName.trim() === "") {
        alert("Aucun PDF disponible pour cette formule.");
        return;
      }

      const pdfUrl = `./pdf/${fileName}`;
      window.open(pdfUrl, "_blank");
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

      if (!isOpen) {
        toggle.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        target.classList.add("is-open");

        const icon = toggle.querySelector(".permit-toggle__icon");
        if (icon) icon.textContent = "−";
      }
    });
  });

  refreshUI();
});