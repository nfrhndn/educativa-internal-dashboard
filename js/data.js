const APP_DATA = {
  currentPeriod: "March 2026",
  user: {
    name: "Herlina Adinda",
    firstName: "Herlina",
    role: "Graphic Design",
    department: "Creative Design",
    email: "herlina.adinda@educativa.id",
    phone: "+62 812 3344 5566",
    address: "Bandung, Jawa Barat",
    university: "Universitas Pendidikan Indonesia",
    major: "Desain Komunikasi Visual",
    semester: "Semester 6",
    internshipPeriod: "Feb 2026 - Jul 2026",
    mentor: "Amanda Azzura",
    avatar: "../assets/images/woman-profile.png"
  },
  dashboard: {
    stats: {
      kpi: 910,
      attendance: 91,
      countdown: 5,
      evaluationDate: "04/15/2026"
    },
    trend: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      kpi: [98, 93, 95, 84],
      attendance: [98, 94, 95, 100]
    },
    radar: {
      labels: ["Initiative", "Communication", "Responsibility"],
      score: [90, 82, 72]
    },
    breakdown: [
      { label: "Initiative", value: 80, detail: "4.0 dari 5 bintang" },
      { label: "Communication", value: 70, detail: "3.5 dari 5 bintang" },
      { label: "Responsibility", value: 90, detail: "4.5 dari 5 bintang" }
    ],
    mentorNote: {
      name: "Amanda Azzura",
      image: "../assets/images/woman-mentor-2.png",
      text: "Halo Herlina, aku senang banget bisa lihat progress kamu yang keren banget selama ini! Kamu termasuk intern yang berkembang paling pesat dalam satu bulan ini. Tetap semangat ya, keep up your great work!"
    }
  },
  kpi: {
    total: 910,
    indicators: [
      { label: "Design Output", icon: "../assets/icons/kpi-page/icon-design-output.svg", weight: 450, metaLabel: "Status", status: "2 Design Ready", score: 100, trend: [24, 32, 30, 42, 48, 56] },
      { label: "Brand Consistency", icon: "../assets/icons/kpi-page/icon-brand-consistency.svg", weight: 180, metaLabel: "Target", status: "90% Target Met!", score: 90, trend: [18, 24, 29, 34, 39, 43] },
      { label: "Technical Accuracy", icon: "../assets/icons/kpi-page/icon-technical-accuracy.svg", weight: 200, metaLabel: "Target", status: "85% Optimal!", score: 85, trend: [20, 23, 28, 27, 35, 40] },
      { label: "Deadline Discipline", icon: "../assets/icons/kpi-page/icon-deadline-discipline.svg", weight: 170, metaLabel: "Target", status: "90% Punctual!", score: 90, trend: [28, 25, 34, 36, 38, 44] }
    ],
    history: {
      monthly: {
        labels: ["Jan", "Feb", "March", "April"],
        score: [96, 90, 91, 74],
        label: "KPI Score by Month",
        min: 0,
        max: 100,
        stepSize: 20
      },
      weekly: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        score: [21.4, 23.2, 21.9, 24.3],
        label: "KPI Score by Week (March 2026)",
        min: 0,
        max: 25,
        stepSize: 5
      }
    }
  }
};
