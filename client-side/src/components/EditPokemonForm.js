import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditPokemonForm({onPokemonUpdate}){
  const {id} = useParams();
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState('')
  const [currentMoves, setCurrentMoves] = useState('')
  

  useEffect(() => {
    fetch(`http://localhost:9292/pokemon/${id}`)
    .then (r => r.json())
    .then (detail => setCurrentInfo(detail))

    fetch(`http://localhost:9292/pokemon/${id}/moves`)
    .then(r => r.json())
    .then(detail => setCurrentMoves(detail[0]))
  }, [])

  function onPokeEditSubmit(e){
    e.preventDefault();
    fetch(`http://localhost:9292/pokemon/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentInfo)
    })
    .then(r => r.json())
    .then((poke) => {
      onPokemonUpdate(poke)
    })
    fetch(`http://localhost:9292/moves/${currentMoves.id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentMoves)
    })
    .then(r => r.json())
    .then(() => navigate(`/pokemon/${id}`))
  }

  function handleMoveChange(e){
    const key = e.target.name
    setCurrentMoves({ 
      ...currentMoves, 
      [key]: e.target.value 
    })
  }

  function handlePokeChange(e){
    const key = e.target.name
    setCurrentInfo({ 
      ...currentInfo, 
      [key]: e.target.value 
    })
  }


return( 
<div className='editPokeDiv'>
<button className='backButton' onClick={() => navigate(-1)}>Back</button>
  {currentInfo && currentMoves ? 
  <form onSubmit={onPokeEditSubmit} className='editForm'>
    <div>
      <h2 className='editPokeMoves'>Pokemon:</h2>
    <label className='pokeLabel'>Pokemon Name:</label>
    <input
      className='formInput'
      name='name'
      type='text'
      placeholder='Pokemon Name..'
      onChange={handlePokeChange}
      value={currentInfo.name}/>
      <label className='pokeLabel'>Pokemon Image URL:</label>
      <input
      className='formInput'
      name='sprite' 
      type='text'
      placeholder="Pokemon Image URL..."
      onChange={handlePokeChange}
      value={currentInfo.sprite}/>
      <label className='pokeLabel'>Pokemon Description:</label>
      <input
      className='formInput'
      name='description'
      type='text'
      placeholder='Pokemon Description..'
      onChange={handlePokeChange}
      value={currentInfo.description}/>
  <label className='pokeLabel'>Select Pokemon Type:</label>
  <select 
  className='pokeTypeSelect'
  onChange={handlePokeChange} 
  value={currentInfo.poke_type} 
  name="poke_type">
    <option value="bug">Bug</option>
    <option value="dark">Dark</option>
    <option value="dragon">Dragon</option>
    <option value="electric">Electric</option>
    <option value="fairy">Fairy</option>
    <option value="fighting">Fighting</option>
    <option value="fire">Fire</option>
    <option value="flying">Flying</option>
    <option value="ghost">Ghost</option>
    <option value="grass">Grass</option>
    <option value="ground">Ground</option>
    <option value="ice">Ice</option>
    <option value="normal">Normal</option>
    <option value="poison">Poison</option>
    <option value="psychic">Psychic</option>
    <option value="rock">Rock</option>
    <option value="steel">Steel</option>
    <option value="water">Water</option>
  </select>
  <br/>
  <h2 className='editPokeMoves'>Moves:</h2>
  <label className='pokeLabel'>Move:</label>
    <input
      className='formInput'
      name='move_1'
      type='text'
      onChange={handleMoveChange}
      value={currentMoves.move_1}/>
      <label className='pokeLabel'>Move:</label>
      <input
      className='formInput'
      name='move_2' 
      type='text'
      onChange={handleMoveChange}
      value={currentMoves.move_2}/>
      <label className='pokeLabel'>Move:</label>
      <input
      className='formInput'
      name='move_3'
      type='text'
      onChange={handleMoveChange}
      value={currentMoves.move_3}/>
      <label className='pokeLabel'>Move:</label>
      <input
      className='formInput'
      name='move_4'
      type='text'
      onChange={handleMoveChange}
      value={currentMoves.move_4}/>
      </div>
  <br/>
    <button
      className='formSubmitButton' 
      type='submit'>
        Done
    </button>
  </form> : <h1 className='editPokeMoves'>Loading...</h1>} 
</div>)
}

export default EditPokemonForm