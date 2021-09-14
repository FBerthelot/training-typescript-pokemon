import {Battle} from './index';
import { PokemonFire, PokemonIce, PokemonType } from './pokemon.model';

jest.mock('./log.service', () => {
    class Logger {
        log: jest.Mock;
        constructor() {
            this.log = jest.fn()
        }
    }
    return {Logger};
})

const pikachu: PokemonFire = {
    name: 'pikachu',
    speed: 50,
    attack: 20,
    hp: 100,
    type: PokemonType.FIRE
};

const salameche: PokemonFire = {
    name: 'salameche',
    speed: 40,
    attack: 10,
    hp: 100,
    type: PokemonType.FIRE
};

const bulbizarre: PokemonFire = {
    name: 'bulbizarre',
    speed: 30,
    attack: 50,
    hp: 100,
    type: PokemonType.FIRE
};

describe('pokemon battle', () => {
    let battleService: Battle;
    beforeAll(() => {
        battleService = new Battle();
    });


    describe('when pikachu fight against salamèche', () => {
        it('should be pikachu to attack first', () => {
            expect(battleService.firstToAttack(pikachu, salameche)).toBe(pikachu);
        });

        it('should be pikachu to win', () => {
            expect(battleService.fight(salameche, pikachu).name).toBe('pikachu');
        });
    });

    describe('when pikachu fight against bulbizarre', () => {
        it('should be pikachu to attack first', () => {
            expect(battleService.firstToAttack(pikachu, bulbizarre)).toBe(pikachu);
        });
        it('should be bulbizarre to win', () => {
            expect(battleService.fight(pikachu, bulbizarre).name).toBe('bulbizarre');
        });
    });

    describe('when attacker pikachu fight against defender pikachunpm', () => {
        const attacker = {
            name: 'pikachu1',
            speed: 50,
            attack: 20,
            hp: 100,
            type: PokemonType.ICE
        };

        const defender = {
            name: 'pikachu2',
            speed: 50,
            attack: 20,
            hp: 100,
            type: PokemonType.ICE
        };

        const MathRandom = Math.random;
        beforeEach(() => {
            Math.random = jest.fn();
        });

        afterEach(() => {
            Math.random = MathRandom;
        })

        describe('when random is around 1', () => {
            beforeEach(() => {
                (Math.random as jest.Mock).mockImplementation(() => 1);
            })

            it('should be the attacker pikachu to start', () => {
                expect(battleService.firstToAttack(attacker, defender)).toBe(attacker);
            });

            it('should be the attacker pikachu to win', () => {
                expect(battleService.fight(attacker, defender).name).toBe('pikachu1');
            });
        });

        describe('when random is around 0', () => {
            beforeEach(() => {
                (Math.random as jest.Mock).mockImplementation(() => 0);
            })

            it('should be the defender pikachu to start', () => {
                expect(battleService.firstToAttack(attacker, defender)).toBe(defender);
            });

            it('should be the defender pikachu to win', () => {
                expect(battleService.fight(attacker, defender).name).toBe('pikachu2');
            });
        })
    });

    describe('fightRound', () => {
        it('shoud make pikachu loose 10 HP when salamèche attack him', () => {
            expect(battleService.fightRound(salameche, pikachu).hp).toBe(90);
        });
        it('shoud make pikachu loose 50 HP when bulbizarre attack him', () => {
            expect(battleService.fightRound(bulbizarre, pikachu).hp).toBe(50);
        });
        it('shoud make salamèche loose 20 HP when pikachu attack him', () => {
            expect(battleService.fightRound(pikachu, salameche).hp).toBe(80);
        });
        it('shoud make salamèche loose 50 HP when bulbizarre attack him', () => {
            expect(battleService.fightRound(bulbizarre, salameche).hp).toBe(50);
        });
        it('shoud make bulbizarre loose 10 HP when salamèche attack him', () => {
            expect(battleService.fightRound(salameche, bulbizarre).hp).toBe(90);
        });
        it('shoud make bulbizarre loose 20 HP when pikachu attack him', () => {
            expect(battleService.fightRound(pikachu, bulbizarre).hp).toBe(80);
        });
        it('shoud make pikachu loose 20 HP when pikachu attack him', () => {
            expect(battleService.fightRound(pikachu, pikachu).hp).toBe(80);
        });
    });

    describe('when a fire pokemonfight a ice pokemon (defender)', () => {
        const firePokemon: PokemonFire = bulbizarre;

        const icePokemon: PokemonIce = {
            ...salameche,
            type: PokemonType.ICE
        };

        it('should make fire pokemon start when firepokemon is attacker', () => {
            expect(battleService.firstToAttack(firePokemon, icePokemon)).toBe(firePokemon);
        });

        it('should make fire pokemon start when firepokemon is defender', () => {
            expect(battleService.firstToAttack(icePokemon, firePokemon)).toBe(firePokemon);
        });

        it('should add a bonus of 50% of attack (15) to the attacker', () => {
            expect(battleService.fightRound(icePokemon, firePokemon).hp).toBe(85);
        });
    });
});