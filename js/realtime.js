/**
 * Replace with real endpoint:
 * - WebSocket: ws(s)://host/ws
 * - MQTT over WebSocket: use mqtt.js (not included by default)
 */
(function () {
    function updateStat(id, val) {
      const el = document.querySelector(`[data-stat='${id}']`);
      if (el) el.textContent = val;
    }
  
    function pushChart(temp, hum) {
      const ch = window.AISaChart;
      if (!ch) return;
      const ts = new Date().toLocaleTimeString().slice(0,5);
  
      ch.data.labels.push(ts);
      ch.data.labels = ch.data.labels.slice(-12);
  
      ch.data.datasets[0].data.push(temp);
      ch.data.datasets[0].data = ch.data.datasets[0].data.slice(-12);
  
      ch.data.datasets[1].data.push(hum);
      ch.data.datasets[1].data = ch.data.datasets[1].data.slice(-12);
  
      ch.update("none");
    }
  
    // Demo simulator (remove when realtime ready)
    setInterval(() => {
      const suhu = +(26 + (Math.random() * 2 - 1)).toFixed(1);
      const hum = +(65 + (Math.random() * 6 - 3)).toFixed(0);
      const ph = +(6.8 + (Math.random() * 0.4 - 0.2)).toFixed(2);
      const tds = Math.floor(900 + (Math.random() * 120 - 60));
      const lvl = +(18 + (Math.random() * 2 - 1)).toFixed(1);
      const egg = Math.max(0, Math.floor(12 + (Math.random() * 6 - 3)));
  
      updateStat("suhu", suhu);
      updateStat("hum", hum);
      updateStat("ph", ph);
      updateStat("tds", tds);
      updateStat("level", lvl);
      updateStat("egg", egg);
  
      pushChart(suhu, hum);
  
      if (ph < 6.6) window.AISaToast?.warning("pH air terlalu rendah", "Sensor Alert");
      if (suhu > 28.5) window.AISaToast?.danger("Suhu greenhouse terlalu panas", "Overheat");
    }, 4000);
  })();