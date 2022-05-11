import React, { useState } from 'react';
import PokemonService from '../service/PokemonService';

const SearchPokemon = () => {

    const [pokemonName, setPokemonName] = useState();
    const [loading, setLoading] = useState(true);
    const [pokemonInfo, setPokemonInfo] = useState();
    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
    }

    const searchPokemonApi = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await PokemonService.searchPokemon(pokemonName);
            setPokemonInfo(response.data);
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div className='flex max-w-2xl mx-auto shadow border-b'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    Search Pokémon
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='tracking-wider'>Pokémon Name</label>
                    <input type="text" name="pokemonName" value={ pokemonName } onChange={(e) => handleChange(e)} className='border p-2 mx-2'></input>
                    <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={searchPokemonApi}>Search</button>
                </div>
                {!loading && (
                <div className='flex items-center'>
                   <img src={pokemonInfo.sprites['front_default']} alt="pokemon" width="300px" height="300px"/> 
                   <p>{pokemonInfo.name}</p>
                </div>)}
            </div>
        </div>
    );
}

export default SearchPokemon;