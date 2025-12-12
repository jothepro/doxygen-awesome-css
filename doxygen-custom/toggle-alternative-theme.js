// Toggle zwischen drei Theme-Zuständen und speichere im localStorage
const THEME_CLASSES = ['theme-default', 'theme-round', 'theme-robot'];
// Ermögliche das Umschalten per Button/Funktion (z.B. für onclick im HTML)
function toggleThemeVariant() {
	let idx = getCurrentThemeIndex();
	idx = (idx + 1) % THEME_CLASSES.length;
	applyThemeClass(idx);
}

// Funktion global verfügbar machen
window.toggleThemeVariant = toggleThemeVariant;

function getCurrentThemeIndex() {
	const stored = localStorage.getItem('theme-variant');
	if (stored === null) return 0;
	const idx = THEME_CLASSES.indexOf(stored);
	return idx === -1 ? 0 : idx;
}

function applyThemeClass(idx) {
	document.documentElement.classList.remove(...THEME_CLASSES);
	if (THEME_CLASSES[idx] && THEME_CLASSES[idx] !== 'theme-default') {
		document.documentElement.classList.add(THEME_CLASSES[idx]);
	}
	localStorage.setItem('theme-variant', THEME_CLASSES[idx] || 'theme-default');
	// Select synchronisieren, falls vorhanden
	const select = document.getElementById('theme-select');
	if (select) select.value = THEME_CLASSES[idx];
}

function setThemeByName(themeName) {
	const idx = THEME_CLASSES.indexOf(themeName);
	applyThemeClass(idx === -1 ? 0 : idx);
}


document.addEventListener('DOMContentLoaded', () => {
	const select = document.getElementById('theme-select');
	if (select) {
		// Initialisiere Auswahl aus localStorage
		const idx = getCurrentThemeIndex();
		select.value = THEME_CLASSES[idx];
		applyThemeClass(idx);
		// Theme bei Auswahl ändern
		select.addEventListener('change', e => {
			setThemeByName(e.target.value);
		});
	} else {
		// Fallback: Theme trotzdem setzen
		applyThemeClass(getCurrentThemeIndex());
	}
});
