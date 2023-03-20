import React from 'react'
import logo from '../pokeball.png'
import { Link } from 'react-router-dom'


function Home(){
return (
  <div className='homeDiv'>
    <div className='homeLogoTitle'>
      <img  className='homeLogo' src={logo} alt='logo'/>
      <h1>Welcome to Poke Team Builder</h1>
    </div>
    <h3 className='homeSubheader'>A pokemon team building tool to help keep your teams organized</h3>
		<Link to='/trainers/new'><button className='homeButton'>Get Started</button></Link>
	</div>
)
}

export default Home