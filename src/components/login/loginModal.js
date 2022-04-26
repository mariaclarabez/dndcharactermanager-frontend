import _ from 'lodash';
import Modal from 'react-bootstrap/Modal'
import {React, useState} from "react";
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../api/apiHelper'
import Form from "react-bootstrap/Form"


export default function LoginModal({show, onUpdateLogin, onCancel}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState();
    const navigate = useNavigate();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    async function login() {
        // onUpdateLogin(username, password);
        
        const result = await loginUser(username, password)
        if (result.error) {
            setLoginError(result.error);
        } else {
            navigate("/create/user/"+result.id)
            setLoginError();
        }

    }
    
    return(
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {_.isNil(loginError) ? null : <p style={{color: 'red'}}>{loginError}</p>}
                <Form onSubmit={login}>
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
                <Button variant="primary" onClick={login}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}