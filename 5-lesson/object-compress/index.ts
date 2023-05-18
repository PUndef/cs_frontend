import { Stack } from "../../4-lesson";

const isObject = (val: unknown) => typeof val === 'object'
  && !Array.isArray(val)
  && val !== null

type CollapseInput = object | string | number | Array<unknown>

export class Collapse {
  #flatObjRecursive(
    input: CollapseInput,
    keyPrev: string | number | null = null,
  ): object {
    return Object.keys(input).reduce((prev, curKey) => {
      const typedObj = input as {[key: string]: unknown}
      const value = typedObj[curKey];

      const prevIsCorrect = keyPrev !== null && keyPrev !== undefined
      const newKey = prevIsCorrect ? `${keyPrev}.${curKey}` : curKey

      if (typeof value === 'string' || typeof value === 'number') {
        return {...prev, [newKey]: value}
      }

      if (Array.isArray(value)) {
        const resArr = value.reduce((prev, el, index) => {
          const arrElKey = `${curKey}.${index}`
          const newKey = keyPrev ? `${keyPrev}.${arrElKey}` : arrElKey

          return {...prev, [newKey]: el}
        }, {})

        return {...prev, ...resArr}
      }

      if (isObject(value)) {
        return {...prev, ...this.#flatObjRecursive(value as object, newKey)}
      }

      return {...prev, [curKey]: value}
    }, {})
  }

  #flatObjStack(input: CollapseInput): object {
    const result: Record<string, string | number> = {}
    const stack = new Stack<CollapseInput>();

    stack.push(input)

    // while(!stack.isEmpty) {
    //   const value = stack.pop();

    //   if (isObject(value)) {

    //   }

    //   console.log('stack:', ...stack);
    //   stack.pop()
    // }

    // console.log('RESULT:', result);

    return result;
  }

  recursive(obj: CollapseInput) {
    return this.#flatObjRecursive(obj)
  }

  stack(obj: CollapseInput) {
    return this.#flatObjStack(obj)
  }
}

const collapse = new Collapse()
const test = {
  test1: {
    a: 1
  }
  // a: {
  //   b: [1, 2],
  //   '': {c: 2}
  // }
};

console.log(
  JSON.stringify(collapse.stack(test))
)