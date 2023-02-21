import React from 'react'

function PokeCard({pokemon}){

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
  <div className='cardContainer'>
    {pokemon.map((poke) => {
    return (
      <div className='pokeCard'>
        <div className={`cardImg${poke.poke_type}`}>
          <img className='spriteImg' src={poke.sprite} alt="Pokemon Sprite"/>
        </div>
        <div className={`cardContent${poke.poke_type}`}>
          <h1 className='cardName'>{capitalize(poke.name)}</h1>
          <span className='cardType'>{capitalize(poke.poke_type)}</span>
          <p className='cardDesc'>{poke.description}</p>
          <h1 className='cardButton'><a href='#'>Placeholder Text</a></h1>
        </div>
      </div>
    )})}</div>)
}

export default PokeCard