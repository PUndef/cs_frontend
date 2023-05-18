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

  #flatObjStack(input: Record<string, unknown>): object {
    const res: Record<string, string | number> = {}
    const stack = new Stack<any>();

    stack.push([Object.entries(input).values(), ''])

    while(!stack.isEmpty) {
      const [cursor, path] = stack.pop();

      for (const [key, value] of cursor) {
        const newPath = path !== '' ? `${path}.${key}` : key
        if (value !== null && typeof value === 'object') {
          stack.push([cursor, path]);
          stack.push([Object.entries(value).values(), newPath]);
          break;
        } else {
          res[newPath] = value
        }
      }
    }

    return res;
  }

  recursive(obj: CollapseInput) {
    return this.#flatObjRecursive(obj)
  }

  stack(obj: Record<string, unknown>) {
    return this.#flatObjStack(obj)
  }
}
