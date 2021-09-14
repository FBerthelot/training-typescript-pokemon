export const firstToAttack = (
    attacker: {name: string, hp: number, attack: number, speed: number},
    defender: {name: string, hp: number, attack: number, speed: number}
    ): {name: string, hp: number, attack: number, speed: number} => {
        if(attacker.speed === defender.speed) {
            return Math.random() > 0.5 ? attacker : defender
        }
        return attacker.speed > defender.speed ? attacker : defender;
    };

export const fightRound = (
    attacker: {name: string, hp: number, attack: number, speed: number},
    defender: {name: string, hp: number, attack: number, speed: number}
    ): {name: string, hp: number, attack: number, speed: number} => {
        return {
            ...defender,
            hp: defender.hp - attacker.attack
        };
    }

export const fight = (
    attacker: {name: string, hp: number, attack: number, speed: number},
    defender: {name: string, hp: number, attack: number, speed: number}
    ): {name: string, hp: number, attack: number, speed: number} => {
        let currentAttacker = firstToAttack(attacker, defender);
        let currentDefender = currentAttacker === attacker ? defender : attacker;

        while(currentAttacker.hp > 0 && currentDefender.hp > 0) {
            const newAttacker = fightRound(currentAttacker, currentDefender);
            currentDefender = currentAttacker;
            currentAttacker = newAttacker;
        }

        return currentDefender;
    }