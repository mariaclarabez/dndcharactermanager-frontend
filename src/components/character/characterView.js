import _ from "lodash";
import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import {useParams} from 'react-router-dom';
import {getCharacter, createCharacter, deleteCharacter, updateCharacter} from "../../api/apiHelper";
import SpellCreatorModal from "../spellCreatorModal";
import CreateCampaignModal from "./campaignCreatorModal";
import CharacterEditModal from "./characterEditModal";
import CharacterCreatorModal from './characterCreatorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import "./characterview.css"





export default function CharacterView(){
    const [characters, setcharacters] = useState([]);
    const [show, setShow] = useState(false);
    const [showCampaign, setShowCampaign] = useState(false);
    const[showSpells, setShowSpells] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // const [idToEdit, setIdToEdit] = useState();
    const [characterToEdit, setCharacterToEdit] = useState();


    const [spellsCharacter, setSpellsCharacter] = useState();
    const params = useParams();
    

    async function fetchData() {
        const characters = await getCharacter();
        console.log(characters)
        setcharacters(characters);
    };

    useEffect(()=>{
        fetchData();
    }, []);

    function onCancel() {
        setShow(false)
    }

    function onClose() {
        setShowCampaign(false);
    }

    async function onEdit(name, campaignId) {
        setShowEdit(false);
        await updateCharacter(characterToEdit.id, name, campaignId);
        fetchData();
        
    }

    async function onUpdate(name, classId, raceId, campaignId) {
        setShow(false);
        const ownerId = params.userId;
        console.log("Creating character", name, classId, raceId, campaignId, ownerId);
        await createCharacter(name, classId, raceId, campaignId, ownerId);
        fetchData();
        
    }

    async function deleteCharacterById(id) {
        await deleteCharacter(id);
        fetchData();

    }

    function showEditModal(character) {
        setCharacterToEdit(character);
        setShowEdit(true);
    }

    function showSpellsModal(character) {
        setSpellsCharacter(character);
        setShowSpells(true);
    }


    return (
        <>
        <div className="full-screen">
            <div className="header"><h1>Welcome to the DnD Character Generator!</h1></div>
            <div className="create-character-btn">
            <Button variant="primary" onClick={() => setShowCampaign(true)}>Create Campaign!</Button></div>

            <div><Button variant="primary" onClick={() => setShow(true)}>Create Character!</Button></div>
            
            <CreateCampaignModal show={showCampaign} onClose={onClose}/>
            
            <CharacterCreatorModal show={show} onCancel={onCancel} onUpdate={onUpdate}/>
            <CharacterEditModal characterid={characterToEdit} show={showEdit} onUpdate={onEdit} onClose={() => setShowEdit(false)}/>

            <SpellCreatorModal characterid={_.get(spellsCharacter, 'id')} classid={_.get(spellsCharacter, 'class_id')} show={showSpells} onClose={() => setShowSpells(false)} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Character Name</th>
                        <th>Class</th>
                        <th>Race</th>
                        <th>Owner</th>
                        <th>Campaign</th>
                        <th>Wisdom</th>
                        <th>Charisma</th>
                        <th>Strength</th>
                        <th>Dexterity</th>
                        <th>Intelligence</th>
                        <th>Constitution</th>
                        <th>Starting Spell</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(dd_char => ( 
                    <tr>
                        <td> {dd_char.id}</td>
                        <td> {dd_char.char_name}</td>
                        <td> {dd_char.class_name}</td>
                        <td> {dd_char.race_name}</td>
                        <td> {dd_char.owner_name || 'Guest'}</td>
                        <td> {dd_char.campaign_name}</td>
                        <td> {dd_char.wisdom}</td>
                        <td> {dd_char.charisma}</td>
                        <td> {dd_char.strength}</td>
                        <td> {dd_char.dexterity}</td>
                        <td> {dd_char.intelligence}</td>
                        <td> {dd_char.constitution}</td>
                        <td> <Button onClick={() => showSpellsModal(dd_char)}>View/Update Spells</Button></td>
                        <td> 
                            <span className="delete-icon" onClick={() => deleteCharacterById(dd_char.id)}><FontAwesomeIcon icon={faTrashCan}/></span>
                            <span className="update-icon" onClick={() => showEditModal(dd_char)}><FontAwesomeIcon icon={faPen} /></span>
                        </td>



                    </tr>    
                ))}
                </tbody>

            </Table>
            </div>
        </>
    )

};
