import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function NewPokemonForm({newPokemon, newMoves}){
  const navigate = useNavigate();
  const {id} = useParams();
  const [pokeArray, setPokeArray] = useState([])
  const [pokeFormData, setPokeFormData] = useState({
    name: '',
    sprite: '',
    poke_type: '',
    description: '',
    trainer_id: id
  })
  const [moveFormData, setMoveFormData] = useState({
    move_1: '',
    move_2: '',
    move_3: '',
    move_4: '',
    pokemon_id: ''
  })

  useEffect(() => {
    fetch(`http://localhost:9292/trainers/${id}/pokemon`)
    .then(r => r.json())
    .then(data => setPokeArray(data))
  }, [])

  function handlePokeChange(e){
    const key = e.target.name
    setPokeFormData({ 
      ...pokeFormData, 
      [key]: e.target.value 
    })
  }

  function handMoveChange(e){
    const key = e.target.name
    setMoveFormData({
      ...moveFormData,
      [key]: e.target.value
    })
  }

  function onNewPokeSubmit(e){
    e.preventDefault();
    if (pokeArray.length >= 4) {
      alert('Team is full!')
    } 
    else
    fetch(`http://localhost:9292/trainers/${id}/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokeFormData)
    })
    .then(r => r.json())
    .then(data => {
      setMoveFormData({
        ...moveFormData,
        pokemon_id: data.id
      })
      newPokemon(data)
      fetch(`http://localhost:9292/pokemon/${data.id}/moves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(moveFormData)
        })
      .then(r => r.json())
      .then(data => {
        newMoves(data)
        navigate(`/trainers/${id}`)
      })
    })
  }

  return (
  <div className='editPokeDiv'>
    <button className='backButton' onClick={() => navigate(-1)}>Back</button>
    <form onSubmit={onNewPokeSubmit} className='editForm'>
      <div>
        <h2 className='editHeaders'>Pokemon:</h2>
        <label className='pokeLabel'>Pokemon Name:</label>
        <input
          className='formInput'
          name='name'
          type='text'
          placeholder='Pokemon Name..'
          onChange={handlePokeChange}
          value={pokeFormData.name}/>
        <label className='pokeLabel'>Pokemon Image URL:</label>
        <input
          className='formInput'
          name='sprite' 
          type='text'
          placeholder="Pokemon Image URL.."
          onChange={handlePokeChange}
          value={pokeFormData.sprite}/>
        <label className='pokeLabel'>Pokemon Description:</label>
        <input
          className='formInput'
          name='description'
          type='text'
          placeholder='Pokemon Description..'
          onChange={handlePokeChange}
          value={pokeFormData.description}/>
        <label className='pokeLabel'>Select Pokemon Type:</label>
        <select 
          className='pokeTypeSelect'
          onChange={handlePokeChange}
          value={pokeFormData.poke_type} 
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
        <h2 className='editHeaders'>Moves:</h2>
        <label className='pokeLabel'>Move:</label>
        <input
          className='formInput'
          name='move_1'
          type='text'
          placeholder='First Move..'
          onChange={handMoveChange}
          value={moveFormData.move_1}/>
        <label className='pokeLabel'>Move:</label>
        <input
          className='formInput'
          name='move_2' 
          type='text'
          placeholder='Second Move..'
          onChange={handMoveChange}
          value={moveFormData.move_2}/>
        <label className='pokeLabel'>Move:</label>
        <input
          className='formInput'
          name='move_3'
          type='text'
          placeholder='Third Move..'
          onChange={handMoveChange}
          value={moveFormData.move_3}/>
        <label className='pokeLabel'>Move:</label>
        <input
          className='formInput'
          name='move_4'
          type='text'
          placeholder='Fourth Move..'
          onChange={handMoveChange}
          value={moveFormData.move_4}/>
      </div>
      <button
        className='formSubmitButton' 
        type='submit'>
        Done
      </button>
    </form>
  </div>
  )
}

export default NewPokemonForm