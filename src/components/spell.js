import React from 'react';

export default function Spell({name, enabled, onClick}) {


    return (
        <div style={{outline: '1px solid grey', display: 'flex', alignItems: 'center'}} onClick={onClick}>
            <div style={{padding: '5px'}}>{enabled ? "true" : "false"}</div>
            <h3>{name}</h3>
        </div>)

}