import es from './Translations.es';
import en from './Translations.en';


export const getLangOptions = () => {
    return [
        { value: 'es', label: 'Español' },
        { value: 'ca_ES', label: 'Català' },
        { value: 'en', label: 'English' },
        { value: 'pt_PT', label: 'Português' },
        { value: 'fr', label: 'Français' },
        { value: 'ar', label: 'عربي' },
    ]
}


export default {
    "es": es,
    "en": en
}

