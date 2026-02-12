export const VibeEngine = {
    calculateScores: (cafe) => {
        const tags = cafe.tags || {};
        let work = 40, date = 30, social = 50;
        const text = JSON.stringify(tags).toLowerCase();

        // Work Scoring Logic
        if (text.includes("wifi") || text.includes("wlan") || text.includes("internet")) work += 30;
        if (text.includes("quiet") || text.includes("workspace") || text.includes("study")) work += 25;
        if (text.includes("power") || text.includes("socket") || text.includes("plug")) work += 20;
        if (text.includes("meeting") || text.includes("laptop")) work += 15;

        // Date/Aesthetic Scoring Logic
        if (text.includes("romantic") || text.includes("dim") || text.includes("view")) date += 35;
        if (text.includes("expensive") || text.includes("fine_dining") || text.includes("boutique")) date += 20;
        if (text.includes("garden") || text.includes("rooftop") || text.includes("balcony")) date += 25;
        if (text.includes("aesthetic") || text.includes("interior") || text.includes("decor")) date += 20;

        // Social/Group Scoring Logic
        if (text.includes("outdoor") || text.includes("terrace") || text.includes("patio")) social += 25;
        if (text.includes("group") || text.includes("crowd") || text.includes("party")) social += 20;
        if (text.includes("music") || text.includes("live") || text.includes("performance")) social += 25;
        if (text.includes("games") || text.includes("events")) social += 20;

        return {
            work: Math.min(work, 100),
            date: Math.min(date, 100),
            social: Math.min(social, 100)
        };
    },

    generateDNA: (cafe, scores) => {
        const tags = cafe.tags || {};
        const text = JSON.stringify(tags).toLowerCase();

        return {
            energy: scores.social > 70 ? "High" : (scores.work > 70 ? "Low" : "Medium"),
            noise: Math.floor((scores.social / 10) + (Math.random() * 2)),
            workability: scores.work > 80 ? "Pro" : (scores.work > 50 ? "Standard" : "Limited"),
            stay: scores.work > 70 ? "Long Stay" : "90 Mins",
            type: tags.cuisine || "Specialty",
            price: tags.price_level || (text.includes("expensive") ? "$$$" : "$$")
        };
    },

    getCompatibility: (cafe, scores) => {
        // Faux personal matching logic for portfolio demo
        const base = 75;
        const bonus = scores.work > 80 ? 15 : (scores.social > 80 ? 10 : 5);
        return Math.min(98, base + bonus + Math.floor(Math.random() * 5));
    },

    // AI-Driven Metrics
    calculateStayDuration: (scores) => {
        // Estimate based on comfort factors
        let duration = 45; // Base minutes
        if (scores.work > 80) duration += 90; // High work score = longer stay
        else if (scores.work > 60) duration += 45;

        if (scores.date > 70) duration += 30; // Date implies conversation
        if (scores.social > 80) duration += 60; // Social hangouts last longer

        // Convert to readable format
        const hours = Math.floor(duration / 60);
        const mins = duration % 60;
        return hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
    },

    generateCompatibility: (scores, mood = 'all') => {
        // Dynamic match based on current user filter
        let baseScore = 70; // Baseline

        if (mood === 'work') baseScore = scores.work;
        else if (mood === 'date') baseScore = scores.date;
        else if (mood === 'social') baseScore = scores.social;
        else baseScore = (scores.work + scores.date + scores.social) / 3;

        // Add some noise for realism
        return Math.min(99, Math.floor(baseScore + (Math.random() * 10 - 5)));
    },

    generateTimeline: () => {
        // Generates a mock 24h energy signature for the UI
        return [
            { h: "8am", v: 20 + Math.random() * 20, label: "Quiet" },
            { h: "12pm", v: 60 + Math.random() * 20, label: "Active" },
            { h: "4pm", v: 80 + Math.random() * 20, label: "Peak" },
            { h: "8pm", v: 40 + Math.random() * 30, label: "Chill" },
            { h: "11pm", v: 10 + Math.random() * 10, label: "Closing" }
        ];
    },

    getVibeSummary: (scores) => {
        if (scores.work > 85) return "The Deep Creator";
        if (scores.date > 85) return "The Urban Romantic";
        if (scores.social > 85) return "The Social Catalyst";
        return "The Local Gem";
    }
};
