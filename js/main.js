import { MapApp } from './map.js';
import { Utils } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Landing Page & Shared Functions
    window.selectCity = (name, coords) => {
        // Prepare for smooth transition if needed, though redirect is safer
        Utils.saveToLocal('last_coords', coords);
        localStorage.setItem('cafeVibe_city', name);
        window.location.href = `app.html?city=${name.toLowerCase()}`;
    };

    window.enterWithFilter = (filter) => {
        localStorage.setItem('cafeVibe_tempFilter', filter);
        if (!document.getElementById('map')) {
            window.location.href = 'app.html';
        } else {
            window.startBootSequence();
        }
    };

    const animateCounters = () => {
        document.querySelectorAll('.pulse-number').forEach(el => {
            const target = +el.dataset.target;
            const speed = 200;
            const inc = target / speed;
            let count = 0;
            const update = () => {
                count += inc;
                if (count < target) {
                    el.innerText = Math.floor(count);
                    setTimeout(update, 1);
                } else {
                    el.innerText = target;
                }
            };
            update();
        });
    };

    // Check if we are on the app page
    if (document.getElementById('map')) {
        MapApp.init();

        // Search & Autocomplete Interaction
        const searchInput = document.getElementById('place-input');
        let debounceTimer;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                const query = e.target.value.trim();

                if (query.length < 3) {
                    MapApp.hideAutocomplete();
                    return;
                }

                debounceTimer = setTimeout(() => {
                    MapApp.search(query);
                }, 400);
            });

            // Close autocomplete on click outside
            document.addEventListener('click', (e) => {
                const resultsPanel = document.getElementById('autocomplete-results');
                if (resultsPanel && !resultsPanel.contains(e.target) && e.target !== searchInput) {
                    MapApp.hideAutocomplete();
                }
            });

            // Still allow immediate search on Enter if needed, though autocomplete is primary
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    clearTimeout(debounceTimer);
                    MapApp.search(searchInput.value);
                }
            });
        }

        // Mood-Based Music Control
        window.setMood = (mood) => {
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.toggle('active', b.dataset.mood === mood));
            MapApp.setMood(mood);

            const audio = document.getElementById('bg-audio');
            const track = document.getElementById('track-name');
            if (mood === 'work') { track.innerText = "Lofi Work"; audio.play(); }
            else if (mood === 'date') { track.innerText = "Soft Jazz"; audio.play(); }
            else if (mood === 'social') { track.innerText = "Ambient Chill"; audio.play(); }
        };

        // Mouse Trail Micro-delight
        document.addEventListener('mousemove', (e) => {
            const glow = document.createElement('div');
            glow.className = 'mouse-glow';
            glow.style.left = e.pageX + 'px';
            glow.style.top = e.pageY + 'px';
            document.body.appendChild(glow);
            setTimeout(() => glow.remove(), 800);
        });

        window.toggleSidebar = Utils.toggleSidebar;
        window.showWelcome = () => {
            document.getElementById("welcome-message").classList.remove("hidden");
            document.getElementById("cafe-details").classList.add("hidden");
            MapApp.exitFocusMode();
        };

        window.locateMe = () => {
            navigator.geolocation.getCurrentPosition(pos => {
                const { latitude, longitude } = pos.coords;
                MapApp.fetchCafes(latitude, longitude);
            });
        };

        window.toggleStudyMode = () => {
            document.body.classList.toggle('study-mode');
            document.querySelector('.study-mode-btn').classList.toggle('active');
        };

        window.toggleStealthMode = MapApp.toggleStealthMode;

        animateCounters();

        // Custom Experience Entry
        window.startBootSequence = () => {
            const btn = document.querySelector('.overlay-content .btn-primary');
            const bootArea = document.getElementById('boot-sequence');
            const logArea = document.getElementById('boot-log');

            if (btn) btn.classList.add('hidden');
            if (bootArea) bootArea.classList.remove('hidden');

            const logs = [
                "> Initializing Cafe Radar v2.1...",
                "> Scanning local WiFi nodes...",
                "> Calibrating Vibe Engine...",
                "> Syncing live crowd density...",
                "> ACCESS GRANTED."
            ];

            let delay = 0;
            // Clear previous logs
            if (logArea) logArea.innerHTML = '';

            logs.forEach((log, index) => {
                setTimeout(() => {
                    const p = document.createElement('div');
                    p.innerText = log;
                    p.style.color = index === logs.length - 1 ? '#4ade80' : 'var(--primary)';
                    p.style.fontFamily = 'monospace';
                    p.style.opacity = '0';
                    p.style.animation = 'fadeIn 0.3s forwards';
                    if (logArea) {
                        logArea.appendChild(p);
                        logArea.scrollTop = logArea.scrollHeight;
                    }
                }, delay);
                delay += 800;
            });

            setTimeout(window.enterExperience, delay + 500);
        };

        window.enterExperience = () => {
            const overlay = document.getElementById('welcome-overlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(1.2)'; // More dramatic zoom

                setTimeout(() => {
                    overlay.classList.add('hidden');
                    const app = document.getElementById('app-container');
                    if (app) {
                        document.body.classList.add('app-ready'); // Trigger CSS transitions
                        app.classList.remove('hidden-ui');
                        app.classList.add('fade-in');
                        if (window.MapApp && window.MapApp.revealMap) window.MapApp.revealMap();
                    }
                }, 800);
            }
        };

        window.saveCafe = (id) => {
            console.log("Cafe saved to collection:", id);
            alert("Spot saved to your Vibe Collection!");
        };

        window.onload = () => {
            const city = localStorage.getItem('cafeVibe_city') || 'Bangalore';
            const cityLabel = document.getElementById('overlay-city');
            if (cityLabel) cityLabel.innerText = city;
        };

        // Smart Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'L') window.locateMe();
            if (e.shiftKey && e.key === 'S') window.toggleStealthMode();
            if (e.key === 'Escape') MapApp.exitFocusMode();
        });
    } else {
        // We are on landing or other page
        animateCounters();
    }
});
