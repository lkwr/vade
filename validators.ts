import { createValidator } from './validate.ts';

export const IsEquals = createValidator((prop) => {
    return (_prop) => _prop == prop;
});

export const IsEqualsStrict = createValidator((prop) => {
    return (_prop) => _prop === prop;
});

export const IsString = createValidator(() => {
    return (prop) => typeof prop === 'string';
});

export const IsNumber = createValidator(() => {
    return (prop) => typeof prop === 'number';
});

export const IsBigint = createValidator(() => {
    return (prop) => typeof prop === 'bigint';
});

export const IsBoolean = createValidator(() => {
    return (prop) => typeof prop === 'boolean';
});

export const IsTrue = createValidator(() => {
    return (prop) => prop === true;
});

export const IsFalse = createValidator(() => {
    return (prop) => prop === false;
});

export const IsFunction = createValidator(() => {
    return (prop) => typeof prop === 'function';
});

export const IsObject = createValidator(() => {
    return (prop) => typeof prop === 'object';
});

export const IsSymbol = createValidator(() => {
    return (prop) => typeof prop === 'symbol';
});

export const IsUndefined = createValidator(() => {
    return (prop) => typeof prop === 'undefined';
});

export const IsNull = createValidator(() => {
    return (prop) => prop === null;
});

export const Set = createValidator((value) => {
    return () => ({ valid: true, replace: value });
});

export const SetDefault = createValidator((value) => {
    return (prop) => (prop === undefined ? { valid: true, replace: value } : true);
});
