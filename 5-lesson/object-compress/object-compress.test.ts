import {Collapse} from './index'

describe('5 Lesson', () => {
  test('recursive compress work correctly', () => {
    const collapse = new Collapse()
    const test = {
      a: {
        b: [1, 2],
        '': {c: 2}
      }
    };

    expect(
      JSON.stringify(collapse.recursive(test))
    ).toBe(
      "{\"a.b.0\":1,\"a.b.1\":2,\"a..c\":2}"
    )
  })
  // TODO add stack realization
  // test('stack compress work correctly', () => {
  //   const collapse = new Collapse()
  //   const test = {
  //     a: {
  //       b: [1, 2],
  //       '': {c: 2}
  //     }
  //   };

  //   expect(
  //     JSON.stringify(collapse.stack(test))
  //   ).toBe(
  //     "{\"a.b.0\":1,\"a.b.1\":2,\"a..c\":2}"
  //   )
  // })
})