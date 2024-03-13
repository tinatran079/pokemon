import React from "react";

export default function PokemonList({ pokemon }) {
  return (
    <>
      <h1 className="text-center">Pokemons!</h1>
      <div className="card-container">
        {pokemon.map(({ id, name, sprites }) => (
          <div className="card" key={id}>
            <img
              className="card-img-top"
              src={sprites.front_default}
              alt={name}
            />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
