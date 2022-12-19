import React from 'react'
import './Pages/TopPage.css';
import { Link } from 'react-router-dom';
import Login from './Pages/Login';
import HomeIcon from '@mui/icons-material/Home';


function Header() {
  return (
    <div>
        <header>

        <div id="toplogo">
            <img src="images/logo.png"></img>
            </div>

        <div className='header-login'>
        <Login/>
        </div>

        <div className='homeicon'>
            <Link to="/"><HomeIcon sx={{ fontSize: 80}}/></Link>
            </div>
            
        </header>
    </div>
  )
}


export default Header
