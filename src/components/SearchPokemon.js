import React, { useState } from 'react';
import PokemonService from '../service/PokemonService';

const SearchPokemon = () => {

    const [pokemonName, setPokemonName] = useState();
    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
        console.log(pokemonName);
    }

    const searchPokemonApi = (e) => {
        e.preventDefault();
        console.log(pokemonName);
        PokemonService.searchPokemon(pokemonName).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='flex max-w-2xl mx-auto shadow border-b'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    Search Pokemon
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='tracking-wider'>Pokemon Name</label>
                    <input type="text" name="pokemonName" value={ pokemonName } onChange={(e) => handleChange(e)} className='border p-2 mx-2'></input>
                    <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={searchPokemonApi}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default SearchPokemon;