// CityData is now loaded from js/data.js

document.addEventListener("DOMContentLoaded", () => {
    // Safety reveal
    document.body.style.opacity = '1';

    const params = new URLSearchParams(window.location.search);
    const city = params.get("city") || "Bangalore";
    localStorage.setItem("cafeVibe_city", city);

    loadCityDashboard(city);
});

function loadCityDashboard(cityName) {
    const data = CityData[cityName] || CityData["Bangalore"];

    // 1. Hero Updates
    document.getElementById("city-name").innerText = cityName;
    document.getElementById("city-bg").style.backgroundImage = `url('${data.bg}')`;
    document.getElementById("trending-count").innerText = data.stats.trending;
    document.getElementById("indexed-count").innerText = data.stats.indexed;

    // 2. Metrics Updates
    const cards = document.querySelectorAll(".metric-card h3");
    cards[0].innerText = data.stats.calm;
    cards[1].innerText = data.stats.active;
    cards[2].innerText = data.stats.crowded;
    cards[3].innerText = data.stats.wifi + "%";

    // 3. DNA Chart
    renderRadarChart(data.dna);
    document.getElementById("dna-summary").innerText = `${cityName}: ${data.summary}`;
    document.getElementById("city-insight").innerText = data.insight;

    // 4. Challenges
    const challengeList = document.getElementById("challenge-list");
    challengeList.innerHTML = data.challenges.map(c => `<li><i class="fas fa-gem"></i> ${c}</li>`).join("");

    // 5. Trending Slider
    const trendingList = document.getElementById("trending-list");
    trendingList.innerHTML = data.trending.map(t => `
        <div class="trending-card-small">
            <div class="card-img"><img src="${t.img}" alt="${t.name}"></div>
            <div class="card-details">
                <h4>${t.name}</h4>
                <p>${t.vibe}</p>
                <span class="match-score">${t.match}% Match</span>
            </div>
        </div>
    `).join("");

    // Minimap Blur Update
    document.getElementById("mini-map-img").style.backgroundImage = `url('${data.bg}')`;
}

function renderRadarChart(dataPoints) {
    const ctx = document.getElementById('dnaChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Workability', 'Social', 'Night Life', 'Budget', 'Aesthetic'],
            datasets: [{
                label: 'City Vibe',
                data: dataPoints,
                fill: true,
                backgroundColor: 'rgba(201, 160, 113, 0.2)',
                borderColor: '#c9a071',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#c9a071',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#c9a071'
            }]
        },
        options: {
            elements: { line: { tension: 0.3 } },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 12 } },
                    ticks: { display: false, max: 100 }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function launchMap() {
    window.location.href = "app.html";
}

function filterAndLaunch(mode) {
    localStorage.setItem('cafeVibe_tempFilter', mode);
    window.location.href = "app.html";
    // In a real scenario, app.html would auto-open the boot sequence
}
