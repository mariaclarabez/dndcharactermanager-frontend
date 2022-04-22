import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import {getAllRaces, getAllClasses} from "../api/apiHelper";
import { set } from 'lodash';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function CreateCharacterModal({show, onUpdate, onCancel}) {
 
    const [name, setName] = useState("");
    const [classId, setClassId] = useState(1);
    const [raceId, setRaceId] = useState(1);
    const [allRaces, setAllRaces] = useState([]);
    const [allClasses, setAllClasses] = useState([]);


    async function fetchData() {
        const races = await getAllRaces();
        setAllRaces(races);
        const classes = await getAllClasses();
        setAllClasses(classes); 
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
    function handleClassChange(event) {
        setClassId(event.target.value);
        console.log(event.target.value);
    }
    function handleNameChange(event) {
        setName({value: event.target.value});
        console.log(event.target.value)
    }

    return (
        <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Enter a name:</p>
            <Form onSubmit={submit}>
                <InputGroup>
                    <FormControl
                        placeholder="Character name"
                        aria-label="Character name"/>
                </InputGroup>
            </Form>

            <br/>
            <p>Select a race:</p>
            <Form onSubmit={submit}>
                <Form.Select value={raceId} onChange={handleRaceChange} aria-label="Default select example">
                    {allRaces.map(dd_race => <option value={dd_race.id}>{dd_race.name}</option> )}

                </Form.Select>
            </Form>
            <br/>
            <p>Select a class:</p>
            <Form onSubmit={submit}>
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