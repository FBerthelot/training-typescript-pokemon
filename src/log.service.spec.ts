import { Logger } from "./log.service";
import { Pokemon, PokemonFire, PokemonType } from "./pokemon.model";

const pikachu: PokemonFire = {
    name: 'pikachu',
    hp: 100,
    speed: 500,
    attack: 600,
    type: PokemonType.FIRE
}

describe('log service', () => {
    const consoleLog = console.log;
    beforeEach(() => {
        console.log = jest.fn();
    });
    afterEach(() => {
        console.log = consoleLog;
    });

    it('should log pokemon with this pattern "<PokemonName> : <nbPV> PV"', () => {
        const pokemonLogger = new Logger<Pokemon>();
        pokemonLogger.log(pikachu)
        expect(console.log).toHaveBeenCalledWith('pikachu : 100 PV');
    });

    it('should log pokemon differently', () => {
        const pokemonLogger = new Logger();
        pokemonLogger.log('hello')
        expect(console.log).toHaveBeenCalledWith('hello');
    });
});