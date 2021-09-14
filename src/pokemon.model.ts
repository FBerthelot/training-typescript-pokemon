export enum PokemonType { FIRE, ICE};

interface PokemonAbstract {
    name: string,
    hp: number, 
    attack: number,
    speed: number,
    type: PokemonType
};


export interface PokemonFire extends PokemonAbstract {
    type: PokemonType.FIRE
};


export interface PokemonIce extends PokemonAbstract {
    type: PokemonType.ICE
};

export type Pokemon = PokemonFire | PokemonIce;