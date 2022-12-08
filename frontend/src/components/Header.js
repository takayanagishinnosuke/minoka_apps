import React from 'react'
import './Pages/TopPage.css';
import { Link } from 'react-router-dom';
import Login from './Pages/Login';


function Header() {
  return (
    <div>
        <header>
        <div className='login'>
        <Login/>
        </div>
            <div className='header' id="toplogo">
            <img src="images/logo.png"></img>
            <div className='routing'>

            </div>
            </div>
        </header>
    </div>
  )
}


export default Header
