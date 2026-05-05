document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll("[data-nav]").forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === currentPage);
  });

  initPeriodPicker();
});

function initPeriodPicker() {
  const trigger = document.querySelector("[data-period-trigger]");
  const actionGroup = trigger?.closest(".header-actions");
  if (!trigger || !actionGroup) return;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const years = [2024, 2025, 2026];
  const saved = parseSavedPeriod(getStoredPeriod());
  const triggerLabel = trigger.querySelector("span");

  let active = saved || { month: "March", year: 2026 };
  let draft = { ...active };
  triggerLabel.textContent = `${active.month} ${active.year}`;

  const picker = document.createElement("div");
  picker.className = "period-picker";
  picker.setAttribute("role", "dialog");
  picker.setAttribute("aria-label", "Choose report period");
  picker.hidden = true;
  picker.innerHTML = `
    <div class="period-picker-head">
      <button class="period-nav period-nav--prev" type="button" aria-label="Previous year">
        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <div class="period-year" aria-live="polite"></div>
      <button class="period-nav period-nav--next" type="button" aria-label="Next year">
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
    <div class="period-month-list" role="listbox" aria-label="Month"></div>
    <button class="period-set" type="button">Set Filter</button>
  `;
  actionGroup.appendChild(picker);

  const yearText = picker.querySelector(".period-year");
  const prevButton = picker.querySelector(".period-nav--prev");
  const nextButton = picker.querySelector(".period-nav--next");
  const monthList = picker.querySelector(".period-month-list");
  const setButton = picker.querySelector(".period-set");

  monthNames.forEach((month) => {
    const button = document.createElement("button");
    button.className = "period-month";
    button.type = "button";
    button.dataset.month = month;
    button.setAttribute("role", "option");
    button.innerHTML = `<span>${month}</span><i class="fa-solid fa-check" aria-hidden="true"></i>`;
    button.addEventListener("click", () => {
      draft.month = month;
      renderPicker();
    });
    monthList.appendChild(button);
  });

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextState = picker.hidden;
    if (nextState) draft = { ...active };
    setPickerOpen(nextState);
    renderPicker();
  });

  prevButton.addEventListener("click", () => {
    const currentIndex = years.indexOf(draft.year);
    if (currentIndex > 0) {
      draft.year = years[currentIndex - 1];
      renderPicker();
    }
  });

  nextButton.addEventListener("click", () => {
    const currentIndex = years.indexOf(draft.year);
    if (currentIndex < years.length - 1) {
      draft.year = years[currentIndex + 1];
      renderPicker();
    }
  });

  setButton.addEventListener("click", () => {
    active = { ...draft };
    triggerLabel.textContent = `${active.month} ${active.year}`;
    setStoredPeriod(active);
    setPickerOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!picker.hidden && !picker.contains(event.target) && event.target !== trigger) {
      setPickerOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !picker.hidden) setPickerOpen(false);
  });

  function setPickerOpen(isOpen) {
    picker.hidden = !isOpen;
    trigger.setAttribute("aria-expanded", String(isOpen));
  }

  function renderPicker() {
    const currentIndex = years.indexOf(draft.year);
    yearText.textContent = draft.year;
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= years.length - 1;

    monthList.querySelectorAll(".period-month").forEach((button) => {
      const isSelected = button.dataset.month === draft.month;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-selected", String(isSelected));
    });
  }

  renderPicker();
}

function parseSavedPeriod(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed.month === "string" && Number.isInteger(parsed.year)) {
      return parsed;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function getStoredPeriod() {
  try {
    return localStorage.getItem("educativaPeriodFilter");
  } catch (error) {
    return null;
  }
}

function setStoredPeriod(value) {
  try {
    localStorage.setItem("educativaPeriodFilter", JSON.stringify(value));
  } catch (error) {
    // The filter still updates in the current page when storage is unavailable.
  }
}
