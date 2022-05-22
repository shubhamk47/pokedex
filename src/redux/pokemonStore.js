import { configureStore } from '@reduxjs/toolkit';
import pokemonStoreSlice from './pokemonStoreSlice';

const pokemonStore = configureStore({
    reducer: {
        pokemons : pokemonStoreSlice
    }
})

export default pokemonStore;