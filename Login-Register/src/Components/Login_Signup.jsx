import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import user_icon from '../assets/Assets/person.png'
import password_icon from '../assets/Assets/password.png'
import '../Styles/Login_Signup.css'
// import {loginAPICall} from '../Services/loginAPICall'
import Cookies from "universal-cookie"
import axios from "axios"
import {userContext} from '../Context/ContextProvider.jsx'


export default function Login_Signup() {

    // const[action,SetAction] = useState("Login");
    const [username,SetUsername] = useState("");
    const [password,SetPassword] = useState("");
    const navigate = useNavigate();
    const cookies = new Cookies();

    const {SetRole} = useContext(userContext);

    async function  handleLoginForm(e){

        e.preventDefault();

        console.log("this is our data" + username +" "+ password)

       const data = {
        "username": username,
        "password" : password
        }
        const AUTH_REST_API_BASE_URL = "http://localhost:8080"

        try{
            const response = await axios.post(AUTH_REST_API_BASE_URL + '/login', data);
            if(!response.data){
                alert("Invalid Username or password");
            }
            else{
                const token = response.data;
                cookies.set("token",token);
                if(username === "Hlias"){
                    SetRole("Admin");
                } else{
                    SetRole("User");
                }
                console.log(token) 
                alert("Login Succesfull");

                navigate("/Home");
            }
        } catch(error){
            console.error(error);
        }

    }



  return (
    <div className='container'>
        <div className="header">
            <div className="text">Login</div>
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
        </div>
        <div className="submit-container">
            <div className="submit" onClick={(e) => handleLoginForm(e)}>
                Login
            </div>
            <p className= "signup">
                Dont have an account?<Link to='/Register'>Sign Up</Link>
            </p>
        </div>
    </div>
  )
}
