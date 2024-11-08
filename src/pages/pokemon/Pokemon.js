import React from "react";
import { useLocation } from "react-router-dom";

function Pokemon() {
  const location = useLocation();  // Get the state from location
  const { pokemonData } = location.state || {};  // Extract pokemonData from state

  // If no data is passed, show a message
  if (!pokemonData) {
    return <div>No Pokémon data available!</div>;
  }

  // Destructure the data from pokemonData for easy access
  const { id, name, height, weight, base_experience, abilities, stats, sprites } = pokemonData;
  const speed = stats.find(stat => stat.stat.name === "speed")?.base_stat || "N/A";
  const attack = stats.find(stat => stat.stat.name === "attack")?.base_stat || "N/A";
  const img = sprites.other["official-artwork"].front_default;

  return (
    <div>
      <div className="PokemonApp">
        <h1 className="pokemon-header">
          Pokémon Details
        </h1>
      </div>
      <div>
        <h3>Pokemon Details:</h3>
        {img && <img src={img} alt={name} />}
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Height:</strong> {height}</p>
        <p><strong>Weight:</strong> {weight}</p>
        <p><strong>Speed:</strong> {speed}</p>
        <p><strong>Attack:</strong> {attack}</p>
        <p><strong>Base Experience:</strong> {base_experience}</p>
        <p><strong>Abilities:</strong> {abilities.map(ability => ability.ability.name).join(", ")}</p>
      </div>
    </div>
  );
}

export default Pokemon;
