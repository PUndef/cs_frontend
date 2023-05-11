import { ERROR_MESSAGES } from "../constants";
import { Stack } from ".";

describe('4 lesson is correct', () => {
  test("Stack work correctly", () => {
    const stack = new Stack(Int32Array, 10);
    stack.push(10);
    stack.push(11);
    stack.push(12);
    expect(stack.head).toBe(12);
    expect(stack.pop()).toBe(12);
    expect(stack.head).toBe(11);
    expect(stack.pop()).toBe(11);
    expect(stack.pop()).toBe(10);
  });
  test("Stack error handler work correctly", () => {
    const stack = new Stack(Int32Array, 2);
    stack.push(10);
    stack.push(11);

    const errorFn1 = () => stack.push(12);
    expect(errorFn1).toThrow(new Error(ERROR_MESSAGES.STACK_OVERFLOW));
    stack.pop();
    stack.pop();
    const errorFn2 = () => stack.pop();
    expect(errorFn2).toThrow(new Error(ERROR_MESSAGES.STACK_IS_EMPTY));
  });
})