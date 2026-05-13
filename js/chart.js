// Chart init for pages that include <canvas id="sensorChart">
(function () {
    if (typeof Chart === "undefined") return;
  
    const el = document.getElementById("sensorChart");
    if (!el) return;
  
    const ctx = el.getContext("2d");
  
    const labels = Array.from({ length: 12 }, (_, i) => `${(i+1)*5}m`);
    const data = {
      labels,
      datasets: [
        {
          label: "Suhu Udara (°C)",
          data: labels.map(() => 26 + (Math.random() * 2 - 1)),
          borderColor: "#16a34a",
          backgroundColor: "rgba(22,163,74,0.12)",
          tension: 0.35,
          fill: true,
          pointRadius: 2,
        },
        {
          label: "Kelembaban (%)",
          data: labels.map(() => 65 + (Math.random() * 6 - 3)),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.10)",
          tension: 0.35,
          fill: false,
          pointRadius: 2,
        }
      ]
    };
  
    const chart = new Chart(ctx, {
      type: "line",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue("--text") } }
        },
        scales: {
          x: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue("--muted") }, grid: { color: "rgba(148,163,184,0.12)" } },
          y: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue("--muted") }, grid: { color: "rgba(148,163,184,0.12)" } }
        }
      }
    });
  
    // Expose for realtime updates
    window.AISaChart = chart;
  })();