import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from 'react-router-dom'

function TrainerDetail({capitalize, onTrainerDelete}){
  const [trainerDetail, setTrainerDetail] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`http://localhost:9292/trainers/${id}`)
    .then(r => r.json())
    .then(detail => setTrainerDetail(detail))
  },[])

  function trainerDeleteClick(){
    fetch(`http://localhost:9292/trainers/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() =>{
      onTrainerDelete(id)
      navigate('/trainers')
    })
  }

  return (trainerDetail ? 
  <div className="trainerDetailContainer">
    <button>Add Pokemon</button>
    <Link to={`/trainers/${id}/edit`}><button>Edit Trainer</button></Link>
    <button onClick={trainerDeleteClick}>Delete Trainer</button>
    <div className="trainerDetailCard">
      <img className="trainerDetailImg" src={trainerDetail.trainer_img}/>
      <div className="trainerDetailContent">
        <div className="trainerDetail">
        <h2>{trainerDetail.name}</h2>
        <br/>
            {trainerDetail.pokemons.map((pokemon) => {
            return(
              <div className="trainerDetailPokemon">
                <img className="trainerDetailSprite" src={pokemon.sprite}/>
                <p className="trainerDetailPokeName">{capitalize(pokemon.name)}</p>
              </div>
                )})}
        </div>
      </div>
   </div>
  </div>
  : <h1>Loading...</h1>)
}

export default TrainerDetail