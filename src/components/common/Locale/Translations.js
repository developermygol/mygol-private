import es from './Translations.es';
import en from './Translations.en';


export const getLangOptions = () => {
    return [
        { value: 'es', label: 'Castellano' },
        { value: 'ca_ES', label: 'Català' },
    ]
}


export default {
    "es": es,
    "en": en
}

