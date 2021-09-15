import {Battle} from './index';
import { PokemonFire, PokemonIce, PokemonType } from './pokemon.model';

// jest.mock('./log.service', () => {
//     class Logger {
//         log: jest.Mock;
//         constructor() {
//             this.log = jest.fn()
//         }
//     }
//     return {Logger};
// })

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
        jest.useFakeTimers();
    });


    describe('when pikachu fight against salamèche', () => {
        it('should be pikachu to attack first', () => {
            expect(battleService.firstToAttack(pikachu, salameche)).toBe(pikachu);
        });

        it('should be pikachu to win', done => {
            const SetTimeout = setTimeout;
            (globalThis.setTimeout as any) = (cb: () => void) => cb();

            expect.assertions(1);
            battleService.fight(salameche, pikachu)
                .then((winner) => {
                    expect(winner.name).toBe('pikachu');
                    globalThis.setTimeout = SetTimeout;
                    done();
                });
        });
    });

    describe('when pikachu fight against bulbizarre', () => {
        it('should be pikachu to attack first', () => {
            expect(battleService.firstToAttack(pikachu, bulbizarre)).toBe(pikachu);
        });
        it('should be bulbizarre to win', done => {
            const SetTimeout = setTimeout;
            (globalThis.setTimeout as any) = (cb: () => void) => cb();

            expect.assertions(1);
            battleService.fight(pikachu, bulbizarre)
                .then((winner) => {
                    expect(winner.name).toBe('bulbizarre');
                    globalThis.setTimeout = SetTimeout;
                    done();
                });
        });
    });

    describe('when attacker pikachu fight against defender pikachu', () => {
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

            it('should be the attacker pikachu to win', done => {
                const SetTimeout = setTimeout;
                (globalThis.setTimeout as any) = (cb: () => void) => cb();

                expect.assertions(1);
                battleService.fight(attacker, defender)
                    .then((winner) => {
                        expect(winner.name).toBe('pikachu1');
                        globalThis.setTimeout = SetTimeout;
                        done();
                    });
            });
        });

        describe('when random is around 0', () => {
            beforeEach(() => {
                (Math.random as jest.Mock).mockImplementation(() => 0);
            })

            it('should be the defender pikachu to start', () => {
                expect(battleService.firstToAttack(attacker, defender)).toBe(defender);
            });

            it('should be the defender pikachu to win', done => {
                const SetTimeout = setTimeout;
                (globalThis.setTimeout as any) = (cb: () => void) => cb();

                expect.assertions(1);
                battleService.fight(attacker, defender)
                    .then((winner) => {
                        expect(winner.name).toBe('pikachu2');
                        globalThis.setTimeout = SetTimeout;
                        done();
                    });
            });
        })
    });

    describe('fightRound', () => {
        it.each([
            {defender: pikachu, attacker: salameche, expectedHP: 90},
            {defender: pikachu, attacker: bulbizarre, expectedHP: 50},
            {defender: salameche, attacker: pikachu, expectedHP: 80},
            {defender: salameche, attacker: bulbizarre, expectedHP: 50},
            {defender: bulbizarre, attacker: salameche, expectedHP: 90},
            {defender: bulbizarre, attacker: pikachu, expectedHP: 80},
            {defender: pikachu, attacker: pikachu, expectedHP: 80},
        ])
        ('shoud make $defender.name have from 100 HP to $expectedHP when $attacker.name attack him', ({defender, attacker, expectedHP}, done: any) => {
            expect.assertions(1);
            battleService.fightRound(attacker, defender)
                .then(defender => {
                    expect(defender.hp).toBe(expectedHP);
                    done();
                });
            jest.runAllTimers();
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

        it('should add a bonus of 50% of attack (15) to the attacker', (done) => {
            expect.assertions(1);

            battleService.fightRound(icePokemon, firePokemon).then(defender => {
                expect(defender.hp).toBe(85);
                done();
            });
            jest.runAllTimers();
        });
    });
});