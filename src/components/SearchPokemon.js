import React, { useState } from 'react';
import PokemonService from '../service/PokemonService';

const SearchPokemon = () => {

    const [pokemonName, setPokemonName] = useState();
    const [loading, setLoading] = useState(true);
    const [pokemonInfo, setPokemonInfo] = useState();
    const [errorResponse, setErrorResponse] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
    }

    const searchPokemonApi = async (e) => {
        e.preventDefault();
        if(pokemonName != null && pokemonName.trim() !== ""){
            setLoading(true);
            try{
                const response = await PokemonService.searchPokemon(pokemonName.trim());
                setErrorResponse(null);
                setPokemonInfo(response.data);
                const imgUrl = await PokemonService.getPageSource(String(response.data.id).padStart(3,"0"), pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) + ".png");
                setImageUrl(imgUrl.data);
            }catch(error){
                if(error.response.status === 404){
                    setErrorResponse("You seem to have mispelled the name!");
                }
            }
            setLoading(false);
        }else{
            alert("Enter a name!");
        }
        
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
                {!loading && errorResponse === null && (
                    <div className='flex items-center justify-center'>
                        {/* <img src={pokemonInfo.sprites['front_default']} alt="pokemon" width="300px" height="300px"/>  */}
                        <img src={imageUrl} alt="pokemon" width="300px" height="300px"/> 
                        <h1 className='font-bold text-5xl' style={{textTransform: 'capitalize'}}>{pokemonInfo.name}</h1>
                    </div>
                )}
                {errorResponse && (
                    <div className='flex items-center justify-center'>
                        <h1 className='font-bold text-3xl'>{errorResponse}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPokemon;