import { ERROR_MESSAGES } from "../constants";
import { Dequeue } from ".";

describe('4 lesson is correct', () => {
  test("Dequeue work correctly", () => {
    const dequeue = new Dequeue();
    dequeue.push(10);
    dequeue.unshift(11);
    dequeue.push(12);

    // [11, 10, 12]
    expect(dequeue.pop()).toBe(12);
    // [11, 10]
    expect(dequeue.shift()).toBe(11);
    // [10]
    expect(dequeue.pop()).toBe(10);
    // []
    const errorFn = () => dequeue.pop();
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.QUEUE_IS_EMPTY));
  });
})