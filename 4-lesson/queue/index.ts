import { ERROR_MESSAGES } from "../constants";
import { LinkedList, LinkedListType } from "../../3-lesson/linked-list/linked-list";

export class Queue {
  queue: LinkedListType | undefined = undefined;

  constructor() {
    const list = new LinkedList();
    this.queue = list;
  }

  get head() {
    return this.queue?.first?.value;
  }

  push(key: any) {
    this._pushRight(key)
  }

  _pushRight(key: any) {
    this.queue?.pushRight(key)
  }

  pop() {
    const result = this.queue?.removeLeft();
    if (!result) {
      throw new Error(ERROR_MESSAGES.QUEUE_IS_EMPTY);
    }
    return result
  }
}
