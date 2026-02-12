import { VibeEngine } from './vibe-engine.js';
import { Utils } from './utils.js';

let map;
let cafeLayer; // Cluster Group for production performance
let currentCafes = [];
let currentMood = 'all';
let lastSearchTime = 0; // API Rate protection

const CityConfig = {
    bangalore: { coords: [12.9716, 77.5946], zoom: 13, label: "Bangalore" },
    mumbai: { coords: [19.0760, 72.8777], zoom: 13, label: "Mumbai" },
    chennai: { coords: [13.0827, 80.2707], zoom: 13, label: "Chennai" },
    delhi: { coords: [28.6139, 77.2090], zoom: 13, label: "Delhi" },
    hyderabad: { coords: [17.3850, 78.4867], zoom: 13, label: "Hyderabad" },
    pune: { coords: [18.5204, 73.8567], zoom: 13, label: "Pune" },
    kolkata: { coords: [22.5726, 88.3639], zoom: 13, label: "Kolkata" }
};

export const MapApp = {
    init: () => {
        map = L.map("map", {
            zoomControl: false,
            fadeAnimation: true
        }).setView([12.9716, 77.5946], 5); // Start at India scale

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; OpenStreetMap | CARTO',
            maxZoom: 20
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Initialize Marker Cluster Group (Production Upgrade)
        // Customized to match our champagne gold/dark theme
        cafeLayer = L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            maxClusterRadius: 50
        });
        map.addLayer(cafeLayer);

        // Parse City from URL
        const params = new URLSearchParams(window.location.search);
        const cityKey = params.get("city");

        if (cityKey && CityConfig[cityKey]) {
            const config = CityConfig[cityKey];
            map.setView(config.coords, 4);
            localStorage.setItem('cafeVibe_city', config.label);
            Utils.saveToLocal('last_coords', config.coords);
            const cityLabel = document.getElementById('overlay-city');
            if (cityLabel) cityLabel.innerText = config.label;
        } else {
            const lastSession = Utils.getFromLocal('last_coords');
            if (lastSession) map.setView(lastSession, 4);
        }

        // Map Listeners
        map.on('moveend', () => {
            const btn = document.getElementById('search-area-action');
            if (btn) btn.classList.remove('hidden');
        });

        MapApp.applyTimeTheme();
    },

    revealMap: () => {
        const lastSession = Utils.getFromLocal('last_coords') || [12.9716, 77.5946];
        const params = new URLSearchParams(window.location.search);
        const cityKey = params.get("city");
        const targetZoom = (cityKey && CityConfig[cityKey]) ? CityConfig[cityKey].zoom : 14;

        setTimeout(() => {
            map.flyTo(lastSession, targetZoom, {
                duration: 2.5, // Premium slow fly
                easeLinearity: 0.1
            });
            setTimeout(() => MapApp.fetchCafes(lastSession[0], lastSession[1]), 3000);
        }, 500);
    },

    applyTimeTheme: () => {
        const hour = new Date().getHours();
        const body = document.body;
        if (hour >= 18 || hour < 6) body.classList.add('night-theme');
        else if (hour >= 6 && hour < 10) body.classList.add('morning-theme');
    },

    toggleStealthMode: () => {
        const app = document.getElementById('app-container');
        const btn = document.querySelector('.stealth-btn');
        app.classList.toggle('stealth-mode');
        btn.classList.toggle('active');
        if (app.classList.contains('stealth-mode')) Utils.toggleSidebar();
    },

    exitFocusMode: () => {
        document.body.classList.remove('focus-active');
        if (map) map.setZoom(14);
    },

    // --- SEARCH SYSTEM ---

    search: async (query) => {
        if (!query || query.length < 3) {
            MapApp.hideAutocomplete();
            return;
        }

        // Rate Protection
        const now = Date.now();
        if (now - lastSearchTime < 800) return;
        lastSearchTime = now;

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=in`);
            const results = await res.json();

            if (results.length === 0) MapApp.showNoResults();
            else MapApp.showAutocomplete(results);
        } catch (e) {
            console.error("Geocoding Error:", e);
        }
    },

    showAutocomplete: (results) => {
        const panel = document.getElementById('autocomplete-results');
        if (!panel) return;

        panel.innerHTML = "";
        results.forEach(place => {
            const parts = place.display_name.split(',');
            const mainText = parts[0];
            const subText = parts.slice(1, 4).join(',').trim();

            const div = document.createElement('div');
            div.className = "autocomplete-item";
            div.innerHTML = `
                <span class="main-text">${mainText}</span>
                <span class="sub-text">${subText}</span>
            `;

            div.onclick = () => {
                MapApp.selectLocation(place);
                MapApp.hideAutocomplete();
                const input = document.getElementById('place-input');
                if (input) input.value = mainText;
            };

            panel.appendChild(div);
        });
        panel.classList.remove('hidden');
    },

    showNoResults: () => {
        const panel = document.getElementById('autocomplete-results');
        if (!panel) return;
        panel.innerHTML = `<div class="autocomplete-item"><span class="main-text" style="opacity:0.5">No locations found.</span></div>`;
        panel.classList.remove('hidden');
    },

    hideAutocomplete: () => {
        const panel = document.getElementById('autocomplete-results');
        if (panel) panel.classList.add('hidden');
    },

    selectLocation: async (place) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        const radius = document.getElementById('radius-select')?.value || 5000;

        // Viewport Biasing for higher precision
        const bounds = map.getBounds();
        const viewbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

        Utils.showLoader(true);
        try {
            // Detect if specific cafe/amenity
            const isSpecificSpot = place.type === 'cafe' || place.type === 'restaurant' || place.class === 'amenity';
            const targetZoom = isSpecificSpot ? 18 : 14;

            map.flyTo([lat, lon], targetZoom, { duration: 1.5 });
            Utils.saveToLocal('last_coords', [lat, lon]);

            if (isSpecificSpot) {
                // Clear existing and drop a "Highlight" marker for the search result
                cafeLayer.clearLayers();

                // Get Vibe Scores for this specific spot
                const scores = VibeEngine.calculateScores(place);

                const highlightMarker = L.marker([lat, lon])
                    .addTo(cafeLayer)
                    .bindPopup(`<strong>${place.display_name.split(',')[0]}</strong><br>Selected Spot`)
                    .openPopup();

                // Still fetch nearby cafes but with a smaller search radius to provide context
                await MapApp.fetchCafes(lat, lon, 1000);
            } else {
                await MapApp.fetchCafes(lat, lon, radius);
            }
        } catch (e) {
            console.error(e);
        } finally {
            Utils.showLoader(false);
            const moveBtn = document.getElementById('search-area-action');
            if (moveBtn) moveBtn.classList.add('hidden');
        }
    },

    searchCurrentArea: async () => {
        const center = map.getCenter();
        const radius = document.getElementById('radius-select')?.value || 5000;

        Utils.showLoader(true);
        const btn = document.getElementById('search-area-action');
        if (btn) btn.classList.add('hidden');

        try {
            await MapApp.fetchCafes(center.lat, center.lng, radius);
        } finally {
            Utils.showLoader(false);
        }
    },

    fetchCafes: async (lat, lon, radius = 3000) => {
        // Clear marker clusters before fetch starts for visual feedback
        cafeLayer.clearLayers();

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="cafe"](around:${radius},${lat},${lon});out tags;`;
        try {
            const res = await fetch(overpassUrl);
            const data = await res.json();

            const rankedCafes = data.elements.map(cafe => ({
                ...cafe,
                _distance: MapApp.getDistance(lat, lon, cafe.lat, cafe.lon)
            })).sort((a, b) => a._distance - b._distance);

            currentCafes = rankedCafes;
            MapApp.renderMarkers();
        } catch (e) {
            console.error("Overpass Error:", e);
        }
    },

    getDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    },

    renderMarkers: () => {
        if (!cafeLayer) return;
        cafeLayer.clearLayers();

        const filtered = MapApp.getFilteredCafes();
        filtered.forEach(cafe => {
            const scores = VibeEngine.calculateScores(cafe);
            const marker = L.marker([cafe.lat, cafe.lon])
                .on('click', () => MapApp.showDetails(cafe, scores));
            cafeLayer.addLayer(marker);
        });
    },

    getFilteredCafes: () => {
        if (currentMood === 'all') return currentCafes;
        return currentCafes.filter(cafe => VibeEngine.calculateScores(cafe)[currentMood] > 60);
    },

    setMood: (mood) => {
        currentMood = mood;
        MapApp.renderMarkers();
    },

    showDetails: (cafe, scores) => {
        const dna = VibeEngine.generateDNA(cafe, scores);
        const sidebar = document.getElementById("cafe-details");
        const welcome = document.getElementById("welcome-message");
        const detailCard = document.getElementById("detail-card");

        document.body.classList.add('focus-active');
        map.flyTo([cafe.lat, cafe.lon], 17, { duration: 1.2 });

        welcome.classList.add("hidden");
        sidebar.classList.remove("hidden");

        const tags = cafe.tags || {};
        const compatScore = VibeEngine.generateCompatibility(scores, currentMood);
        const stayTime = VibeEngine.calculateStayDuration(scores);
        const timeline = VibeEngine.generateTimeline();
        const ringColor = compatScore > 85 ? '#4ade80' : (compatScore > 65 ? '#c9a071' : '#f87171');

        detailCard.innerHTML = `
      <div class="detail-header-premium">
        <div class="header-main">
            <h3>${tags.name || "Mystery Cafe"}</h3>
            <span class="vibe-tag-pill">${VibeEngine.getVibeSummary(scores)}</span>
        </div>
        <div class="compat-ring-container">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="circle" stroke-dasharray="${compatScore}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style="stroke: ${ringColor};" />
              <text x="18" y="20.35" class="percentage">${compatScore}%</text>
            </svg>
            <span class="ring-label">Match</span>
        </div>
      </div>
      <div class="ai-stat-row">
        <div class="ai-stat"><i class="fas fa-hourglass-half"></i><div><span class="stat-val">${stayTime}</span><span class="stat-lbl">Ideal Stay</span></div></div>
        <div class="ai-stat"><i class="fas fa-signal"></i><div><span class="stat-val">${dna.noise}/10</span><span class="stat-lbl">Noise Level</span></div></div>
        <div class="ai-stat"><i class="fas fa-coins"></i><div><span class="stat-val">${dna.price}</span><span class="stat-lbl">Budget</span></div></div>
      </div>
      <div class="energy-timeline-panel glass-panel">
        <h4><i class="fas fa-chart-bar"></i> Live Energy Forecast</h4>
        <div class="timeline-bars">
            ${timeline.map(t => `<div class="t-bar-group"><div class="t-bar" style="height: ${t.v}%; background: ${t.v > 70 ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}"></div><span class="t-label">${t.h}</span></div>`).join('')}
        </div>
      </div>
      <div class="vibe-scores-compact">${MapApp.renderScoreRow("Productivity", scores.work)}${MapApp.renderScoreRow("Social Buzz", scores.social)}</div>
      <div class="detail-info">
          <div class="info-item"><i class="fas fa-location-dot"></i><span>${tags["addr:street"] || tags["addr:full"] || "Location hidden"}</span></div>
          ${tags.opening_hours ? `<div class="info-item"><i class="fas fa-clock"></i><span>${tags.opening_hours}</span></div>` : ''}
      </div>
      <div class="action-btns">
         <a href="https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lon}" target="_blank" class="btn-primary"><i class="fas fa-location-arrow"></i> Navigate</a>
         <button class="btn-secondary" onclick="window.saveCafe(${cafe.id || 0})"><i class="fas fa-bookmark"></i> Save</button>
      </div>
    `;

        if (document.getElementById("sidebar").classList.contains("sidebar-collapsed")) Utils.toggleSidebar();
    },

    renderScoreRow: (label, val) => `
    <div class="score-row">
      <div class="score-label"><span>${label}</span><span>${val}%</span></div>
      <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${val}%"></div></div>
    </div>
  `
};
