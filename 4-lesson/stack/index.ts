import { ERROR_MESSAGES } from "../constants";

export class Stack {
  maxSize;
  stackArr;
  top;

  constructor(ArrayConstructor: IntArrayConstructor, maxSize: number) {
    this.stackArr = new ArrayConstructor(maxSize);
    this.maxSize = maxSize;
    this.top = -1;
  }

  get isFull() {
    return this.top === this.maxSize - 1;
  }

  get isEmpty() {
    return this.top === -1;
  }

  push(value: number) {
    if (this.isFull) {
      throw new Error(ERROR_MESSAGES.STACK_OVERFLOW)
    }
    const cursor = ++this.top
    this.stackArr[cursor] = value
  }

  pop() {
    if (this.isEmpty) {
      throw new Error(ERROR_MESSAGES.STACK_IS_EMPTY)
    }
    const result = this.stackArr[this.top];
    --this.top;
    return result
  }

  get head() {
    return this.stackArr[this.top]
  }
}