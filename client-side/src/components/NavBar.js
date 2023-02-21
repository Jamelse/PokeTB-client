import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../pokeball.png'

function NavBar(){
  
  return (<div className='navDiv'>
    <header className='navHeader'>
      <img className='logo' src={logo} alt='logo'/>
      <nav>
        <ul className='navLinks'>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>All Pokemon</a></li>
          <li><a href='#'>Trainers</a></li>
        </ul>
      </nav>
      <a  href='#'><button className='contactButton'>Contact</button></a>
    </header>
  </div>)
}

export default NavBar