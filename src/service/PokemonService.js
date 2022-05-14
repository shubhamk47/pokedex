import axios from 'axios';

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokemonService{
    searchPokemon(pokemonName){
        return axios.get(POKEMON_API_BASE_URL + pokemonName).then().catch();
    }

    getPageSource(pokemonId, pokemonName){
        return axios.post("http://localhost:8081/" +  pokemonId + pokemonName);
    }
}

export default new PokemonService();