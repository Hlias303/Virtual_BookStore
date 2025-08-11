import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import user_icon from '../assets/Assets/person.png'
import password_icon from '../assets/Assets/password.png'
import '../Styles/Login_Signup.css'
import {registerAPICall} from '../Services/RegisterAPICall'


export default function Register() {

    // const[action,SetAction] = useState("Login");
    const [username,SetUsername] = useState("");
    const [password,SetPassword] = useState("");
    const navigate = useNavigate();
    
    const [confirmPassword,setConfirmPassword] = useState("");

    function handleRegistrationForm(e){

        e.preventDefault();

        const register = {username, password}

        console.log(register);

        if(confirmPassword === password){
            registerAPICall(register).then((response) => {
                console.log(response.data)
                navigate('/Login');
            }).catch(error => {
                console.error(error);
            })
        }else{
            alert("Passwords do not match");
        }
    }



  return (
    <div className='container'>
        <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
           <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Username' value={username} onChange={ 
                    (e) => SetUsername(e.target.value)
                }/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="text" placeholder='Password' value={password} onChange={
                    (e) => SetPassword(e.target.value)
                }/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="text" placeholder='ConfirmPassword' value={confirmPassword} onChange={
                    (e) => setConfirmPassword(e.target.value)
                }/>
            </div>  
        </div>
        <div className="submit-container">
            <div className="submit" onClick={(e) =>{ 
                handleRegistrationForm(e)}}>Sign Up</div>
        </div>
    </div>
  )
}
