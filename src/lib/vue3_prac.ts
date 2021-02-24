let age: number = null;

let name1: undefined = undefined;

let n: null = null;

const list: number[] = [1, 2, 3, 4];

const data: [string, number] = ['abc', 123];

interface Person {
  name: string;
  sex: boolean;
  age?: number;
}

type oldType = Partial<Person>;

type iOmit = Omit<Person, 'name'>;

const omitValue: iOmit = { age: 12, sex: true };

const oldData: oldType = {
  name: '12132',
};

const person: Person = {
  name: 'kay',
  sex: true,
};

let add = (a: number, b: number, c?: number): number => {
  return a + b + c;
};

let add1: (a: number, b: number, c?: number) => number = (x, y, z) => {
  return x + y + z;
};

add = add1;

interface Fun {
  (x: number, y: number, z?: number): number;
}

let add3: Fun = add;

let unionType: string | number;

let result = unionType as string;

class Car {
  constructor(private price: number, public readonly brand: string) {
    this.price = price;
    this.brand = brand;
  }
}

const car = new Car(123, '东方');

car.brand;

interface Radio {
  switchRadio(a: string): void;
}

class RadioA implements Radio {
  switchRadio(a: string) {
    a.length;
  }
}

interface RadioBro extends Radio {
  getList(x: number): void;
}

class machine implements RadioBro {
  switchRadio() {}
  getList() {}
}

enum Direction {
  Up = 100,
  Down = 200,
  Left = 300,
  Right = 400,
}

interface Ttype {
  length: number;
}

function echo<T extends Ttype>(arg: T): T {
  arg.length;
  return arg;
}

echo(['123']);

interface student<T, U> {
  key: T;
  value: U;
}

const ming: student<string, number> = { key: '123', value: 456 };

const hong: student<number[], number> = { key: [1, 2, 3], value: 12334 };

type funType = (a: number, b: string) => number;

const c: funType = (c, d) => {
  return 1;
};

type gender = 'male' | 'female' | '人妖';

const kay: gender = 'female';

interface IName {
  name?: string;
}

type newType = IName & { age: number };

const kkay: newType = {
  name: '1212',
  age: 123,
};

let body = document.body;

document.body.onclick = function (e) {};
