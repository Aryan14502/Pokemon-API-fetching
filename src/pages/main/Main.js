import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [pokemonNum, setPokemonNum] = useState("");  // State for user input
  const [pokemonData, setPokemonData] = useState(null);  // State for selected Pokemon data
  const [randomPokemons, setRandomPokemons] = useState([]);  // State for storing 20 random Pokemon
  const navigate = useNavigate();

  const fetchPokemonData = () => { 
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}/`)  
      .then(response => response.json())  
      .then(data => {
        setPokemonData(data);
        navigate('/pokemon', { state: { pokemonData: data } });  
      })
      .catch(error => console.error('Error:', error));  
  };

  const fetchRandomPokemons = () => {  
    const randomIds = Array.from({ length: 20 }, () => Math.floor(Math.random() * 1025) + 1);  // Generate 20 random IDs (1-1025
    Promise.all(
      randomIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => response.json())
      )
    )
    .then(data => setRandomPokemons(data))  // Store the fetched Pokemon in state
    .catch(error => console.error("Error fetching random Pokemons:", error));
  };

  useEffect(() => {
    fetchRandomPokemons();  // Fetch 20 random Pokemon when component mounts
  }, []);

  // Function to handle tile click and navigate to Pokemon details
  const handleTileClick = (pokemon) => {
    navigate('/pokemon', { state: { pokemonData: pokemon } });
  };

  return (
    <div>
      <div className="PokemonApp">
        <h1 className="pokemon-header">Let's Catch Pokemon</h1>
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

      <div className="pokemon-tiles">
        {randomPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-tile"
            onClick={() => handleTileClick(pokemon)}
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="pokemon-tile-image"
            />
            <p className="pokemon-tile-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
