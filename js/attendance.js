document.addEventListener("DOMContentLoaded", () => {
  createAttendanceDoughnut();
  createAttendanceTrendChart();
});

function createAttendanceDoughnut() {
  const canvas = document.getElementById("attendanceDonut");
  if (!canvas) return;

  const score = APP_DATA.attendance.overview.score;

  new Chart(canvas.getContext("2d"), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [score, Math.max(0, 100 - score)],
        backgroundColor: ["#008080", "rgba(0, 128, 128, 0)"],
        borderWidth: 0,
        borderRadius: 18,
        spacing: 0,
        hoverOffset: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      rotation: 0,
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
    },
    plugins: [attendanceTrackRing]
  });

  addAttendanceRingGuide(canvas.parentElement);
}

function addAttendanceRingGuide(container) {
  if (!container || container.querySelector(".attendance-ring-guide")) return;

  const guide = document.createElement("div");
  guide.className = "attendance-ring-guide";

  const labels = [
    ["0", "50%", "-5%", "0deg"],
    ["20", "99%", "34%", "72deg"],
    ["40", "80%", "96%", "-36deg"],
    ["60", "20%", "96%", "36deg"],
    ["80", "1%", "34%", "-72deg"]
  ];

  labels.forEach(([label, x, y, angle]) => {
    const item = document.createElement("span");
    item.className = "attendance-ring-label";
    item.textContent = label;
    item.style.setProperty("--x", x);
    item.style.setProperty("--y", y);
    item.style.setProperty("--label-angle", angle);
    guide.appendChild(item);
  });

  [0, 72, 144, 216, 288].forEach((angle) => {
    const spoke = document.createElement("span");
    spoke.className = "attendance-ring-spoke";
    spoke.style.setProperty("--angle", `${angle}deg`);
    guide.appendChild(spoke);
  });

  container.prepend(guide);
}

const attendanceTrackRing = {
  id: "attendanceTrackRing",
  beforeDatasetsDraw(chart) {
    const arc = chart.getDatasetMeta(0).data[0];
    if (!arc) return;

    const { ctx } = chart;
    const radius = (arc.outerRadius + arc.innerRadius) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(arc.x, arc.y, radius, 0, Math.PI * 2);
    ctx.lineWidth = arc.outerRadius - arc.innerRadius;
    ctx.strokeStyle = "#e6f4f1";
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
};

function createAttendanceTrendChart() {
  const canvas = document.getElementById("attendanceTrendChart");
  if (!canvas) return;

  const data = APP_DATA.attendance.trend;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight || 250);
  gradient.addColorStop(0, "rgba(0, 128, 128, 0.34)");
  gradient.addColorStop(0.75, "rgba(0, 128, 128, 0.12)");
  gradient.addColorStop(1, "rgba(0, 128, 128, 0.02)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [{
        label: "Evaluation Score (/5.0)",
        data: data.score,
        borderColor: "#008080",
        backgroundColor: gradient,
        fill: true,
        tension: 0.42,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 4,
        pointBackgroundColor: "#008080",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1100,
        easing: "easeOutQuart"
      },
      layout: { padding: { top: 18, right: 14, bottom: 0, left: 0 } },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "line",
            boxWidth: 28,
            color: "rgba(26, 26, 46, 0.78)",
            padding: 20,
            font: { family: "Inter", size: 11, weight: "500" }
          }
        },
        tooltip: {
          backgroundColor: "#1a1a2e",
          displayColors: false,
          padding: 10,
          titleFont: { family: "Inter", size: 12, weight: "800" },
          bodyFont: { family: "Inter", size: 12, weight: "700" },
          callbacks: {
            label: (context) => `Score: ${context.parsed.y.toFixed(1)} / 5.0`
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 5,
          border: { display: false },
          grid: {
            color: "rgba(107, 114, 128, 0.28)",
            borderDash: [3, 4]
          },
          ticks: {
            stepSize: 1,
            color: "rgba(26, 26, 46, 0.5)",
            padding: 8,
            callback: (value) => value === 0 ? "0" : Number(value).toFixed(1),
            font: { family: "Inter", size: 9 }
          }
        },
        x: {
          border: { color: "rgba(26, 26, 46, 0.34)" },
          grid: { display: false },
          ticks: {
            color: "#1a1a2e",
            padding: 9,
            font: { family: "Inter", size: 10 }
          }
        }
      }
    },
    plugins: [attendancePointLabels]
  });
}

const attendancePointLabels = {
  id: "attendancePointLabels",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.fillStyle = "#008080";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.font = "800 10px Inter, Arial, sans-serif";

    meta.data.forEach((point, index) => {
      ctx.fillText(Number(dataset.data[index]).toFixed(1), point.x, point.y - 6);
    });

    ctx.restore();
  }
};
