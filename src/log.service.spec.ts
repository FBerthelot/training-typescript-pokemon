import { Logger } from "./log.service";
import { Pokemon, PokemonFire, PokemonType } from "./pokemon.model";
import chalk from 'chalk';

const pikachu: PokemonFire = {
    name: 'pikachu',
    hp: 100,
    speed: 500,
    attack: 600,
    type: PokemonType.FIRE
}

jest.mock('chalk', () => {
    return {
        keyword: jest.fn(() => jest.fn())
    }
})

describe('log service', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {})
    });
    afterEach(() => {
        (console.log as jest.Mock).mockReset();
        (chalk.keyword as jest.Mock).mockClear();
    });

    it('should log pokemon with this pattern "<PokemonName> : <nbPV> PV" with no color', () => {
        const pokemonLogger = new Logger<Pokemon>();
        pokemonLogger.log(pikachu);

        expect((console.log as jest.Mock).mock.calls[0][0]).toContain('pikachu : 100 PV');
        expect(chalk.keyword).not.toHaveBeenCalled();
    });

    it('should log pokemon with this pattern "<PokemonName> : <nbPV> PV" and color green color', () => {
        const pokemonLogger = new Logger<Pokemon>();
        pokemonLogger.log(pikachu, 'green');

        expect(console.log).toHaveBeenCalled();
        expect(chalk.keyword).toHaveBeenCalledWith('green');
    });

    it('should log string simply without any color', () => {
        const logger = new Logger();
        logger.log('hello');

        expect(console.log).toHaveBeenCalledWith('hello');
        expect(chalk.keyword).not.toHaveBeenCalled();
    });

    it('should log string simply in green', () => {
        const logger = new Logger();
        logger.log('hello', 'green');
        
        expect(console.log).toHaveBeenCalled();
        expect(chalk.keyword).toHaveBeenCalledWith('green');
    });
});