import { Logger } from "./log.service";

export function logOutput(color: string) {
    return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const output = originalMethod.call(this, ...args);
            new Logger().log(output, color);
            return output;
        };

        return descriptor;
    };
}
