import React from 'react'
import {Link} from 'react-router-dom'

function Trainers({trainers}){
  return (
    <div className='allTrainersDiv'>
      {trainers.map((trainer) => {
        return (
          <div className='trainerCard' key={trainer.id}>
            <img className='trainerImg' src={trainer.trainer_img}/>
            <h1 className='tainerName'>{trainer.name}</h1>
            <Link className='trainerLink' to={`/trainers/${trainer.id}`}>View Team</Link>
          </div>
        )})}
    </div>
  )
}

export default Trainers