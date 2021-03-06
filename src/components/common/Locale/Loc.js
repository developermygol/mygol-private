import { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Translations from './Translations';
import { interpolateString, interpolateStringMultiple } from '../../helpers/Utils';


const DefaultLanguage = 'es';       // Should match initial value set in Store
let globalLang = DefaultLanguage;


export function setLang(lang) {
    // 🚧🚧🚧 Not all langues implemented yet rever to default es
    switch(lang) {
        case 'es': 
        case 'en':
            globalLang = lang;
            break;
        case 'ca_ES':
        case 'pt_PT':
        case 'fr':
        case 'ar':
            globalLang = 'es';
            break;
        default: globalLang = 'es'
    }
    // globalLang = lang;        // Uncomment when all languages are available. 
}


@inject('ui') @observer
class Loc extends Component {
    componentDidMount = () => {
        globalLang = this.props.ui.lang;
    }

    render() {
        const key = this.props.children;
        return Localize(key, this.props.ui.lang);
    }
}

export function LocalizeOrDefault(key) {
    const translated = Translations[globalLang][key];
    return (translated === undefined) ? key : translated;
}

export function Localize(key) {
    if (!key) return '';
    
    const translations = Translations[globalLang];
    if (translations) {
        const translated = translations[key];
        if (translated) return translated;
    }

    return '__' + key + '__';  
}

export function LocalizeI(key, ...args) {
    if (!key) return '';

    const translations = Translations[globalLang];
    if (translations) {
        const translated = translations[key];
        if (translated) return interpolateString(translated, ...args);
    }
    return '__' + key + '__';
}

export function LocalizeIMultyple(key, ...args) {
    if (!key) return '';

    const translations = Translations[globalLang];
    if (translations) {
        const translated = translations[key];
        if (translated) return interpolateStringMultiple(translated, ...args);
    }
    return '__' + key + '__';
}


export default Loc;