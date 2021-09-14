import { Pokemon, PokemonFire, PokemonType } from "./pokemon.model"

export const isFirePokemon = (pokemon: unknown): pokemon is PokemonFire  => {
    return (pokemon as Pokemon)?.type === PokemonType.FIRE
}