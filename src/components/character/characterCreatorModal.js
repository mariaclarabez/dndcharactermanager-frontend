import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import {getAllRaces, getAllClasses, getAllSpells, getAllCampaigns} from "../../api/apiHelper";
import { set } from 'lodash';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function CreateCharacterModal({show, onUpdate, onCancel}) {
 
    const [name, setName] = useState("");
    const [classId, setClassId] = useState(1);
    const [campaignId, setCampaignId] = useState(1);
    const [raceId, setRaceId] = useState(1);
    const [spellId, setSpellId] = useState(1);

    const [allRaces, setAllRaces] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [allSpells, setAllSpells] = useState([]);
    const [allCampaigns, setAllCampaigns] = useState([]);


    async function fetchData() {
        const races = await getAllRaces();
        setAllRaces(races);
        const classes = await getAllClasses();
        setAllClasses(classes); 
        const spells = await getAllSpells();
        setAllSpells(spells);
        const campaigns = await getAllCampaigns();
        setAllCampaigns(campaigns);

    };

    function submit() {
        onUpdate(name, classId, raceId, campaignId);
    }
    useEffect(()=>{
        fetchData();
    }, [show]);

    function handleRaceChange(event) {
        setRaceId(event.target.value);
        console.log(event.target.value);
    }
    function handleClassChange(event) {
        setClassId(event.target.value);
        console.log(event.target.value);
    }
    function handleNameChange(event) {
        setName(event.target.value);
        console.log(event.target.value)
    }
    function handleCampaignChange(event) {
        setCampaignId(event.target.value);
        console.log(event.target.value)
    }

    function handleSpellChange(event) {
        setSpellId(event.target.value);
        console.log(event.target.value)
    }

    return (
        <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submit}>

                <p>Enter a character name:</p>
                <Form.Control value={name} onChange={handleNameChange} />
                <br/>

                <p>Select a campaign name from your campaigns:</p>
                    <Form.Select value={campaignId} onChange={handleCampaignChange} aria-label="Default select example">
                        {allCampaigns.map(dd_campaign => <option value={dd_campaign.id}>{dd_campaign.name}</option> )}
                    </Form.Select>
                <br/>

                <p>Select a race:</p>
                    <Form.Select value={raceId} onChange={handleRaceChange} aria-label="Default select example">
                        {allRaces.map(dd_race => <option value={dd_race.id}>{dd_race.name}</option> )}
                    </Form.Select>
                <br/>
                
                <p>Select a class:</p>
                    <Form.Select value={classId} onChange={handleClassChange} aria-label="Default select example">
                        {allClasses.map(dd_class => <option value={dd_class.id}>{dd_class.name}</option> )}

                    </Form.Select>
                    
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}