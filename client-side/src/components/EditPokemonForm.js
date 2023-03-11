import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditPokemonForm(){
return(
  <form>
  <label for="select-option">Select an option:</label>
  <select id="select-option" name="select-option">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
    <option value="option4">Option 4</option>
  </select>
  <br/>
  <button
      className='formSubmitButton' 
      type='submit'>
        Done
        </button>
        </form> )
}

export default EditPokemonForm