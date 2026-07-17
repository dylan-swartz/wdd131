// Dark/Light mode toggle
// Reads the saved preference (if any) on load, applies it, and lets
// the button flip between the two - saving the new choice each time.

const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const logoImg = document.getElementById("logo-img");

function applyTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
    logoImg.src = "logo-light.png";
  } else {
    root.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
    logoImg.src = "logo-transparent.png";
  }
}

// on load: use saved preference, or fall back to the user's system setting
const saved = localStorage.getItem("kembermedia-theme");
if (saved) {
  applyTheme(saved);
} else {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

toggleBtn.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("kembermedia-theme", next);
});
// 1. Array of container objects (name, url, category)
const containers = [
  { name: "Jellyfin", url: "http://192.168.0.201:8096", category: "media", icon: "jellyfin", status: "running" },
  { name: "Immich", url: "http://192.168.0.201:2283", category: "media", icon: "immich", status: "running" },
  { name: "Jellyseerr", url: "http://192.168.0.201:5055", category: "media", icon: "jellyseerr", status: "running" },
  { name: "Sonarr", url: "http://192.168.0.201:8989", category: "media", icon: "sonarr", status: "running" },
  { name: "Radarr", url: "http://192.168.0.201:7878", category: "media", icon: "radarr", status: "running" },
  { name: "Prowlarr", url: "http://192.168.0.201:9696", category: "media", icon: "prowlarr", status: "running" },
  { name: "qBittorrent", url: "http://192.168.0.201:8080", category: "media", icon: "qbittorrent", status: "running" },
  { name: "Bazarr", url: "http://192.168.0.201:6767", category: "media", icon: "bazarr", status: "running" },
  { name: "Pi-hole", url: "http://192.168.0.201:8081/admin", category: "networking", icon: "pi-hole", status: "running" },
  { name: "Portainer", url: "http://192.168.0.201:9000", category: "utility", icon: "portainer", status: "running" },
  { name: "Filebrowser", url: "http://192.168.0.201:8090", category: "utility", icon: "filebrowser", status: "running" },
  { name: "Uptime Kuma", url: "http://192.168.0.201:3001", category: "utility", icon: "uptime-kuma", status: "running" },
];

// CDN base for service logos (Dashboard Icons project - homarr-labs/dashboard-icons)
const ICON_BASE = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg";

const cardGrid = document.getElementById("card-grid");
const filterBar = document.getElementById("filter-bar");

// keep a running record of each container's current status by name,
// starting from the status you set on each container object above
const statusMap = {};
containers.forEach((c) => (statusMap[c.name] = c.status || "unknown"));

// 2. Build category list for filter buttons (All + each unique category)
function getCategories() {
  const unique = [...new Set(containers.map((c) => c.category))];
  return ["all", ...unique];
}

function renderFilterButtons() {
  filterBar.innerHTML = '<span class="filter-label">Filter:</span>';
  getCategories().forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (category === "all" ? " active" : "");
    btn.dataset.category = category;
    btn.textContent = category === "all"
      ? "All"
      : category.charAt(0).toUpperCase() + category.slice(1);
    btn.addEventListener("click", () => handleFilterClick(category));
    filterBar.appendChild(btn);
  });
}

// 3. Build the card grid using map(), filtered by the selected category
function renderCards(activeCategory = "all") {
  const filtered =
    activeCategory === "all"
      ? containers
      : containers.filter((c) => c.category === activeCategory);

  cardGrid.innerHTML = filtered
    .map((container) => {
      const status = statusMap[container.name] || "unknown";
      return `
        <div class="card">
          <div class="card-top">
            <img class="card-icon" src="${ICON_BASE}/${container.icon}.svg" alt="${container.name} icon" width="40" height="40" onerror="this.style.display='none'" />
            <span class="status-dot ${status}"></span>
          </div>
          <span class="card-name">${container.name}</span>
          <span class="card-category">${container.category}</span>
          <span class="card-status-text">status: ${status}</span>
          <a class="card-link" href="${container.url}" target="_blank">Open &rarr;</a>
        </div>
      `;
    })
    .join("");

  if (filtered.length === 0) {
    cardGrid.innerHTML = '<p class="loading-msg">No containers in this category.</p>';
  }
}

// handle a filter button click: toggle "active" class, re-render cards
function handleFilterClick(category) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  renderCards(category);
}

// 4. Status check (stretch goal) - tries a real status API,
// falls back to a random demo status if there's no server to answer it
async function checkStatuses() {
  try {
    const response = await fetch("/api/status");
    if (!response.ok) throw new Error("bad response");
    const data = await response.json();
    // expected shape: [{ name: "Jellyfin", status: "running" }, ...]
    data.forEach((item) => {
      statusMap[item.name] = item.status;
    });
  } catch (err) {
    // 5. No status API available (e.g. running this as a static demo) -
    // assign a random demo status so the UI still has something to show
    const demoStatuses = ["running", "running", "running", "stopped", "unavailable"];
    containers.forEach((c) => {
      statusMap[c.name] = demoStatuses[Math.floor(Math.random() * demoStatuses.length)];
    });
  }

  const activeBtn = document.querySelector(".filter-btn.active");
  const activeCategory = activeBtn ? activeBtn.dataset.category : "all";
  renderCards(activeCategory);
}

// initial load
renderFilterButtons();
renderCards();
checkStatuses();

// re-check status every 30 seconds
setInterval(checkStatuses, 30000);