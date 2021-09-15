import { Logger } from "./log.service";

export function logOutput(color: string) {
    return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let output = originalMethod.call(this, ...args);
            if(output instanceof Promise) {
                output = output.then(value => {
                    new Logger().log(value, color);
                    return value;
                });
            } else {
                new Logger().log(output, color);
            }

            return output;
        };

        return descriptor;
    };
}
