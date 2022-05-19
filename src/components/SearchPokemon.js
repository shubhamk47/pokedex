import React, { useState } from 'react';
import PokemonService from '../service/PokemonService';
import LoadingSpinner from './LoadingSpinner';
import '../assets/css/loading_spinner.css';
import '../assets/css/pokemonInfo.css';
import '../assets/css/icon.css';
const SearchPokemon = () => {

    const [pokemonName, setPokemonName] = useState();
    const [loading, setLoading] = useState(false);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [bColor, setBColor] = useState(0,0,0);
    const [dstats, setStats] = useState();

    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
    }

    var stats = [];
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
                for(var i = 0; i < response.data.stats.length; i+=2){
                    var sName1 = "";
                    var sName2 = "";
                    if(response.data.stats[i+1].stat.name === "special-attack"){
                        sName1 = response.data.stats[i].stat.name
                        sName2 = "sp. attack";
                    }else if(response.data.stats[i].stat.name === "special-defense"){
                        sName1 = "sp. defense";
                        sName2 = response.data.stats[i+1].stat.name;
                    }else{
                        sName1 = response.data.stats[i].stat.name;
                        sName2 = response.data.stats[i+1].stat.name;
                    }
                    stats.push(<div className='stats' style={{textTransform: 'uppercase'}}><p className='pokemon-info-container-info' >{sName1} : { response.data.stats[i].base_stat }</p><p className='pokemon-info-container-info' style={{ marginLeft: '1em' }}>{sName2} : { response.data.stats[i+1].base_stat }</p></div>);
                }
                setStats(stats);
            }catch(error){
                console.log(error)
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
        // loading ? 'rgb(255, 255, 255)' : 
        <div className='display-background' style={{ background: loading ? 'rgb(255, 255, 255)' : `rgb(${bColor})`, filter: 'saturate(150%)' }}>
            <div id="pokemonDataContiner">
                <div  className='display-search-box'>
                    <div className='display-search-box-heading'>
                        <p>Search Pokémon</p>
                    </div>
                    <div>
                        <input type="text" name="pokemonName" placeholder='Pokémon name' value={ pokemonName } onChange={(e) => handleChange(e)} className='display-search-box-input'></input>
                        <button className='display-search-box-button' onClick={searchPokemonApi} disabled={loading}>Search</button>
                    </div>
                </div>
                {loading && (<LoadingSpinner  />)}
                {!loading && pokemonInfo !== null && errorResponse === null && (
                    <div id="img-container" className='pokemon-info-container' style={{color: 'white'}}>
                        <div className='pokemon-info-container-div' >
                            <h1 className='pokemon-info-heading-id'>#{pokemonInfo.id}</h1>
                            <h1 className='pokemon-info-heading' style={{ textTransform: 'capitalize'}}>{ pokemonInfo.name }</h1>
                            <div className='pokemon-hw-details'>
                                <h2 >Height: { pokemonInfo.height / 10 } m</h2>
                                <h2>Weight: { pokemonInfo.weight / 10 } Kg</h2>
                            </div>
                        </div>
                        <img src={imageUrl} className="pokemon-info-image" alt="pokemon" id="pokemonImg" width="500px" height="500px" />
                        <div className='pokemon-info-stats-container'>
                            <div className='stats'>
                                { pokemonInfo.types.map(type => {
                                    return <div className={`icon ${type.type.name}`} style={{ margin: '15px' }}><img src={ require('../assets/icons/' +  type.type.name + ".svg" ) } alt="pokemon" id="pokemonImg" /></div>
                                }) }
                            </div>
                            <div className='pokemon-info-stats-div'>
                                <h1 className='pokemon-info-heading-stats'>Base stats:</h1>
                                <div className='pokemon-info-heading-stats-items'>
                                    { dstats.map(stat => {
                                        return <div className='pokemon-info-heading-stats-item-div'>{stat}</div>
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {errorResponse && (
                    <div className='flex items-center justify-center'>
                        <h1 className='font-bold text-2xl'>{errorResponse}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPokemon;