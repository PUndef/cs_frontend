import { bracketsIsValid } from ".";

describe('5 Lesson - brackets validation work correctly', () => {
  test('isValid work correctly', () => {

    expect(bracketsIsValid('(hello{world} and [me])')).toBe(true);
    expect(bracketsIsValid('(hello{world)} and [me])')).toBe(false);
    expect(bracketsIsValid(')')).toBe(false);
  })
})