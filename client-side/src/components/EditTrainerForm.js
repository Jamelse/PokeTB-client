import React, {useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function EditTrainerForm({onTrainerUpdate}){
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    trainer_img: ''
  })

  function trainerFormSubmit(e){
    e.preventDefault();
    fetch(`http://localhost:9292/trainers/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then((trainer) => {
      onTrainerUpdate(trainer)
      navigate(`/trainers/${id}`)})
  }

  function handleChange(e){
    const key = e.target.name
    setFormData({ 
      ...formData, 
      [key]: e.target.value 
    })
  }

  return (
    <div>
      <Link className='backLink' to={`/trainers/${id}`}><button className='backButton'>Back</button></Link>
    <form onSubmit={trainerFormSubmit} className='editForm'>
    <div className='editTrainerDiv'>
      <input
      className='formInput'
      name='name'
      type='text'
      placeholder='Trainer Name..'
      onChange={handleChange}
      value={formData.name}/>
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
        Done</button>
    </form>
  </div>
  )
}

export default EditTrainerForm