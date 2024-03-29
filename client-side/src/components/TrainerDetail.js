import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from 'react-router-dom'

function TrainerDetail({capitalize, onPokemonDelete, moves, onTrainerDelete}){
  const [trainerDetail, setTrainerDetail] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`http://localhost:9292/trainers/${id}`)
    .then(r => r.json())
    .then(detail => setTrainerDetail(detail))
  },[])

  function pokeDelete(poke){
    const move = moves.find(move => move.pokemon_id == poke.id)
    const filteredPokemon = trainerDetail.pokemons.filter(pokemon =>  {
      return pokemon.id != poke.id})

      fetch(`http://localhost:9292/moves/${move.id}`, {
        method: "DELETE"
      })
      .then(r =>r.json())
      
      fetch(`http://localhost:9292/pokemon/${poke.id}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then((deleted) => {
        onPokemonDelete(deleted.id)
        setTrainerDetail((prev) => {
          return {...prev, pokemons: filteredPokemon}})
      })
      
  }

  function trainerDeleteClick(){
    trainerDetail.pokemons.map(poke => {
      pokeDelete(poke)
      })

    fetch(`http://localhost:9292/trainers/${id}`, {
      method: "DELETE"
      })
      .then(r => r.json())
      .then(() =>{
        onTrainerDelete(id)
        navigate('/trainers')
      })
  }
  
  function addPokeClickHandler(){
    if (trainerDetail.pokemons.length >= 6){
      alert('Team is full!')
    } else
    navigate(`/trainers/${id}/pokemon/new`)
  }

  return (trainerDetail ? 
  <div className="trainerDetailContainer">
    <div className="trainerDetailCard">
      <img className="trainerDetailImg" src={trainerDetail.trainer_img}/>
      <div className="trainerDetailContent">
        <div className="trainerDetail">
        <h2 className="trainerDetailName">{trainerDetail.name}</h2>
        <br/>
            {trainerDetail.pokemons.map((pokemon) => {
            return(
              <div className="trainerDetailPokemon" key={pokemon.id}>
                <img onClick={() => navigate(`/pokemon/${pokemon.id}`)} className="trainerDetailSprite" src={pokemon.sprite}/>
                <p className="trainerDetailPokeName">{capitalize(pokemon.name)}</p>
                <Link to={`/pokemon/${pokemon.id}/edit`} className="trainerLinks">Edit</Link>
                <span className="linkSpan">/</span>
                <p onClick={() => pokeDelete(pokemon)}className="trainerLinks">Delete</p>
              </div>
                )})}
        </div>
      </div>
   </div>
   <div className="trainerDetailButtons">
      <button onClick={() => addPokeClickHandler()} className='trainerDetailButton'>Add Pokemon</button>
      <Link to={`/trainers/${id}/edit`} className='trainerDetailLink'><button className='trainerDetailButton'>Edit Trainer</button></Link>
      <button onClick={trainerDeleteClick} className='trainerDetailButton'>Delete Trainer</button>
    </div>
  </div>
  : <h1>Loading...</h1>)
}

export default TrainerDetail