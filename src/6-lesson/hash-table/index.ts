import { LinkedList } from "../../3-lesson/linked-list/linked-list";

const getHashCode = Symbol();
const hashCode = Symbol();

Object.defineProperty(Object.prototype, getHashCode, {
  configurable: true,

  value() {
    if (!(hashCode in this)) {
      Object.defineProperty(this, hashCode, {
        value: getRandomInt(0, 2 ** 32),
      })
    }


    return this[hashCode];

    function getRandomInt(from: number, to: number) {
      return Math.floor(Math.random() * (to - from)) + from
    }
  }
})

export class HashTable {
  #buffer;
  #capacity;

  #hasher;

  constructor(capacity: number = 31, Hasher: HasherT) {
    this.#hasher = new Hasher(capacity);
    this.#capacity = capacity;
    this.#buffer = new Array(capacity).fill(null);
  }
}

type HasherT = {

}

class Hasher implements HasherT {
  #size;

  constructor(size: number) {
    this.#size = size;
  }

  hash(value: string | number |  Record<string, any> | null) {
    switch (typeof value) {
      case 'number':
        return this.#getNumberHash(value);
      case 'string':
        return this.#getStringHash(value);
      case 'object':
        return this.#getObjectHash(value);
      default:
        throw new TypeError('Invalid data');
    }
  }

  #getNumberHash(number: number) {
    return number % this.#size;
  }

  #getStringHash(str: string) {
    const base = 2 ** 16;
    let res = str.charCodeAt(0);

    for (let i = 0; i < str.length; i++) {
      res += this.#getNumberHash(str.charCodeAt(i) * base ** i)
    }

    return res;
  }

  #getObjectHash(obj: Record<string, any> | null) {
    if (obj === null) {
      throw new TypeError('Invalid object')
    }
    // @ts-ignore
    return this.#getNumberHash(obj[getHashCode]())
  }
}

const h = new Hasher(31)

console.log(h.hash(100));
console.log(h.hash('f1'));
console.log(h.hash({}));