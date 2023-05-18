export type StackValueDefaultType = string | number;

export interface StackI<StackValue> {
  stackArr: Array<StackValue>;
  push(value: StackValue): void;
  pop(): StackValue;
  head: StackValue;
  length: number;
}

export class Stack<StackValue = StackValueDefaultType> implements StackI<StackValue> {
  stackArr;
  top;

  constructor() {
    this.stackArr = new Array();
    this.top = -1;
  }

  push(value: StackValue) {
    const cursor = ++this.top
    this.stackArr[cursor] = value
  }

  pop() {
    const result: StackValue = this.stackArr[this.top];
    --this.top;
    return result
  }

  get head(): StackValue {
    return this.stackArr[this.top]
  }

  get length(): number {
    return this.top + 1
  }

  get isEmpty() {
    return this.top === -1;
  }

  *[Symbol.iterator]() {
    let cursor = this.top;

    while (cursor >= 0) {
      yield this.stackArr[cursor--]
    }
  }
}
