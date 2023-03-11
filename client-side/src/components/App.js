import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Trainers from './Trainers';
import AllPokemon from './AllPokemon';
import PokemonDetail from './PokemonDetail';
import TrainerDetail from './TrainerDetail';
import EditTrainerForm from './EditTrainerForm';
import EditPokemonForm from './EditPokemonForm';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/pokemon')
    .then(r => r.json())
    .then(data => setPokemon(data))

    fetch('http://localhost:9292/trainers')
    .then(r => r.json())
    .then(data => setTrainers(data))
  }, [])

  function onTrainerUpdate(updatedTrainer){
    setTrainers(trainers.map(
      (trainer => trainer.id===updatedTrainer.id ? updatedTrainer : trainer)))
  }

  function onTrainerDelete(trainerId){
    setTrainers(trainers.filter(train => train.id != trainerId))
    setPokemon(pokemon.filter(poke => poke.trainer_id != trainerId))
  }

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
    <NavBar />
      <Routes>
      <Route path='/' element={
          <Home />}>
        </Route>
        <Route path='/pokemon' element={
          <AllPokemon pokemon={pokemon} capitalize={capitalize}/>}>
        </Route>
        <Route path='/pokemon/:id' element={
          <PokemonDetail />}>
        </Route>
        <Route path='/trainers' element={
          <Trainers trainers={trainers}/>}>
        </Route>
        <Route path='/trainers/:id' element={
          <TrainerDetail capitalize={capitalize} onTrainerDelete={onTrainerDelete}/>}>
        </Route>
        <Route path='/trainers/:id/edit' element={
          <EditTrainerForm onTrainerUpdate={onTrainerUpdate}/>}>
        </Route>
        <Route path='/pokemon/:id/edit' element={
          <EditPokemonForm />}>
        </Route>
        </Routes>
    </div>
  );
}

export default App;
