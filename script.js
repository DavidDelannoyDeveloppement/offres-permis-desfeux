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
    updatePdfButtons();
  }

  // ============================
  // 🔥 NOUVEAU : HIGHLIGHT CLICK
  // ============================
  document.addEventListener("click", (e) => {
    const li = e.target.closest(".offer-card li");
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

      const isOpen = toggle.classList.contains("is-open");

      permitToggles.forEach((t) => {
        t.classList.remove("is-open");
        t.setAttribute("aria-expanded", "false");
      });

      document.querySelectorAll(".permit-content").forEach((c) => {
        c.classList.remove("is-open");
      });

      if (!isOpen) {
        toggle.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        target.classList.add("is-open");
      }
    });
  });

  refreshUI();
});