import { Pokemon, PokemonFire, PokemonType } from "./pokemon.model";

export class Battle {
    isFirePokemon(pokemon: Pokemon): pokemon is PokemonFire {
        return pokemon?.type === PokemonType.FIRE
    }

    firstToAttack(attacker: Pokemon, defender: Pokemon): Pokemon {
        if(this.isFirePokemon(attacker) && !this.isFirePokemon(defender)) {
            return attacker;
        }
        if(this.isFirePokemon(defender) && !this.isFirePokemon(attacker)) {
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
            hp: this.isFirePokemon(attacker) ? defender.hp - attacker.attack : defender.hp - (attacker.attack * 1.5)
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