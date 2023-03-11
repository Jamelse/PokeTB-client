import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../pokeball.png'

function NavBar(){
  
  return (
  <div className='navDiv'>
    <header className='navHeader'>
      <NavLink to='/'><img className='logo' src={logo} alt='logo'/></NavLink>
      <nav>
        <ul className='navLinks'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/pokemon'>All Pokemon</NavLink></li>
          <li><NavLink to='/trainers'>Trainers</NavLink></li>
          <li><NavLink to='/trainers/new'>New Trainer</NavLink></li>
        </ul>
      </nav>
      <a  href='#'><button className='contactButton'>Contact</button></a>
    </header>
  </div>)
}

export default NavBar