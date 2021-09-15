import { logOutput } from "./log.decorator";
import { Pokemon } from "./pokemon.model";
import { isFirePokemon } from "./pokemon.utils";

export class Battle {
    @logOutput('orange')
    firstToAttack(attacker: Pokemon, defender: Pokemon): Pokemon {
        if(isFirePokemon(attacker) && !isFirePokemon(defender)) {
            return attacker;
        }
        if(isFirePokemon(defender) && !isFirePokemon(attacker)) {
            return defender;
        }

        if(attacker.speed === defender.speed) {
            return Math.random() > 0.5 ? attacker : defender
        }
        return attacker.speed > defender.speed ? attacker : defender;
    }

    @logOutput('yellow')
    fightRound(attacker: Pokemon, defender: Pokemon): Pokemon {
        return {
            ...defender,
            hp: isFirePokemon(attacker) ? defender.hp - attacker.attack : defender.hp - (attacker.attack * 1.5)
        };
    }

    @logOutput('green')
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