// deno-lint-ignore-file no-explicit-any

import { plainToClass } from './transform.ts';

const ValidateSymbol = Symbol('validator');
type ValidateFunction = <T extends any>(property: T) => boolean | ValidateResult<T>;
interface ValidateResult<T> {
    replace?: T;
    valid: boolean;
}
type ValidateInfo = Record<string, Array<ValidateFunction> | undefined>;

export const Validate = (validate: ValidateFunction): PropertyDecorator => {
    // deno-lint-ignore ban-types
    return (target: Object, propertyKey: PropertyKey) => {
        if (typeof propertyKey === 'string') {
            if (Object.getOwnPropertyDescriptor(target, ValidateSymbol) === undefined) {
                Object.defineProperty(target, ValidateSymbol, { enumerable: false, value: {} });
            }
            const info: ValidateInfo = Object.getOwnPropertyDescriptor(
                target,
                ValidateSymbol
            )?.value;

            const propInfo = info[propertyKey];

            if (propInfo) {
                propInfo.push(validate);
            } else {
                info[propertyKey] = [validate];
            }
        }
    };
};

export const validate = <T extends abstract new (...args: any[]) => any>(
    obj: InstanceType<T>,
    Class: T
): InstanceType<T> | null => {
    const validators = Object.getOwnPropertyDescriptor(Class.prototype, ValidateSymbol)
        ?.value as ValidateInfo | undefined;

    let valid = true;

    const emptyInstance = Reflect.construct(Class, []);

    obj = { ...emptyInstance, ...obj };

    if (validators === undefined) {
        return null;
    }

    Object.getOwnPropertyNames(obj).forEach((property) => {
        const validates = validators[property];

        if (validates) {
            for (const validate of validates.reverse()) {
                try {
                    const passed = validate(obj[property]);

                    if (typeof passed === 'boolean') {
                        if (passed !== true && valid === true) {
                            valid = false;
                            break;
                        }
                    } else {
                        if (passed.replace) {
                            obj[property] = passed.replace;
                        }
                        if (passed.valid !== true && valid === true) {
                            valid = false;
                            break;
                        }
                    }
                } catch {
                    valid = false;
                    break;
                }
            }
        } else {
            valid = false;
        }
    });

    if (valid === true) {
        return plainToClass(obj, Class);
    } else {
        return null;
    }
};

export const createValidator = <T extends Array<any>>(
    validateFactory: (...args: T) => ValidateFunction
) => {
    return (...args: T) => {
        return Validate(validateFactory(...args));
    };
};
