import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PokeCard from "./PokeCard";

function PokemonDetail({trainers}){
  const [pokeDetail, setPokeDetail] = useState(null)
  const [trainerDetail, setTrainerDetail] = useState('')
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:9292/pokemon/${id}`)
    .then (r => r.json())
    .then (detail => {
      setPokeDetail(detail)
    })
  }, [])

  const trainer = pokeDetail ? trainers.find((train) => {
    return train.id == pokeDetail.trainer_id
  }) : ''

  return (
    <div className="pokeDetailPage">
     <button onClick={()=> navigate(-1)} className="editPokemonButton">Back</button>
      <div className='detailContainer'>
      {trainer ? 
      <div>
        <PokeCard poke={pokeDetail} children={
          <>
          <p className="movesHeader">Moves</p>
          <ul className="pokeMoves">
          <li>{pokeDetail.moves[0].move_1}</li>
          <li>{pokeDetail.moves[0].move_2}</li>
          <li>{pokeDetail.moves[0].move_3}</li>
          <li>{pokeDetail.moves[0].move_4}</li>
          </ul>
          </>
        }/>
        <div className="pokeTrainer">
          <h2 className="pokeTrainerHeader">Belongs to:</h2>
          <img className="pokeTrainerImg" src={trainer.trainer_img}/>
          <Link className="pokeTrainerName" to={`/trainers/${trainer.id}`}><h3>{trainer.name}</h3></Link>
        </div>
      </div>: <h1>Loading...</h1>}
    </div>
  </div>
  )

}

export default PokemonDetail