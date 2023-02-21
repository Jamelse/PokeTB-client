import React, {useEffect, useState} from 'react';
import PokeCard from './PokeCard';
import NavBar from './NavBar';

function App() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/pokemon')
    .then(r => r.json())
    .then(data => setPokemon(data))
  }, [])

  return (
    <>
    <NavBar />
    <div className="AppContainer">
      <PokeCard pokemon={pokemon}/>
    </div>
    </>
  );
}

export default App;
