import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import {getCharacter, createCharacter} from "../../api/apiHelper";
import CharacterCreatorModal from './characterCreatorModal';
import "./characterview.css"




export default function CharacterView(){
    const [characters, setcharacters] = useState([]);
    const [show, setShow] = useState(false);

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

    async function onUpdate(name, classId, raceId) {
        setShow(false);
        console.log("Creating character", name, classId, raceId);
        await createCharacter(name, classId, raceId);
        fetchData();
        
    }

    return (
        <>
        <div className="full-screen">
            <div className="header"><h1>Welcome to the DnD Character Generator!</h1></div>
            <div className="create-character-btn">
            <Button variant="primary" onClick={() => setShow(true)}>Create Character!</Button></div>
            
            
            <CharacterCreatorModal show={show} onCancel={onCancel} onUpdate={onUpdate}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Character Name</th>
                        <th>Class</th>
                        <th>Race</th>
                        <th>Wisdom</th>
                        <th>Charisma</th>
                        <th>Strength</th>
                        <th>Dexterity</th>
                        <th>Intelligence</th>
                        <th>Constitution</th>
                        <th>Starting Spell</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(dd_char => ( 
                    <tr>
                        <td> {dd_char.id}</td>
                        <td> {dd_char.char_name}</td>
                        <td> {dd_char.class_name}</td>
                        <td> {dd_char.race_name}</td>
                        <td> {dd_char.wisdom}</td>
                        <td> {dd_char.charisma}</td>
                        <td> {dd_char.strength}</td>
                        <td> {dd_char.dexterity}</td>
                        <td> {dd_char.intelligence}</td>
                        <td> {dd_char.constitution}</td>
                        <td> {dd_char.spell_name}</td>


                    </tr>    
                ))}
                </tbody>

            </Table>
            </div>
        </>
    )

};
