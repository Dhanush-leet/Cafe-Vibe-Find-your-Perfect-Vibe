# ☕ Cafe Finder — Find Your Perfect Vibe


CafeVibe is a premium, intelligent cafe discovery platform designed to help users discover cafes based on mood, location, and vibe.

Unlike traditional map-based search tools, CafeVibe focuses on experience-driven discovery — matching users with cafes that fit their current intention: work, relax, socialize, or explore.

---

## 🌟 Project Vision

> Cafes are not just locations — they are experiences.

CafeVibe transforms cafe discovery into a mood-aware, geo-intelligent platform by combining:

- Real-time geospatial search
- Smart ranking algorithms
- Radius-based filtering
- Clean, premium UI/UX
- Dynamic OpenStreetMap data integration

---

## 🚀 Core Features

### 🔍 Intelligent Search
- Search by **cafe name**
- Search by **city name**
- Search by **cafe + location combination**
- Autocomplete suggestions
- Smooth map fly-to animation
- Exact location highlighting

---

### 🌍 Dynamic Geo-Search
- Uses **OpenStreetMap Nominatim API** for location lookup
- Uses **Overpass API** for dynamic cafe data fetching
- Works for any searchable city worldwide

---

### 📍 Radius-Based Filtering
Users can dynamically control search radius:
- 2 km
- 5 km
- 10 km
- 20 km

Results are fetched in real-time within the selected area.

---

### 🧠 Smart Ranking System
- Distance-based ranking using Haversine formula
- Sorted results by proximity
- Controlled result rendering for performance
- Clean marker refresh logic

---

### 🗺 Advanced Map Experience
- Built using **Leaflet.js**
- Dark-themed map tiles
- Smooth `flyTo()` animations
- Marker clustering for performance
- Intelligent layer clearing
- Popup-based cafe details

---

### 🎨 Premium UI/UX Design
- Glassmorphism styling
- Modular CSS architecture
- Elegant spacing system
- Responsive layouts
- Smooth micro-interactions
- Structured typography hierarchy

---

### 🧬 Vibe Engine (Concept Layer)
CafeVibe includes a modular vibe engine capable of analyzing metadata to estimate:

- Workability score
- Social energy
- Aesthetic value
- Environment suitability

This lays the foundation for AI-driven personalization.

---

## 🏗 Technical Architecture

### Frontend Stack
- HTML5
- CSS3 (Modular Structure)
- Vanilla JavaScript (ES Modules)

### Map & Geo Stack
- Leaflet.js
- Leaflet MarkerCluster
- OpenStreetMap Nominatim API
- Overpass API

---

## 📁 Project Structure

Cafe-Vibe-Find-your-Perfect-Vibe/
│
├── index.html → Landing page
├── app.html → Core map experience
├── city.html → City-level discovery
│
├── css/
│ ├── global.css
│ ├── homepage.css
│ ├── city.css
│ ├── map.css
│ └── animations.css
│
├── js/
│ ├── main.js
│ ├── map.js
│ ├── city.js
│ ├── data.js
│ ├── utils.js
│ └── vibe-engine.js
│
├── assets/
│ ├── images/
│ ├── icons/
│ └── fonts/
│
└── README.md


The architecture follows separation of concerns for scalability and maintainability.

---

## 🖥 Application Flow

### 1️⃣ Landing Page
- Introduces CafeVibe concept
- Displays featured cities
- Presents mood-driven discovery

---

### 2️⃣ City Selection
- User selects a city
- Map initializes to selected location
- City-specific context is prepared

---

### 3️⃣ Map Experience
Users can:
- Search cafe names
- Search cities dynamically
- Adjust radius
- View dynamically loaded cafes
- Interact with clustered markers

The system:
- Clears previous results
- Fetches new data
- Animates map to target location
- Renders optimized results

---

## 📸 Screenshots

### 🏠 Landing Page

<img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/da3f6702-f22c-474b-baee-b9c3b6019f61" />

---

### 🌆 City Selection Page

<img width="1919" height="990" alt="image" src="https://github.com/user-attachments/assets/0446219b-51d2-41fe-915a-293441e92dda" />

---

### 🗺 Map Interface

<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/4a12ba2f-f49e-482e-aec1-6ed6904cefef" />

---

### 🔍 Search Functionality

<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/fd1074cc-aaf4-4f1e-bb39-4b5298971d16" />

<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/3e8c868b-8db2-462d-9e4c-095d9001f51c" />

---

## ⚡ Performance Optimizations

- Debounced search to prevent API overload
- Marker clustering for large datasets
- Layer-based marker management
- Controlled Overpass result limits
- Smooth animation rendering
- Modular JS file separation

---

## 🔮 Future Enhancements

- Heatmap visualization
- AI-based cafe recommendations
- User favorites & persistence
- Offline caching (Service Workers)
- Weather-based suggestions
- Real-time crowd estimation
- Backend proxy integration
- Progressive Web App support

---

## 🎯 Why This Project Matters

CafeVibe demonstrates:

- Advanced JavaScript logic
- Real-world API integration
- Geospatial computation
- UI/UX refinement
- Clean Git workflow
- Scalable modular architecture

This is not a basic CRUD application —  
it is a geo-intelligent discovery platform.

---

## 👨‍💻 Author

**Dhanush**

Final Year Engineering Student  
Passionate about building intelligent, user-focused web applications.
