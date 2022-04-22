import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import {getAllRaces} from "../api/apiHelper";
import { set } from 'lodash';

export default function CreateCharacterModal({show, onUpdate, onCancel}) {
 
    const [name, setName] = useState("");
    const [classId, setClassId] = useState(1);
    const [raceId, setRaceId] = useState(1);
    const [allRaces, setAllRaces] = useState([]);

    async function fetchData() {
        const races = await getAllRaces();
        setAllRaces(races);
    };

    function submit() {
        onUpdate(name, classId, raceId);
    }
    useEffect(()=>{
        fetchData();
    }, []);

    function handleRaceChange(event) {
        setRaceId(event.target.value);
        console.log(event.target.value);
    }
    return (
        <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submit}>
                <Form.Select value={raceId} onChange={handleRaceChange} aria-label="Default select example">
                    {allRaces.map(dd_race => <option value={dd_race.id}>{dd_race.name}</option> )}

                    {/* <option>Open this select menu</option>
                    <option value="1">Dragonborn</option>
                    <option value="2">Ha[[y man</option>
                    <option value="3">Elf propbly</option> */}
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