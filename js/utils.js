export const Utils = {
    showLoader: (show) => {
        const loader = document.getElementById("loader");
        if (loader) loader.classList.toggle("hidden", !show);
    },

    toggleSidebar: () => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.classList.toggle("sidebar-collapsed");
        const icon = document.querySelector(".toggle-sidebar i");
        if (icon) {
            icon.classList.toggle("fa-chevron-right");
            icon.classList.toggle("fa-chevron-left");
        }
    },

    formatOpeningHours: (hours) => {
        if (!hours) return "Hours not listed";
        return hours.replace(/;/g, " | ");
    },

    saveToLocal: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getFromLocal: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};
