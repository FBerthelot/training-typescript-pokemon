import chalk from "chalk";
import { isPokemon } from "./pokemon.utils";

export class Logger<LoggerType = string> {
    log(arg: LoggerType, color?: string) {
        if(isPokemon(arg)) {
            const displayPoke = color ? chalk.keyword(color)(`${arg.name} : ${arg.hp} PV`) : `${arg.name} : ${arg.hp} PV`;
            console.log(displayPoke);
            return;
        }

        const display = color ? chalk.keyword(color)(arg): arg;
        console.log(display);
    }
}