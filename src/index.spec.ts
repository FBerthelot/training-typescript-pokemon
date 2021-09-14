import {firstToAttack, fightRound, fight} from './index';

const pikachu = {
    name: 'pikachu',
    speed: 50,
    attack: 20,
    hp: 100
};

const salameche = {
    name: 'salameche',
    speed: 40,
    attack: 10,
    hp: 100
};

const bulbizarre = {
    name: 'bulbizarre',
    speed: 40,
    attack: 50,
    hp: 100
};

describe('pokemon battle', () => {
    describe('when pikachu fight against salamèche', () => {
        it('should be pikachu to attack first', () => {
            expect(firstToAttack(pikachu, salameche)).toBe(pikachu);
        });

        it('should be pikachu to win', () => {
            expect(fight(salameche, pikachu).name).toBe('pikachu');
        });
    });

    describe('when pikachu fight against bulbizarre', () => {
        it('should be pikachu to attack first', () => {
            expect(firstToAttack(pikachu, bulbizarre)).toBe(pikachu);
        });
        it('should be bulbizarre to win', () => {
            expect(fight(pikachu, bulbizarre).name).toBe('bulbizarre');
        });
    });

    describe('when attacker pikachu fight against defender pikachunpm', () => {
        const attacker = {
            name: 'pikachu1',
            speed: 50,
            attack: 20,
            hp: 100
        };

        const defender = {
            name: 'pikachu2',
            speed: 50,
            attack: 20,
            hp: 100
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
                expect(firstToAttack(attacker, defender)).toBe(attacker);
            });

            it('should be the attacker pikachu to win', () => {
                expect(fight(attacker, defender).name).toBe('pikachu1');
            });
        });

        describe('when random is around 0', () => {
            beforeEach(() => {
                (Math.random as jest.Mock).mockImplementation(() => 0);
            })

            it('should be the defender pikachu to start', () => {
                expect(firstToAttack(attacker, defender)).toBe(defender);
            });

            it('should be the defender pikachu to win', () => {
                expect(fight(attacker, defender).name).toBe('pikachu2');
            });
        })
    });

    describe('fightRound', () => {
        it('shoud make pikachu loose 10 HP when salamèche attack him', () => {
            expect(fightRound(salameche, pikachu).hp).toBe(90);
        });
        it('shoud make pikachu loose 50 HP when bulbizarre attack him', () => {
            expect(fightRound(bulbizarre, pikachu).hp).toBe(50);
        });
        it('shoud make salamèche loose 20 HP when pikachu attack him', () => {
            expect(fightRound(pikachu, salameche).hp).toBe(80);
        });
        it('shoud make salamèche loose 50 HP when bulbizarre attack him', () => {
            expect(fightRound(bulbizarre, salameche).hp).toBe(50);
        });
        it('shoud make bulbizarre loose 10 HP when salamèche attack him', () => {
            expect(fightRound(salameche, bulbizarre).hp).toBe(90);
        });
        it('shoud make bulbizarre loose 20 HP when pikachu attack him', () => {
            expect(fightRound(pikachu, bulbizarre).hp).toBe(80);
        });
        it('shoud make pikachu loose 20 HP when pikachu attack him', () => {
            expect(fightRound(pikachu, pikachu).hp).toBe(80);
        });
    });
});