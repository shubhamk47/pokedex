import { createSlice } from "@reduxjs/toolkit";

const pokemonStoreSlice = createSlice({
    name: "pokemons",
    initialState: {
        pokemonList: {},
        current: 0
    },
    reducers: {
        add: (state, a) => {
            if(!(a.payload.id in state.pokemonList)){
               state.pokemonList[a.payload.id] = a.payload;
            }
            state.current = a.payload.id;
        },
        updateCurrent: (state, newCurrent) => {
            console.log(state.current);
            console.log(state.pokemonList[state.current]);
            state.current = newCurrent.payload;
        }
    }
})

export const { add, updateCurrent } = pokemonStoreSlice.actions;
export default pokemonStoreSlice.reducer;
