import React, { useState,useEffect  } from 'react';
import PokemonService from '../service/PokemonService';
import '../assets/css/loading_spinner.css';
import LoadingSpinner from './LoadingSpinner';

const SearchPokemon = () => {

    const [pokemonName, setPokemonName] = useState();
    const [loading, setLoading] = useState(false);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [bColor, setBColor] = useState(0,0,0);

    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
    }

    useEffect(() => {
        // Update the document title using the browser API
    });

    const searchPokemonApi = async (e) => {
        e.preventDefault();
        if(pokemonName != null && pokemonName.trim() !== ""){
            setLoading(true);
            try{
                let name = pokemonName.trim().toLowerCase();
                const response = await PokemonService.searchPokemon(name);
                setErrorResponse(null);
                setPokemonInfo(response.data);
                const imgUrl = await PokemonService.getPageSource(String(response.data.id).padStart(3,"0"), name.charAt(0).toUpperCase() + name.slice(1) + ".png");
                setImageUrl(imgUrl.data.url);
                setBColor(imgUrl.data.color);
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
        <div className='flex max-w-full min-h-screen mx-auto shadow border-b items-center justify-center' style={{ background: loading ? 'rgb(255, 255, 255)' : `rgb(${bColor})` }}>
            <div className='items-center justify-center px-8 py-8' id="pokemonDataContiner">
                <div className='font-thin text-2xl tracking-wider'>
                    Search Pokémon
                </div>
                <div className='h-14 w-full my-4'>
                        <label className='tracking-wider'>Pokémon Name</label>
                        <input type="text" name="pokemonName" value={ pokemonName } onChange={(e) => handleChange(e)} className='border p-2 mx-2'></input>
                        <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={searchPokemonApi} disabled={loading}>Search</button>
                </div>
                {loading && (<LoadingSpinner  />)}
                {!loading && pokemonInfo !== null && errorResponse === null && (
                        <div id="img-container" style={{color: 'white'}}>
                            <div className='flex items-center justify-center'>
                                <h1 className='text-5xl tracking-wider font-bold font-mono' style={{ textTransform: 'capitalize'}}>{ pokemonInfo.name }   #{pokemonInfo.id}</h1>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={imageUrl} alt="pokemon" id="pokemonImg" width="300px" height="300px"/>     
                            </div>
                        </div>
                       
                )}
                {errorResponse && (
                    <div className='flex items-center justify-center'>
                        <h1 className='font-bold text-2xl'>{errorResponse}</h1>
                    </div>
                )}
                 {/* {!loading && pokemonInfo !== null && errorResponse === null && PokemonService.getAvgColor({imageUrl})} */}
            </div>
        </div>
        
    );
}

export default SearchPokemon;