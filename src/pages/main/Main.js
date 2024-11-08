import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [pokemonNum, setPokemonNum] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();

  const fetchPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}/`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
        navigate('/pokemon', { state: { pokemonData: data } });  // Pass data via state
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div className="PokemonApp">
        <h1 className="pokemon-header">
          Let's Catch Pokemon
        </h1>
      </div>
      <hr />
      <h2>Search Pokemon: </h2>
      <input
        type="text"
        value={pokemonNum}
        onChange={(e) => setPokemonNum(e.target.value)}
        placeholder="Enter Pokemon"
      />
      <button onClick={fetchPokemonData}>Search</button>
    </div>
  );
}

export default Main;
