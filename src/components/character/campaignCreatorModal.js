import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import {createCampaign} from "../../api/apiHelper";


export default function CreateCampaignModal({show, onClose}) {
    const [campaignName, setCampaignName] = useState("");
    
    function handleCampaignNameChange(event) {
        setCampaignName(event.target.value);
        console.log(event.target.value)
    }

    async function submit() {
        await createCampaign(campaignName);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submit}>

                <p>Enter a name for your campaign:</p>
                <Form.Control value={campaignName} onChange={handleCampaignNameChange} />
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

