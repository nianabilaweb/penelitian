(function () {
    const themeKey = "aisa-theme";
  
    function setTheme(mode) {
      document.documentElement.setAttribute("data-theme", mode);
      localStorage.setItem(themeKey, mode);
      const t = document.querySelector("[data-action='toggle-theme'] i");
      if (t) t.className = mode === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
  
    function initTheme() {
      const saved = localStorage.getItem(themeKey);
      if (saved) return setTheme(saved);
      // default: light
      setTheme("light");
    }
  
    function setActiveMenu() {
      const path = location.pathname.split("/").pop() || "index.html";
      document.querySelectorAll(".menu a").forEach(a => {
        const href = a.getAttribute("href");
        a.classList.toggle("active", href === path);
      });
    }
  
    function initSidebarToggle() {
      const btn = document.querySelector("[data-action='toggle-sidebar']");
      const sidebar = document.querySelector(".sidebar");
      if (!btn || !sidebar) return;
  
      btn.addEventListener("click", () => sidebar.classList.toggle("open"));
  
      // close on outside click (mobile)
      document.addEventListener("click", (e) => {
        if (window.matchMedia("(max-width: 900px)").matches) {
          const isClickInside = sidebar.contains(e.target) || btn.contains(e.target);
          if (!isClickInside) sidebar.classList.remove("open");
        }
      });
    }
  
    function initThemeToggle() {
      const btn = document.querySelector("[data-action='toggle-theme']");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const curr = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(curr === "dark" ? "light" : "dark");
      });
    }
  
    function initToggles() {
      document.querySelectorAll(".toggle").forEach(tg => {
        tg.addEventListener("click", () => {
          const on = tg.getAttribute("data-on") === "true";
          tg.setAttribute("data-on", (!on).toString());
          const label = tg.getAttribute("data-label") || "Device";
          window.AISaToast?.info(`${label} ${!on ? "ON" : "OFF"}`);
        });
      });
    }
  
    // Simple toast helper
    function initToast() {
      const wrap = document.querySelector(".toast-wrap") || (() => {
        const el = document.createElement("div");
        el.className = "toast-wrap";
        document.body.appendChild(el);
        return el;
      })();
  
      function show(type, msg, title = "Notification", timeout = 3500) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
          <div class="ticon"><i class="fa-solid ${type === "danger" ? "fa-triangle-exclamation" : type === "warning" ? "fa-circle-exclamation" : "fa-circle-info"}"></i></div>
          <div class="tmeta">
            <b>${title}</b>
            <span>${msg}</span>
          </div>
        `;
        wrap.appendChild(toast);
        setTimeout(() => toast.remove(), timeout);
      }
  
      window.AISaToast = {
        info: (m,t) => show("info", m, t || "Info"),
        warning: (m,t) => show("warning", m, t || "Warning"),
        danger: (m,t) => show("danger", m, t || "Danger"),
      };
    }
  
    // init
    initTheme();
    initToast();
    setActiveMenu();
    initSidebarToggle();
    initThemeToggle();
    initToggles();
  })();