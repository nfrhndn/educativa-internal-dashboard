document.addEventListener("DOMContentLoaded", () => {
  createDoughnut("mainKpiChart", APP_DATA.kpi.total / 10, ["#ffffff", "rgba(255,255,255,0.16)"], 58, {
    borderColor: "rgba(255,255,255,0.18)",
    borderWidth: 2,
    rotation: 0
  });

  APP_DATA.kpi.indicators.forEach((indicator, index) => {
    createDoughnut(`ring${index + 1}`, indicator.score, ["#008080", "#e6f4f1"], 58, {
      borderColor: "#ffffff",
      borderWidth: 2,
      rotation: 0
    });
    createSparkline(`spark${index + 1}`, indicator.trend);
  });

  initHistoryChart();
});

function initHistoryChart() {
  const historyCanvas = document.getElementById("kpiHistoryChart");
  const tabButtons = document.querySelectorAll("[data-history-tab]");
  if (!historyCanvas) return;

  const ctx = historyCanvas.getContext("2d");
  let activeRange = window.location.hash === "#weekly" ? "weekly" : "monthly";
  setActiveHistoryTab(tabButtons, activeRange);
  let historyChart = createHistoryChart(ctx, activeRange);

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextRange = button.dataset.historyTab;
      if (!nextRange || nextRange === activeRange) return;

      activeRange = nextRange;
      setActiveHistoryTab(tabButtons, activeRange);
      history.replaceState(null, "", `#${activeRange}`);

      historyChart.destroy();
      historyChart = createHistoryChart(ctx, activeRange);
    });
  });
}

function setActiveHistoryTab(tabButtons, activeRange) {
  tabButtons.forEach((tab) => {
    const isActive = tab.dataset.historyTab === activeRange;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function createHistoryChart(ctx, range) {
  const history = APP_DATA.kpi.history[range];
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight || 330);
  gradient.addColorStop(0, "rgba(0, 128, 128, 0.36)");
  gradient.addColorStop(0.72, "rgba(0, 128, 128, 0.13)");
  gradient.addColorStop(1, "rgba(0, 128, 128, 0.03)");

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: history.labels,
      datasets: [{
        label: history.label,
        data: history.score,
        borderColor: "#008080",
        backgroundColor: gradient,
        fill: true,
        tension: 0.42,
        borderWidth: 1.8,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart"
      },
      animations: {
        y: {
          from: (context) => context.chart.scales.y.getPixelForValue(history.min),
          duration: 1200,
          easing: "easeOutQuart"
        }
      },
      layout: { padding: { top: 4, right: 8, bottom: 0, left: 0 } },
      plugins: {
        tooltip: {
          backgroundColor: "#1a1a2e",
          displayColors: false,
          padding: 10,
          titleFont: { family: "Inter", size: 12, weight: "800" },
          bodyFont: { family: "Inter", size: 12, weight: "700" }
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "line",
            boxWidth: 28,
            color: "rgba(26, 26, 46, 0.72)",
            padding: 24,
            font: { family: "Inter", size: 12, weight: "500" }
          }
        }
      },
      scales: {
        y: {
          min: history.min,
          max: history.max,
          border: { display: false },
          grid: {
            color: "rgba(107, 114, 128, 0.24)",
            borderDash: [3, 4]
          },
          ticks: {
            stepSize: history.stepSize,
            color: "rgba(26, 26, 46, 0.68)",
            padding: 8,
            font: { family: "Inter", size: 12 }
          }
        },
        x: {
          border: { color: "rgba(26, 26, 46, 0.28)" },
          grid: { display: false },
          ticks: {
            color: "#1a1a2e",
            padding: 12,
            font: { family: "Inter", size: 12 }
          }
        }
      }
    }
  });
}

function createDoughnut(id, value, colors, cutout, overrides = {}) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  new Chart(canvas.getContext("2d"), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [value, Math.max(0, 100 - value)],
        backgroundColor: colors,
        borderColor: overrides.borderColor || "transparent",
        borderWidth: overrides.borderWidth || 0,
        hoverOffset: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: `${cutout}%`,
      rotation: overrides.rotation ?? -138,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1150,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  addRingGuide(canvas.parentElement, id === "mainKpiChart");
}

function addRingGuide(container, isHero) {
  if (!container || container.querySelector(".ring-guide")) return;

  const guide = document.createElement("div");
  guide.className = `ring-guide${isHero ? " ring-guide--hero" : ""}`;

  const labels = isHero
    ? [
        ["0", "50%", "-4%", "0deg"],
        ["200", "100%", "34%", "72deg"],
        ["400", "80%", "92%", "-36deg"],
        ["600", "20%", "92%", "36deg"],
        ["800", "0%", "34%", "-72deg"]
      ]
    : [
        ["0", "50%", "-7%", "0deg"],
        ["20", "100%", "34%", "72deg"],
        ["40", "80%", "94%", "-36deg"],
        ["60", "20%", "94%", "36deg"],
        ["80", "0%", "34%", "-72deg"]
      ];

  const spokes = [0, 72, 144, 216, 288];

  labels.forEach(([label, x, y, angle]) => {
    const item = document.createElement("span");
    item.className = "ring-label";
    item.textContent = label;
    item.style.setProperty("--x", x);
    item.style.setProperty("--y", y);
    item.style.setProperty("--label-angle", angle);
    guide.appendChild(item);
  });

  spokes.forEach((angle) => {
    const spoke = document.createElement("span");
    spoke.className = "ring-spoke";
    spoke.style.setProperty("--angle", `${angle}deg`);
    guide.appendChild(spoke);
  });

  container.prepend(guide);
}

function createSparkline(id, values) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  new Chart(canvas.getContext("2d"), {
    type: "line",
    data: {
      labels: values.map((_, index) => index + 1),
      datasets: [{
        data: values,
        borderColor: "#40b5b5",
        borderWidth: 2,
        tension: 0.45,
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } }
    }
  });
}
