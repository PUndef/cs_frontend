import {createBitFactory} from './1-task';

describe('1 task is correct', () => {
  test("get method work correctly", () => {
    const bitGetter = createBitFactory(new Uint8Array([0b1110, 0b1101, 0b1011]));
    // First array element
    expect(bitGetter.get(0, 0)).toBe(0);
    expect(bitGetter.get(0, 1)).toBe(1);
    expect(bitGetter.get(0, 2)).toBe(1);
    expect(bitGetter.get(0, 3)).toBe(1);
    // Second array element
    expect(bitGetter.get(1, 0)).toBe(1);
    expect(bitGetter.get(1, 1)).toBe(0);
    expect(bitGetter.get(1, 2)).toBe(1);
    expect(bitGetter.get(1, 3)).toBe(1);
    // Third array element
    expect(bitGetter.get(2, 0)).toBe(1);
    expect(bitGetter.get(2, 1)).toBe(1);
    expect(bitGetter.get(2, 2)).toBe(0);
    expect(bitGetter.get(2, 3)).toBe(1);
  });

  test("set 0 in first element by index 1 work correctly", () => {
    const bitAccessor = createBitFactory(new Uint8Array([0b1110, 0b1101]))
    expect(bitAccessor.get(0, 1)).toBe(1);
    bitAccessor.set(0, 1, 0);
    expect(bitAccessor.get(0, 1)).toBe(0);
  });

  test("set 0 in second element by index 0 work correctly", () => {
    const bitAccessor = createBitFactory(new Uint8Array([0b1110, 0b1101]))
    expect(bitAccessor.get(1, 0)).toBe(1);
    bitAccessor.set(1, 0, 0);
    expect(bitAccessor.get(1, 0)).toBe(0);
  });

  test("set 1 in first element by index 0 work correctly", () => {
    const bitAccessor = createBitFactory(new Uint8Array([0b1110, 0b1101]))
    expect(bitAccessor.get(0, 0)).toBe(0);
    bitAccessor.set(0, 1, 1);
    expect(bitAccessor.get(0, 1)).toBe(1);
  });

  test("set 1 in second element by index 1 work correctly", () => {
    const bitAccessor = createBitFactory(new Uint8Array([0b1110, 0b1101]))
    expect(bitAccessor.get(1, 1)).toBe(0);
    bitAccessor.set(1, 1, 1);
    expect(bitAccessor.get(1, 1)).toBe(1);
  });

  test("return correct error on bit index more than binary length", () => {
    const bitGetter = createBitFactory(new Uint8Array([0b1110]));
    const errorFn = () => bitGetter.get(0, 10)
    expect(errorFn).toThrow(new Error('Bit index more than binary length!'));
  });

  test("return correct error on byte index more than bytes length", () => {
    const bitGetter = createBitFactory(new Uint8Array([0b1110]));
    const errorFn = () => bitGetter.get(10, 0)
    expect(errorFn).toThrow(new Error('Byte index more than bytes length!'));
  });
})