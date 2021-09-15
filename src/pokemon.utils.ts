import { Pokemon, PokemonFire, PokemonIce, PokemonType } from "./pokemon.model"

export const isFirePokemon = (pokemon: unknown): pokemon is PokemonFire  => {
    return (pokemon as Pokemon)?.type === PokemonType.FIRE
}

export const isIcePokemon = (pokemon: unknown): pokemon is PokemonIce  => {
    return (pokemon as Pokemon)?.type === PokemonType.ICE
}

export const isPokemon = (pokemon: unknown): pokemon is Pokemon  => {
    return isIcePokemon(pokemon) || isFirePokemon(pokemon);
}