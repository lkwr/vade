# VADE

(**Va**lidate **De**corator)

#### Simple class validator for Deno using TypeScript Decorators with built-in class transformer.

![Made for Deno](https://img.shields.io/badge/made%20for-Deno-6B82F6?style=flat-square)
![Licence MIT](https://img.shields.io/github/license/lkwr/vade?color=blue&style=flat-square)
![Latest version](https://img.shields.io/github/v/tag/lkwr/vade?color=informational&label=version&sort=semver&style=flat-square)
![Latest commit](https://img.shields.io/github/last-commit/lkwr/vade?style=flat-square)
![Status WIP](https://img.shields.io/badge/status-WIP-red?style=flat-square)

## Key Features

-   Made for [Deno](https://deno.land)
-   Type-safe
-   Lightweight
-   Extendable
-   Zero dependencies

## How To Use

Simply create a Class (or Model) using TypeScript Decorators and run `validate`. If you need more validator types: **write issue**, **create merge request** or **implement it yourself** and only use it locally.

```ts
import {
    validate,
    createValidator,
    IsNumber,
    IsString,
    SetDefault,
} from 'https://deno.land/x/vade/mod.ts';

// Custom validator
const IsHigherThen = createValidator((value: number) => {
    return (prop) => {
        return prop > value;
    };
});

// Our example model/class
class ExampleClass {
    @IsNumber()
    @IsHigherThen(10)
    specialNumber!: number;

    @SetDefault('default value')
    @IsString()
    randomValue!: string;
}

// ---------- //

// Valid
const obj1 = new ExampleClass();
obj1.specialNumber = 13;
obj1.randomValue = 'asd';
console.log(validate(obj1, ExampleClass));
// ExampleClass { specialNumber: 13, randomValue: "asd" }

// ---------- //

// Invalid
const obj2 = new ExampleClass();
obj2.specialNumber = 9; // Failed
obj2.randomValue = 'asd';
console.log(validate(obj2, ExampleClass));
// null

// ---------- //

// Invalid
const obj3 = new ExampleClass();
// Failed -> no specialNumber
obj3.randomValue = 'asd';
console.log(validate(obj3, ExampleClass));
// null

// ---------- //

// Valid
const obj4 = { specialNumber: 14, randomValue: 'cool' };
console.log(validate(obj4, ExampleClass));
// ExampleClass { specialNumber: 14, randomValue: "cool" }

// ---------- //

// Valid -> randomValue has a default value
const obj5 = { specialNumber: 14 };
console.log(validate(obj5 as any, ExampleClass));
// ExampleClass { specialNumber: 14, randomValue: "default value" }

// ---------- //

// Invalid -> unknown nice property
const obj6 = { specialNumber: 14, randomValue: 'cool', nice: true };
console.log(validate(obj6, ExampleClass));
// null
```

## TODO

-   add more built-in types (feel free to contribute)

## Known issues

--

## Contributing

Feel free to open merge requests!

## License

MIT

---

> Homepage [luke.id](https://luke.id) &nbsp;&middot;&nbsp; GitHub
> [@lkwr](https://github.com/lkwr) &nbsp;&middot;&nbsp; Twitter
> [@wlkrlk](https://twitter.com/wlkrlk)
