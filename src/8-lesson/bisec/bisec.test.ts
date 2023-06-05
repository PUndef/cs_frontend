import { bisecLeft, bisecRight } from ".";

describe('8 Lesson - bisecLeft & bisecRight work correctly', () => {
  test('bisecLeft work correctly', () => {
    expect(
      bisecLeft(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 9
      )
    ).toBe(11);

    expect(
      bisecLeft(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 6
      )
    ).toBe(5);

    expect(
      bisecLeft(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 7
      )
    ).toBe(7);
  })

  test('bisecRight work correctly', () => {
    expect(
      bisecRight(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 9
      )
    ).toBe(11);

    expect(
      bisecRight(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 6
      )
    ).toBe(6);

    expect(
      bisecRight(
        [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8,  9], (el) => el - 7
      )
    ).toBe(9);

  })
})