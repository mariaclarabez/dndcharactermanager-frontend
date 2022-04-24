import Modal from 'react-bootstrap/Modal'
import {React, useState} from "react";
import Button from 'react-bootstrap/Button'
import '../../api/apiHelper'
import Form from "react-bootstrap/Form"


export default function LoginModal({show, onSave, onCancel}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onLogin = () => {
        // check that info is valid
        // display error || login
        onSave()
    };
    
    return(
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSave}>
                    <p>Username:</p>
                    <Form.Control value={username} onChange={handleUsernameChange} />
                    <p>Password:</p>
                    <Form.Control value={password} onChange={handlePasswordChange} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={onLogin}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}