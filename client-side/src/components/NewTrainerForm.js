import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function NewTrainerForm({newTrainer}){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    trainer_img: ''
  })

  function handleChange(e){
    const key = e.target.name
    setFormData({ 
      ...formData, 
      [key]: e.target.value 
    })
  }

  function onNewSubmit(e){
    e.preventDefault();
    fetch('http://localhost:9292/trainers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then((data) => {
      newTrainer(data)
      navigate('/trainers')
    })
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}className='backButton'>Back</button>
      <form  onSubmit={onNewSubmit} className='editForm'>
        <div className='editTrainerDiv'>
          <label className='pokeLabel'>Name:</label>
            <input
            className='formInput'
            name='name'
            type='text'
            placeholder='Trainer Name..'
            onChange={handleChange}
            value={formData.name}/>
            <label className='pokeLabel'>Image:</label>
            <input
            className='formInput'
            name='trainer_img' 
            type='text'
            placeholder="Trainer Image URL..."
            onChange={handleChange}
            value={formData.trainer_img}/>
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

export default NewTrainerForm