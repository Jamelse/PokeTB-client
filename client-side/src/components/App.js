import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Trainers from './Trainers';
import AllPokemon from './AllPokemon';
import PokemonDetail from './PokemonDetail';

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

  return (
    <div>
    <NavBar />
      <Routes>
      <Route path='/' element={
          <Home />}>
        </Route>
        <Route path='/pokemon' element={
          <AllPokemon pokemon={pokemon}/>}>
        </Route>
        <Route path='/pokemon/:id' element={
          <PokemonDetail/>}>
        </Route>
        <Route path='/trainers' element={
          <Trainers trainers={trainers}/>}>
        </Route>
        </Routes>
    </div>
  );
}

export default App;
