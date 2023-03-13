import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PokeCard from "./PokeCard";

function PokemonDetail(){
  const [pokeDetail, setPokeDetail] = useState(null)
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:9292/pokemon/${id}`)
    .then (r => r.json())
    .then (detail => setPokeDetail(detail))
  }, [])


  return (
    <div className="pokeDetailPage">
     
      <Link to={`/pokemon/${id}/edit`} className='editPokemonLink'><button className="editPokemonButton">Edit Pokemon</button></Link>
    <div className='detailContainer'>
    {pokeDetail ? <PokeCard poke={pokeDetail} children={
      <>
      <p className="movesHeader">Moves</p>
      <ul className="pokeMoves">
      <li>{pokeDetail.moves[0].move_1}</li>
      <li>{pokeDetail.moves[0].move_2}</li>
      <li>{pokeDetail.moves[0].move_3}</li>
      <li>{pokeDetail.moves[0].move_4}</li>
      </ul>
      </>
    }/> : <h1>Loading...</h1>}
    </div>
    </div>
  )

}

export default PokemonDetail