import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";
import "./styles.css";

function App() {
  // list of pokemon
  const [pokemonData, setPokemonData] = useState([]);

  // track current page
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(currentPageUrl);
        const pokemonList = response.data.results;

        const pokemonDataPromises = pokemonList.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url); // Fix variable name
          return {
            ...pokemonResponse.data,
            url: pokemon.url,
          };
        });

        const pokemonDetails = await Promise.all(pokemonDataPromises);

        setPokemonData(pokemonDetails);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
      } catch (error) {
        console.error("Error fetching pokemon", error);
      }
    };
    fetchPokemon();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <>
      <PokemonList pokemon={pokemonData} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
