import { validate, createValidator, IsNumber, IsString, SetDefault } from './mod.ts';

// Custom validator
const IsHigherThen = createValidator((value: number) => {
    return (prop) => {
        return prop > value;
    };
});

class ExampleClass {
    @IsNumber()
    @IsHigherThen(10)
    specialNumber!: number;

    @SetDefault('default value')
    @IsString()
    randomValue!: string;
}

// Valid
const obj1 = new ExampleClass();

obj1.specialNumber = 13;
obj1.randomValue = 'asd';

console.log(validate(obj1, ExampleClass));

// Invalid
const obj2 = new ExampleClass();

obj2.specialNumber = 9; // Failed
obj2.randomValue = 'asd';

console.log(validate(obj2, ExampleClass));

// Invalid
const obj3 = new ExampleClass();

// Failed -> no specialNumber
obj3.randomValue = 'asd';

console.log(validate(obj3, ExampleClass));

// Valid
const obj4 = { specialNumber: 14, randomValue: 'cool' };

console.log(validate(obj4, ExampleClass));

// Valid -> randomValue has a default value
const obj5 = { specialNumber: 14 };

console.log(validate(obj5 as any, ExampleClass));

// Invalid -> unknown nice property
const obj6 = { specialNumber: 14, randomValue: 'cool', nice: true };

console.log(validate(obj6, ExampleClass));
