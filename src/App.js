import React, { useState } from 'react';
import pokemonService from './service/PokemonService';
import LoadingSpinner from './components/LoadingSpinner';
import './assets/css/loading_spinner.css';
import './assets/css/pokemonInfo.css';
import './assets/css/icon.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, updateCurrent } from './redux/pokemonStoreSlice';
const App = () => {

    const pokemonList = useSelector((state) => state.pokemons.pokemonList);
    const current = useSelector((state) => state.pokemons.current);
    const [pokemonName, setPokemonName] = useState();
    const [loading, setLoading] = useState(false);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);
    const [bColor, setBColor] = useState(0,0,0);
    var ids = [];
    const dispatch = useDispatch();
    const [uMover, setUMover] = useState(5);
    const [lMover, setLMover] = useState(0);
    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);
    }
    const initComponent = async (id) => {

        try {
            if(id in pokemonList){
                dispatch(updateCurrent(id));
                setPokemonInfo(pokemonList[id]);   
                setBColor(pokemonList[id].bColor);
            }else{
                const response = await pokemonService.getPokemonById(id? id : 1);
                const imgUrl = await pokemonService.getPageSource(String(response.data.id).padStart(3,"0"), response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1) + ".png");
                response.data.imgUrl = imgUrl.data.url;
                response.data.bColor = imgUrl.data.color;
                setPokemonInfo(response.data);
                setBColor(imgUrl.data.color);
                dispatch(add(response.data));
            }

            setLMover(id ? [1,2].includes(id) ? 1 : id - 2 : 1 );
            setUMover(id ? [1,2].includes(id) ? 5 : id + 2 : 5 );
            setLoading(false);
        } catch (error) {
            if(error.response.status === 404){
                setErrorResponse("Error!");
            }
        }
    }

    const searchPokemonApi = async (e) => {
        e.preventDefault();
        if(pokemonName != null && pokemonName.trim() !== ""){
            setLoading(true);
            try{
                let name = pokemonName.trim().toLowerCase();
                const response = await pokemonService.searchPokemon(name);
                setErrorResponse(null);
                setPokemonInfo(response.data);
                const imgUrl = await pokemonService.getPageSource(String(response.data.id).padStart(3,"0"), name.charAt(0).toUpperCase() + name.slice(1) + ".png");
                response.data.imgUrl = imgUrl.data.url;
                response.data.bColor = imgUrl.data.color;
                setPokemonInfo(response.data);
                setBColor(imgUrl.data.color);
                dispatch(add(response.data));
                setLoading(false);
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
    
    const updateNav = () => {
        console.log("lower - ", lMover);
        console.log("upper - ", uMover);
        if(current !== 0){
            ids = [];
            for(var i=lMover; i <= uMover; i++){
                ids.push(i);
            }
        }
    }

    if(pokemonInfo === null){
        initComponent();
    }

    pokemonList && current && updateNav();  

    const downArrow = () => {
        setLMover(lMover + 2);
        setUMover(uMover + 2);
    }

    const upArrow = () => {
        setLMover([-1,0].includes(lMover - 2) ? 1 : lMover - 2);
        setUMover([-1,0].includes(lMover - 2) ? 5 : uMover - 2);
    }
    
    return (
        <div className='display-background' style={{ background: loading ? 'rgb(255, 255, 255)' : `rgb(${bColor})`, filter: 'saturate(150%)' }}>
            <div id="pokemonDataContiner">
                <div  className='display-search-box'>
                    <div className='display-search-box-heading'>
                        <p>Search Pok??mon</p>
                    </div>
                    <div>
                        <input type="text" name="pokemonName" placeholder='Pok??mon name' value={ pokemonName } onChange={(e) => handleChange(e)} className='display-search-box-input'></input>
                        <button className='display-search-box-button' onClick={searchPokemonApi} disabled={loading}>Search</button>
                    </div>
                </div>
                {pokemonInfo == null && (<LoadingSpinner  />)}
                {loading && (<LoadingSpinner  />)}
                {!loading && pokemonInfo != null && errorResponse === null && (
                    <div id="img-container" className='pokemon-info-container' style={{color: 'white'}}>
                        <div className='pokemon-info-container-div' >
                            <h1 className='pokemon-info-heading-id'>#{ pokemonList[current].id }</h1>
                            <h1 className='pokemon-info-heading' style={{ textTransform: 'capitalize'}}>{ pokemonList[current].name }</h1>
                            <div className='pokemon-hw-details'>
                                <h2>Height: { pokemonList[current].height / 10 } m</h2>
                                <h2>Weight: { pokemonList[current].weight / 10 } Kg</h2>
                            </div>
                        </div> 
                        <img src={ pokemonList[current].imgUrl } className="pokemon-info-image" alt="pokemon" id="pokemonImg" width="500px" height="500px" />
                        <div className='pokemon-info-stats-container'>
                            <div className='stats'>
                                { pokemonList[current].types.map(type => {
                                    return <div className={`icon ${type.type.name}`} style={{ margin: '15px' }}><img src={ require('./assets/icons/' +  type.type.name + ".svg" ) } alt="pokemon" id="pokemonImg" /></div>
                                }) }
                            </div>
                            <div className='pokemon-info-stats-div'>
                                <h1 className='pokemon-info-heading-stats'>Base stats:</h1>
                                <div className='pokemon-info-heading-stats-items'>
                                    { pokemonList[current].stats.map(stat => {
                                        return <div className='pokemon-info-heading-stats-item-div'>{stat}</div>
                                    }) }
                                </div>
                            </div>
                        </div>
                        <div className="page-container">
                            <i className='arrow up' onClick={upArrow}></i>
                            { ids.map(id =>{
                                if(id === pokemonList[current].id){
                                    return <h3 style={{ textDecoration: 'underline 3px' }}>{id}</h3>
                                }else{
                                    return <h3 style={{ cursor: 'pointer' }} onClick={() => {
                                        setLoading(true);
                                        initComponent(id);
                                    }}>{id}</h3>
                                }
                            }) }
                            <i className='arrow down' onClick={downArrow}></i>
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

export default App;