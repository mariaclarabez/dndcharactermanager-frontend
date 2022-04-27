import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {getSpellByClassId, getSpellsForCharacter, addSpellToCharacter, removeSpellFromCharacter} from '../api/apiHelper';
import Spell from './spell';


export default function SpellCreatorModal({classid, characterid, onClose, show}) {
    const [allSpells, setAllSpells] = useState([]);
    const [knownSpells, setKnownSpells] = useState([]);


    async function fetchAllSpells(classId) {
        const spellsForClass = await getSpellByClassId(classId);
        setAllSpells(spellsForClass);
    }

    async function fetchKnownSpells(characterId) {
        const spellsKnown = await getSpellsForCharacter(characterId);
        console.log(spellsKnown);
        setKnownSpells(spellsKnown);
    }
    
    useEffect(() => {
        if(!_.isNil(classid)){
            fetchAllSpells(classid);
        }
    }, [classid]);

    useEffect(() => { 
        if(!_.isNil(characterid)) {
            fetchKnownSpells(characterid);
        }
    }, [characterid])


    async function addSpell(spellIdToAdd) {
        await addSpellToCharacter(characterid, spellIdToAdd);
        fetchKnownSpells(characterid)
    }

    async function removeSpell(spellIdToRemove) {
        await removeSpellFromCharacter(characterid, spellIdToRemove)
        fetchKnownSpells(characterid)
    }

    async function toggleSpell(spellId) {
        console.log(spellId);
        if(_.includes(knownSpells, spellId)) {
            await removeSpell(spellId);
        } else {
            addSpell(spellId);
        }
    }

    console.log(allSpells);

    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Spells</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{display: 'flex', flexDirection: "column"}}>
                {_.isEmpty(allSpells) ? <p>This class cannot cast</p> : null}
                {allSpells.map(spell => <Spell id={spell.id} name={spell.name} enabled={_.includes(knownSpells, spell.id)} onClick={() => toggleSpell(spell.id)} />)}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )


}