import './home.css';
import dragon from "../images/dragon-2.png"
import {Link} from "react-router-dom";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal"
import { React, useState } from "react";
import {registerUser} from '../../api/apiHelper'


function HomeView(){

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    async function onUpdateRegister(username, password) {
        console.log("attempting to register")
        setShowRegister(false);
        await registerUser(username, password);
        
    }

    const login = () => {
        setShowLogin(true);
    };

    const register = () => {
        setShowRegister(true);

    };
    const onLoginSuccess = () => {
        
    }

    const onCancelLogin = () => {
        setShowLogin(false);
    }

    const onCancelRegister = () => {
        setShowRegister(false);
    }




    return (
        <>
        <div className="background body">
            <img className="background-image" src="city.jpg"></img>
            <div className="dragon-div">
            <img className="dragon-img" src={dragon}></img></div>
  
        <div class="title">
            <h1>Dungeons and Dragons Character Generator</h1>
        </div>

        <LoginModal show={showLogin} onSave={onLoginSuccess} onCancel={onCancelLogin}/>

        <button className="login-button" onClick={login}>Log In</button>

        <RegisterModal show={showRegister} onUpdateRegister={onUpdateRegister} onCancel={onCancelRegister}/>

        <button className="register-button" onClick={register}>Register</button>

        <div className="continue-as-guest-button">
            <Link to="/create">Continue as Guest</Link>
        </div>

        </div>
        

        </>
    )
}
export default HomeView;