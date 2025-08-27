import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Header.css"
import {Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import {userContext} from "../Context/ContextProvider.jsx";


function Header() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const token = cookies.get('token');
    console.log("cookies :",token);
    const {role,SetRole} = useContext(userContext);


    const Logout = (e) =>{

      e.preventDefault();

      cookies.remove('token',{ path: '/' });
      
      navigate('/Home');
      
      SetRole(null);
      
    }

    return (<nav className='nav'>
      <Link to="/" className='site-title'>Virtual Book Store</Link>
      <ul>
        <li>
          <Link to='/Books'>Books</Link>
        </li>
        {role === "Admin" ? (<li>
          <Link to="/Users">Users</Link>
        </li>) : null}
        {!token ? (
        <li>
          <Link to='/Login'>Login</Link>
        </li>
        ) : (
        <li>
          <Link to="/" onClick={Logout}>Logout</Link>
        </li>
        )}
      </ul>
    </nav>)
}
export default Header
