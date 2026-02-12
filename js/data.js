const CityData = {
    Bangalore: {
        bg: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80",
        stats: { indexed: 842, trending: 127, calm: 34, active: 21, crowded: 12, wifi: 68 },
        dna: [80, 60, 90, 70, 50], // Work, Social, Night, Budget, Aesthetic
        summary: "High Work Energy, Moderate Social Buzz",
        insight: "Bangalore is ranked #1 for remote workers due to high WiFi availability and cafe density in Indiranagar and Koramangala.",
        challenges: [
            "Explore 3 new cafes in Indiranagar",
            "Find a rooftop spot for sunset",
            "locate a hidden gem under ₹200"
        ],
        trending: [
            { name: "Third Wave Coffee", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300", vibe: "Productive", match: 98 },
            { name: "Blue Tokai", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300", vibe: "Social", match: 85 },
            { name: "Araku Coffee", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300", vibe: "Luxury", match: 92 }
        ]
    },
    Mumbai: {
        bg: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80",
        stats: { indexed: 620, trending: 94, calm: 15, active: 45, crowded: 28, wifi: 55 },
        dna: [60, 90, 85, 40, 75],
        summary: "Intense Social Scene, Iconic Sea Views",
        insight: "Mumbai's cafe culture thrives in Bandra and Colaba, offering a mix of rapid-fire business meets and laid-back sea-view creativity.",
        challenges: [
            "Visit a heritage cafe in South Bombay",
            "Try the famous Irani Chai",
            "Spot a celebrity in Bandra"
        ],
        trending: [
            { name: "Subko Coffee", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300", vibe: "Artisan", match: 96 },
            { name: "Blue Tokai Bandra", img: "https://images.unsplash.com/photo-1559925393-8be0ec41b50d?auto=format&fit=crop&w=300", vibe: "Social", match: 88 },
            { name: "Candies", img: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=300", vibe: "Casual", match: 75 }
        ]
    },
    Chennai: {
        bg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80",
        stats: { indexed: 410, trending: 62, calm: 40, active: 15, crowded: 5, wifi: 72 },
        dna: [75, 40, 30, 85, 60],
        summary: "Quiet Focus, Traditional Blend",
        insight: "Chennai offers spacious, budget-friendly cafes perfect for long study sessions, blending modern distinct coffee with traditional filter kaapi roots.",
        challenges: [
            "Find the best Filter Coffee",
            "Visit a library cafe in Adyar",
            "Explore a beach-side shack"
        ],
        trending: [
            { name: "Writer's Cafe", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300", vibe: "Quiet", match: 95 },
            { name: "Ciclo Cafe", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300", vibe: "Cycle Theme", match: 82 },
            { name: "Amethyst", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300", vibe: "Garden", match: 89 }
        ]
    }
};
