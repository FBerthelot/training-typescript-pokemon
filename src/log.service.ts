import { isFirePokemon } from "./pokemon.utils";

export class Logger<LoggerType = string> {
    log(arg: LoggerType) {
        if(isFirePokemon(arg)) {
            console.log(`${arg.name} : ${arg.hp} PV`);
            return;
        }

        console.log(arg);
    }
}