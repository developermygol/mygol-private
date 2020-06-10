import React from 'react';
import Loc from "./Locale/Loc";

export default ({trueMsg, falseMsg, value, onClick, className}) => {
    return <button className={'ToggleButton Button Second ' + className} onClick={onClick}><Loc>{value ? trueMsg : falseMsg}</Loc></button>;
}