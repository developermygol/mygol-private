import { Component } from 'react';
import Translations from './Translations';
import { inject, observer } from 'mobx-react';
import { interpolateString } from '../../helpers/Utils';


const DefaultLanguage = 'es';       // Should match initial value set in Store
let globalLang = DefaultLanguage;


export function setLang(lang) {
    //globalLang = lang;        // Uncomment when all languages are available. 
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


export default Loc;