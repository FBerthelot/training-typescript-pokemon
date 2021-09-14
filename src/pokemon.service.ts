import { Pokemon } from "./pokemon.model";

export class Battle {
    firstToAttack(attacker: Pokemon, defender: Pokemon): Pokemon {
        if(attacker.speed === defender.speed) {
            return Math.random() > 0.5 ? attacker : defender
        }
        return attacker.speed > defender.speed ? attacker : defender;
    }

    fightRound(attacker: Pokemon, defender: Pokemon): Pokemon {
        return {
            ...defender,
            hp: defender.hp - attacker.attack
        };
    }

    fight(attacker: Pokemon, defender: Pokemon): Pokemon {
        let currentAttacker = this.firstToAttack(attacker, defender);
        let currentDefender = currentAttacker === attacker ? defender : attacker;
    
        while(currentAttacker.hp > 0 && currentDefender.hp > 0) {
            const newAttacker = this.fightRound(currentAttacker, currentDefender);
            currentDefender = currentAttacker;
            currentAttacker = newAttacker;
        }
    
        return currentDefender;
    }
}