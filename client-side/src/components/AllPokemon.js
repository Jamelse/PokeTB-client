import React from "react";
import PokeCard from "./PokeCard";
import {Link} from 'react-router-dom'

function AllPokemon({pokemon, capitalize}){

  return(
    <div className='cardContainer'>
      {pokemon.map((poke) => {
        return (
          <PokeCard poke={poke} capitalize={capitalize} children={
          <h1 className='cardButton'><Link className='cardButtonA' to={`/pokemon/${poke.id}`}>More Info</Link></h1>}/>
        )
      })}
      
    </div>
  )
}

export default AllPokemon