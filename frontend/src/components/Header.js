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
            <li>
                <Link to="/">ホーム</Link>
            </li>
            <li>
                <Link to="/Review">投稿画面</Link>
            </li>
            </div>
            </div>
        </header>
    </div>
  )
}


export default Header
