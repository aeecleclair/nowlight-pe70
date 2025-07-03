import { createI18n } from 'vue-i18n';

// Import your locale files
import enMessages from './locales/en.json';
import frMessages from './locales/fr.json';

// Function to get the preferred language
function getStartingLocale() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
        return savedLanguage;
    }
    return 'fr';
}

const initialLocale = getStartingLocale();

// Set initial HTML lang attribute
document.documentElement.lang = initialLocale;

const i18n = createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages: {
        en: enMessages,
        fr: frMessages,
    },
});

export default i18n;
