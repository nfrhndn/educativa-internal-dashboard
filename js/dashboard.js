document.addEventListener("DOMContentLoaded", () => {
  const skeleton = document.querySelector("[data-skeleton]");
  const content = document.querySelector("[data-content]");

  window.setTimeout(() => {
    skeleton?.classList.add("hidden");
    content?.classList.remove("hidden");
    initDashboardCharts();
  }, 450);
});

function initDashboardCharts() {
  const trendCanvas = document.getElementById("trendChart");
  if (trendCanvas) {
    const ctx = trendCanvas.getContext("2d");
    const chartHeight = trendCanvas.clientHeight || 360;
    const gradientKpi = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientKpi.addColorStop(0, "rgba(0, 128, 128, 0.56)");
    gradientKpi.addColorStop(0.62, "rgba(0, 128, 128, 0.28)");
    gradientKpi.addColorStop(1, "rgba(0, 128, 128, 0.07)");

    const gradientAttendance = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientAttendance.addColorStop(0, "rgba(64, 181, 181, 0.42)");
    gradientAttendance.addColorStop(0.58, "rgba(64, 181, 181, 0.2)");
    gradientAttendance.addColorStop(1, "rgba(64, 181, 181, 0.05)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: APP_DATA.dashboard.trend.labels,
        datasets: [
          {
            label: "KPI Score",
            data: APP_DATA.dashboard.trend.kpi,
            borderColor: "#008080",
            backgroundColor: gradientKpi,
            fill: true,
            tension: 0.36,
            borderWidth: 2,
            pointRadius: 0
          },
          {
            label: "Attendance Score",
            data: APP_DATA.dashboard.trend.attendance,
            borderColor: "#40b5b5",
            backgroundColor: gradientAttendance,
            fill: true,
            tension: 0.36,
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      },
      options: baseLineOptions(70, 100)
    });
  }

  const radarCanvas = document.getElementById("dashboardRadar");
  if (radarCanvas) {
    const ctx = radarCanvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, "rgba(0, 128, 128, 0.42)");
    gradient.addColorStop(1, "rgba(0, 128, 128, 0.08)");

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: APP_DATA.dashboard.radar.labels,
        datasets: [{
          label: "Evaluation Score",
          data: APP_DATA.dashboard.radar.score,
          borderColor: "#008080",
          backgroundColor: gradient,
          borderWidth: 2,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { left: 20, right: 20, bottom: 8 } },
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              backdropColor: "transparent",
              color: "rgba(26, 26, 46, 0.45)",
              font: { size: 8 }
            },
            grid: { color: "rgba(0, 128, 128, 0.16)" },
            angleLines: { color: "rgba(0, 128, 128, 0.16)" },
            pointLabels: {
              color: "#008080",
              font: { family: "Inter", size: 10, weight: "800" }
            }
          }
        }
      }
    });
  }
}

function baseLineOptions(min, max) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1300,
      easing: "easeOutQuart",
      delay: (context) => {
        if (context.type !== "data" || context.mode !== "default") return 0;
        return context.dataIndex * 120 + context.datasetIndex * 90;
      }
    },
    animations: {
      y: {
        from: (context) => context.chart.scales.y.getPixelForValue(min),
        duration: 1300,
        easing: "easeOutQuart"
      },
      tension: {
        from: 0.08,
        to: 0.36,
        duration: 1100,
        easing: "easeOutCubic"
      }
    },
    layout: { padding: { top: 12, right: 10, bottom: 4, left: 0 } },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          boxWidth: 28,
          color: "#1a1a2e",
          font: { family: "Inter", size: 12 }
        }
      }
    },
    scales: {
      y: {
        min,
        max,
        border: { display: false },
        grid: { color: "rgba(107, 114, 128, 0.18)", borderDash: [3, 4] },
        ticks: {
          stepSize: 10,
          color: "#1a1a2e",
          font: { family: "Inter", size: 10 }
        }
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: "#1a1a2e",
          font: { family: "Inter", size: 12 }
        }
      }
    }
  };
}
