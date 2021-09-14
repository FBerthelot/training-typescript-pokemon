import { Logger } from "./log.service";
import { Pokemon } from "./pokemon.model";
import { isFirePokemon } from "./pokemon.utils";

export class Battle {
    pokemonLogger = new Logger<Pokemon>();
    battleLogger = new Logger();

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

    fightRound(attacker: Pokemon, defender: Pokemon): Pokemon {
        return {
            ...defender,
            hp: isFirePokemon(attacker) ? defender.hp - attacker.attack : defender.hp - (attacker.attack * 1.5)
        };
    }

    fight(attacker: Pokemon, defender: Pokemon): Pokemon {
        let currentAttacker = this.firstToAttack(attacker, defender);
        let currentDefender = currentAttacker === attacker ? defender : attacker;

        this.battleLogger.log('Début de bataille');
    
        while(currentAttacker.hp > 0 && currentDefender.hp > 0) {
            this.battleLogger.log('Tour de bataille');

            const newAttacker = this.fightRound(currentAttacker, currentDefender);
            currentDefender = currentAttacker;
            currentAttacker = newAttacker;
        }

        this.battleLogger.log('Fin de bataille');
        this.pokemonLogger.log(currentDefender);
    
        return currentDefender;
    }
}