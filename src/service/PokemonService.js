import axios from 'axios';

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokemonService{
    async searchPokemon(pokemonName){
        return axios.get(POKEMON_API_BASE_URL + pokemonName).then((response) => {
            var stats = [];
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
            response.data.stats = stats;
            return response;
        });
    }

    async getPokemonById(id){
        return axios.get(POKEMON_API_BASE_URL + id).then((response) => {
            var stats = [];
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
            response.data.stats = stats;
            return response;
        });
    }

    async getPageSource(pokemonId, pokemonName){
        return axios.post("http://localhost:8081/" +  pokemonId + pokemonName);
    }
}

export default new PokemonService();