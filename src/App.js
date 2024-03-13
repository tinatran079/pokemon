import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";

function App() {
  // list of pokemon
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);

  return <PokemonList pokemon={pokemon} />;
}

export default App;
