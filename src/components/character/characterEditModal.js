import {getAllCampaigns} from '../../api/apiHelper'
import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import _ from 'lodash';

export default function CharacterEditModal ({characterToEdit, show, onUpdate, onClose}) {
    const [name, setName] = useState("");
    const [campaignId, setCampaignId] = useState(1);
    const [allCampaigns, setAllCampaigns] = useState([]);

    async function fetchData() {
        const campaigns = await getAllCampaigns();
        setAllCampaigns(campaigns);
    };

    useEffect(() => {
        console.log("setting inital values")
        if(!_.isNil(characterToEdit)) {
            setCampaignId(characterToEdit.campaign_id);
            setName(characterToEdit.char_name); 
        }
    }, [_.get(characterToEdit, 'id')])

    function submit() {
        onUpdate(name, campaignId)
    }

    useEffect(()=>{
        fetchData();
    }, [show]);

    function handleCampaignChange(event) {
        setCampaignId(event.target.value);
        console.log(event.target.value)
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submit}>

                <p>Enter a new character name:</p>
                <Form.Control value={name} onChange={handleNameChange} />
                <br/>

                <p>Select a new campaign name from your campaigns:</p>
                    <Form.Select value={campaignId} onChange={handleCampaignChange} aria-label="Default select example">
                        {allCampaigns.map(dd_campaign => <option value={dd_campaign.id}>{dd_campaign.name}</option> )}
                    </Form.Select>
                <br/>

                    
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
