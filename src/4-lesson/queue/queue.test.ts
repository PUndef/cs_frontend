import { ERROR_MESSAGES } from "../constants";
import { Queue } from ".";

describe('4 lesson is correct', () => {
  test("Queue work correctly", () => {
    const queue = new Queue();
    queue.push(10);
    expect(queue.head).toBe(10);
    queue.push(11);
    expect(queue.head).toBe(10);
    queue.push(12);
    expect(queue.head).toBe(10);
    expect(queue.pop()).toBe(10);
    expect(queue.head).toBe(11);
    expect(queue.pop()).toBe(11);
    expect(queue.head).toBe(12);
    expect(queue.pop()).toBe(12);

    const errorFn = () => queue.pop();
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.QUEUE_IS_EMPTY));
  });
})