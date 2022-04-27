import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

export default function Spell({name, enabled, onClick}) {


    return (
        <div style={{outline: '1px solid grey', display: 'flex', alignItems: 'center'}} onClick={onClick}>
            <div style={{padding: '5px'}}>{enabled ? <FontAwesomeIcon icon={faCheck} /> : null}</div>
            <h3>{name}</h3>
        </div>)

}