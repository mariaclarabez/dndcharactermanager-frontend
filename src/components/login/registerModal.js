import Modal from 'react-bootstrap/Modal'
import {React, useState} from "react";
import Button from 'react-bootstrap/Button'
import '../../api/apiHelper'
import Form from "react-bootstrap/Form"
import { getRegisteredUsers, registerUser } from '../../api/apiHelper';


export default function RegisterModal({show, onUpdateRegister, onCancel}) {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    // const [registeredUsers, setRegisteredUsers] = useState([]);

    
    
    // async function fetchData() {
    //     const registeredUsers = await getRegisteredUsers();
    //     console.log(registeredUsers)
    //     setRegisteredUsers(registeredUsers);
    // };

    // useEffect(()=>{
    //     fetchData();
    // }, []);

    async function register() {
        onUpdateRegister(usernameReg, passwordReg)
    }


    const handleUsernameChange = (event) => {
        setUsernameReg(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordReg(event.target.value);
    };

    
    return(
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={register}>
                    <p>Username:</p>
                    <Form.Control value={usernameReg} onChange={handleUsernameChange} />
                    <p>Password:</p>
                    <Form.Control value={passwordReg} onChange={handlePasswordChange} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={register}>
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}