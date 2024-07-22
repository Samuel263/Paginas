const toggleDarkMode = (darkModeOn) => {
    const root = document.documentElement;
    if (darkModeOn) {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
};

// Ejemplo de detección de modo oscuro
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
toggleDarkMode(prefersDarkMode);

// También puedes activar o desactivar el modo oscuro mediante eventos, por ejemplo:
// toggleDarkMode(true); // Activar modo oscuro
// toggleDarkMode(false); // Desactivar modo oscuro
